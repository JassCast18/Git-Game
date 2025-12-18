import { useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";

function ButtonBack() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // 👉 Redirige al Buscador
  };

  return (
    <button
      onClick={handleClick}
      className="
        text-white bg-black p-4 rounded
        bg-opacity-50
        transition-all duration-200
        hover:bg-opacity-70 hover:scale-105
        active:scale-95
      "
    >
      <TbArrowBackUp />
    </button>
  );
}

export default ButtonBack;
