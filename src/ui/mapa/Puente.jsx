// components/mapa/Puente.jsx
export default function Puente({
  className = "",
  rotate = 0,
  scaleX = 1,
  scaleY = 1,
}) {
  return (
    <img
      src="/inicio/puente.svg"
      alt="Puente"
      className={`absolute z-10 ${className}`}
      style={{
        transform: `
          rotate(${rotate}deg)
          scaleX(${scaleX})
          scaleY(${scaleY})
        `,
      }}
    />
  )
}
