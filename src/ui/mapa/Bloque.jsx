// components/mapa/Bloque.jsx
export default function Bloque({
  className = "",
  size = 40,
}) {
  return (
    <img
      src="/inicio/Bloque.svg"
      alt="Bloque"
      className={`absolute ${className}`}
      style={{
        width: `${size * 4}px`,
        height: `${size * 4}px`,
      }}
    />
  )
}
