import { getWeddingData } from "@/lib/getweddingData";
import LockScreen from "@/components/LockScreen";
import CoupleInfo from "@/components/CoupleInfo";
import EventInfo from "@/components/EventInfo";
import LoveStory from "@/components/LoveStory";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import DigitalGift from "@/components/DigitalGift";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";

export default function WeddingPage({ params }: { params: { slug: string } }) {
  const data = getWeddingData(params.slug);

  return (
    <div className="max-w-md mx-auto shadow-lg">
      <AudioPlayer music={data.music} />
      <LockScreen couple={`${data.groom.name} & ${data.bride.name}`} />
      <CoupleInfo groom={data.groom} bride={data.bride} />
      <EventInfo event={data.event} />
      <LoveStory story={data.story} />
      <Gallery gallery={data.gallery} />
      <RSVPForm />
      <DigitalGift gift={data.gift} />
      <Footer />
    </div>
  );
}
