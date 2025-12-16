// components/mapa/Mapa.jsx
import Bloque from "./Bloque"
import Puente from "./Puente"

const MAPA = [
  {
    bloques: [
      { className: "top-0 left-1/2 -translate-x-1/2" },
      { className: "top-60 left-1/2" },
      { className: "top-72 left-1/2 -translate-x-1/2" },
      { className: "bottom-10 left-1/2 -translate-x-1/2" },
    ],
    puentes: [
      { className: "w-40 h-40 top-10 right-1/2" },
      { className: "w-40 h-40 top-35 left-1/2 -translate-x-1/2" },
      { className: "w-40 h-40 bottom-52 left-1/2",  scaleX: -1.0 },
      { className: "w-40 h-40 bottom-29  left-1/2 -translate-x-1/2" },
    ],
  },
]

export default function Mapa() {
  return (
    <>
      {MAPA.map((escena, i) => (
        <div key={i} className="relative h-[700px]">
          {escena.bloques.map((b, j) => (
            <Bloque key={j} {...b} />
          ))}
          {escena.puentes.map((p, j) => (
            <Puente key={j} {...p} />
          ))}
        </div>
      ))}
    </>
  )
}
