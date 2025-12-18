import { Routes, Route } from "react-router-dom";

import Buscador from "./pages/Buscador";
import Inicio from "./pages/Inicio";
import { GameProvider } from "./Context/GameContext"; 

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<Buscador />} />
        <Route path="/inicio" element={<Inicio />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
