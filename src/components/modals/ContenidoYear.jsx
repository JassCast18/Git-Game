import { GitHubCalendar } from 'react-github-calendar';
import { useGame } from '../../Context/GameContext';

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

      <div className="p-4 bg-black/30 rounded-lg border border-white/10">
        <GitHubCalendar 
          username={user.login} 
          colorScheme='dark'
          blockSize={14}
          fontSize={16}
        />
      </div>

      <div className="flex gap-6 mt-6 flex-wrap justify-center">

        {/* Contribuciones y racha actuales */}
        <div className="text-center">
          <h3 className="text-2xl font-bold">{user.public_repos}</h3>
          <span className="text-xs text-gray-400 uppercase">Repositorios Públicos</span>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-lime-400">{user.followers}</h3>
          <span className="text-xs text-gray-400 uppercase">Seguidores</span>
        </div>

        {/* Lenguajes dominantes */}
        <div className="text-center max-w-xs">
          <h3 className="text-lg font-semibold mb-2">Lenguajes más usados</h3>
          <ul className="list-disc list-inside text-sm text-gray-300">
            {dominantLanguages.length > 0 ? dominantLanguages.map((lang) => (
              <li key={lang}>{lang}</li>
            )) : <li>No disponible</li>}
          </ul>
        </div>

        {/* Repositorio con más estrellas */}
        {repoMostStars && (
          <div className="text-center max-w-xs">
            <h3 className="text-lg font-semibold mb-2">Repositorio más popular</h3>
            <a 
              href={repoMostStars.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lime-400 underline hover:text-lime-600"
            >
              {repoMostStars.name}
            </a>
            <p className="text-xs text-gray-400 mt-1">
              ★ {repoMostStars.stargazers_count} estrellas
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
