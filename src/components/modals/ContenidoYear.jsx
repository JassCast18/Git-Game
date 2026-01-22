import { GitHubCalendar } from 'react-github-calendar';
import { useGame } from '../../Context/GameContext';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid } from "recharts";

const COLORS = ["#22c55e", "#38bdf8", "#a78bfa", "#facc15", "#fb7185"];


export default function ContenidoYear() {
  const { player, loading } = useGame();

  if (loading || !player || !player.data) {
    return <p className="text-white text-center">Cargando información...</p>;
  }

  const data = player.data;
  const { user, repoMostStars, dominantLanguages, monthlyContributions, hourlyData, weekComparison, totalContributions, maxConsecutiveDays, weekendCommits, nightPercentage, chronotype, peakHour } = data;


  // Preparar datos para el gráfico de dispersión (hora vs distribución)
  const hourlyChartData = hourlyData.map((commits, hour) => ({
    hour: `${hour}:00`,
    commits,
    hourNum: hour
  }));

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-white w-full">
      <p className="text-gray-300 text-center max-w-lg">
        Este es el registro de actividad de <span className="font-bold text-lime-400">{user.login}</span> durante el último año.
      </p>

      {/* STATS PRINCIPALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-2xl font-bold text-lime-400 mt-4">{totalContributions}</h3>
          <span className="text-xs text-gray-400 uppercase">Total de Commits</span>
        </div>

        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-2xl font-bold text-lime-400 mt-4">{maxConsecutiveDays}</h3>
          <span className="text-xs text-gray-400 uppercase">Días Consecutivos</span>
        </div>

        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-2xl font-bold text-lime-400 mt-4">{user.followers}</h3>
          <span className="text-xs text-gray-400 uppercase">Seguidores</span>
        </div>

        <div className="text-center border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-2xl font-bold text-lime-400 mt-4">{user.public_repos}</h3>
          <span className="text-xs text-gray-400 uppercase">Repositorios</span>
        </div>
      </div>

      {/* GRÁFICOS PRINCIPALES */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* HORA DEL DÍA - Mapa de calor */}
        <div className="border border-white/10 rounded-lg p-6 bg-black/20">
          <h3 className="text-lg font-semibold mb-4 text-lime-400">Actividad por Hora del Día</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  tick={{ angle: -45, textAnchor: 'end', height: 60 }}
                />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #666', borderRadius: '8px' }}
                  formatter={(value) => [`${value} commits`, 'Actividad']}
                />
                <Bar 
                  dataKey="commits" 
                  fill="#38bdf8"
                  radius={[5, 5, 0, 0]}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-3 bg-blue-900/20 rounded border border-blue-400/30">
            <p className="text-sm text-blue-200">
              {chronotype === "nocturno" ? "Ave nocturna:" : "Madrugador:"} El {nightPercentage}% de tu código se escribió fuera de horario laboral.
            </p>
          </div>
        </div>

        {/* COMPARATIVA DÍAS DE LA SEMANA */}
        <div className="border border-white/10 rounded-lg p-6 bg-black/20">
          <h3 className="text-lg font-semibold mb-4 text-lime-400">Comparativa: Lunes vs Viernes vs Domingo</h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #666', borderRadius: '8px' }}
                  formatter={(value) => [`${value} commits`, 'Actividad']}
                />
                <Bar dataKey="commits" fill="#22c55e" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE LOGROS Y ESTADÍSTICAS */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Fines de semana */}
        <div className="border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-lg font-semibold mb-2 text-lime-400">Fines de Semana</h3>
          <p className="text-2xl font-bold text-lime-300">{weekendCommits}</p>
          <p className="text-xs text-gray-400 mt-1">
            Commits en sábados y domingos ({Math.round((weekendCommits / totalContributions) * 100)}%)
          </p>
        </div>

        {/* Lenguaje dominante */}
        {dominantLanguages.length > 0 && (
          <div className="border border-white/10 rounded-lg p-4 bg-black/20">
            <h3 className="text-lg font-semibold mb-2 text-lime-400">Lenguaje Favorito</h3>
            <p className="text-2xl font-bold text-lime-300">{dominantLanguages[0].name}</p>
            <p className="text-xs text-gray-400 mt-1">
              {dominantLanguages[0].value}% de tus proyectos
            </p>
          </div>
        )}

        {/* Repo más popular */}
        {repoMostStars && (
          <div className="border border-white/10 rounded-lg p-4 bg-black/20">
            <h3 className="text-lg font-semibold mb-2 text-lime-400">Proyecto Estrella</h3>
            <a 
              href={repoMostStars.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lime-300 hover:underline block truncate text-sm font-semibold"
            >
              {repoMostStars.name}
            </a>
            <p className="text-xs text-gray-400 mt-1">
              {repoMostStars.stargazers_count} estrellas
            </p>
          </div>
        )}
      </div>

      {/* LENGUAJES Y MESES */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Pie chart de lenguajes */}
        <div className="border border-white/10 rounded-lg p-6 bg-black/20 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Lenguajes Más Usados</h3>
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

        {/* Bar chart de meses */}
        <div className="border border-white/10 rounded-lg p-6 bg-black/20 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4 text-lime-400">Top 5 Meses</h3>
          <div className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyContributions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
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

      
      {/* CALENDARIO DE GITHUB (Final) */}
      <div className="w-full max-w-6xl">
        <div className="p-4 bg-black/30 rounded-lg border border-white/10 w-full overflow-auto flex justify-center">
          <GitHubCalendar 
            username={user.login} 
            colorScheme="dark"
            blockSize={12}
            fontSize={14}
          />
        </div>
      </div>

    </div>
  );
}