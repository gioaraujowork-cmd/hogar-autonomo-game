import { useState } from "react";
import { SurvivalButton } from "./SurvivalButton";
import { GameCard } from "./GameCard";
import { Badge } from "./Badge";
import { Shield, Droplets, Zap, Clock } from "lucide-react";

interface InitialChallengeProps {
  onComplete: (email: string, survivalHours: number) => void;
}

interface QuestionData {
  water: number;
  food: number;
  energy: number;
}

export const InitialChallenge = ({ onComplete }: InitialChallengeProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionData>({ water: 0, food: 0, energy: 0 });
  const [email, setEmail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);

  const questions = [
    {
      id: "water",
      title: "💧 Reservas de Agua",
      question: "¿Cuántos litros de agua potable tienes almacenados en casa?",
      icon: <Droplets className="w-6 h-6 text-secondary" />,
      options: [
        { label: "Ninguno o menos de 5L", value: 4, hours: 4 },
        { label: "5-15 litros", value: 12, hours: 12 },
        { label: "15-30 litros", value: 24, hours: 24 },
        { label: "Más de 30 litros", value: 48, hours: 48 }
      ]
    },
    {
      id: "food",
      title: "🥫 Reservas de Comida",
      question: "¿Cuántos días podrías alimentarte sin ir de compras?",
      icon: <Shield className="w-6 h-6 text-primary" />,
      options: [
        { label: "1 día o menos", value: 8, hours: 8 },
        { label: "2-3 días", value: 24, hours: 24 },
        { label: "4-7 días", value: 48, hours: 48 },
        { label: "Más de una semana", value: 72, hours: 72 }
      ]
    },
    {
      id: "energy",
      title: "⚡ Energía de Emergencia",
      question: "¿Qué tienes para emergencias eléctricas?",
      icon: <Zap className="w-6 h-6 text-accent" />,
      options: [
        { label: "Nada específico", value: 2, hours: 2 },
        { label: "Solo linterna o móvil", value: 8, hours: 8 },
        { label: "Powerbank + linterna", value: 16, hours: 16 },
        { label: "Kit completo de emergencia", value: 36, hours: 36 }
      ]
    }
  ];

  const handleAnswer = (questionId: keyof QuestionData, hours: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: hours }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Calcular resultado
      const totalHours = Math.min(answers.water || 0, answers.food || 0, answers.energy || hours);
      setShowResult(true);
    }
  };

  const calculateSurvivalTime = () => {
    const values = Object.values(answers);
    return Math.min(...values.filter(v => v > 0));
  };

  const getSurvivalMessage = (hours: number) => {
    if (hours <= 8) return { 
      message: "¡Situación crítica! Tu hogar necesita preparación urgente.", 
      color: "destructive",
      risk: "alto"
    };
    if (hours <= 24) return { 
      message: "Preparación básica. Hay margen de mejora importante.", 
      color: "warning",
      risk: "medio"
    };
    if (hours <= 48) return { 
      message: "Nivel aceptable, pero aún hay vulnerabilidades.", 
      color: "info",
      risk: "bajo"
    };
    return { 
      message: "¡Excelente preparación! Eres un superviviente nato.", 
      color: "success",
      risk: "muy bajo"
    };
  };

  const handleEmailSubmit = () => {
    if (email.length > 3) {
      onComplete(email, calculateSurvivalTime());
    }
  };

  if (showEmailForm) {
    const survivalHours = calculateSurvivalTime();
    const result = getSurvivalMessage(survivalHours);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <GameCard variant="achievement" className="w-full max-w-md text-center">
          <div className="space-y-6">
            <div className="flex justify-center">
              <Clock className="w-16 h-16 text-primary animate-pulse" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Tu Hogar Resistiría
              </h2>
              <div className="text-4xl font-bold text-primary mb-2">
                {survivalHours} horas
              </div>
              <Badge variant={result.color as any} size="lg">
                Riesgo {result.risk}
              </Badge>
            </div>

            <p className="text-muted-foreground">
              {result.message}
            </p>

            <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
              <p className="text-sm text-foreground">
                <strong>¡Obtén tu análisis completo!</strong><br/>
                Descubre exactamente qué necesitas para convertir tu hogar en una fortaleza autónoma.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <SurvivalButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={handleEmailSubmit}
                disabled={email.length < 3}
              >
                Ver Análisis Completo de mi Hogar Autónomo
              </SurvivalButton>
            </div>

            <p className="text-xs text-muted-foreground">
              Acceso gratuito al sistema de preparación más completo de España
            </p>
          </div>
        </GameCard>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <GameCard variant="challenge" className="w-full max-w-md text-center">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">
              Calculando tu nivel de supervivencia...
            </h2>
            <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-muted-foreground">
              Analizando vulnerabilidades de tu hogar
            </p>
          </div>
        </GameCard>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Hogar Autónomo™
          </h1>
          <p className="text-muted-foreground">
            El Juego de Supervivencia Doméstica
          </p>
          <Badge variant="survival" className="mt-3">
            Test de Resistencia
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Pregunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="primary-gradient h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <GameCard variant="survival">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              {question.icon}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                {question.title}
              </h2>
              <p className="text-muted-foreground">
                {question.question}
              </p>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <SurvivalButton
                  key={index}
                  variant="outline"
                  size="lg"
                  className="w-full text-left justify-start"
                  onClick={() => {
                    setTimeout(() => {
                      handleAnswer(question.id as keyof QuestionData, option.hours);
                      if (currentQuestion === questions.length - 1) {
                        setTimeout(() => setShowEmailForm(true), 1500);
                      }
                    }, 300);
                  }}
                >
                  {option.label}
                </SurvivalButton>
              ))}
            </div>
          </div>
        </GameCard>

        {/* Challenge intro */}
        {currentQuestion === 0 && (
          <div className="text-center mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
            <p className="text-sm text-warning-foreground">
              <strong>🚨 Desafío:</strong> ¿Tu hogar resistiría 72 horas sin electricidad ni agua?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};