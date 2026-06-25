export interface TimelineEvent {
  date: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  venue: string;
  district: string;
  address: string;
  zip: string;
  city: string;
  time: string | null;
  mapsUrl: string | null;
  icon: string;
}

export interface Credit {
  role: string;
  name: string;
}

export interface GuestInfo {
  title: string;
  description: string;
  icon: string;
}
