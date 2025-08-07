import { GameCard } from "./GameCard";
import { SurvivalButton } from "./SurvivalButton";
import { Badge } from "./Badge";
import { useGameState } from "@/hooks/useGameState";
import { Trophy, Star, Award, ArrowLeft } from "lucide-react";

interface FinalResultsProps {
  onBack: () => void;
  onRestart?: () => void;
}

export const FinalResults = ({ onBack, onRestart }: FinalResultsProps) => {
  const { gameState } = useGameState();
  
  const totalPoints = gameState.puntosPreparacion;
  
  const getResultMessage = () => {
    if (totalPoints >= 501) {
      return {
        title: "¡Increíble! Has demostrado un compromiso real",
        message: "Tu progreso te ha hecho desbloquear una recompensa exclusiva.",
        description: "Has demostrado un compromiso real con la preparación doméstica. Tu hogar está en el camino correcto hacia la verdadera autonomía.",
        color: "success",
        icon: <Award className="w-12 h-12 text-success" />,
        level: "Maestro de la Preparación"
      };
    } else if (totalPoints >= 201) {
      return {
        title: "Buen trabajo en tu camino hacia la autonomía",
        message: "Aún hay mucho por mejorar. ¡Por eso hemos preparado algo especial para ti!",
        description: "Has avanzado significativamente, pero tu hogar aún tiene vulnerabilidades importantes que resolver.",
        color: "warning",
        icon: <Star className="w-12 h-12 text-warning" />,
        level: "Preparador en Desarrollo"
      };
    } else {
      return {
        title: "Tu hogar presenta vulnerabilidades importantes",
        message: "Pero no te preocupes: al llegar hasta aquí, desbloqueaste una oportunidad única para mejorar todo eso.",
        description: "Has dado el primer paso al completar esta evaluación. Ahora es momento de actuar.",
        color: "destructive",
        icon: <Trophy className="w-12 h-12 text-destructive" />,
        level: "Principiante Consciente"
      };
    }
  };

  const result = getResultMessage();
  const completedModules = gameState.completedSteps.length;
  const totalModules = gameState.totalSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4 animate-fade-in">
      <div className="container mx-auto max-w-3xl pt-8">
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al dashboard
        </button>

        <div className="space-y-6">
          {/* Main Result Card */}
          <GameCard variant="challenge" className="text-center animate-scale-in">
            <div className="space-y-6">
              <div className="mx-auto w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                {result.icon}
              </div>
              
              <div>
                <Badge variant={result.color as any} size="lg" className="mb-3">
                  {result.level}
                </Badge>
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  ¡Evaluación Completada!
                </h1>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {result.title}
                </h2>
                <p className="text-lg text-primary font-medium mb-4">
                  {result.message}
                </p>
                <p className="text-muted-foreground">
                  {result.description}
                </p>
              </div>
            </div>
          </GameCard>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GameCard variant="default" className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {totalPoints}
              </div>
              <div className="text-sm text-muted-foreground">
                Puntos de Preparación
              </div>
            </GameCard>
            
            <GameCard variant="default" className="text-center p-6">
              <div className="text-3xl font-bold text-success mb-2">
                {completedModules}/{totalModules}
              </div>
              <div className="text-sm text-muted-foreground">
                Módulos Completados
              </div>
            </GameCard>
            
            <GameCard variant="default" className="text-center p-6">
              <div className="text-3xl font-bold text-warning mb-2">
                {gameState.badges.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Logros Desbloqueados
              </div>
            </GameCard>
          </div>

          {/* Call to Action */}
          <GameCard variant="achievement" className="border-primary border-2">
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-bold text-foreground">
                🎯 Tu recompensa por completar la evaluación
              </h3>
              <p className="text-muted-foreground">
                Has desbloqueado acceso exclusivo al <strong>Kit Anti-Colapso PRO</strong>
              </p>
              
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>✅ Checklist PDF completo</span>
                    <span className="text-muted-foreground">Valor: €15</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>✅ Calculadora de consumo automática</span>
                    <span className="text-muted-foreground">Valor: €25</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>✅ Comunidad privada de preparadores</span>
                    <span className="text-muted-foreground">Valor: €40</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>✅ Kit de supervivencia recomendado</span>
                    <span className="text-muted-foreground">Valor: €47</span>
                  </div>
                  <hr className="border-muted" />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-muted-foreground line-through">€127</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-2xl font-bold text-primary">
                  Precio especial HOY: €39
                </div>
                <p className="text-sm text-muted-foreground">
                  ⏰ Oferta válida solo por 2 horas
                </p>
                
                <SurvivalButton className="w-full text-lg py-4 hover-scale">
                  🚀 Acceder al Kit Anti-Colapso PRO
                </SurvivalButton>
                
                <p className="text-xs text-muted-foreground">
                  💰 Garantía de devolución 30 días · Pago seguro
                </p>
              </div>
            </div>
          </GameCard>

          {/* Social Sharing */}
          <GameCard variant="default" className="text-center">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                Comparte tu logro
              </h4>
              <p className="text-sm text-muted-foreground">
                Soy parte del {Math.round((totalPoints / 1000) * 100)}% de hogares mejor preparados de España
              </p>
              
              <div className="flex gap-3 justify-center">
                <SurvivalButton variant="outline" size="sm">
                  Compartir en WhatsApp
                </SurvivalButton>
                <SurvivalButton variant="outline" size="sm">
                  Compartir en Twitter
                </SurvivalButton>
              </div>
            </div>
          </GameCard>

          {/* Footer Actions */}
          <div className="flex gap-4 justify-center">
            {onRestart && (
              <SurvivalButton variant="outline" onClick={onRestart}>
                Empezar de Nuevo
              </SurvivalButton>
            )}
            <SurvivalButton variant="ghost" onClick={onBack}>
              Volver al Dashboard
            </SurvivalButton>
          </div>
        </div>
      </div>
    </div>
  );
};