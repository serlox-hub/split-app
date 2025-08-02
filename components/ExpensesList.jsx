"use client";
import React from 'react';

export default function ExpensesList({ expenses }) {
  if (!expenses?.length) {
    return <p className="text-gray-600">Aún no hay gastos registrados.</p>;
  }

  return (
    <table className="w-full bg-white rounded-lg shadow overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="px-4 py-2">Descripción</th>
          <th className="px-4 py-2">Importe (€)</th>
          <th className="px-4 py-2">Pagado por</th>
          <th className="px-4 py-2">Participantes</th>
          <th className="px-4 py-2">Fecha</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map(exp => (
          <tr key={exp.id} className="border-t">
            <td className="px-4 py-2">{exp.description}</td>
            <td className="px-4 py-2">{exp.amount.toFixed(2)}</td>
            <td className="px-4 py-2">{exp.paidBy}</td>
            <td className="px-4 py-2">{exp.participants.join(', ')}</td>
            <td className="px-4 py-2">
              {new Date(exp.date).toLocaleDateString('es-ES')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
