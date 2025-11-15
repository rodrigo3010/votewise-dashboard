export interface Candidate {
  id: string;
  name: string;
  party: string;
  photo: string;
  type: "president" | "mayor";
  votes?: number;
}

export interface Vote {
  dni: string;
  presidentId: string;
  mayorId: string;
  timestamp: string;
}

export interface AdminData {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}
