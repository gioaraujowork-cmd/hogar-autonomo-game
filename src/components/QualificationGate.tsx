import { useState } from "react";
import { SurvivalButton } from "./SurvivalButton";
import { GameCard } from "./GameCard";
import { Badge } from "./Badge";
import { AlertTriangle, CheckCircle, HelpCircle, Clock, Mail } from "lucide-react";

interface QualificationGateProps {
  onQualified: (email: string, preparationLevel: string) => void;
  onBack: () => void;
}

export const QualificationGate = ({ onQualified, onBack }: QualificationGateProps) => {
  const [currentStep, setCurrentStep] = useState<'qualification' | 'result' | 'motivation' | 'email'>('qualification');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [isWillingToImprove, setIsWillingToImprove] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [survivalHours, setSurvivalHours] = useState(0);

  const qualificationOptions = [
    {
      id: 'unprepared',
      icon: <AlertTriangle className="w-8 h-8 text-destructive" />,
      title: 'Nada preparado',
      description: 'No tengo reservas ni plan de emergencia',
      hours: 4,
      color: 'destructive' as const,
      bgColor: 'bg-destructive/5 border-destructive/20'
    },
    {
      id: 'somewhat',
      icon: <HelpCircle className="w-8 h-8 text-warning" />,
      title: 'Algo preparado',
      description: 'Tengo algunas cosas básicas guardadas',
      hours: 16,
      color: 'warning' as const,
      bgColor: 'bg-warning/5 border-warning/20'
    },
    {
      id: 'unsure',
      icon: <HelpCircle className="w-8 h-8 text-info" />,
      title: 'No estoy seguro',
      description: 'No sé realmente qué tengo preparado',
      hours: 8,
      color: 'info' as const,
      bgColor: 'bg-info/5 border-info/20'
    }
  ];

  const handleLevelSelect = (option: typeof qualificationOptions[0]) => {
    setSelectedLevel(option.id);
    setSurvivalHours(option.hours);
    setCurrentStep('result');
  };

  const handleMotivationResponse = (willing: boolean) => {
    setIsWillingToImprove(willing);
    if (willing) {
      setCurrentStep('email');
    } else {
      // Usuario no está motivado, podrías redirigir o mostrar mensaje
      alert('¡Entendemos! Vuelve cuando estés listo para fortalecer tu hogar.');
    }
  };

  const handleEmailSubmit = () => {
    if (email.length > 3 && selectedLevel) {
      onQualified(email, selectedLevel);
    }
  };

  const getResultMessage = () => {
    if (survivalHours <= 8) {
      return {
        title: '🚨 Situación Crítica',
        message: 'Tu hogar resistiría apenas',
        description: 'Necesitas preparación urgente para proteger a tu familia',
        bgClass: 'bg-destructive/10 border-destructive/30'
      };
    } else if (survivalHours <= 16) {
      return {
        title: '⚠️ Preparación Básica',
        message: 'Tu hogar resistiría aproximadamente',
        description: 'Tienes base, pero hay vulnerabilidades importantes',
        bgClass: 'bg-warning/10 border-warning/30'
      };
    } else {
      return {
        title: '🟡 Nivel Medio',
        message: 'Tu hogar resistiría alrededor de',
        description: 'Mejor que la mayoría, pero aún mejorable',
        bgClass: 'bg-info/10 border-info/30'
      };
    }
  };

  if (currentStep === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <GameCard variant="achievement" className="text-center">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Mail className="w-16 h-16 text-primary animate-pulse" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  ¡Perfecto! Último paso
                </h2>
                <p className="text-muted-foreground">
                  Te enviaremos tu análisis completo y acceso al sistema de preparación
                </p>
              </div>

              <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                <h3 className="font-semibold text-success-foreground mb-2">
                  🎁 Incluye completamente GRATIS:
                </h3>
                <div className="text-left space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Análisis personalizado de vulnerabilidades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Checklist de preparación por etapas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Simulador de crisis interactivo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Calculadora de ahorro mensual</span>
                  </div>
                </div>
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
                  🚀 Acceder a mi Análisis Completo
                </SurvivalButton>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>🔒 100% confidencial - No spam garantizado</p>
                <p>✅ Acceso inmediato al sistema más completo de España</p>
              </div>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  if (currentStep === 'motivation') {
    const result = getResultMessage();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-warning/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <GameCard variant="challenge" className="text-center">
            <div className="space-y-6">
              <div className={`rounded-lg p-4 border ${result.bgClass}`}>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {result.title}
                </h2>
                <div className="text-3xl font-bold text-primary mb-2">
                  {survivalHours} horas
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.description}
                </p>
              </div>

              <div className="bg-info/10 border border-info/30 rounded-lg p-4">
                <h3 className="font-semibold text-info-foreground mb-2">
                  📊 Comparación Nacional:
                </h3>
                <div className="text-sm space-y-1">
                  <div>• Hogar español promedio: <strong>6-12 horas</strong></div>
                  <div>• Hogar preparado básico: <strong>48-72 horas</strong></div>
                  <div>• Hogar autónomo avanzado: <strong>7-14 días</strong></div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  ¿Estás dispuesto a mejorar la preparación de tu hogar?
                </h3>
                <div className="space-y-3">
                  <SurvivalButton 
                    variant="primary" 
                    size="lg" 
                    className="w-full"
                    onClick={() => handleMotivationResponse(true)}
                  >
                    ✅ SÍ, quiero fortalecer mi hogar
                  </SurvivalButton>
                  <SurvivalButton 
                    variant="outline" 
                    size="default" 
                    className="w-full"
                    onClick={() => handleMotivationResponse(false)}
                  >
                    ❌ No, estoy bien así
                  </SurvivalButton>
                </div>
              </div>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  if (currentStep === 'result') {
    const result = getResultMessage();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <GameCard variant="challenge" className="text-center">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">
                Calculando tu resistencia...
              </h2>
              <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted-foreground">
                Analizando vulnerabilidades de tu hogar
              </p>
            </div>
          </GameCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Evaluación Rápida
          </h1>
          <p className="text-muted-foreground">
            Antes de comenzar, necesitamos conocer tu nivel actual
          </p>
          <Badge variant="survival" className="mt-3">
            Paso 1 de 2
          </Badge>
        </div>

        {/* Qualification Question */}
        <GameCard variant="survival">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">
                ¿Cuál describe mejor tu situación actual?
              </h2>
              <p className="text-muted-foreground text-sm">
                Sé honesto, esto nos ayuda a personalizar tu experiencia
              </p>
            </div>

            <div className="space-y-4">
              {qualificationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setTimeout(() => {
                      handleLevelSelect(option);
                      setTimeout(() => setCurrentStep('motivation'), 2000);
                    }, 300);
                  }}
                  className={`w-full p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${option.bgColor} hover:shadow-lg`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="text-left flex-grow">
                      <h3 className="font-semibold text-foreground">
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4">
              <SurvivalButton 
                variant="outline" 
                size="default" 
                className="w-full"
                onClick={onBack}
              >
                ← Volver
              </SurvivalButton>
            </div>
          </div>
        </GameCard>
      </div>
    </div>
  );
};