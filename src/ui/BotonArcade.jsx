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
        inline-flex
        items-center
        justify-center

        px-5 py-3
        w-fit

        font-bold uppercase tracking-wide
        text-white text-sm text-center
        whitespace-pre-line
        transform
-skew-x-[-12deg]
-skew-y-[5deg]
-translate-x-1
-translate-y-10


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
