import { useState, useEffect } from "react"
import Nube from "./Nube"

export default function Nubes() {
  const [cantidad, setCantidad] = useState(
    window.innerWidth >= 1024 ? 20 : 5
  )

  useEffect(() => {
    const handleResize = () => {
      setCantidad(window.innerWidth >= 1024 ? 20 : 5)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {Array.from({ length: cantidad }).map((_, i) => (
        <Nube key={i} />
      ))}
    </div>
  )
}
