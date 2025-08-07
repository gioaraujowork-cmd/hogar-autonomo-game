import { useState } from "react";
import { GameCard } from "./GameCard";
import { SurvivalButton } from "./SurvivalButton";
import { Badge } from "./Badge";
import { useGameState } from "@/hooks/useGameState";
import { Target, CheckCircle, ArrowLeft } from "lucide-react";

interface SavingsModuleProps {
  onComplete: () => void;
  onBack: () => void;
}

export const SavingsModule = ({ onComplete, onBack }: SavingsModuleProps) => {
  const { saveAnswer, completeModule } = useGameState();
  const [selectedMission, setSelectedMission] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const moduleId = 5;
  
  const missions = [
    {
      id: 1,
      title: "Poner una botella PET en el WC para ahorrar agua",
      description: "Reduce el consumo de agua por descarga hasta un 30%",
      points: 80,
      savings: "€8/mes"
    },
    {
      id: 2,
      title: "Desconectar vampiros eléctricos durante la noche",
      description: "Dispositivos en standby consumen hasta 15% de tu factura",
      points: 100,
      savings: "€15/mes"
    },
    {
      id: 3,
      title: "Duchas rápidas de máximo 5 minutos",
      description: "Ahorro significativo en agua caliente y consumo hídrico",
      points: 70,
      savings: "€12/mes"
    },
    {
      id: 4,
      title: "Usar regletas con interruptor para cortar standby",
      description: "Control total del consumo fantasma de tus dispositivos",
      points: 90,
      savings: "€10/mes"
    },
    {
      id: 5,
      title: "Cocinar en lotes grandes para ahorrar energía",
      description: "Menos uso del horno y cocina, más eficiencia energética",
      points: 75,
      savings: "€7/mes"
    }
  ];

  const handleMissionSelect = (missionId: number) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission) {
      setSelectedMission(missionId);
      saveAnswer(moduleId, 1, mission.points);
      
      setTimeout(() => {
        completeModule(moduleId);
        setIsCompleted(true);
      }, 1500);
    }
  };

  if (isCompleted) {
    const selectedMissionData = missions.find(m => m.id === selectedMission);
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-success/10 p-4">
        <div className="container mx-auto max-w-2xl pt-8">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al dashboard
          </button>

          <GameCard variant="challenge" className="text-center">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-success/20 rounded-full flex items-center justify-center">
                <Target className="w-10 h-10 text-success" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Misiones de Ahorro Completado
                </h2>
                <Badge variant="success" size="lg" className="mb-4">
                  ¡Misión Aceptada!
                </Badge>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-lg text-foreground font-medium mb-2">
                  Solo quien actúa hoy estará realmente preparado mañana
                </p>
                <p className="text-sm text-muted-foreground">
                  Has elegido: {selectedMissionData?.title}
                </p>
                <p className="text-sm text-success font-semibold mt-2">
                  Ahorro estimado: {selectedMissionData?.savings}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">
                  +{selectedMissionData?.points} puntos obtenidos
                </span>
              </div>

              <SurvivalButton onClick={onComplete} className="w-full">
                Continuar al Siguiente Módulo
              </SurvivalButton>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-success/5 to-success/10 p-4">
      <div className="container mx-auto max-w-2xl pt-8">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al dashboard
        </button>

        <GameCard variant="challenge">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Módulo: Misiones de Ahorro
              </h2>
              <p className="text-sm text-muted-foreground">
                Elige UNA misión que te comprometes a hacer HOY
              </p>
            </div>

            {/* Instruction */}
            <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-sm text-foreground font-medium text-center">
                💡 Marca una sola misión que te comprometes a hacer HOY. 
                Cada acción suma puntos al progreso general.
              </p>
            </div>

            {/* Missions */}
            <div className="space-y-3">
              {missions.map((mission) => (
                <SurvivalButton
                  key={mission.id}
                  variant={selectedMission === mission.id ? "primary" : "outline"}
                  onClick={() => handleMissionSelect(mission.id)}
                  className="w-full text-left p-4 h-auto whitespace-normal"
                  disabled={selectedMission !== null}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{mission.title}</h4>
                      <Badge variant="outline" size="sm">
                        {mission.savings}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {mission.description}
                    </p>
                    <div className="text-xs text-primary font-medium">
                      +{mission.points} puntos
                    </div>
                  </div>
                </SurvivalButton>
              ))}
            </div>

            {selectedMission && (
              <div className="text-center">
                <p className="text-sm text-success font-medium">
                  ✅ Misión seleccionada. Procesando...
                </p>
              </div>
            )}
          </div>
        </GameCard>
      </div>
    </div>
  );
};