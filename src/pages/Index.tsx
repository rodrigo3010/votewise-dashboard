import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Vote, UserCircle, ShieldCheck, BarChart3, Database, CheckCircle2 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Vote className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Sistema Electoral Nacional</h1>
              <p className="text-xs text-muted-foreground">Votaciones Transparentes 2024</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin/login">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Administrador
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-5xl font-bold tracking-tight">
              Elecciones Nacionales 2024
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Sistema de votación electrónica seguro y transparente para elegir Presidente y Alcaldes
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="text-lg">
                <Link to="/user/login">
                  <UserCircle className="mr-2 h-5 w-5" />
                  Ingresar como Votante
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h3 className="mb-3 text-3xl font-bold text-foreground">Sistema Seguro y Confiable</h3>
            <p className="text-lg text-muted-foreground">
              Tecnología de vanguardia para garantizar elecciones transparentes
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CheckCircle2 className="mb-4 h-12 w-12 text-success" />
              <h4 className="mb-2 text-xl font-semibold text-card-foreground">
                Votación Segura
              </h4>
              <p className="text-muted-foreground">
                Sistema de autenticación con DNI y encriptación de extremo a extremo
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <BarChart3 className="mb-4 h-12 w-12 text-primary" />
              <h4 className="mb-2 text-xl font-semibold text-card-foreground">
                Resultados en Tiempo Real
              </h4>
              <p className="text-muted-foreground">
                Visualización instantánea de resultados con gráficos interactivos
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Database className="mb-4 h-12 w-12 text-accent" />
              <h4 className="mb-2 text-xl font-semibold text-card-foreground">
                Análisis Avanzado
              </h4>
              <p className="text-muted-foreground">
                Herramientas de análisis de datos y predicciones electorales
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-6 text-center text-3xl font-bold text-foreground">
              Información Electoral
            </h3>
            <Card className="p-8">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold text-lg text-card-foreground">Fecha de Elecciones</h4>
                  <p className="text-muted-foreground">Domingo 15 de Diciembre, 2024</p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-lg text-card-foreground">Cargos a Elegir</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Presidente de la República</li>
                    <li>Alcaldes Municipales</li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-lg text-card-foreground">Requisitos para Votar</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Ser ciudadano mayor de 18 años</li>
                    <li>Contar con DNI vigente</li>
                    <li>Estar registrado en el padrón electoral</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex justify-center">
            <Vote className="h-10 w-10 text-primary" />
          </div>
          <p className="mb-2 text-sm font-semibold text-foreground">
            Sistema Electoral Nacional
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 Todos los derechos reservados. Plataforma oficial de votaciones electrónicas.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
