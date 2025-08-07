import { useState } from "react";
import { GameCard } from "./GameCard";
import { SurvivalButton } from "./SurvivalButton";
import { Badge } from "./Badge";
import { useGameState } from "@/hooks/useGameState";
import { AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";

interface CrisisSimulatorProps {
  onComplete: () => void;
  onBack: () => void;
}

export const CrisisSimulator = ({ onComplete, onBack }: CrisisSimulatorProps) => {
  const { saveAnswer, completeModule } = useGameState();
  const [currentScenario, setCurrentScenario] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  
  const moduleId = 6;
  
  const scenarios = [
    {
      id: 1,
      title: "24h sin agua",
      description: "Se ha cortado el suministro de agua en toda la ciudad y no se sabe cuándo volverá",
      question: "¿Cuál es tu primera acción?",
      options: [
        { text: "Buscar en fuentes públicas", points: 30, consequence: "Encuentras agua, pero no es potable y pierdes tiempo valioso" },
        { text: "Usar reservas almacenadas", points: 100, consequence: "Tu preparación previa te permite gestionar la crisis con tranquilidad" },
        { text: "Pedir a vecinos", points: 50, consequence: "Consigues algo de agua, pero dependes de otros y generas conflictos" }
      ]
    },
    {
      id: 2,
      title: "72h sin electricidad",
      description: "Un apagón generalizado ha dejado sin energía toda la región durante días",
      question: "¿Cómo manejas la situación?",
      options: [
        { text: "Usar kit de emergencia", points: 100, consequence: "Tu kit te mantiene operativo y seguro durante toda la crisis" },
        { text: "Improvisar con velas", points: 50, consequence: "Te las arreglas, pero con riesgo de incendios y poca eficiencia" },
        { text: "Salir a buscar energía", points: 20, consequence: "Pierdes tiempo y energía buscando soluciones externas sin éxito" }
      ]
    },
    {
      id: 3,
      title: "Ola de calor de 7 días",
      description: "Temperaturas extremas de 45°C durante una semana, con cortes de energía frecuentes",
      question: "¿Cuál es tu estrategia?",
      options: [
        { text: "Proteger la casa con aislamiento", points: 100, consequence: "Tu hogar se mantiene fresco y habitable durante toda la ola de calor" },
        { text: "Dormir fuera de casa", points: 40, consequence: "Encuentras refugio temporal, pero sin comodidad ni seguridad" },
        { text: "Usar ventilador solar", points: 80, consequence: "Tu equipo solar te proporciona alivio constante y sostenible" }
      ]
    }
  ];

  const handleAnswer = (points: number, consequence: string) => {
    const newAnswers = { ...answers, [currentScenario]: points };
    setAnswers(newAnswers);
    saveAnswer(moduleId, currentScenario, points);

    // Mostrar consecuencia temporalmente
    setTimeout(() => {
      if (currentScenario < scenarios.length) {
        setCurrentScenario(currentScenario + 1);
      } else {
        // Completar módulo
        completeModule(moduleId);
        setIsCompleted(true);
      }
    }, 2000);
  };

  const getFeedback = () => {
    const totalPoints = Object.values(answers).reduce((sum, points) => sum + points, 0);
    
    if (totalPoints >= 250) {
      return {
        level: "Alta",
        message: "Has superado con inteligencia las crisis simuladas",
        color: "success"
      };
    } else if (totalPoints >= 150) {
      return {
        level: "Media",
        message: "Te faltan recursos, pero tienes buen criterio",
        color: "warning"
      };
    } else {
      return {
        level: "Baja",
        message: "Tu hogar no resistiría sin intervención urgente",
        color: "destructive"
      };
    }
  };

  const currentScenarioData = scenarios.find(s => s.id === currentScenario);
  const totalScenarios = scenarios.length;

  if (isCompleted) {
    const feedback = getFeedback();
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-destructive/10 p-4 animate-fade-in">
        <div className="container mx-auto max-w-2xl pt-8">
          <button 
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al dashboard
          </button>

          <GameCard variant="challenge" className="text-center animate-scale-in">
            <div className="space-y-6">
              <div className="mx-auto w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Simulador de Crisis Completado
                </h2>
                <Badge variant={feedback.color as any} size="lg" className="mb-4">
                  Nivel: {feedback.level}
                </Badge>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-lg text-foreground font-medium">
                  {feedback.message}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">
                  +{Object.values(answers).reduce((sum, points) => sum + points, 0)} puntos obtenidos
                </span>
              </div>

              <SurvivalButton onClick={onComplete} className="w-full hover-scale">
                Continuar al Desafío Final
              </SurvivalButton>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-destructive/10 p-4 animate-fade-in">
      <div className="container mx-auto max-w-2xl pt-8">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al dashboard
        </button>

        <GameCard variant="challenge" className="animate-scale-in">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Simulador de Crisis
              </h2>
              <p className="text-sm text-muted-foreground">
                Escenario {currentScenario} de {totalScenarios}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-destructive h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentScenario / totalScenarios) * 100}%` }}
              />
            </div>

            {/* Scenario */}
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <h3 className="text-lg font-bold text-destructive mb-2">
                  🚨 {currentScenarioData?.title}
                </h3>
                <p className="text-sm text-foreground">
                  {currentScenarioData?.description}
                </p>
              </div>

              <h4 className="text-lg font-semibold text-foreground text-center">
                {currentScenarioData?.question}
              </h4>

              <div className="space-y-3">
                {currentScenarioData?.options.map((option, index) => (
                  <SurvivalButton
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(option.points, option.consequence)}
                    className="w-full text-left p-4 h-auto whitespace-normal hover-scale"
                  >
                    {option.text}
                  </SurvivalButton>
                ))}
              </div>
            </div>
          </div>
        </GameCard>
      </div>
    </div>
  );
};