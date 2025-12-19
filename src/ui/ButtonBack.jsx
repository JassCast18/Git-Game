import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { useGame } from "../Context/GameContext";
function ButtonBack() {
  const navigate = useNavigate();
  const { logout } = useGame();

  const handleClick = () => {
    logout();
    navigate("/"); 
  };

  return (
    <button
  onClick={handleClick}
  className="
    relative w-14 h-14 flex items-center justify-center rounded-full
    text-white transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg
  "
>
  <span className="absolute inset-0 bg-green-800 opacity-50 rounded-full"></span>
  <TbArrowBackUp className="relative text-2xl" />
</button>


  );
}

export default ButtonBack;
