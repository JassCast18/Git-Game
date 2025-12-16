// components/mapa/Escena.jsx
export default function Escena({ children, className = "" }) {
  return (
    <div className={`relative w-full h-[600px] ${className}`}>
      {children}
    </div>
  )
}
