import { useState, useEffect } from "react";

export interface GameState {
  currentStep: number;
  totalSteps: number;
  puntosPreparacion: number;
  puntosEconomia: number;
  nivel: number;
  badges: string[];
  email: string;
  hasStarted: boolean;
  waterData: {
    liters: number;
    days: number;
  };
  foodData: {
    days: number;
    refrigeration: boolean;
  };
  energyData: {
    flashlight: boolean;
    powerbank: boolean;
    emergency: boolean;
  };
  completedSteps: number[];
}

const initialState: GameState = {
  currentStep: 0,
  totalSteps: 10,
  puntosPreparacion: 0,
  puntosEconomia: 0,
  nivel: 1,
  badges: [],
  email: "",
  hasStarted: false,
  waterData: { liters: 0, days: 0 },
  foodData: { days: 0, refrigeration: false },
  energyData: { flashlight: false, powerbank: false, emergency: false },
  completedSteps: []
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem("hogar-autonomo-state");
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("hogar-autonomo-state", JSON.stringify(gameState));
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  };

  const addPoints = (preparacion: number, economia: number = 0) => {
    setGameState(prev => ({
      ...prev,
      puntosPreparacion: prev.puntosPreparacion + preparacion,
      puntosEconomia: prev.puntosEconomia + economia
    }));
  };

  const addBadge = (badge: string) => {
    setGameState(prev => ({
      ...prev,
      badges: [...prev.badges, badge]
    }));
  };

  const completeStep = (stepNumber: number, points: number = 100, economyPoints: number = 0) => {
    setGameState(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps, stepNumber],
      currentStep: Math.max(prev.currentStep, stepNumber + 1),
      puntosPreparacion: prev.puntosPreparacion + points,
      puntosEconomia: prev.puntosEconomia + economyPoints
    }));
  };

  const calculateLevel = () => {
    const total = gameState.puntosPreparacion;
    if (total >= 901) return 4; // Maestro del Hogar Autónomo
    if (total >= 701) return 3; // Arquitecto de Crisis
    if (total >= 401) return 2; // Explorador Autónomo
    return 1; // Urbanita Inexperto
  };

  const getLevelName = () => {
    const level = calculateLevel();
    const names = [
      "",
      "Urbanita Inexperto",
      "Explorador Autónomo", 
      "Arquitecto de Crisis",
      "Maestro del Hogar Autónomo"
    ];
    return names[level];
  };

  const getProgressPercentage = () => {
    return (gameState.completedSteps.length / gameState.totalSteps) * 100;
  };

  return {
    gameState,
    updateGameState,
    addPoints,
    addBadge,
    completeStep,
    calculateLevel,
    getLevelName,
    getProgressPercentage
  };
};