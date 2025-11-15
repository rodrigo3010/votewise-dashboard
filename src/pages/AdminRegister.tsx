import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessCode: "",
  });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Código de acceso simulado
    if (formData.accessCode !== "ADMIN2024") {
      toast.error("Código de acceso inválido");
      return;
    }

    // Guardar administrador
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    
    // Verificar si el email ya existe
    if (admins.some((a: any) => a.email === formData.email)) {
      toast.error("Este correo ya está registrado");
      return;
    }

    admins.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("admins", JSON.stringify(admins));
    toast.success("Registro exitoso. Por favor inicie sesión");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <ShieldCheck className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Registro de Administrador</h1>
          <p className="text-white/80">Complete el formulario para crear su cuenta</p>
        </div>

        <Card className="p-8 shadow-xl">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@electoral.gob"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita su contraseña"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessCode">Código de Acceso</Label>
              <Input
                id="accessCode"
                type="text"
                placeholder="Código proporcionado por el sistema"
                value={formData.accessCode}
                onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Use "ADMIN2024" como código de demo
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Registrarse
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Button variant="link" asChild>
              <Link to="/admin/login">¿Ya tiene cuenta? Iniciar sesión</Link>
            </Button>
            <div>
              <Button variant="ghost" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegister;
