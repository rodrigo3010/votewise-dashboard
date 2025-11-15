import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCandidates } from "@/lib/storage";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Vote as VoteType } from "@/types/election";

interface ResultsChartsProps {
  userVote: VoteType | null;
}

const COLORS = ["hsl(221, 83%, 53%)", "hsl(0, 72%, 51%)", "hsl(142, 71%, 45%)", "hsl(280, 72%, 51%)"];

const ResultsCharts = ({ userVote }: ResultsChartsProps) => {
  const presidents = getCandidates("president");
  const mayors = getCandidates("mayor");

  const votedPresident = presidents.find((p) => p.id === userVote?.presidentId);
  const votedMayor = mayors.find((m) => m.id === userVote?.mayorId);

  const presidentData = presidents.map((p) => ({
    name: p.name,
    votos: p.votes || 0,
  }));

  const mayorData = mayors.map((m) => ({
    name: m.name,
    votos: m.votes || 0,
  }));

  const totalPresidentVotes = presidents.reduce((sum, p) => sum + (p.votes || 0), 0);
  const totalMayorVotes = mayors.reduce((sum, m) => sum + (m.votes || 0), 0);

  return (
    <div className="space-y-8">
      {/* User's Votes */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Sus Votos Registrados</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">Presidente</h3>
            {votedPresident && (
              <div className="flex items-center gap-4">
                <img
                  src={votedPresident.photo}
                  alt={votedPresident.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-card-foreground">{votedPresident.name}</p>
                  <Badge variant="secondary">{votedPresident.party}</Badge>
                </div>
              </div>
            )}
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">Alcalde</h3>
            {votedMayor && (
              <div className="flex items-center gap-4">
                <img
                  src={votedMayor.photo}
                  alt={votedMayor.name}
                  className="h-20 w-20 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-card-foreground">{votedMayor.name}</p>
                  <Badge variant="secondary">{votedMayor.party}</Badge>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Results Charts */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Resultados Generales</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* President Bar Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Resultados - Presidente
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Total de votos: {totalPresidentVotes}</p>
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

          {/* Mayor Bar Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Resultados - Alcalde
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Total de votos: {totalMayorVotes}</p>
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

          {/* Mayor Pie Chart */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-card-foreground">
              Distribución - Alcalde
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mayorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="votos"
                >
                  {mayorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsCharts;
