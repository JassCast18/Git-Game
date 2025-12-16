import React from 'react'

function LetreroButton({
    className = "",
    size = 40,  
}) {
  return (
    <img
    src='/inicio/Letter.svg'
    alt='Letter'
    className={`absolute ${className}`}
    style={{
        width: `${size * 4}px`,
        height: `${size * 4}px`,
    }}
    />
  )
}

export default LetreroButton