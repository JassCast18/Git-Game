import React from 'react';

function Buscador() {
  const estrellas =[
    { id:1 , styles: "top-4 right-4 w-20 rotate-15"},
    { id:2 , styles: "top-24 right-4 w-10 rotate-45"},
    { id:3 , styles: "top-20 right-24 w-8 rotate-75"},
    { id:4 , styles: "top-3 right-24 w-15 rotate-30"},
    { id:5 , styles: "top-29 right-13 w-16 rotate-30"},
    { id:6 , styles: "top-4 right-40 w-10 rotate-15"},
    { id:7 , styles: "bottom-4 left-4 w-20 rotate-15"},
    { id:8 , styles: "bottom-24 left-4 w-10 rotate-45"},
    { id:9 , styles: "bottom-20 left-24 w-8 rotate-75"},
    { id:10 , styles: "bottom-3 left-24 w-15 rotate-30"},
    { id:11 , styles: "bottom-29 left-13 w-16 rotate-30"},
    { id:12 , styles: "bottom-4 left-40 w-10 rotate-15"},
  ]
  return (

    <div className=" relative min-h-screen flex flex-col items-center justify-center bg-gray-700">
      {estrellas.map(estrella =>(
        <img
        key={estrella.id}
        src="/inicio/estrella.svg"
        alt="star"
        className={`absolute ${estrella.styles} animate-pulse`}
      />
      ))}
      
      
      <h1 className="text-white mb-6 text-center text-base ">Busca tu usuario de Git Hub para iniciar el juego...</h1>
      <div className="bg-black/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md">
        
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none"
        />
      </div>
    </div>


  );
}

export default Buscador;