import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, AlertTriangle, CheckCircle2, XCircle, TrendingUp, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataRow {
  id: number;
  dni: string;
  presidente: string;
  alcalde: string;
  timestamp: string;
  hasIssue: boolean;
  issueType?: "null" | "duplicate" | "inconsistent";
}

const DataAnalysis = () => {
  const [csvData, setCsvData] = useState<DataRow[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [cleanedData, setCleanedData] = useState<DataRow[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate CSV parsing and data quality analysis
    const simulatedData: DataRow[] = [
      {
        id: 1,
        dni: "12345678",
        presidente: "p1",
        alcalde: "m1",
        timestamp: "2024-12-01 10:30:00",
        hasIssue: false,
      },
      {
        id: 2,
        dni: "",
        presidente: "p2",
        alcalde: "m2",
        timestamp: "2024-12-01 11:15:00",
        hasIssue: true,
        issueType: "null",
      },
      {
        id: 3,
        dni: "87654321",
        presidente: "p1",
        alcalde: "m3",
        timestamp: "2024-12-01 12:00:00",
        hasIssue: false,
      },
      {
        id: 4,
        dni: "12345678",
        presidente: "p3",
        alcalde: "m1",
        timestamp: "2024-12-01 13:45:00",
        hasIssue: true,
        issueType: "duplicate",
      },
      {
        id: 5,
        dni: "99887766",
        presidente: "invalid",
        alcalde: "m2",
        timestamp: "2024-12-01 14:20:00",
        hasIssue: true,
        issueType: "inconsistent",
      },
      {
        id: 6,
        dni: "55443322",
        presidente: "p2",
        alcalde: "m3",
        timestamp: "2024-12-01 15:00:00",
        hasIssue: false,
      },
    ];

    setCsvData(simulatedData);
    setShowPreview(true);
    toast.success(`Archivo "${file.name}" cargado exitosamente`);
  };

  const handleCleanData = () => {
    const cleaned = csvData.filter((row) => !row.hasIssue);
    setCleanedData(cleaned);
    toast.success(`Datos limpiados: ${cleaned.length} registros válidos`);
  };

  const handleFillMissing = (method: "media" | "mediana") => {
    const filled = csvData.map((row) => {
      if (row.issueType === "null") {
        return { ...row, dni: "00000000", hasIssue: false, issueType: undefined };
      }
      return row;
    });
    setCsvData(filled);
    toast.success(`Datos nulos reemplazados con ${method}`);
  };

  const runPredictions = () => {
    setShowPredictions(true);
    toast.success("Predicciones generadas basadas en datos históricos");
  };

  const issueCount = csvData.filter((r) => r.hasIssue).length;
  const nullCount = csvData.filter((r) => r.issueType === "null").length;
  const duplicateCount = csvData.filter((r) => r.issueType === "duplicate").length;
  const inconsistentCount = csvData.filter((r) => r.issueType === "inconsistent").length;

  // Simulated prediction data
  const predictionData = [
    { candidato: "María Elena R.", prediccion: 45, actual: 42 },
    { candidato: "Carlos Andrés M.", prediccion: 35, actual: 38 },
    { candidato: "Ana Patricia G.", prediccion: 20, actual: 20 },
  ];

  const trendData = [
    { hora: "08:00", votos: 120 },
    { hora: "10:00", votos: 450 },
    { hora: "12:00", votos: 890 },
    { hora: "14:00", votos: 1250 },
    { hora: "16:00", votos: 1580 },
    { hora: "18:00", votos: 1820 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Análisis de Datos</h2>
        <p className="text-muted-foreground">
          Cargue archivos CSV para detectar problemas, limpiar datos y generar predicciones
        </p>
      </div>

      {/* File Upload */}
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="csv-upload">Cargar Archivo CSV</Label>
            <div className="mt-2 flex items-center gap-4">
              <Input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="max-w-md"
              />
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Formato: DNI, Presidente, Alcalde, Timestamp
            </p>
          </div>
        </div>
      </Card>

      {/* Data Quality Dashboard */}
      {showPreview && (
        <>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Estado de Calidad de Datos
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Registros</p>
                    <p className="text-2xl font-bold text-primary">{csvData.length}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary/20" />
                </div>
              </Card>
              <Card className="p-4 border-destructive">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Problemas</p>
                    <p className="text-2xl font-bold text-destructive">{issueCount}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive/20" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Nulos</p>
                    <p className="text-2xl font-bold">{nullCount}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-muted-foreground/20" />
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Duplicados</p>
                    <p className="text-2xl font-bold">{duplicateCount}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-muted-foreground/20" />
                </div>
              </Card>
            </div>
          </div>

          {/* Data Preview */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Vista Previa de Datos
                </h3>
                <div className="flex gap-2">
                  <Button onClick={handleCleanData} variant="outline" size="sm">
                    Eliminar Inválidos
                  </Button>
                  <Button onClick={() => handleFillMissing("media")} variant="outline" size="sm">
                    Rellenar con Media
                  </Button>
                  <Button onClick={() => handleFillMissing("mediana")} variant="outline" size="sm">
                    Rellenar con Mediana
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Estado</TableHead>
                      <TableHead>DNI</TableHead>
                      <TableHead>Presidente</TableHead>
                      <TableHead>Alcalde</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Problema</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {csvData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          {row.hasIssue ? (
                            <AlertTriangle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          )}
                        </TableCell>
                        <TableCell className={row.issueType === "null" ? "text-destructive" : ""}>
                          {row.dni || "NULL"}
                        </TableCell>
                        <TableCell>{row.presidente}</TableCell>
                        <TableCell>{row.alcalde}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {row.timestamp}
                        </TableCell>
                        <TableCell>
                          {row.issueType && (
                            <Badge variant="destructive">
                              {row.issueType === "null" && "Nulo"}
                              {row.issueType === "duplicate" && "Duplicado"}
                              {row.issueType === "inconsistent" && "Inconsistente"}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Card>

          {/* Predictions */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Análisis Predictivo
                </h3>
                <Button onClick={runPredictions}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generar Predicciones
                </Button>
              </div>

              {showPredictions && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="font-semibold mb-4 text-card-foreground">
                      Predicción vs Resultados Actuales
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={predictionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="candidato" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="prediccion" fill="hsl(221, 83%, 53%)" name="Predicción %" />
                        <Bar dataKey="actual" fill="hsl(142, 71%, 45%)" name="Actual %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-card-foreground">
                      Tendencia de Votación por Hora
                    </h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hora" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="votos"
                          stroke="hsl(0, 72%, 51%)"
                          strokeWidth={2}
                          name="Votos Acumulados"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DataAnalysis;
