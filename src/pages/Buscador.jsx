import { useEffect, useState } from 'react';
import { FaGithub } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { fetchGitHubUser } from '../config/github';
import { CgCloseR } from "react-icons/cg";


function Buscador() {
  //Creaccion de las estrellas de fondo
  const estrellas = [
    { id: 1, styles: "top-4 right-4 w-20 rotate-15" },
    { id: 2, styles: "top-24 right-4 w-10 rotate-45" },
    { id: 3, styles: "top-20 right-24 w-8 rotate-75" },
    { id: 4, styles: "top-3 right-24 w-15 rotate-30" },
    { id: 5, styles: "top-29 right-13 w-16 rotate-30" },
    { id: 6, styles: "top-4 right-40 w-10 rotate-15" },
    //estrellas de la izquierda -->
    { id: 7, styles: "bottom-4 left-4 w-20 rotate-15" },
    { id: 8, styles: "bottom-24 left-4 w-10 rotate-45" },
    { id: 9, styles: "bottom-20 left-24 w-8 rotate-75" },
    { id: 10, styles: "bottom-3 left-24 w-15 rotate-30" },
    { id: 11, styles: "bottom-29 left-13 w-16 rotate-30" },
    { id: 12, styles: "bottom-4 left-40 w-10 rotate-15" },
  ]

  //estado para reconocer el usuario del input
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  async function handleSearch() {
    if (!username.trim()) {
      setError("El usuario no puede estar vacio");
      setResult(null);
      return;
    }

    const res = await fetchGitHubUser(username);

    if (!res.ok) {
      setError(res.error);
      setResult(null);
      return;
    }
    setResult(res.data);
    setError(null);
    console.log(res.data);
  }


  return (<>
    {error && (
      <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-9999 bg-blue-500 px-7 pt-7 pb-2 rounded-lg shadow-lg '>
        <div className="absolute inset-0 bottom-1 left-1 bg-sky-950 opacity-50 rounded-lg w-5 h-5 my-2"></div>
        <div className="absolute inset-0 bottom-1 left-7 bg-sky-950 opacity-50 rounded-lg w-5 h-5 my-2"></div>
        <div className="absolute inset-0 bottom-1 left-13 bg-sky-950 opacity-50 rounded-lg w-5 h-5 my-2"></div>
        <button className="absolute top-4 right-4 text-4xl text-red-500 hover:text-red-600 hover:text-5xl" onClick={() => setError(null)}><CgCloseR/></button>
        <div
          className=" bg-gray-50 text-black p-7 rounded-lg shadow-lg my-1"
        >
          <p className='text-xl p-4'>{error}</p>

          <button
            onClick={() => setError(null)}
            className="ml-4 bg-blue-500 text-black px-5 py-1 rounded-md hover:bg-sky-200 mt-2 text-xs "
          >
            Cerrar
          </button>
        </div>
      </div>

    )}
    <div className=" relative min-h-screen flex flex-col items-center justify-center bg-sky-950">
      {estrellas.map(estrella => (
        <img
          key={estrella.id}
          src="/inicio/estrella.svg"
          alt="star"
          className={`absolute ${estrella.styles} animate-pulse`}
        />
      ))}


      <h1 className="text-white mb-6 text-center text-base ">Busca tu usuario de Git Hub  para iniciar el juego...</h1>
      <div className="flex items-center w-full max-w-2xl">

        {/* 🔳 Caja gris con icono + input */}
        <div className="flex items-center gap-3 bg-black/10 backdrop-blur-md p-4 rounded-l-2xl shadow-lg flex-1">
          <FaGithub className="text-4xl text-white" />
          <input type="text" placeholder="Buscar..." className="flex-1 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      
        {/* 🔘 Botón afuera pero a la par */}
        <button onClick={handleSearch} className="px-4 py-1 rounded-r-xl bg-white/20 text-white hover:bg-white/30 backdrop-blur-md min-h-20">
          <ImSearch className="text-4xl text-white" />
        </button>

      </div>
    </div>
  </>

  );
}
export default Buscador;