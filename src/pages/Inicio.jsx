import React from 'react'
import Nubes from '../ui/nubes'

function Inicio() {
  return (
    <div className="relative">

      {/* FONDO */}
      <div className="fixed inset-0 -z-30 bg-linear-to-b from-sky-950 to-sky-300" />

      {/* NUBES */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <Nubes />
      </div>

      {/* CONTENIDO SCROLLABLE */}
      <div className="relative z-10 space-y-60 py-40">

        {/* ESCENA 1 */}
        <div className="relative h-200 lg:h-0 w-full">

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              top-0
              left-1/2
              lg:left-65 lg:top-30
              -translate-x-1/2
              w-40 h-40
            "
          />

          {/* PUENTE (mobile only) */}
          <img
            src="/inicio/puente.svg"
            alt="Puente"
            className="
              absolute
              bottom-48
              top-9
              right-1/2
              w-40 h-40
              z-10
              lg:hidden
            "
          />

          {/* PUENTE (mobile only) */}
          <img
            src="/inicio/puente.svg"
            alt="Puente"
            className="
              absolute
              bottom-25
              top-33
              left-1/2
              -translate-x-1/2
              w-40 h-40
              z-10
              lg:hidden
            "
          />

       

        

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              top-60
              lg:top-0 lg:left-127
              left-1/2
              w-40 h-40
            "
          />

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              top-72
              lg:top-10
              lg:left-130
              left-1/2
              -translate-x-1/2
              w-40 h-40
            "
          />

          {/* PUENTE (mobile only) */}
          <img
            src="/inicio/Puente2.svg"
            alt="Puente"
            className="
              absolute
              bottom-80
              left-1/2
              w-40 h-40
              z-10
              lg:hidden
            "
          />

          {/* PUENTE (mobile only) */}
          <img
            src="/inicio/puente.svg"
            alt="Puente"
            className="
              absolute
              bottom-57
              left-1/2
              -translate-x-1/2
              w-40 h-40
              z-10
              lg:hidden
            "
          />

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              bottom-30
              left-1/2
              lg:top-10 lg:left-145
              w-40 h-40
            "
          />

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
            absolute
              lg:right-70
              lg:top-0
              hidden
              lg:block
              
              w-40 h-40
            "
          />
          <img
            src="/inicio/PuenteLg.svg"
            alt="Puente"
            className="
              hidden
              lg:block
              absolute
              lg:top-18 lg:left-90
              w-40 h-40
              z-10
              
            "
          />
          <img
            src="/inicio/PuenteLg.svg"
            alt="Puente"
            className="
              hidden
              lg:block
              absolute
              lg:top-34 lg:left-64
              w-40 h-40
              z-10
              
            "
          />

         </div>

      </div>

    </div>
  )
}

export default Inicio
