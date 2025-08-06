import { useState } from "react";
import { InitialChallenge } from "@/components/InitialChallenge";
import { GameDashboard } from "@/components/GameDashboard";
import { useGameState } from "@/hooks/useGameState";

const Index = () => {
  const { gameState, updateGameState } = useGameState();

  const handleChallengeComplete = (email: string, survivalHours: number) => {
    updateGameState({
      email,
      hasStarted: true,
      currentStep: 1,
      puntosPreparacion: 50, // Puntos iniciales por completar el desafío
    });
  };

  if (!gameState.hasStarted) {
    return <InitialChallenge onComplete={handleChallengeComplete} />;
  }

  return <GameDashboard />;
};

export default Index;
