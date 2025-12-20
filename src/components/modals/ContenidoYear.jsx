// components/modals/ContenidoYear.jsx
import { GitHubCalendar } from 'react-github-calendar';
import { useGame } from '../../Context/GameContext'; // Asumo que aquí tienes el username

export default function ContenidoYear() {
  const { player } = useGame();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-white">
      <p className="text-gray-300">
        Este es el registro de actividad de <span className="font-bold text-lime-400">{player.username}</span> durante el último año.
      </p>
      
      <div className="p-4 bg-black/30 rounded-lg border border-white/10">
        <GitHubCalendar 
          username={player.username} 
          colorScheme='dark'
          blockSize={14}
          fontSize={16}
         
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold">1,234</h3>
          <span className="text-xs text-gray-400 uppercase">Contribuciones</span>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-lime-400">12</h3>
          <span className="text-xs text-gray-400 uppercase">Racha Actual</span>
        </div>
      </div>
    </div>
  );
}