import React from 'react';

function Nubes() {
    return (<>
        {/* Nube de lado izquierdo */}
        <div className="absolute bottom-16 left-0
             w-40 h-40
            sm:w-60 sm:h-60 
            sm:bottom-22 
            overflow-hidden">
            <div className="
            -translate-x-1/2
            w-40 h-40
            sm:w-60 sm:h-60
            rounded-full 
          bg-gray-100 
            shadow-inner shadow-black/30">
            </div>
        </div>


        <div className="absolute bottom-0 left-10
            w-40 h-35 
            sm:w-70 sm:h-60
            sm:left-16 
            overflow-hidden">
            <div className="
                w-40 h-40
                sm:w-70 sm:h-70 
                rounded-full 
              bg-gray-100 
                shadow-inner shadow-black/30">
            </div>
        </div>
        
        <div className="
  absolute bottom-7 left-0
  w-15 h-15
  sm:w-30 sm:h-30
  rounded-full
  bg-gray-100
  shadow-inner shadow-black/30">
        </div>

        <div className="
  absolute bottom-8 left-47
  w-15 h-15
  sm:w-30 sm:h-30
  sm:bottom-10 sm:left-80
  rounded-full
  bg-gray-100
  shadow-inner shadow-black/30">
        </div>

       {/*  Nube de lado derecho */}
       <div className="absolute top-0 right-20
            w-30 h-35 
            sm:w-50 sm:h-50
            sm:right-25 
            overflow-hidden">
            <div className="
                w-30 h-30
                -translate-y-1/4
                sm:w-50 sm:h-50 
                rounded-full 
              bg-gray-100 
                shadow-inner shadow-black/30">
            </div>
        </div>
        <div className="absolute top-1 right-0
             w-30 h-40
            sm:w-60 sm:h-60 
            sm:top-1 sm:right-0
            overflow-hidden">
            <div className="
            w-40 h-40
             sm:translate-x-1/4
            sm:w-60 sm:h-60
            rounded-full 
          bg-gray-100 
            shadow-inner shadow-black/30">
            </div>
        </div>
          <div className="
            absolute top-35 right-0
            w-15 h-15
            sm:w-30 sm:h-30
            sm:top-50
            rounded-full
          bg-gray-100
            shadow-inner shadow-black/30">
        </div>
        

    </>


    )
}

export default Nubes;