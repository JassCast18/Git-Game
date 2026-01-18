import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = () => {
    setPlayer(null);
    setError(null);
  };

  return (
    <GameContext.Provider value={{ player, setPlayer, loading, setLoading, error, setError, logout }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}



