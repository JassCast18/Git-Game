import { useMemo } from "react"

const NUBES = [
  "/inicio/Nubes/001.svg",
  "/inicio/Nubes/002.svg",
  "/inicio/Nubes/003.svg",
]

export default function Nube() {
  const src = useMemo(
    () => NUBES[Math.floor(Math.random() * NUBES.length)],
    []
  )

  const top = useMemo(() => Math.random() * 85 + 5, [])
  const duration = useMemo(() => Math.random() * 30 + 40, [])
  const size = useMemo(() => Math.random() * 120 + 160, [])

 
  const delay = useMemo(
    () => -Math.random() * duration,
    [duration]
  )

  return (
    <img
      src={src}
      alt=""
      className="absolute opacity-40 pointer-events-none"
      style={{
        top: `${top}%`,
        width: `${size}px`,
        animation: `nube-move ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}
