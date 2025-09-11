"use client";

import { useState } from "react";

export default function LockScreen({ couple }: { couple: string }) {
  const [opened, setOpened] = useState(false);

  if (opened) return null;

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-pink-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Undangan Pernikahan</h1>
      <p className="mb-6">{couple}</p>
      <button
        onClick={() => setOpened(true)}
        className="px-6 py-2 bg-pink-500 text-white rounded-lg shadow-md"
      >
        Buka Undangan
      </button>
    </section>
  );
}
