// components/modals/ContenidoSkills.jsx
import { useMemo } from 'react';
import { useGame } from '../../Context/GameContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const COLORS = ['#22c55e', '#38bdf8', '#a78bfa', '#facc15', '#fb7185', '#10b981'];

export default function ContenidoSkills() {
  const { player, loading } = useGame();
  const skills = player?.data?.skills;

  const safeSkills = skills || {
    languageUsage: [],
    skillRadar: [],
    totalStars: 0,
    totalForks: 0,
    topRepo: null,
    activeRepos: 0,
    contributions: { commits: 0, pullRequests: 0, issues: 0, reposCreated: 0 },
  };

  const radarData = safeSkills.skillRadar || [];
  const topLangs = safeSkills.languageUsage || [];

 
  if (loading) return <p className="text-white text-center">Cargando información...</p>;
  if (!skills) return <p className="text-white text-center">No hay datos de habilidades disponibles.</p>;

  return (
    <div className="flex flex-col space-y-8 text-white w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Estrellas totales" value={safeSkills.totalStars} />
        <StatCard title="Forks totales" value={safeSkills.totalForks} />
        <StatCard title="Repos activos (6m)" value={safeSkills.activeRepos} />
        <StatCard title="PRs abiertos" value={safeSkills.contributions.pullRequests} />
      </div>

      {/* Lenguajes principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-white/10 rounded-lg p-6 bg-black/20">
          <h3 className="text-lg font-semibold mb-4 text-lime-400">Lenguajes principales</h3>
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topLangs}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #666', borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#22c55e" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2">Porcentaje sobre todos tus repos públicos.</p>
        </div>

        <div className="border border-white/10 rounded-lg p-6 bg-black/20">
          <h3 className="text-lg font-semibold mb-4 text-lime-400">Radar de habilidades</h3>
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#4b5563" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'white', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="A"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fill="#38bdf8"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2">Agrupado por tipo de skill (Frontend, Backend, DevOps, etc.).</p>
        </div>
      </div>

      {/* Proyecto destacado y contribuciones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-white/10 rounded-lg p-4 bg-black/20 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2 text-lime-400">Proyecto con más impacto</h3>
          {safeSkills.topRepo ? (
            <div className="space-y-1">
              <a href={safeSkills.topRepo.url} target="_blank" rel="noopener noreferrer" className="text-lime-300 hover:underline text-sm font-semibold">
                {safeSkills.topRepo.name}
              </a>
              <p className="text-xs text-gray-400">{safeSkills.topRepo.stars} estrellas · {safeSkills.topRepo.forks} forks</p>
            </div>
          ) : <p className="text-sm text-gray-400">No se encontraron repos públicos.</p>}
        </div>

        <div className="border border-white/10 rounded-lg p-4 bg-black/20">
          <h3 className="text-lg font-semibold mb-2 text-lime-400">Contribuciones</h3>
          <ul className="text-sm text-gray-200 space-y-1">
            <li>Commits: {safeSkills.contributions.commits}</li>
            <li>Pull Requests: {safeSkills.contributions.pullRequests}</li>
            <li>Issues: {safeSkills.contributions.issues}</li>
            <li>Repos creados: {safeSkills.contributions.reposCreated}</li>
          </ul>
          <p className="text-xs text-gray-400 mt-2">Resumen según datos disponibles de GitHub (puede reflejar actividad reciente).</p>
        </div>
      </div>

      
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="border border-white/10 rounded-lg p-4 bg-black/20">
      <h4 className="text-sm text-gray-400 uppercase mb-1">{title}</h4>
      <p className="text-2xl font-bold text-lime-400">{value}</p>
    </div>
  );
}