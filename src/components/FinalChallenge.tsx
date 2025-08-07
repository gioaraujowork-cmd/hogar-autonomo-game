import { useState } from "react";
import { GameCard } from "./GameCard";
import { SurvivalButton } from "./SurvivalButton";
import { Badge } from "./Badge";
import { useGameState } from "@/hooks/useGameState";
import { Trophy, CheckCircle, ArrowLeft, Clock } from "lucide-react";

interface FinalChallengeProps {
  onComplete: () => void;
  onBack: () => void;
}

export const FinalChallenge = ({ onComplete, onBack }: FinalChallengeProps) => {
  const { saveAnswer, completeModule } = useGameState();
  const [currentDecision, setCurrentDecision] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showConsequence, setShowConsequence] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const moduleId = 7;
  
  const decisions = [
    {
      id: 1,
      context: "Lunes 7:30 AM. Te despiertas sin electricidad. No hay agua. El móvil no tiene señal.",
      question: "¿A quién intentas contactar primero?",
      options: [
        { text: "Buscar información en radio a pilas", points: 100, consequence: "Obtienes información oficial y te mantienes actualizado" },
        { text: "Ir a casa de vecinos para preguntar", points: 60, consequence: "Confirmas que es un problema generalizado, pero pierdes tiempo" },
        { text: "Esperar a que vuelva la señal del móvil", points: 20, consequence: "Pierdes horas valiosas sin información ni acción" }
      ]
    },
    {
      id: 2,
      context: "Confirmas que es una crisis generalizada que puede durar días.",
      question: "¿Qué haces con el agua restante que tienes?",
      options: [
        { text: "Racionarla según un plan establecido", points: 100, consequence: "Tu agua dura exactamente lo necesario para toda la crisis" },
        { text: "Usarla con moderación pero sin plan", points: 50, consequence: "Te queda agua, pero con incertidumbre sobre su duración" },
        { text: "Usar normalmente, ya encontrarás más", points: 10, consequence: "Te quedas sin agua al segundo día y entras en pánico" }
      ]
    },
    {
      id: 3,
      context: "Es mediodía y la situación empeora. Hay disturbios en algunas zonas.",
      question: "¿Sales de casa o te quedas?",
      options: [
        { text: "Te quedas y proteges tu hogar", points: 100, consequence: "Tu hogar se mantiene seguro y tus recursos intactos" },
        { text: "Sales solo para buscar suministros esenciales", points: 70, consequence: "Consigues algunos recursos pero con riesgo y estrés" },
        { text: "Sales a buscar refugio en otro lugar", points: 30, consequence: "Abandonas tus recursos y te expones a más peligros" }
      ]
    },
    {
      id: 4,
      context: "Segunda noche. La temperatura baja y no hay calefacción.",
      question: "¿Cómo mantienes el calor?",
      options: [
        { text: "Usar mantas térmicas y ropa de abrigo", points: 100, consequence: "Te mantienen caliente y conservas energía corporal" },
        { text: "Hacer ejercicio y moverte constantemente", points: 60, consequence: "Te mantienes caliente pero gastas energía y agua" },
        { text: "Agruparse con vecinos en una casa", points: 40, consequence: "Compartís calor pero también recursos limitados" }
      ]
    },
    {
      id: 5,
      context: "Tercer día. Tus reservas están bajando y aún no hay solución.",
      question: "¿Cuál es tu estrategia ahora?",
      options: [
        { text: "Seguir tu plan de emergencia establecido", points: 100, consequence: "Tu preparación previa te permite mantener la calma y eficiencia" },
        { text: "Improvisar y adaptar sobre la marcha", points: 60, consequence: "Te adaptas bien pero con más estrés y algunos errores" },
        { text: "Buscar ayuda externa desesperadamente", points: 20, consequence: "Dependes de otros y comprometes tu seguridad personal" }
      ]
    }
  ];

  const handleDecision = (points: number, consequence: string) => {
    const newAnswers = { ...answers, [currentDecision]: points };
    setAnswers(newAnswers);
    saveAnswer(moduleId, currentDecision, points);
    
    // Mostrar consecuencia
    setShowConsequence(consequence);
    
    setTimeout(() => {
      setShowConsequence(null);
      if (currentDecision < decisions.length) {
        setCurrentDecision(currentDecision + 1);
      } else {
        // Completar módulo
        completeModule(moduleId);
        setIsCompleted(true);
      }
    }, 3000);
  };

  const getFeedback = () => {
    const totalPoints = Object.values(answers).reduce((sum, points) => sum + points, 0);
    
    if (totalPoints >= 400) {
      return {
        level: "Alta",
        message: "Sobreviviste como un experto",
        color: "success"
      };
    } else if (totalPoints >= 250) {
      return {
        level: "Media",
        message: "Sobreviviste con dificultades, pero aprendiste",
        color: "warning"
      };
    } else {
      return {
        level: "Baja",
        message: "No lograste completar el desafío... pero ahora sabes qué mejorar",
        color: "destructive"
      };
    }
  };

  const currentDecisionData = decisions.find(d => d.id === currentDecision);
  const totalDecisions = decisions.length;

  if (isCompleted) {
    const feedback = getFeedback();
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-warning/5 to-warning/10 p-4 animate-fade-in">
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
              <div className="mx-auto w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-warning" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Desafío Final Completado
                </h2>
                <Badge variant={feedback.color as any} size="lg" className="mb-4">
                  Resultado: {feedback.level}
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
                Ver Resultado Final
              </SurvivalButton>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  if (showConsequence) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-warning/5 to-warning/10 p-4 animate-fade-in">
        <div className="container mx-auto max-w-2xl pt-8">
          <GameCard variant="challenge" className="text-center animate-scale-in">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-warning animate-pulse" />
              </div>
              
              <h3 className="text-lg font-bold text-foreground">
                Consecuencia de tu decisión:
              </h3>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-foreground">
                  {showConsequence}
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Continuando en {3}...
              </p>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-warning/5 to-warning/10 p-4 animate-fade-in">
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
              <div className="mx-auto w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Desafío Final - Gamebook Interactivo
              </h2>
              <p className="text-sm text-muted-foreground">
                Decisión {currentDecision} de {totalDecisions}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentDecision / totalDecisions) * 100}%` }}
              />
            </div>

            {/* Story Context */}
            <div className="space-y-4">
              <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-sm text-foreground italic">
                  {currentDecisionData?.context}
                </p>
              </div>

              <h3 className="text-lg font-semibold text-foreground text-center">
                {currentDecisionData?.question}
              </h3>

              <div className="space-y-3">
                {currentDecisionData?.options.map((option, index) => (
                  <SurvivalButton
                    key={index}
                    variant="outline"
                    onClick={() => handleDecision(option.points, option.consequence)}
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