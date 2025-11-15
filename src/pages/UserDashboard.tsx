import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Vote, LogOut, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import CandidateCard from "@/components/CandidateCard";
import ResultsCharts from "@/components/ResultsCharts";
import { initializeDefaultCandidates, getCandidates, getUserVote, saveVote } from "@/lib/storage";
import { Candidate } from "@/types/election";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [presidents, setPresidents] = useState<Candidate[]>([]);
  const [mayors, setMayors] = useState<Candidate[]>([]);
  const [userVote, setUserVote] = useState<any>(null);
  const [userDNI, setUserDNI] = useState("");

  useEffect(() => {
    // Check authentication
    const loggedIn = localStorage.getItem("userLoggedIn");
    const dni = localStorage.getItem("userDNI");
    
    if (!loggedIn || !dni) {
      navigate("/user/login");
      return;
    }

    setUserDNI(dni);
    initializeDefaultCandidates();
    loadData();
  }, [navigate]);

  const loadData = () => {
    const dni = localStorage.getItem("userDNI") || "";
    setPresidents(getCandidates("president"));
    setMayors(getCandidates("mayor"));
    setUserVote(getUserVote(dni));
  };

  const handleVote = (candidateId: string, type: "president" | "mayor") => {
    if (userVote) {
      toast.error("Ya ha emitido su voto. No puede votar nuevamente.");
      return;
    }

    const newVote = {
      dni: userDNI,
      presidentId: type === "president" ? candidateId : (userVote?.presidentId || ""),
      mayorId: type === "mayor" ? candidateId : (userVote?.mayorId || ""),
      timestamp: new Date().toISOString(),
    };

    // Check if both votes are complete
    if (newVote.presidentId && newVote.mayorId) {
      saveVote(newVote);
      toast.success("¡Voto registrado exitosamente!");
      loadData();
    } else {
      // Temporarily store partial vote
      setUserVote(newVote);
      toast.success(`Voto para ${type === "president" ? "Presidente" : "Alcalde"} registrado. Complete su votación.`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("userDNI");
    toast.info("Sesión cerrada");
    navigate("/");
  };

  const hasVotedPresident = userVote?.presidentId;
  const hasVotedMayor = userVote?.mayorId;
  const hasCompletedVoting = hasVotedPresident && hasVotedMayor;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Vote className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Panel de Votación</h1>
              <p className="text-xs text-muted-foreground">DNI: {userDNI}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="vote" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="vote">
              <Vote className="mr-2 h-4 w-4" />
              Postulaciones
            </TabsTrigger>
            <TabsTrigger value="results" disabled={!hasCompletedVoting}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Mis Resultados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vote" className="space-y-8">
            {hasCompletedVoting && (
              <Card className="p-4 bg-success/10 border-success">
                <p className="text-center text-success-foreground font-semibold">
                  ✓ Ha completado su votación. Sus votos han sido registrados correctamente.
                </p>
              </Card>
            )}

            {/* President Voting */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Candidatos a Presidente
                </h2>
                <p className="text-muted-foreground">
                  Seleccione un candidato para Presidente de la República
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {presidents.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onVote={(id) => handleVote(id, "president")}
                    isVoted={userVote?.presidentId === candidate.id}
                    disabled={hasCompletedVoting}
                  />
                ))}
              </div>
            </div>

            {/* Mayor Voting */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Candidatos a Alcalde
                </h2>
                <p className="text-muted-foreground">
                  Seleccione un candidato para Alcalde Municipal
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mayors.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onVote={(id) => handleVote(id, "mayor")}
                    isVoted={userVote?.mayorId === candidate.id}
                    disabled={hasCompletedVoting}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results">
            <ResultsCharts userVote={userVote} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
