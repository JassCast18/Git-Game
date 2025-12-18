import { useEffect } from "react"
import Nubes from "../components/Cielo/Nubes"
import Mapa from "../components/mapa/Mapa"
import { useGame } from "../Context/GameContext";
import { useNavigate } from "react-router-dom";
import { FaGithubAlt } from "react-icons/fa6";
import ButtonBack from "../ui/ButtonBack";


export default function Inicio() {
  const { player } = useGame();
  const navigate = useNavigate();
  useEffect(() => {
    if (!player) {
      navigate("/", { replace: true });
    }
  }, [player, navigate]);

  if (!player) return null;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {player && (
  <div className="absolute top-10 left-0  z-20 bg-lime-700 pl-11 py-4 pr-4 rounded-md shadow-xl ">
    <h2 className="text-white text-xs sm:text-xl font-bold tracking-wide">
      <FaGithubAlt className="inline-block mr-2 text-2xl -translate-y-1 w-5 h-5 sm:w-10 sm:h-10" />
      {player.username}
    </h2>
  </div>
)}


<div className="absolute right-8 top-10"> 
  <ButtonBack />
</div>
      
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
