import { GitHubCalendar } from 'react-github-calendar';
import { useGame } from '../../Context/GameContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#22c55e", "#38bdf8", "#a78bfa", "#facc15", "#fb7185"];

export default function ContenidoYear() {
  const { player, loading } = useGame();

  if (loading || !player || !player.data) {
    return <p className="text-white text-center">Cargando información...</p>;
  }

  const { user, repoMostStars, dominantLanguages, monthlyContributions } = player.data;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-white w-full">
      <p className="text-gray-300 text-center max-w-lg">
        Este es el registro de actividad de <span className="font-bold text-lime-400">{user.login}</span> durante el último año.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 w-full max-w-6xl">
        
        {/* STATS SUPERIORES (Tus 4 bloques originales) */}
        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-2xl font-bold mt-4">{user.public_repos}</h3>
          <span className="text-xs text-gray-400 uppercase">Repositorios Públicos</span>
        </div>

        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-2xl font-bold text-lime-400 mt-4">{user.followers}</h3>
          <span className="text-xs text-gray-400 uppercase">Seguidores</span>
        </div>

        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-lg font-semibold mb-2">Este año eres</h3>
          {dominantLanguages.length > 0 ? (
            <p className="text-gray-300 text-sm">
              Protector de <span className="text-lime-400 font-bold">{dominantLanguages[0].name}</span>
            </p>
          ) : <p className="text-gray-400 text-sm">No disponible</p>}
        </div>

        {repoMostStars && (
          <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
            <h3 className="text-lg font-semibold mb-2">Repo más popular</h3>
            <a href={repoMostStars.html_url} target="_blank" rel="noopener noreferrer" className="text-lime-400 underline block truncate">
              {repoMostStars.name}
            </a>
            <p className="text-xs text-gray-400 mt-1">★ {repoMostStars.stargazers_count} estrellas</p>
          </div>
        )}

        {/* GRÁFICAS (Lado a lado en pantallas grandes) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* LENGUAJES (Circular) */}
          <div className="text-center border border-white/10 rounded-lg p-6 bg-black/20 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Lenguajes más usados</h3>
            {dominantLanguages.length > 0 ? (
              <PieChart width={300} height={250}>
                <Pie
                  data={dominantLanguages}
                  dataKey="value"
                  nameKey="name"
                  cx="50%" cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {dominantLanguages.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            ) : <p className="text-gray-400">No disponible</p>}
          </div>

          {/* 🔥 NUEVO: TOP 5 MESES (Barras) */}
          <div className="text-center border border-white/10 rounded-lg p-6 bg-black/20 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-lime-400">Meses de Máximo Poder</h3>
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyContributions}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }}
                  />
                  <Bar dataKey="commits" fill="#22c55e" radius={[5, 5, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* CALENDARIO DE GITHUB (Abajo, ocupando todo el ancho) */}
        <div className="col-span-1 sm:col-span-2 md:col-span-4 flex justify-center">
          <div className="p-4 bg-black/30 rounded-lg border border-white/10 w-full overflow-hidden flex justify-center">
            <GitHubCalendar 
              username={user.login} 
              colorScheme="dark"
              blockSize={12}
              fontSize={14}
            />
          </div>
        </div>

      </div>
    </div>
  );
}