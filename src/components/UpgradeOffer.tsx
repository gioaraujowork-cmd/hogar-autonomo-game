import { useState, useEffect } from "react";
import { SurvivalButton } from "./SurvivalButton";
import { GameCard } from "./GameCard";
import { Badge } from "./Badge";
import { 
  Star, 
  Clock, 
  CheckCircle, 
  Users, 
  TrendingUp, 
  Shield,
  FileText,
  Calculator,
  MessageCircle,
  X,
  Zap
} from "lucide-react";

interface UpgradeOfferProps {
  triggerPoint: 'flash' | 'main' | 'final';
  currentProgress: number;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

export const UpgradeOffer = ({ 
  triggerPoint, 
  currentProgress, 
  onAccept, 
  onDecline, 
  onClose 
}: UpgradeOfferProps) => {
  const [timeRemaining, setTimeRemaining] = useState(2 * 60 + 15); // 2h 15min
  const [availableSlots, setAvailableSlots] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 60 * 1000); // Cada minuto

    const slotTimer = setInterval(() => {
      setAvailableSlots(prev => Math.max(3, prev - 1));
    }, (8 + Math.random() * 7) * 60 * 1000); // Cada 8-15 minutos

    return () => {
      clearInterval(timer);
      clearInterval(slotTimer);
    };
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const getOfferConfig = () => {
    switch (triggerPoint) {
      case 'flash':
        return {
          title: "⚡ Oferta Flash - Solo por hoy",
          originalPrice: 67,
          offerPrice: 19,
          discount: 72,
          urgency: "Esta oferta desaparece al cerrar",
          cta: "Desbloquear Kit PRO Ahora",
          badgeText: "Oferta Flash",
          badgeVariant: "warning" as const
        };
      case 'main':
        return {
          title: "🚀 Kit Anti-Colapso PRO",
          originalPrice: 67,
          offerPrice: 29,
          discount: 57,
          urgency: `Solo ${availableSlots} plazas disponibles`,
          cta: "Acceder al Kit Completo",
          badgeText: "Oferta Principal",
          badgeVariant: "primary" as const
        };
      case 'final':
        return {
          title: "🏆 Último paso para Maestro",
          originalPrice: 67,
          offerPrice: 39,
          discount: 42,
          urgency: "Tu hogar está 95% preparado",
          cta: "Alcanzar el 100% de Preparación",
          badgeText: "Oferta Final",
          badgeVariant: "success" as const
        };
    }
  };

  const config = getOfferConfig();

  const proFeatures = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Checklist PDF Avanzado",
      description: "Guía imprimible con 127 puntos de control"
    },
    {
      icon: <Calculator className="w-5 h-5" />,
      title: "Calculadora de Consumo",
      description: "Optimiza tus recursos automáticamente"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Planilhas Automáticas",
      description: "Excel con fórmulas para inventario rotativo"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Comunidad Privada",
      description: "Telegram VIP con expertos y usuarios"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Actualizaciones de por Vida",
      description: "Nuevos módulos y contenido sin costo extra"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Soporte Prioritario",
      description: "Respuestas en menos de 24 horas"
    }
  ];

  const testimonials = [
    {
      name: "María G.",
      location: "Madrid",
      text: "En 2 semanas ahorré €73 solo con las planillas. Se pagó solo.",
      rating: 5
    },
    {
      name: "Carlos R.",
      location: "Barcelona",
      text: "El checklist me ayudó a preparar mi hogar en tiempo récord.",
      rating: 5
    },
    {
      name: "Ana L.",
      location: "Valencia",
      text: "Cuando hubo corte de luz 8 horas, fuimos los únicos preparados.",
      rating: 5
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <GameCard variant="achievement" className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <Badge variant={config.badgeVariant as any} size="lg" className="mb-4">
                {config.badgeText}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {config.title}
              </h1>
              <p className="text-muted-foreground">
                Convierte tu hogar en una fortaleza autónoma
              </p>
            </div>

            {/* Urgency Banner */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-destructive" />
                <span className="font-semibold text-destructive-foreground">
                  {config.urgency}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Expira en: <strong>{formatTime(timeRemaining)}</strong>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 text-center">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground line-through">
                  Precio normal: €{config.originalPrice}
                </div>
                <div className="text-4xl font-bold text-primary">
                  €{config.offerPrice}
                </div>
                <Badge variant="success" className="mt-2">
                  Ahorro: {config.discount}%
                </Badge>
              </div>
              
              <div className="space-y-3">
                <SurvivalButton 
                  variant="primary" 
                  size="lg" 
                  className="w-full text-lg font-semibold"
                  onClick={onAccept}
                >
                  🚀 {config.cta}
                </SurvivalButton>
                <div className="text-xs text-muted-foreground">
                  ✅ Pago único - Sin suscripciones - Garantía 30 días
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                🎁 Todo lo que incluye el Kit PRO:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="text-primary mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                💬 Lo que dicen nuestros usuarios:
              </h3>
              <div className="space-y-3">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-warning fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-foreground mb-2">
                      "{testimonial.text}"
                    </p>
                    <div className="text-xs text-muted-foreground">
                      - {testimonial.name}, {testimonial.location}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="bg-success/10 border border-success/30 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Users className="w-5 h-5 text-success" />
                <span className="font-semibold text-success-foreground">
                  +2.847 hogares ya preparados
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Únete a la comunidad de hogares autónomos más grande de España
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-3">
              <SurvivalButton 
                variant="outline" 
                size="default" 
                className="flex-1"
                onClick={onDecline}
              >
                Continuar Gratis
              </SurvivalButton>
              <SurvivalButton 
                variant="primary" 
                size="default" 
                className="flex-2"
                onClick={onAccept}
              >
                Desbloquear PRO
              </SurvivalButton>
            </div>

            {/* Trust Signals */}
            <div className="text-center space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-center gap-4">
                <span>🔒 Pago seguro SSL</span>
                <span>📧 Factura oficial</span>
                <span>↩️ Garantía 30 días</span>
              </div>
              <div>
                💳 Aceptamos: Visa, MasterCard, PayPal, Bizum
              </div>
            </div>
          </div>
        </GameCard>
      </div>
    </div>
  );
};