import { useState, useEffect } from "react";
import { SurvivalButton } from "./SurvivalButton";
import { GameCard } from "./GameCard";
import { Badge } from "./Badge";
import { AlertTriangle, Clock, Users, TrendingUp } from "lucide-react";

interface InitialHookProps {
  onContinue: () => void;
}

export const InitialHook = ({ onContinue }: InitialHookProps) => {
  const [availableSlots, setAvailableSlots] = useState(47);
  const [timeRemaining, setTimeRemaining] = useState(23 * 60 + 45); // 23h 45min en minutos

  useEffect(() => {
    // Simulador de escasez - reduce slots cada 3-7 minutos
    const slotInterval = setInterval(() => {
      setAvailableSlots(prev => Math.max(12, prev - Math.floor(Math.random() * 2) + 1));
    }, (3 + Math.random() * 4) * 60 * 1000);

    // Contador regresivo
    const timeInterval = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 60 * 1000);

    return () => {
      clearInterval(slotInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-destructive/5 to-warning/5 relative overflow-hidden">
      {/* Video Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20" />
      
      {/* Crisis Animation Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
        <div className="animate-pulse absolute top-20 left-10 w-32 h-32 bg-destructive rounded-full blur-xl" />
        <div className="animate-pulse absolute top-40 right-20 w-24 h-24 bg-warning rounded-full blur-lg delay-1000" />
        <div className="animate-pulse absolute bottom-20 left-1/4 w-40 h-40 bg-primary rounded-full blur-2xl delay-2000" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
          {/* Header de Urgencia */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-16 h-16 text-destructive animate-pulse" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              ⚠️ Tu hogar <span className="text-destructive">NO está preparado</span> para lo que viene
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Apagones de hasta 72 horas, restricciones de agua, olas de calor extremo... 
              <span className="text-foreground font-semibold"> ¿Resistiría tu familia?</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-destructive">€347</div>
                <div className="text-sm text-destructive-foreground">Factura luz media mensual</div>
              </div>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-warning">48°C</div>
                <div className="text-sm text-warning-foreground">Máximo récord España 2023</div>
              </div>
              <div className="bg-info/10 border border-info/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-info">72h</div>
                <div className="text-sm text-info-foreground">Apagón máximo reportado</div>
              </div>
            </div>
          </div>

          {/* Main CTA Card */}
          <GameCard variant="challenge" className="text-center mb-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Análisis Gratuito de Vulnerabilidad
                </h2>
                <p className="text-muted-foreground">
                  Descubre en 5 minutos si tu hogar podría resistir una crisis real
                </p>
              </div>

              {/* Escasez y Urgencia */}
              <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-warning" />
                  <span className="text-sm font-semibold text-warning-foreground">
                    Solo {availableSlots} análisis disponibles hoy
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Disponible por {formatTime(timeRemaining)} más
                  </span>
                </div>
              </div>

              {/* Beneficios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Checklist personalizado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Simulador de crisis</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Ahorro mensual estimado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-sm">Nivel de preparación</span>
                  </div>
                </div>
              </div>

              <SurvivalButton 
                variant="primary" 
                size="lg" 
                className="w-full text-lg font-semibold"
                onClick={onContinue}
              >
                🚀 Iniciar Análisis GRATIS Ahora
              </SurvivalButton>

              {/* Disclaimer Ético */}
              <div className="bg-muted/50 border border-border rounded-lg p-3">
                <p className="text-xs text-muted-foreground">
                  <strong>🔒 Aviso:</strong> Esta experiencia revela si necesitarás invertir en el Kit Anti-Colapso PRO 
                  (valor estimado €67–€127). <strong>Inversión 100% opcional</strong> al final del análisis.
                </p>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>+2.847 hogares preparados</span>
                </div>
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                <span>🔒 100% confidencial</span>
              </div>
            </div>
          </GameCard>

          {/* Challenge Preview */}
          <div className="text-center">
            <Badge variant="warning" size="lg">
              🧠 Desafío: ¿Resistirías 72 horas sin electricidad ni agua?
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};