// components/modals/ContenidoSkills.jsx
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Datos de ejemplo (Luego podrías calcularlos basándote en los repos del usuario)
const data = [
  { subject: 'JavaScript', A: 120, fullMark: 150 },
  { subject: 'React', A: 98, fullMark: 150 },
  { subject: 'CSS/Tailwind', A: 86, fullMark: 150 },
  { subject: 'Node.js', A: 99, fullMark: 150 },
  { subject: 'SQL', A: 85, fullMark: 150 },
  { subject: 'Git', A: 65, fullMark: 150 },
];

export default function ContenidoSkills() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around text-white">
      
      {/* Texto descriptivo */}
      <div className="mb-6 md:mb-0 md:w-1/3">
        <h3 className="text-2xl font-bold mb-2 text-sky-400">Estadísticas de Jugador</h3>
        <p className="text-gray-400 text-sm">
          Basado en el análisis de repositorios públicos. Se destaca un alto nivel en Frontend y Lógica de servidor.
        </p>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between border-b border-gray-700 pb-1">
            <span>Nivel:</span> <span className="font-mono text-yellow-400">JUNIOR ADVANCED</span>
          </li>
          <li className="flex justify-between border-b border-gray-700 pb-1">
            <span>Clase:</span> <span className="font-mono text-purple-400">Full Stack Mage</span>
          </li>
        </ul>
      </div>

      {/* Gráfico */}
      <div className="h-[300px] w-full md:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#4b5563" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="Mike"
              dataKey="A"
              stroke="#0ea5e9"
              strokeWidth={3}
              fill="#0ea5e9"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}