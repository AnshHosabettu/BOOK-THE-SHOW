export interface EventType {
  id: string;
  title: string;
  description?: string;
  image: string;
  category: string;
  date: string;
  time?: string;
  venue: string;
  price?: string;
  rating?: string;
  language?: string;
  duration?: string;
  availableDates?: string[];
  availableTimes?: string[];
  cast?: {
    name: string;
    role: string;
    image?: string;
  }[];
  crew?: {
    name: string;
    role: string;
    image?: string;
  }[];
  reviews?: {
    name: string;
    rating: number;
    date: string;
    content: string;
    avatarUrl?: string;
  }[];
}