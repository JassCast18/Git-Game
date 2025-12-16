import Nubes from "../ui/Cielo/Nubes"
import Mapa from "../ui/mapa/Mapa"

export default function Inicio() {
  return (
    <div className="relative">
      <div className="fixed inset-0 -z-30 bg-linear-to-b from-sky-950 to-sky-300 h-300" />
      <div className="fixed inset-0 -z-20 pointer-events-none">
        
      </div>
      <Nubes />

      <div className="relative z-10 py-40">
        <Mapa />
      </div>
    </div>
  )
}
