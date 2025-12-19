import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [player, setPlayer] = useState(null);
  const logout = () => {
  setPlayer(null);
}; 
  return (
    <GameContext.Provider value={{ player, setPlayer, logout }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}



