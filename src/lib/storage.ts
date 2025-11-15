import { Candidate, Vote } from "@/types/election";

// Initialize default candidates if not exists
export const initializeDefaultCandidates = () => {
  const presidents = localStorage.getItem("presidents");
  const mayors = localStorage.getItem("mayors");

  if (!presidents) {
    const defaultPresidents: Candidate[] = [
      {
        id: "p1",
        name: "María Elena Rodríguez",
        party: "Partido Progresista",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        type: "president",
        votes: 0,
      },
      {
        id: "p2",
        name: "Carlos Andrés Mendoza",
        party: "Frente Nacional",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        type: "president",
        votes: 0,
      },
      {
        id: "p3",
        name: "Ana Patricia Gómez",
        party: "Alianza Democrática",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        type: "president",
        votes: 0,
      },
    ];
    localStorage.setItem("presidents", JSON.stringify(defaultPresidents));
  }

  if (!mayors) {
    const defaultMayors: Candidate[] = [
      {
        id: "m1",
        name: "José Luis Hernández",
        party: "Movimiento Ciudadano",
        photo: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
        type: "mayor",
        votes: 0,
      },
      {
        id: "m2",
        name: "Laura Beatriz Silva",
        party: "Fuerza Local",
        photo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
        type: "mayor",
        votes: 0,
      },
      {
        id: "m3",
        name: "Roberto Fernández",
        party: "Renovación Municipal",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        type: "mayor",
        votes: 0,
      },
    ];
    localStorage.setItem("mayors", JSON.stringify(defaultMayors));
  }
};

export const getCandidates = (type: "president" | "mayor"): Candidate[] => {
  const key = type === "president" ? "presidents" : "mayors";
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const saveCandidates = (type: "president" | "mayor", candidates: Candidate[]) => {
  const key = type === "president" ? "presidents" : "mayors";
  localStorage.setItem(key, JSON.stringify(candidates));
};

export const getUserVote = (dni: string): Vote | null => {
  const votes: Vote[] = JSON.parse(localStorage.getItem("votes") || "[]");
  return votes.find((v) => v.dni === dni) || null;
};

export const saveVote = (vote: Vote) => {
  const votes: Vote[] = JSON.parse(localStorage.getItem("votes") || "[]");
  
  // Remove existing vote if any
  const filteredVotes = votes.filter((v) => v.dni !== vote.dni);
  filteredVotes.push(vote);
  
  localStorage.setItem("votes", JSON.stringify(filteredVotes));
  
  // Update vote counts
  updateVoteCounts();
};

export const updateVoteCounts = () => {
  const votes: Vote[] = JSON.parse(localStorage.getItem("votes") || "[]");
  const presidents = getCandidates("president");
  const mayors = getCandidates("mayor");

  // Reset counts
  presidents.forEach((p) => (p.votes = 0));
  mayors.forEach((m) => (m.votes = 0));

  // Count votes
  votes.forEach((vote) => {
    const president = presidents.find((p) => p.id === vote.presidentId);
    const mayor = mayors.find((m) => m.id === vote.mayorId);
    if (president) president.votes = (president.votes || 0) + 1;
    if (mayor) mayor.votes = (mayor.votes || 0) + 1;
  });

  saveCandidates("president", presidents);
  saveCandidates("mayor", mayors);
};

export const getAllVotes = (): Vote[] => {
  return JSON.parse(localStorage.getItem("votes") || "[]");
};
