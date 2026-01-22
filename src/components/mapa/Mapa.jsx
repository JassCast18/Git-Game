import { useState } from "react"; // Importar useState
import Bloque from "./Bloque"
import Puente from "./Puente"
import Arbol from "./Arbol"

// Importar tus Modales (asegúrate de tener las rutas correctas)
import ModalBase from "../../ui/ModalBase";
import ContenidoYear from "../modals/ContenidoYEar";
import ContenidoSkills from "../modals/ContenidoSkills";
import ContenidoVS from "../modals/ContenidoVs";

const MAPA = [
  {
    bloques: [
      // Agregamos 'modalType' para identificar qué abrir
      { 
        className: "top-0 left-1/2 -translate-x-1/2", 
        showButton: true, 
        buttonLabel: "Mi año en Git Hub",
        modalType: "year" // <--- NUEVO
      },
      { 
        className: "top-[240px] left-1/2",
        showButton: true, 
        buttonLabel: "Mis Datos",
        modalType: "skills" // <--- NUEVO
      },
      { className: "top-[280px] left-1/2 -translate-x-1/2" },
      { className: "top-[519px] left-1/2 translate-x-1/2",  },
      { className: "top-[519px] left-1/2 -translate-x-1/2",  },
      { 
        className: "bottom-0 left-1/2", 
        showButton: true, 
        buttonLabel: "Haz un vs",
        modalType: "vs" // <--- NUEVO
      },
      
    ],
    // ... puentes y arboles siguen igual ...
    puentes: [
      { className: "w-40 h-40 top-[40px] right-1/2" },
      { className: "w-40 h-40 top-[140px] left-1/2 -translate-x-1/2" },
      { className: "w-40 h-40 bottom-[210px] left-1/2", scaleX: -1 },
      { className: "w-40 h-40 bottom-[120px] left-1/2 -translate-x-1/2" },
    ],
    arboles: [
      { className: "top-[280px] right-1/2", size: 14 },
      { className: "top-[280px] left-1/2 -translate-x-1/2", size: 10 },
      { className: "top-[280px] left-1/2", size: 12 },
      { className: "bottom-[160px] right-[445px] ", size: 12 },
      { className: "bottom-[150px] right-[425px] ", size: 12 },
    ],
  },
]
export default function Mapa() {
  // Estado para saber qué modal mostrar (null = ninguno)
  const [activeModal, setActiveModal] = useState(null);

  // Helpers para obtener Título y Contenido según el estado
  const getModalTitle = () => {
    switch(activeModal) {
      case 'year': return "Historial de Batalla (Año)";
      case 'skills': return "Hoja de Personaje (Skills)";
      case 'vs': return "Arena PvP (Versus)";
      default: return "";
    }
  };

  const renderModalContent = () => {
    switch(activeModal) {
      case 'year': return <ContenidoYear />;
      case 'skills': return <ContenidoSkills />;
      case 'vs': return <ContenidoVS />;
      default: return null;
    }
  };

  return (
    <>
      {MAPA.map((escena, i) => (
        <div
          key={i}
          className="relative w-[1280px] h-[720px] z-0"
        >
          {escena.bloques.map((b, j) => (
            <Bloque 
              key={j} 
              {...b} 
              // AQUÍ ESTÁ LA MAGIA:
              // Si el bloque tiene un 'modalType', pasamos la función para abrirlo
              onClick={b.modalType ? () => setActiveModal(b.modalType) : undefined}
            />
          ))}
          
          {escena.puentes.map((p, j) => (
            <Puente key={j} {...p} />
          ))}
          
          {escena.arboles.map((a, j) => (
            <Arbol key={j} {...a} />
          ))}

        </div>
      ))}

      {/* RENDERIZADO DEL MODAL (Fuera del loop del mapa) */}
      {/* Usamos un Portal implícito al estar al final del fragmento, o CSS fixed */}
      {activeModal && (
        <ModalBase 
          title={getModalTitle()} 
          onClose={() => setActiveModal(null)}
        >
          {renderModalContent()}
        </ModalBase>
      )}
    </>
  )
}
