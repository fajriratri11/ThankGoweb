"use client";

interface DigitalGiftProps {
  gift: {
    bank: string;
    account: string;
    name: string;
  };
}

export default function DigitalGift({ gift }: DigitalGiftProps) {
  const copy = () => navigator.clipboard.writeText(gift.account);

  return (
    <section className="py-16 text-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Amplop Digital</h2>
      <div className="bg-white shadow-md p-6 rounded-lg inline-block">
        <p className="font-semibold">
          {gift.bank} - {gift.account}
        </p>
        <p>a.n. {gift.name}</p>
        <button
          onClick={copy}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg"
        >
          Salin Rekening
        </button>
      </div>
    </section>
  );
}
