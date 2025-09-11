"use client";

import { useState } from "react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState("yes");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih ${name}, RSVP berhasil terkirim!`);
    setName("");
    setMessage("");
  };

  return (
    <section className="py-10 bg-white">
      <h2 className="text-center text-xl font-semibold mb-6">RSVP & Ucapan</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 px-6">
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />
        <select
          value={attend}
          onChange={(e) => setAttend(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="yes">Hadir</option>
          <option value="no">Tidak Hadir</option>
        </select>
        <textarea
          placeholder="Ucapan untuk mempelai"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />
        <button
          type="submit"
          className="w-full py-2 bg-pink-500 text-white rounded-lg"
        >
          Kirim
        </button>
      </form>
    </section>
  );
}
