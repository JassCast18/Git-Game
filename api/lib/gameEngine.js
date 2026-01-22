// api/lib/gameEngine.js

export function calculateGamingStats(userData) {
  const { contributionsCollection, repositories, followers } = userData;

  // 1. Cálculo de XP Base
  const commitXP = (contributionsCollection?.totalCommitContributions || 0) * 10;
  const starXP = repositories.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0) * 50;
  const repoXP = (repositories.totalCount || 0) * 100;
  const followerXP = (followers?.totalCount || 0) * 25;
  const totalXP = commitXP + starXP + repoXP + followerXP;

  // 2. Cálculo de Nivel y Rango
  const level = Math.floor(Math.sqrt(totalXP / 100)) || 1;
  let rank = "🌱 Aprendiz";
  if (level >= 10) rank = "🏹 Explorador";
  if (level >= 20) rank = "⚔️ Guerrero";
  if (level >= 30) rank = "💎 Diamante";
  if (level >= 50) rank = "👑 Inmortal";

  // 3. Procesamiento de Lenguajes (Para PieChart y RadarChart)
  const langCounts = {};
  repositories.nodes.forEach(repo => {
    const lang = repo.primaryLanguage?.name;
    if (lang) langCounts[lang] = (langCounts[lang] || 0) + 1;
  });

  const totalReposConLenguaje = Object.values(langCounts).reduce((a, b) => a + b, 0);

  // Formato para el PieChart (Top 5)
  const dominantLanguages = Object.entries(langCounts)
    .map(([name, count]) => ({
      name,
      value: Math.round((count / totalReposConLenguaje) * 100)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // 🔥 FORMATO PARA EL RADAR CHART (Skills)
  // Convertimos la frecuencia de lenguajes en una puntuación de 0 a 150
  const skillsData = dominantLanguages.map(lang => ({
    subject: lang.name,
    A: Math.min(Math.round((lang.value * 1.5) + (level * 2)), 150), // Fórmula de "poder" basada en % y nivel
    fullMark: 150
  }));

  return {
    username: userData.login,
    avatar: userData.avatarUrl,
    level,
    totalXP,
    rank,
    dominantLanguages,
    skillsData, // <--- Enviamos esto para el gráfico de Radar
    class: dominantLanguages[0]?.name ? `${dominantLanguages[0].name} Mage` : "Universalist",
    stats: {
      commits: contributionsCollection.totalCommitContributions,
      stars: repositories.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0),
      repos: repositories.totalCount,
      followers: followers.totalCount
    }
  };
}