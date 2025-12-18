import Nubes from "../ui/Cielo/Nubes"
import Mapa from "../ui/mapa/Mapa"

export default function Inicio() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Fondo */}
      <div className="fixed inset-0 -z-30 bg-linear-to-b from-sky-950 to-sky-300" />

      <Nubes />

      {/* CONTENEDOR DEL JUEGO */}
      <div
  className="
    relative z-10 flex justify-center pt-32
    min-h-[100vh]
    sm:min-h-[110vh]
    lg:min-h-[130vh]
    sm:pb-[40vh]
    xl:min-h-[150vh]
    2xl:min-h-[170vh]
    overflow-visible
  "
>

        <div
          className="
            origin-top
            scale-[0.85]
            sm:scale-[0.95]
            lg:scale-100
            xl:scale-[1.25]
            2xl:scale-[1.5]
          "
        >
          <Mapa />
        </div>
      </div>

    </div>
  )
}
