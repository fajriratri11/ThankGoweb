interface Person {
  name: string;
  parent: string;
  photo?: string;
}

export default function CoupleInfo({
  groom,
  bride,
}: {
  groom: Person;
  bride: Person;
}) {
  return (
    <section className="text-center py-10 bg-white">
      <h2 className="text-xl font-semibold mb-6">Mempelai</h2>
      <div className="space-y-6">
        <div>
          <img
            src={groom.photo || "/default-groom.jpg"}
            alt={groom.name}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />
          <p className="mt-2 font-bold">{groom.name}</p>
          <p className="text-sm">{groom.parent}</p>
        </div>
        <div>
          <img
            src={bride.photo || "/default-bride.jpg"}
            alt={bride.name}
            className="w-32 h-32 mx-auto rounded-full object-cover"
          />
          <p className="mt-2 font-bold">{bride.name}</p>
          <p className="text-sm">{bride.parent}</p>
        </div>
      </div>
    </section>
  );
}
