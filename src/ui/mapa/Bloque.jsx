import BotonArcade from "../BotonArcade"

export default function Bloque({
  className = "",
  size = 40,
}) {
  return (
    <div className={`absolute ${className}`}>
      
      {/* Bloque */}
      <img
        src="/inicio/Bloque.svg"
        alt="Bloque"
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
        }}
      />

      {/* Botón encima */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50">
        <BotonArcade label="ENTER" />
      </div>

    </div>
  )
}
