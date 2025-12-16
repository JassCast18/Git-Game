import React from 'react'

function Arbol({
    className = "",
    size = 10,
}
) {

  return (
    <img
        src='/inicio/Arbol.svg'
        alt='Arbol'
        className={`absolute ${className}`}
        style={{
            width: `${size * 4}px`,
            height: `${size * 4}px`,
        }}
    />
  )
}

export default Arbol