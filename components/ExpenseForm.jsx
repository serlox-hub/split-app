"use client";
import { useState } from 'react';

export default function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [participants, setParticipants] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount || !paidBy) return;

    // participants: separar por comas y limpiar
    const parts = participants
      .split(',')
      .map(p => p.trim())
      .filter(p => p);

    onAdd({
      description,
      amount: parseFloat(amount),
      paidBy,
      participants: parts.length ? parts : [paidBy],
      date: new Date().toISOString(),
    });

    // reset
    setDescription('');
    setAmount('');
    setPaidBy('');
    setParticipants('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Añadir gasto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="number"
          placeholder="Importe (€)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          min="0.01"
          step="0.01"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Pagado por (nombre)"
          value={paidBy}
          onChange={e => setPaidBy(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="Participantes (comma-separated)"
          value={participants}
          onChange={e => setParticipants(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Agregar
      </button>
    </form>
  );
}
