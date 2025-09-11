import { EventInfo as EventInfoType } from "@/types/wedding";

export default function EventInfo({ event }: { event: EventInfoType }) {
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-6">Acara</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">Akad Nikah</h3>
          <p>{event.akad.date}</p>
          <p>{event.akad.time}</p>
          <p>{event.akad.location}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Resepsi</h3>
          <p>{event.resepsi.date}</p>
          <p>{event.resepsi.time}</p>
          <p>{event.resepsi.location}</p>
        </div>
      </div>
    </section>
  );
}
