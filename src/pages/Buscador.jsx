import React from 'react';

function Buscador(){
    return (
        <div>
            <form>
                <p>Inserta tu usuario de Git...</p>
                <input type="text" placeholder='Tu user de Git' />
                <button>Buscar</button>
            </form>
        </div>
        
    );
}

export default Buscador;