import { useState } from "react";
import { GameCard } from "./GameCard";
import { SurvivalButton } from "./SurvivalButton";
import { Badge } from "./Badge";
import { useGameState } from "@/hooks/useGameState";
import { Zap, CheckCircle, ArrowLeft } from "lucide-react";

interface EnergyModuleProps {
  onComplete: () => void;
  onBack: () => void;
}

export const EnergyModule = ({ onComplete, onBack }: EnergyModuleProps) => {
  const { saveAnswer, completeModule } = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  
  const moduleId = 4;
  
  const questions = [
    {
      id: 1,
      question: "¿Tienes alguna fuente de energía de respaldo?",
      options: [
        { text: "Sí, tengo panel solar portátil o generador", points: 100 },
        { text: "Solo uso power bank o linterna de pilas", points: 50 },
        { text: "No tengo nada, dependo del enchufe", points: 10 }
      ]
    },
    {
      id: 2,
      question: "¿Estás preparado para apagones prolongados?",
      options: [
        { text: "Sí, tengo velas, pilas, linternas y rutina establecida", points: 100 },
        { text: "Tengo algunas cosas, pero no un plan completo", points: 50 },
        { text: "No, nunca me he preparado para eso", points: 10 }
      ]
    }
  ];

  const handleAnswer = (points: number) => {
    const newAnswers = { ...answers, [currentQuestion]: points };
    setAnswers(newAnswers);
    saveAnswer(moduleId, currentQuestion, points);

    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Completar módulo e mostrar feedback
      setTimeout(() => {
        completeModule(moduleId);
        onComplete();
      }, 1000);
    }
  };

  const getFeedback = () => {
    const totalPoints = Object.values(answers).reduce((sum, points) => sum + points, 0);
    
    if (totalPoints >= 150) {
      return {
        level: "Alta",
        message: "Tienes un nivel excelente de autonomía energética",
        color: "success"
      };
    } else if (totalPoints >= 80) {
      return {
        level: "Media",
        message: "Podrías resistir algunas horas, pero nada serio",
        color: "warning"
      };
    } else {
      return {
        level: "Baja",
        message: "Tu casa quedaría en completa oscuridad",
        color: "destructive"
      };
    }
  };

  const currentQ = questions.find(q => q.id === currentQuestion);
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestion > totalQuestions;

  if (isLastQuestion) {
    const feedback = getFeedback();
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-accent/10 p-4">
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
              <div className="mx-auto w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center">
                <Zap className="w-10 h-10 text-accent" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Energía Autónoma Completado
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
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-accent/10 p-4">
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
              <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Módulo: Energía Autónoma
              </h2>
              <p className="text-sm text-muted-foreground">
                Pregunta {currentQuestion} de {totalQuestions}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground text-center">
                {currentQ?.question}
              </h3>

              <div className="space-y-3">
                {currentQ?.options.map((option, index) => (
                  <SurvivalButton
                    key={index}
                    variant="outline"
                    onClick={() => handleAnswer(option.points)}
                    className="w-full text-left p-4 h-auto whitespace-normal"
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