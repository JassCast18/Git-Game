import BotonArcade from "../../ui/BotonArcade"

export default function Bloque({
  className = "",
  size = 40,
  showButton = false,
  buttonLabel = "ENTER",
  onClick, // 1. Recibimos la función aquí
}) {
  return (
    <div className={`absolute ${className} `}>

      {/* Bloque */}
      <img
        src="/inicio/Bloque.svg"
        alt="Bloque"
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
        }}
        className="relative "
      />

      {/* Botón encima (solo si aplica) */}
      {showButton && (
        <div className="absolute top-2 right-4 z-[100] pointer-events-auto">
          <div className="transform -skew-x-[-12deg] -skew-y-[5deg] -translate-x-1 -translate-y-10 pointer-events-none">
            <div className="pointer-events-auto">
              {/* 2. Se la pasamos al componente del botón */}
              <BotonArcade
                label={buttonLabel}
                onClick={onClick}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}