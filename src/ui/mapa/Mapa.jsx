// components/mapa/Mapa.jsx
import Bloque from "./Bloque"
import Puente from "./Puente"
import Arbol from "./Arbol"
import LetreroButton from "./LetreroButton"

const MAPA = [
  {
    bloques: [
      { className: "top-0 left-1/2 -translate-x-1/2 lg:top-69 lg:left-42" },
      { className: "top-72 left-1/2 -translate-x-1/2 lg:left-110 lg:top-0" },
      { className: "top-60 left-1/2 lg:left-108 lg:top-10" },
      
      { className: "top-72 left-1/2 -translate-x-1/2 lg:left-92 lg:top-10" },
      { className: "hidden lg:block lg:left-167  lg:top-42" },
      { className: "bottom-0 left-1/2 lg:left-167 lg:bottom-auto lg:top-22" },
      
    ],
    puentes: [
      { className: "w-40 h-40 top-10 right-1/2 lg:right-160 lg:scale-x-[-1] lg:top-18" },
      { className: "w-40 h-40 top-35 left-1/2 -translate-x-1/2 lg:left-145 lg:top-18" },
      { className: "w-40 h-40 bottom-52 left-1/2 lg:left-40 lg:bottom-0",  scaleX: -1.0 },
      { className: "w-40 h-40 bottom-29  left-1/2 -translate-x-1/2 lg:left-170 lg:bottom-7 lg:scale-x-[-1]" },
    ],
    arboles: [
      { className: "top-0 left-1/2 lg:left-0 lg:bottom-10", size: 14 },
      { className: "top-72 right-1/2 lg:left-0 lg:bottom-10", size: 14 },
      { className: "top-72 left-1/2 -translate-x-1/2  lg:left-0 lg:bottom-10", size: 10 },
      { className: "top-72 left-1/2  lg:left-0 lg:bottom-10", size: 12 },
      { className: "bottom-25 left-1/2 translate-x-1/2 lg:right-0 lg:bottom-20", size: 14 },
    ],
    letreros: [
      { className: "top-0 left-1/2 -translate-x-1/2 lg:left-50 lg:top-30" },
    ],
  },
]

export default function Mapa() {
  return (
    <>
      {MAPA.map((escena, i) => (
        <div key={i} className="relative h-175 lg:h-80 ">
          {escena.bloques.map((b, j) => ( 
            <Bloque key={j} {...b} />
          ))}
          {escena.puentes.map((p, j) => (
            <Puente key={j} {...p} />
          ))}
          {escena.arboles.map((a, j) => (
            <Arbol key={j} {...a} />
          ))}
          {escena.letreros.map((l, j) => (
            <LetreroButton key={j} {...l} />
          ))}
        </div>
      ))}
    </>
  )
}
