import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Vote, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const UserLogin = () => {
  const [dni, setDni] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (dni.length !== 8 || !/^\d+$/.test(dni)) {
      toast.error("Por favor ingrese un DNI válido de 8 dígitos");
      return;
    }

    // Simular validación del DNI
    localStorage.setItem("userDNI", dni);
    localStorage.setItem("userLoggedIn", "true");
    toast.success("Acceso autorizado");
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Vote className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Acceso de Votante</h1>
          <p className="text-white/80">Ingrese su DNI para acceder al sistema</p>
        </div>

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dni">Documento Nacional de Identidad (DNI)</Label>
              <Input
                id="dni"
                type="text"
                placeholder="12345678"
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
                maxLength={8}
                className="text-lg"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Ingrese su DNI de 8 dígitos sin puntos ni espacios
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Ingresar al Sistema
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            ¿Problemas para acceder? Contacte a su centro de votación
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
