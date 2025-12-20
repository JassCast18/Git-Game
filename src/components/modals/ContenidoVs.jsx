// components/modals/ContenidoVersus.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useGame } from '../../Context/GameContext';

// Datos iniciales vacíos o de ejemplo
const initialData = [
  { name: 'Repos', yo: 40, rival: 0 },
  { name: 'Followers', yo: 25, rival: 0 },
  { name: 'Stars', yo: 100, rival: 0 },
];

export default function ContenidoVS() {
  const { player } = useGame();
  const [rivalName, setRivalName] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(initialData);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Aquí harías el fetch a la API de GitHub para 'rivalName'
    // SIMULACIÓN:
    setTimeout(() => {
      setChartData([
        { name: 'Repos', yo: 40, rival: Math.floor(Math.random() * 60) },
        { name: 'Followers', yo: 25, rival: Math.floor(Math.random() * 50) },
        { name: 'Stars', yo: 100, rival: Math.floor(Math.random() * 200) },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="text-white">
      {/* Buscador de Rival */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-8 justify-center">
        <input 
          type="text" 
          placeholder="Usuario de GitHub rival..." 
          className="bg-slate-800 border border-slate-600 rounded px-4 py-2 text-white focus:outline-none focus:border-sky-500 w-64"
          value={rivalName}
          onChange={(e) => setRivalName(e.target.value)}
        />
        <button 
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded font-bold uppercase disabled:opacity-50"
        >
          {loading ? 'Buscando...' : 'FIGHT!'}
        </button>
      </form>

      {/* Arena de Combate (Gráfico) */}
      <div className="h-[300px] w-full bg-slate-800/50 rounded-lg p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend />
            <Bar dataKey="yo" name={player.username} fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="rival" name={rivalName || "Rival"} fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}