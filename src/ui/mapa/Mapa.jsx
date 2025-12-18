import Bloque from "./Bloque"
import Puente from "./Puente"
import Arbol from "./Arbol"


const MAPA = [
  {
    bloques: [
      { className: "top-0 left-1/2 -translate-x-1/2", showButton: true, buttonLabel: "Mi año en Git Hub" },
      { className: "top-[240px] left-1/2",showButton: true, buttonLabel: "Mis Datos" },
      { className: "top-[280px] left-1/2 -translate-x-1/2" },
      { className: "bottom-0 left-1/2", showButton: true, buttonLabel: "Haz un vs" },
    ],
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
      { className: "bottom-[100px] left-1/2 translate-x-1/2", size: 14 },
    ],
    
  },
]

export default function Mapa() {
  return (
    <>
      {MAPA.map((escena, i) => (
        <div
          key={i}
          className="relative w-[1280px] h-[720px] z-0"
        >
          {escena.bloques.map((b, j) => (
            <Bloque key={j} {...b} />
          ))}
          {escena.puentes.map((p, j) => (
            <Puente key={j} {...p} />
          ))}
          {escena.arboles.map((a, j) => (
            <Arbol key={j} {...a} />
          ))}

        </div>
      ))}
    </>
  )
}
