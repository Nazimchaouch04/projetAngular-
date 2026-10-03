export interface Conference {
  name: string;
  date: string;
  location: string;
}

export interface ConferenceListing {
  title: string;
  description: string;
  date: string;
  place: string;
  maxParticipants: number;
  nbParticipants: number;
}
