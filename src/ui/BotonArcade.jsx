// components/ui/BotonArcade.jsx
export default function BotonArcade({
  label = "PLAY",
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
       
        relative
        px-4 py-2
        font-bold uppercase tracking-wide
        text-white text-sm
        bg-green-900
        rounded-md
        shadow-[0_6px_0_#022B0B]
        active:shadow-[0_2px_0_#022B0B]
        active:translate-y-[4px]
        hover:brightness-110
        transition-all
        select-none
        ${className}
      `}
    >
      {label}
    </button>
  )
}
