import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, LogOut, Users, Building2, BarChart3, Database } from "lucide-react";
import { toast } from "sonner";
import CandidateManagement from "@/components/admin/CandidateManagement";
import AdminResults from "@/components/admin/AdminResults";
import DataAnalysis from "@/components/admin/DataAnalysis";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    const email = localStorage.getItem("adminEmail");

    if (!loggedIn || !email) {
      navigate("/admin/login");
      return;
    }

    setAdminEmail(email);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    toast.info("Sesión administrativa cerrada");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Panel de Administración</h1>
              <p className="text-xs text-muted-foreground">{adminEmail}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="presidents" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4">
            <TabsTrigger value="presidents">
              <Users className="mr-2 h-4 w-4" />
              Presidentes
            </TabsTrigger>
            <TabsTrigger value="mayors">
              <Building2 className="mr-2 h-4 w-4" />
              Alcaldes
            </TabsTrigger>
            <TabsTrigger value="results">
              <BarChart3 className="mr-2 h-4 w-4" />
              Resultados
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <Database className="mr-2 h-4 w-4" />
              Análisis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="presidents">
            <CandidateManagement type="president" />
          </TabsContent>

          <TabsContent value="mayors">
            <CandidateManagement type="mayor" />
          </TabsContent>

          <TabsContent value="results">
            <AdminResults />
          </TabsContent>

          <TabsContent value="analysis">
            <DataAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
