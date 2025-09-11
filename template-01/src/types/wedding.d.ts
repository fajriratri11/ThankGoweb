export interface EventDetail {
  date: string;
  time: string;
  location: string;
}

export interface EventInfo {
  akad: EventDetail;
  resepsi: EventDetail;
}

export interface Story {
  title: string;
  desc: string;
}

export interface Gift {
  bank: string;
  account: string;
  name: string;
}

export interface WeddingData {
  music: string;
  groom: { name: string; parent: string };
  bride: { name: string; parent: string };
  event: EventInfo;
  story: Story[];
  gallery: string[];
  gift: Gift;
}
