export default function Gallery({ gallery }: { gallery: string[] }) {
  return (
    <section className="py-10 bg-pink-50">
      <h2 className="text-center text-xl font-semibold mb-6">Galeri Foto</h2>
      <div className="grid grid-cols-2 gap-4 px-6">
        {gallery.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Gallery ${i + 1}`}
            className="rounded-lg shadow-md"
          />
        ))}
      </div>
    </section>
  );
}
