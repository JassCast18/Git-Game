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
        <div className="relative h-[40px] w-full ">

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-40 h-40
            "
          />

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
            "
          />

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
            "
          />

        </div>
         <div className="relative h-[400px] w-full ">

          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              w-40 h-40
            "
          />
          <img
            src="/inicio/Bloque.svg"
            alt="Bloque"
            className="
              absolute
              top-0
               left-1/2
           
              w-40 h-40
            "
          />


          <img
            src="/inicio/puente.svg"
            alt="Puente"
            className="
              absolute
              bottom-48
              left-1/3
              -translate-x-1/2
              w-40 h-40
              z-10
            "
          />

          <img
            src="/inicio/puente.svg"
            alt="Puente"
            className="
              absolute
              bottom-25
              left-1/2
              -translate-x-1/2
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
