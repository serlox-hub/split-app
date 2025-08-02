"use client";

import { useState, useEffect } from "react";

export default function ClientGroupUI({ groupId }) {
  const [persons, setPersons] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [newPerson, setNewPerson] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [payers, setPayers] = useState([]); // { person_id, amount }
  const [participants, setParticipants] = useState([]); // { person_id, share }

  useEffect(() => {
    fetch(`/api/groups/${groupId}/persons`)
      .then((res) => res.json())
      .then(setPersons)
      .catch(console.error);

    fetch(`/api/groups/${groupId}/expenses`)
      .then((res) => res.json())
      .then(setExpenses)
      .catch(console.error);
  }, [groupId]);

  useEffect(() => {
    if (!amount || isNaN(amount) || payers.length === 0) return;
    const equalAmount = (parseFloat(amount) / payers.length).toFixed(2);
    setPayers((old) =>
      old.map((p) => ({ ...p, amount: parseFloat(equalAmount) }))
    );
  }, [amount, payers.length]);

  useEffect(() => {
    if (!amount || isNaN(amount) || participants.length === 0) return;
    const equalShare = (parseFloat(amount) / participants.length).toFixed(2);
    setParticipants((old) =>
      old.map((p) => ({ ...p, share: parseFloat(equalShare) }))
    );
  }, [amount, participants.length]);

  const handleAddPerson = async () => {
    if (!newPerson.trim()) return;

    const res = await fetch(`/api/groups/${groupId}/persons`, {
      method: "POST",
      body: JSON.stringify({ name: newPerson }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const person = await res.json();
      setPersons([...persons, person]);
      setNewPerson("");
    } else {
      alert("Error al añadir persona");
    }
  };

  const togglePayer = (person) => {
    const exists = payers.find((p) => p.person_id === person.id);
    if (exists) {
      setPayers(payers.filter((p) => p.person_id !== person.id));
    } else {
      setPayers([...payers, { person_id: person.id, amount: 0 }]);
    }
  };

  const toggleParticipant = (person) => {
    const exists = participants.find((p) => p.person_id === person.id);
    if (exists) {
      setParticipants(participants.filter((p) => p.person_id !== person.id));
    } else {
      setParticipants([...participants, { person_id: person.id, share: 0 }]);
    }
  };

  const updatePayerAmount = (personId, value) => {
    const val = parseFloat(value);
    if (isNaN(val) || val < 0) return;
    setPayers((prev) =>
      prev.map((p) => (p.person_id === personId ? { ...p, amount: val } : p))
    );
  };

  const updateParticipantShare = (personId, value) => {
    const val = parseFloat(value);
    if (isNaN(val) || val < 0) return;
    setParticipants((prev) =>
      prev.map((p) => (p.person_id === personId ? { ...p, share: val } : p))
    );
  };

  const handleAddExpense = async () => {
    const totalAmount = parseFloat(amount);

    if (!description.trim()) {
      alert("Introduce una descripción");
      return;
    }

    if (isNaN(totalAmount) || totalAmount <= 0) {
      alert("Introduce un monto válido");
      return;
    }

    if (payers.length === 0) {
      alert("Selecciona al menos un pagador");
      return;
    }

    if (participants.length === 0) {
      alert("Selecciona al menos un participante");
      return;
    }

    const sumPaid = payers.reduce((acc, p) => acc + p.amount, 0);
    const sumConsumed = participants.reduce((acc, p) => acc + p.share, 0);

    if (sumPaid > totalAmount) {
      alert(
        `La suma pagada (${sumPaid.toFixed(
          2
        )}) no puede ser mayor que el monto total (${totalAmount.toFixed(2)})`
      );
      return;
    }

    if (sumConsumed > totalAmount) {
      alert(
        `La suma consumida (${sumConsumed.toFixed(
          2
        )}) no puede ser mayor que el monto total (${totalAmount.toFixed(2)})`
      );
      return;
    }

    const res = await fetch(`/api/groups/${groupId}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        amount: totalAmount,
        paid_by: payers,
        participants,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`Error al crear gasto: ${err.error || "Desconocido"}`);
      return;
    }

    const expense = await res.json();
    setExpenses([...expenses, expense]);

    setDescription("");
    setAmount("");
    setPayers([]);
    setParticipants([]);
  };

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      {/* Personas */}
      <div>
        <h2 className="text-lg font-bold">Personas</h2>
        <ul className="list-disc list-inside">
          {persons.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
        <div className="flex gap-2 mt-2">
          <input
            value={newPerson}
            onChange={(e) => setNewPerson(e.target.value)}
            placeholder="Nombre"
            className="border p-1 rounded w-full"
          />
          <button
            onClick={handleAddPerson}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Añadir
          </button>
        </div>
      </div>

      {/* Nuevo gasto */}
      <div>
        <h2 className="text-lg font-bold">Nuevo gasto</h2>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          className="border p-1 rounded w-full mb-2"
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Monto total"
          className="border p-1 rounded w-full mb-2"
          min="0"
          step="0.01"
        />

        <div>
          <label className="font-semibold">Pagado por:</label>
          <div className="flex flex-col gap-1 max-h-40 overflow-auto border rounded p-2">
            {persons.map((p) => {
              const payer = payers.find((pay) => pay.person_id === p.id);
              return (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!payer}
                    onChange={() => togglePayer(p)}
                  />
                  <span className="flex-grow">{p.name}</span>
                  {payer && (
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={payer.amount}
                      onChange={(e) => updatePayerAmount(p.id, e.target.value)}
                      className="w-20 border rounded p-1 text-right"
                    />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <label className="font-semibold">Participantes:</label>
          <div className="flex flex-col gap-1 max-h-40 overflow-auto border rounded p-2">
            {persons.map((p) => {
              const participant = participants.find(
                (part) => part.person_id === p.id
              );
              return (
                <label key={p.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={!!participant}
                    onChange={() => toggleParticipant(p)}
                  />
                  <span className="flex-grow">{p.name}</span>
                  {participant && (
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={participant.share}
                      onChange={(e) =>
                        updateParticipantShare(p.id, e.target.value)
                      }
                      className="w-20 border rounded p-1 text-right"
                    />
                  )}
                </label>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleAddExpense}
          className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
        >
          Añadir gasto
        </button>
      </div>

      {/* Lista de gastos */}
      <div>
        <h2 className="text-lg font-bold">Gastos</h2>
        <ul className="list-disc list-inside">
          {expenses.map((exp) => (
            <li key={exp.id}>
              {exp.description} — {exp.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
