import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Candidate } from "@/types/election";
import { getCandidates, saveCandidates } from "@/lib/storage";

interface CandidateManagementProps {
  type: "president" | "mayor";
}

const CandidateManagement = ({ type }: CandidateManagementProps) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    photo: "",
  });

  useEffect(() => {
    loadCandidates();
  }, [type]);

  const loadCandidates = () => {
    setCandidates(getCandidates(type));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.party || !formData.photo) {
      toast.error("Complete todos los campos");
      return;
    }

    const updatedCandidates = [...candidates];

    if (editingCandidate) {
      const index = updatedCandidates.findIndex((c) => c.id === editingCandidate.id);
      updatedCandidates[index] = {
        ...editingCandidate,
        ...formData,
      };
      toast.success("Candidato actualizado");
    } else {
      const newCandidate: Candidate = {
        id: `${type[0]}${Date.now()}`,
        name: formData.name,
        party: formData.party,
        photo: formData.photo,
        type,
        votes: 0,
      };
      updatedCandidates.push(newCandidate);
      toast.success("Candidato agregado");
    }

    saveCandidates(type, updatedCandidates);
    loadCandidates();
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setFormData({
      name: candidate.name,
      party: candidate.party,
      photo: candidate.photo,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("¿Está seguro de eliminar este candidato?")) return;

    const updatedCandidates = candidates.filter((c) => c.id !== id);
    saveCandidates(type, updatedCandidates);
    loadCandidates();
    toast.success("Candidato eliminado");
  };

  const resetForm = () => {
    setFormData({ name: "", party: "", photo: "" });
    setEditingCandidate(null);
  };

  const title = type === "president" ? "Presidentes" : "Alcaldes";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Gestión de {title}</h2>
          <p className="text-muted-foreground">Administre los candidatos para {title.toLowerCase()}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Candidato
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCandidate ? "Editar" : "Agregar"} Candidato
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: María Rodríguez"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="party">Partido Político</Label>
                <Input
                  id="party"
                  value={formData.party}
                  onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                  placeholder="Ej: Partido Progresista"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">URL de Foto</Label>
                <Input
                  id="photo"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Use una URL de imagen (recomendado: 400x400px)
                </p>
              </div>
              <Button type="submit" className="w-full">
                {editingCandidate ? "Actualizar" : "Agregar"} Candidato
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Partido</TableHead>
              <TableHead>Votos</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No hay candidatos registrados
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.party}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-primary">{candidate.votes || 0}</span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(candidate)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(candidate.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CandidateManagement;
