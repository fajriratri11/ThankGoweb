import { getWeddingData } from "@/lib/getweddingData";
import LockScreen from "@/components/LockScreen";
import CoupleInfo from "@/components/CoupleInfo";
import EventInfo from "@/components/EventInfo";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import DigitalGift from "@/components/DigitalGift";
import Footer from "@/components/Footer";

export default function WeddingPage({ params }: { params: { slug: string } }) {
  const data = getWeddingData(params.slug);

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
