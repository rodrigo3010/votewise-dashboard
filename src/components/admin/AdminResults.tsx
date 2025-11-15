import { Card } from "@/components/ui/card";
import { getCandidates, getAllVotes } from "@/lib/storage";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Users, TrendingUp, MapPin } from "lucide-react";

const COLORS = ["hsl(221, 83%, 53%)", "hsl(0, 72%, 51%)", "hsl(142, 71%, 45%)", "hsl(280, 72%, 51%)"];

const AdminResults = () => {
  const presidents = getCandidates("president");
  const mayors = getCandidates("mayor");
  const allVotes = getAllVotes();

  const presidentData = presidents.map((p) => ({
    name: p.name,
    votos: p.votes || 0,
  }));

  const mayorData = mayors.map((m) => ({
    name: m.name,
    votos: m.votes || 0,
  }));

  const totalVotes = allVotes.length;
  const topPresident = presidents.reduce((prev, current) =>
    (current.votes || 0) > (prev.votes || 0) ? current : prev
  );
  const topMayor = mayors.reduce((prev, current) =>
    (current.votes || 0) > (prev.votes || 0) ? current : prev
  );

  // Simulated participation by zones
  const participationData = [
    { zone: "Zona Norte", participacion: 78 },
    { zone: "Zona Sur", participacion: 82 },
    { zone: "Zona Este", participacion: 75 },
    { zone: "Zona Oeste", participacion: 88 },
    { zone: "Zona Centro", participacion: 91 },
  ];

  return (
    <div className="space-y-8">
      {/* KPIs */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Indicadores Clave</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Votos</p>
                <p className="text-3xl font-bold text-primary">{totalVotes}</p>
              </div>
              <Users className="h-12 w-12 text-primary/20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Presidente Líder</p>
                <p className="text-lg font-bold text-card-foreground">{topPresident.name}</p>
                <p className="text-sm text-muted-foreground">{topPresident.votes || 0} votos</p>
              </div>
              <TrendingUp className="h-12 w-12 text-success/20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alcalde Líder</p>
                <p className="text-lg font-bold text-card-foreground">{topMayor.name}</p>
                <p className="text-sm text-muted-foreground">{topMayor.votes || 0} votos</p>
              </div>
              <MapPin className="h-12 w-12 text-accent/20" />
            </div>
          </Card>
        </div>
      </div>

      {/* Charts */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Resultados en Tiempo Real</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* President Results */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Resultados - Presidente
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={presidentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votos" fill="hsl(221, 83%, 53%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Mayor Results */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Resultados - Alcalde
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mayorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votos" fill="hsl(0, 72%, 51%)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* President Pie Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Distribución - Presidente
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={presidentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="votos"
                >
                  {presidentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Participation by Zone */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Participación por Zona
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={participationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="participacion"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
