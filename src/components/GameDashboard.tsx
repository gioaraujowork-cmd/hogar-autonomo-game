import { GameCard } from "./GameCard";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { SurvivalButton } from "./SurvivalButton";
import { useGameState } from "@/hooks/useGameState";
import { 
  Trophy, 
  Target, 
  Coins, 
  Star, 
  Droplets, 
  Shield, 
  Zap,
  Thermometer,
  Settings,
  Calendar,
  AlertTriangle,
  Users,
  CheckCircle,
  Play
} from "lucide-react";

export const GameDashboard = () => {
  const { gameState, getLevelName, getProgressPercentage, completeStep } = useGameState();

  const steps = [
    {
      id: 1,
      title: "Diagnóstico de Agua",
      description: "Analiza tus reservas hídricas",
      icon: <Droplets className="w-5 h-5" />,
      points: 100,
      completed: gameState.completedSteps.includes(1)
    },
    {
      id: 2,
      title: "Diagnóstico de Comida",
      description: "Evalúa tu despensa de emergencia",
      icon: <Shield className="w-5 h-5" />,
      points: 100,
      completed: gameState.completedSteps.includes(2)
    },
    {
      id: 3,
      title: "Diagnóstico de Energía",
      description: "Revisa tu autonomía eléctrica",
      icon: <Zap className="w-5 h-5" />,
      points: 100,
      completed: gameState.completedSteps.includes(3)
    },
    {
      id: 4,
      title: "Calor y Ventilación",
      description: "Optimiza el clima de tu hogar",
      icon: <Thermometer className="w-5 h-5" />,
      points: 100,
      completed: gameState.completedSteps.includes(4)
    },
    {
      id: 5,
      title: "Reducción Express",
      description: "3 misiones de ahorro inmediato",
      icon: <Settings className="w-5 h-5" />,
      points: 150,
      completed: gameState.completedSteps.includes(5)
    },
    {
      id: 6,
      title: "Planificación de Reservas",
      description: "Organiza tu stock rotativo",
      icon: <Calendar className="w-5 h-5" />,
      points: 100,
      completed: gameState.completedSteps.includes(6)
    },
    {
      id: 7,
      title: "Simulación Crisis Leve",
      description: "Prueba tu resistencia 24h",
      icon: <AlertTriangle className="w-5 h-5" />,
      points: 120,
      completed: gameState.completedSteps.includes(7)
    },
    {
      id: 8,
      title: "Apagón Prolongado",
      description: "Sobrevive 3 días sin luz",
      icon: <Zap className="w-5 h-5" />,
      points: 150,
      completed: gameState.completedSteps.includes(8)
    },
    {
      id: 9,
      title: "Test Final",
      description: "Demuestra tu preparación",
      icon: <Target className="w-5 h-5" />,
      points: 180,
      completed: gameState.completedSteps.includes(9)
    },
    {
      id: 10,
      title: "Comunidad y Logros",
      description: "Únete a la red de supervivientes",
      icon: <Users className="w-5 h-5" />,
      points: 200,
      completed: gameState.completedSteps.includes(10)
    }
  ];

  const currentStep = steps.find(step => step.id === gameState.currentStep + 1);
  const availableSteps = steps.filter(step => 
    step.id <= gameState.currentStep + 1 && !step.completed
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header con stats del jugador */}
        <GameCard variant="achievement" className="text-center">
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                ¡Bienvenido, Superviviente!
              </h1>
              <p className="text-muted-foreground">
                {gameState.email}
              </p>
            </div>

            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {gameState.puntosPreparacion}
                </div>
                <div className="text-xs text-muted-foreground">
                  Puntos Preparación
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">
                  €{gameState.puntosEconomia}
                </div>
                <div className="text-xs text-muted-foreground">
                  Ahorro Proyectado
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">
                  {gameState.completedSteps.length}/{gameState.totalSteps}
                </div>
                <div className="text-xs text-muted-foreground">
                  Etapas Completadas
                </div>
              </div>
            </div>

            <Badge variant="level" size="lg">
              <Trophy className="w-4 h-4 mr-1" />
              Nivel {gameState.nivel}: {getLevelName()}
            </Badge>
          </div>
        </GameCard>

        {/* Progreso general */}
        <GameCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Progreso del Hogar Autónomo
              </h2>
              <Badge variant="outline">
                {Math.round(getProgressPercentage())}% Completado
              </Badge>
            </div>
            
            <ProgressBar 
              value={getProgressPercentage()} 
              variant="survival"
              size="lg"
              showLabel={false}
            />

            <div className="text-sm text-muted-foreground">
              Completa todas las etapas para obtener tu <strong>Diploma de Hogar Autónomo</strong>
            </div>
          </div>
        </GameCard>

        {/* Próxima etapa disponible */}
        {currentStep && (
          <GameCard variant="challenge">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                  {currentStep.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    Siguiente: {currentStep.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentStep.description}
                  </p>
                </div>
                <Badge variant="warning" size="sm">
                  +{currentStep.points} pts
                </Badge>
              </div>

              <SurvivalButton 
                variant="primary" 
                size="lg" 
                className="w-full"
                onClick={() => completeStep(currentStep.id - 1, currentStep.points, 10)}
              >
                <Play className="w-4 h-4 mr-2" />
                Comenzar Etapa {currentStep.id}
              </SurvivalButton>
            </div>
          </GameCard>
        )}

        {/* Lista de todas las etapas */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Hoja de Ruta de Supervivencia
          </h2>
          
          {steps.map((step, index) => (
            <GameCard 
              key={step.id} 
              variant={step.completed ? "achievement" : "default"}
              className={step.id > gameState.currentStep + 1 ? "opacity-50" : ""}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    step.completed 
                      ? "bg-success/20 text-success" 
                      : step.id === gameState.currentStep + 1
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.icon}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground">
                      Etapa {step.id}: {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={step.completed ? "success" : "outline"} 
                    size="sm"
                  >
                    {step.completed ? "Completada" : `+${step.points} pts`}
                  </Badge>
                  
                  {step.id === gameState.currentStep + 1 && !step.completed && (
                    <SurvivalButton
                      variant="primary"
                      size="sm"
                      onClick={() => completeStep(step.id - 1, step.points, 10)}
                    >
                      Jugar
                    </SurvivalButton>
                  )}
                </div>
              </div>
            </GameCard>
          ))}
        </div>

        {/* Badges obtenidos */}
        {gameState.badges.length > 0 && (
          <GameCard>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">
                Logros Desbloqueados
              </h3>
              <div className="flex flex-wrap gap-2">
                {gameState.badges.map((badge, index) => (
                  <Badge key={index} variant="achievement">
                    <Star className="w-3 h-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </GameCard>
        )}

        {/* Ofertas PRO (aparece después del 40% de progreso) */}
        {getProgressPercentage() >= 40 && getProgressPercentage() < 100 && (
          <GameCard variant="challenge" className="border-accent/30">
            <div className="text-center space-y-4">
              <Badge variant="warning" size="lg">
                🔥 Oferta Flash - Solo Hoy
              </Badge>
              
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Desbloquea el Hogar Autónomo PRO
                </h3>
                <p className="text-muted-foreground text-sm">
                  Planillas automáticas, recetas de almacenamiento, checklist imprimible y mucho más
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-accent">€19</span>
                <span className="text-sm text-muted-foreground line-through">€49</span>
                <Badge variant="destructive" size="sm">61% OFF</Badge>
              </div>

              <SurvivalButton variant="warning" size="lg" className="w-full">
                <Coins className="w-4 h-4 mr-2" />
                Desbloquear PRO Ahora
              </SurvivalButton>
            </div>
          </GameCard>
        )}
      </div>
    </div>
  );
};