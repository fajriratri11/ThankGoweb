import { getWeddingData } from "@/lib/getWeddingData";
import LockScreen from "@/components/LockScreen";
import CoupleInfo from "@/components/CoupleInfo";
import EventInfo from "@/components/EventInfo";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import DigitalGift from "@/components/DigitalGift";
import Footer from "@/components/Footer";

export default async function WeddingPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getWeddingData(params.slug);

  if (!data) {
    return <div className="text-center py-20">Undangan tidak ditemukan</div>;
  }

  return (
    <main className="bg-gray-50 text-gray-800">
      <LockScreen couple={`${data.groom.name} & ${data.bride.name}`} />
      <CoupleInfo groom={data.groom} bride={data.bride} />
      <EventInfo event={data.event} />
      <Gallery gallery={data.gallery} />
      <RSVPForm />
      <DigitalGift gift={data.gift} />
      <Footer />
    </main>
  );
}
