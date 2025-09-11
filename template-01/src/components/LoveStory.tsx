import { Story } from "@/types/wedding";

export default function LoveStory({ story }: { story: Story[] }) {
  return (
    <section className="py-10 bg-white">
      <h2 className="text-center text-xl font-semibold mb-6">Cerita Kami</h2>
      <div className="space-y-6 px-6">
        {story.map((s, i) => (
          <div key={i} className="p-4 border rounded-lg shadow-sm bg-pink-50">
            <h3 className="font-bold">{s.title}</h3>
            <p className="text-sm mt-2">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
