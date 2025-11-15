import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Candidate } from "@/types/election";
import { Vote, CheckCircle2 } from "lucide-react";

interface CandidateCardProps {
  candidate: Candidate;
  onVote?: (candidateId: string) => void;
  isVoted?: boolean;
  disabled?: boolean;
  showVotes?: boolean;
}

const CandidateCard = ({
  candidate,
  onVote,
  isVoted,
  disabled,
  showVotes,
}: CandidateCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${
      isVoted ? "ring-2 ring-success" : ""
    }`}>
      <div className="relative">
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="h-48 w-full object-cover"
        />
        {isVoted && (
          <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-2">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-lg text-card-foreground mb-1">{candidate.name}</h3>
          <Badge variant="secondary">{candidate.party}</Badge>
        </div>
        
        {showVotes && (
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold">Votos: </span>
            <span className="text-primary font-bold text-lg">{candidate.votes || 0}</span>
          </div>
        )}

        {onVote && (
          <Button
            onClick={() => onVote(candidate.id)}
            disabled={disabled}
            className="w-full"
            variant={isVoted ? "secondary" : "default"}
          >
            {isVoted ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Voto Registrado
              </>
            ) : (
              <>
                <Vote className="mr-2 h-4 w-4" />
                Votar
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default CandidateCard;
