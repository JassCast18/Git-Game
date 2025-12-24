import { GitHubCalendar } from 'react-github-calendar';
import { useGame } from '../../Context/GameContext';
import { PieChart, Pie, Cell } from "recharts";

const COLORS = [
  "#22c55e", // verde
  "#38bdf8", // azul
  "#a78bfa", // morado
  "#facc15", // amarillo
  "#fb7185", // rojo
];


export default function ContenidoYear() {
  const { player } = useGame();

  if (!player || !player.data) {
    return <p className="text-white">Cargando información...</p>;
  }

  const { user, repoMostStars, dominantLanguages } = player.data;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-white">
      <p className="text-gray-300 text-center max-w-lg">
        Este es el registro de actividad de <span className="font-bold text-lime-400">{user.login}</span> durante el último año.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-6 mt-6 w-full max-w-6xl">

        {/* STATS SUPERIORES */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


          <div className="text-center border border-white/10 rounded-lg p-4">
            <h3 className="text-2xl font-bold mt-4">{user.public_repos}</h3>
            <span className="text-xs text-gray-400 uppercase">
              Repositorios Públicos
            </span>
          </div>
          <div className="text-center border border-white/10 rounded-lg p-4">
            <h3 className="text-2xl font-bold text-lime-400 mt-4">{user.followers}</h3>
            <span className="text-xs text-gray-400 uppercase">
              Seguidores
            </span>
          </div>

          <div className="text-center border border-white/10 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">
              Este año te coronamos
            </h3>
            {dominantLanguages.length > 0 ? (
              <p className="text-gray-300 text-sm">
                Maestro protector de{" "}
                <span className="text-lime-400 font-bold">
                  {dominantLanguages[0].name}
                </span>
              </p>
            ) : (
              <p className="text-gray-400 text-sm">No disponible</p>
            )}
          </div>

          {repoMostStars && (
            <div className="text-center border border-white/10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                Repositorio más popular
              </h3>
              <a
                href={repoMostStars.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 underline"
              >
                {repoMostStars.name}
              </a>
              <p className="text-xs text-gray-400 mt-1">
                ★ {repoMostStars.stargazers_count} estrellas
              </p>
            </div>
          )}

        </div>
        {/* GRÁFICA CENTRAL */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex justify-center">

          <div className="text-center border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              Lenguajes más usados
            </h3>

            {dominantLanguages.length > 0 ? (
              <PieChart width={360} height={260} className="sm:w-[360px]">
                <Pie
                  data={dominantLanguages}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {dominantLanguages.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            ) : (
              <p className="text-gray-400">No disponible</p>
            )}
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-12 flex justify-center">

          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <GitHubCalendar
              username={user.login}
              colorScheme="dark"
              blockSize={14}
              fontSize={16}
            />
          </div>
        </div>


      </div>    
      </div>
      );
}
