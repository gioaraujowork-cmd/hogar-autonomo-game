import { useState } from "react";
import { InitialHook } from "@/components/InitialHook";
import { QualificationGate } from "@/components/QualificationGate";
import { MainDashboard } from "@/components/MainDashboard";
import { useGameState } from "@/hooks/useGameState";

type AppStep = 'hook' | 'qualification' | 'dashboard';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('hook');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { gameState, updateGameState } = useGameState();

  const handleHookContinue = () => {
    setCurrentStep('qualification');
  };

  const handleQualificationComplete = (email: string, preparationLevel: string) => {
    const name = email.split('@')[0]; // Usar parte del email como nombre
    setUserName(name);
    setUserEmail(email);
    
    updateGameState({
      email,
      hasStarted: true,
      currentStep: 1,
      puntosPreparacion: 50, // Puntos iniciales por completar el desafío
    });
    
    setCurrentStep('dashboard');
  };

  const handleBackToHook = () => {
    setCurrentStep('hook');
  };

  // Si ya tiene datos guardados, ir directo al dashboard
  if (gameState.hasStarted && gameState.email) {
    return <MainDashboard userName={gameState.email.split('@')[0]} userEmail={gameState.email} />;
  }

  if (currentStep === 'qualification') {
    return (
      <QualificationGate 
        onQualified={handleQualificationComplete}
        onBack={handleBackToHook}
      />
    );
  }

  if (currentStep === 'dashboard') {
    return <MainDashboard userName={userName} userEmail={userEmail} />;
  }

  return <InitialHook onContinue={handleHookContinue} />;
};

export default Index;
