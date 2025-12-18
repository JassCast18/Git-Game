import BotonArcade from "../../ui/BotonArcade"

export default function Bloque({
  className = "",
  size = 40,

  // 🔽 NUEVAS PROPS
  showButton = false,
  buttonLabel = "ENTER",
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
        <div className="absolute top-2 right-4 z-50">
          <BotonArcade label={buttonLabel} />
        </div>
      )}

    </div>
  )
}
