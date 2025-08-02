"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

export default function GroupHeader({ groupId }) {
  const router = useRouter();

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Split • Grupo: <span className="text-blue-600">{groupId}</span>
        </h1>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Home
        </Button>
      </div>
    </header>
  );
}
