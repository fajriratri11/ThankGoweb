import { getWeddingData } from "@/lib/getWeddingData";
import LockScreen from "@/components/LockScreen";
import CoupleInfo from "@/components/CoupleInfo";
import EventInfo from "@/components/EventInfo";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import DigitalGift from "@/components/DigitalGift";
import Footer from "@/components/Footer";

import fs from "fs";
import path from "path";

// ✅ Biar Next tahu semua slug dari folder data
export async function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "src/data");
  const files = fs.readdirSync(dataDir);

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      slug: file.replace(".json", ""),
    }));
}

export default async function WeddingPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getWeddingData(params.slug);

  if (!data) {
    return <main className="text-center py-20">Undangan tidak ditemukan</main>;
  }

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen flex justify-center">
      <div className="w-full max-w-sm shadow-lg">
        <LockScreen couple={`${data.groom.name} & ${data.bride.name}`} />
        <CoupleInfo groom={data.groom} bride={data.bride} />
        <EventInfo event={data.event} />
        <Gallery gallery={data.gallery} />
        <RSVPForm />
        <DigitalGift gift={data.gift} />
        <Footer />
      </div>
    </main>
  );
}
