import { useState } from "react";
import { GameCard } from "./GameCard";
import { SurvivalButton } from "./SurvivalButton";
import { Badge } from "./Badge";
import { useGameState } from "@/hooks/useGameState";
import { Utensils, CheckCircle, ArrowLeft } from "lucide-react";

interface FoodModuleProps {
  onComplete: () => void;
  onBack: () => void;
}

export const FoodModule = ({ onComplete, onBack }: FoodModuleProps) => {
  const { saveAnswer, completeModule } = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  
  const moduleId = 3;
  
  const questions = [
    {
      id: 1,
      question: "¿Cuántos días podrías alimentarte si se va la luz?",
      options: [
        { text: "Tengo comida no perecedera para al menos una semana", points: 100 },
        { text: "Tengo latas y arroz para unos 2-3 días", points: 50 },
        { text: "Compro todo fresco, no tengo reservas", points: 10 }
      ]
    },
    {
      id: 2,
      question: "¿Tienes algún método alternativo de cocción?",
      options: [
        { text: "Sí, uso fogón de gas o cocina solar", points: 100 },
        { text: "Podría cocinar con leña o una barbacoa improvisada", points: 50 },
        { text: "No tengo ninguna alternativa si se va la luz", points: 10 }
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
        message: "Podrías alimentar a 2 personas por más de 5 días",
        color: "success"
      };
    } else if (totalPoints >= 80) {
      return {
        level: "Media",
        message: "Tu despensa puede sostenerte un tiempo limitado",
        color: "warning"
      };
    } else {
      return {
        level: "Baja",
        message: "En 48h estarías sin opciones de comida",
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
      <div className="min-h-screen bg-gradient-to-br from-background via-warning/5 to-warning/10 p-4">
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
              <div className="mx-auto w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center">
                <Utensils className="w-10 h-10 text-warning" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Alimentos Autónomos Completado
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
    <div className="min-h-screen bg-gradient-to-br from-background via-warning/5 to-warning/10 p-4">
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
              <div className="mx-auto w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-4">
                <Utensils className="w-8 h-8 text-warning" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Módulo: Alimentos Autónomos
              </h2>
              <p className="text-sm text-muted-foreground">
                Pregunta {currentQuestion} de {totalQuestions}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
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