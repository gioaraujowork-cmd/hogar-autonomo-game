import { useState } from "react";
import { SurvivalButton } from "./SurvivalButton";
import { GameCard } from "./GameCard";
import { Badge } from "./Badge";
import { ProgressBar } from "./ProgressBar";
import { useGameState } from "@/hooks/useGameState";
import { WaterModule } from "./WaterModule";
import { FoodModule } from "./FoodModule";
import { EnergyModule } from "./EnergyModule";
import { SavingsModule } from "./SavingsModule";
import { CrisisSimulator } from "./CrisisSimulator";
import { FinalChallenge } from "./FinalChallenge";
import { FinalResults } from "./FinalResults";
import { 
  Droplets, 
  Utensils, 
  Zap, 
  Thermometer, 
  Target, 
  ShoppingCart,
  AlertTriangle,
  Users,
  Trophy,
  Lock,
  Clock,
  CheckCircle,
  Star
} from "lucide-react";

interface MainDashboardProps {
  userName: string;
  userEmail: string;
}

export const MainDashboard = ({ userName, userEmail }: MainDashboardProps) => {
  const { gameState, completeStep, getLevelName, getProgressPercentage, isModuleAvailable, isModuleCompleted } = useGameState();
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const modules = [
    {
      id: 1,
      title: "Escáner de Vulnerabilidad",
      description: "Diagnóstico completo de tu hogar",
      icon: <AlertTriangle className="w-8 h-8" />,
      points: 100,
      estimatedTime: "3 min",
      status: isModuleCompleted(1) ? 'completed' : 
              isModuleAvailable(1) ? 'available' : 'locked',
      color: 'destructive' as const,
      bgGradient: 'from-destructive/10 to-destructive/5'
    },
    {
      id: 2,
      title: "Módulo de Agua",
      description: "Reservas hídricas y sistemas",
      icon: <Droplets className="w-8 h-8" />,
      points: 150,
      estimatedTime: "4 min",
      status: isModuleCompleted(2) ? 'completed' : 
              isModuleAvailable(2) ? 'available' : 'locked',
      color: 'info' as const,
      bgGradient: 'from-info/10 to-info/5'
    },
    {
      id: 3,
      title: "Módulo de Alimentos",
      description: "Despensa y conservación",
      icon: <Utensils className="w-8 h-8" />,
      points: 150,
      estimatedTime: "5 min",
      status: isModuleCompleted(3) ? 'completed' : 
              isModuleAvailable(3) ? 'available' : 'locked',
      color: 'warning' as const,
      bgGradient: 'from-warning/10 to-warning/5'
    },
    {
      id: 4,
      title: "Energía Autónoma",
      description: "Sistemas eléctricos independientes",
      icon: <Zap className="w-8 h-8" />,
      points: 150,
      estimatedTime: "4 min",
      status: isModuleCompleted(4) ? 'completed' : 
              isModuleAvailable(4) ? 'available' : 'locked',
      color: 'accent' as const,
      bgGradient: 'from-accent/10 to-accent/5'
    },
    {
      id: 5,
      title: "Misiones de Ahorro",
      description: "Optimización de recursos",
      icon: <Target className="w-8 h-8" />,
      points: 120,
      estimatedTime: "3 min",
      status: isModuleCompleted(5) ? 'completed' : 
              isModuleAvailable(5) ? 'available' : 'locked',
      color: 'success' as const,
      bgGradient: 'from-success/10 to-success/5'
    },
    {
      id: 6,
      title: "Simulador de Crisis",
      description: "Escenarios reales de emergencia",
      icon: <AlertTriangle className="w-8 h-8" />,
      points: 200,
      estimatedTime: "6 min",
      status: isModuleCompleted(6) ? 'completed' : 
              isModuleAvailable(6) ? 'available' : 'locked',
      color: 'destructive' as const,
      bgGradient: 'from-destructive/10 to-destructive/5'
    },
    {
      id: 7,
      title: "Desafío Final",
      description: "Evaluación completa de preparación",
      icon: <Trophy className="w-8 h-8" />,
      points: 150,
      estimatedTime: "5 min",
      status: isModuleCompleted(7) ? 'completed' : 
              isModuleAvailable(7) ? 'available' : 'locked',
      color: 'warning' as const,
      bgGradient: 'from-warning/10 to-warning/5'
    },
  ];

  const handleModuleSelect = (moduleId: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (module?.status === 'available') {
      setSelectedModule(moduleId);
    } else if (module?.status === 'locked') {
      setShowUpgrade(true);
    }
  };

  const availableModules = modules.filter(m => m.status === 'available').length;
  const completedModules = modules.filter(m => m.status === 'completed').length;
  const totalPoints = gameState.puntosPreparacion + gameState.puntosEconomia;

  // Mostrar oferta en momentos estratégicos
  const shouldShowUpgrade = () => {
    const progress = getProgressPercentage();
    return progress >= 40 && progress < 90 && !gameState.badges.includes('pro-access');
  };

  const avanzarEtapa = (numeroEtapa: number) => {
    setSelectedModule(numeroEtapa);
  };

  // Renderizar módulos específicos
  if (selectedModule === 2) {
    return <WaterModule onComplete={() => avanzarEtapa(3)} onBack={() => setSelectedModule(null)} />;
  }
  if (selectedModule === 3) {
    return <FoodModule onComplete={() => avanzarEtapa(4)} onBack={() => setSelectedModule(null)} />;
  }
  if (selectedModule === 4) {
    return <EnergyModule onComplete={() => avanzarEtapa(5)} onBack={() => setSelectedModule(null)} />;
  }
  if (selectedModule === 5) {
    return <SavingsModule onComplete={() => avanzarEtapa(6)} onBack={() => setSelectedModule(null)} />;
  }
  if (selectedModule === 6) {
    return <CrisisSimulator onComplete={() => avanzarEtapa(7)} onBack={() => setSelectedModule(null)} />;
  }
  if (selectedModule === 7) {
    return <FinalChallenge onComplete={() => avanzarEtapa(999)} onBack={() => setSelectedModule(null)} />;
  }
  if (selectedModule === 999) {
    return <FinalResults onBack={() => setSelectedModule(null)} onRestart={() => {
      localStorage.removeItem("hogar-autonomo-state");
      window.location.reload();
    }} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 animate-fade-in">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Hogar Autónomo™
              </h1>
              <p className="text-sm text-muted-foreground">
                ¡Hola {userName}! Nivel: {getLevelName()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {totalPoints.toLocaleString()} pts
              </div>
              <div className="text-sm text-muted-foreground">
                {completedModules}/{modules.length} módulos
              </div>
            </div>
          </div>
          
          {/* Barra de Progreso Global */}
          <div className="mt-4">
            <ProgressBar 
              value={getProgressPercentage()} 
              label="Progreso del Hogar Autónomo"
              variant="survival"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <GameCard variant="default" className="text-center p-4">
            <div className="text-2xl font-bold text-primary">
              {gameState.puntosPreparacion}
            </div>
            <div className="text-xs text-muted-foreground">
              Puntos Preparación
            </div>
          </GameCard>
          <GameCard variant="default" className="text-center p-4">
            <div className="text-2xl font-bold text-success">
              €{gameState.puntosEconomia}
            </div>
            <div className="text-xs text-muted-foreground">
              Ahorro Estimado
            </div>
          </GameCard>
          <GameCard variant="default" className="text-center p-4">
            <div className="text-2xl font-bold text-warning">
              {gameState.badges.length}
            </div>
            <div className="text-xs text-muted-foreground">
              Logros Desbloqueados
            </div>
          </GameCard>
          <GameCard variant="default" className="text-center p-4">
            <div className="text-2xl font-bold text-info">
              Nivel {gameState.nivel}
            </div>
            <div className="text-xs text-muted-foreground">
              {getLevelName()}
            </div>
          </GameCard>
        </div>

        {/* Upgrade Offer Banner */}
        {shouldShowUpgrade() && (
          <GameCard variant="achievement" className="mb-8 border-warning border-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Star className="w-8 h-8 text-warning" />
                <div>
                  <h3 className="font-bold text-warning-foreground">
                    🚀 Oferta Flash - Solo por tiempo limitado
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Desbloquea todos los módulos PRO por €19 (descuento 68%)
                  </p>
                </div>
              </div>
              <SurvivalButton variant="warning" onClick={() => setShowUpgrade(true)}>
                Ver Oferta
              </SurvivalButton>
            </div>
          </GameCard>
        )}

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <GameCard 
              key={module.id}
              variant="survival" 
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                module.status === 'completed' ? 'bg-success/5 border-success/30' :
                module.status === 'available' ? 'hover:shadow-lg' :
                'opacity-60'
              }`}
              onClick={() => handleModuleSelect(module.id)}
            >
              <div className="space-y-4">
                {/* Module Header */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${module.bgGradient}`}>
                    <div className={`text-${module.color}`}>
                      {module.icon}
                    </div>
                  </div>
                  <div className="text-right">
                    {module.status === 'completed' && (
                      <CheckCircle className="w-6 h-6 text-success" />
                    )}
                    {module.status === 'locked' && (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                    {module.status === 'available' && (
                      <Badge variant="outline" size="sm">
                        Disponible
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Module Content */}
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{module.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Trophy className="w-3 h-3" />
                      <span>+{module.points} pts</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  {module.status === 'completed' && (
                    <Badge variant="success" className="w-full justify-center">
                      ✅ Completado
                    </Badge>
                  )}
                  {module.status === 'available' && (
                    <SurvivalButton variant="outline" size="sm" className="w-full">
                      Iniciar Módulo
                    </SurvivalButton>
                  )}
                  {module.status === 'locked' && (
                    <SurvivalButton variant="outline" size="sm" className="w-full opacity-60">
                      🔒 Bloqueado
                    </SurvivalButton>
                  )}
                </div>
              </div>
            </GameCard>
          ))}
        </div>

        {/* Progress Incentive */}
        <div className="mt-8 text-center">
          <GameCard variant="default" className="inline-block">
            <div className="text-sm text-muted-foreground">
              ⏱️ Siguiente desbloqueio en: <strong>1 módulo más</strong>
            </div>
          </GameCard>
        </div>
      </div>

      {/* Loading Module Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <GameCard variant="challenge" className="text-center m-4">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <h3 className="text-lg font-semibold">
                Cargando módulo...
              </h3>
              <p className="text-muted-foreground">
                Preparando tu experiencia personalizada
              </p>
            </div>
          </GameCard>
        </div>
      )}
    </div>
  );
};