import { useState, useEffect } from "react";

export interface ModuleAnswers {
  [moduleId: number]: {
    [questionId: number]: number; // pontos da resposta
  };
}

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
  moduleAnswers: ModuleAnswers;
  currentModule: number | null;
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
  completedSteps: [],
  moduleAnswers: {},
  currentModule: null
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

  const startModule = (moduleId: number) => {
    setGameState(prev => ({ ...prev, currentModule: moduleId }));
  };

  const saveAnswer = (moduleId: number, questionId: number, points: number) => {
    setGameState(prev => ({
      ...prev,
      moduleAnswers: {
        ...prev.moduleAnswers,
        [moduleId]: {
          ...prev.moduleAnswers[moduleId],
          [questionId]: points
        }
      }
    }));
  };

  const completeModule = (moduleId: number) => {
    const moduleAnswers = gameState.moduleAnswers[moduleId] || {};
    const totalPoints = Object.values(moduleAnswers).reduce((sum, points) => sum + points, 0);
    
    setGameState(prev => ({
      ...prev,
      completedSteps: [...prev.completedSteps, moduleId],
      currentStep: Math.max(prev.currentStep, moduleId + 1),
      puntosPreparacion: prev.puntosPreparacion + totalPoints,
      currentModule: null
    }));
  };

  const getModuleScore = (moduleId: number) => {
    const answers = gameState.moduleAnswers[moduleId] || {};
    return Object.values(answers).reduce((sum, points) => sum + points, 0);
  };

  const isModuleAvailable = (moduleId: number) => {
    if (moduleId === 1) return true; // Primeiro módulo sempre disponível
    return gameState.completedSteps.includes(moduleId - 1);
  };

  const isModuleCompleted = (moduleId: number) => {
    return gameState.completedSteps.includes(moduleId);
  };

  return {
    gameState,
    updateGameState,
    addPoints,
    addBadge,
    completeStep,
    calculateLevel,
    getLevelName,
    getProgressPercentage,
    startModule,
    saveAnswer,
    completeModule,
    getModuleScore,
    isModuleAvailable,
    isModuleCompleted
  };
};