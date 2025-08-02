"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";

export default function HomePage() {
  const [groupName, setGroupName] = useState("");
  const [groupIdInput, setGroupIdInput] = useState("");
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Obtener o generar userId anónimo
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }

    // Cargar grupos del usuario
    fetch("/api/groups", {
      headers: {
        "x-user-id": userId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setGroups(data);
      })
      .catch((err) => console.error("Error cargando grupos:", err));
  }, []);

  const handleCreate = async () => {
    const userId = localStorage.getItem("userId");

    if (!groupName.trim()) {
      alert("Por favor, introduce un nombre para el grupo.");
      return;
    }

    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: groupName, userId }),
    });

    if (res.ok) {
      const group = await res.json();
      router.push(`/${group.id}`);
    } else {
      const err = await res.json();
      console.error("Error al crear grupo:", err.error);
      alert("No se pudo crear el grupo.");
    }
  };

  const handleEnter = (e) => {
    e.preventDefault();
    if (groupIdInput.trim()) router.push(`/${groupIdInput.trim()}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen space-y-8 p-6">
      <div className="space-y-2">
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Nombre del grupo"
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button onClick={handleCreate} variant="primary">
          Crear nuevo grupo
        </Button>
      </div>

      <form onSubmit={handleEnter} className="flex space-x-2">
        <input
          value={groupIdInput}
          onChange={(e) => setGroupIdInput(e.target.value)}
          placeholder="Pega aquí el ID del grupo"
          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" variant="secondary">
          Entrar
        </Button>
      </form>

      {groups.length > 0 && (
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-xl font-semibold">Tus grupos</h2>
          <ul className="space-y-2">
            {groups.map((group) => (
              <li key={group.id}>
                <button
                  onClick={() => router.push(`/${group.id}`)}
                  className="w-full text-left px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  {group.name || "Grupo sin nombre"}
                </button>
              </li>
            ))}
          </ul>º
        </div>
      )}
    </main>
  );
}
