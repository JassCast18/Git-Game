import React from 'react'
import Nubes from '../ui/nubes'

function Inicio(){
 return(
    <>
        <div className='min-h-screen bg-linear-to-b from-sky-950 to-sky-300'>
            <Nubes/>
            <img  className="absolute h-40 w-40 top-55 left-45"src="/inicio/Bloque.svg" alt="Bloque"/>
        </div>
        
    </>
 );
}

export default Inicio;