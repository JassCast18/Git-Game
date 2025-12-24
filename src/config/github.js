export async function fetchGitHubUser(username) {
  if (!username) {
    return { ok: false, error: "Debes ingresar un usuario" };
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
    ]);

    if (userRes.status === 404) {
      return { ok: false, error: "Usuario no encontrado" };
    }

    if (!userRes.ok || !reposRes.ok) {
      return { ok: false, error: "Error al buscar el usuario o sus repositorios" };
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    // Repo con más estrellas (histórico)
    let repoMostStars = null;
    if (reposData.length > 0) {
      repoMostStars = reposData.reduce(
        (max, repo) =>
          repo.stargazers_count > (max?.stargazers_count || 0)
            ? repo
            : max,
        null
      );
    }

    // 🔥 REPOS ACTIVOS EN EL ÚLTIMO AÑO
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const activeRepos = reposData.filter(
      repo => new Date(repo.updated_at) >= oneYearAgo
    );

    // Lenguajes dominantes (último año)
    const languageCount = {};
    activeRepos.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] =
          (languageCount[repo.language] || 0) + 1;
      }
    });

    const totalRepos = Object.values(languageCount)
      .reduce((sum, count) => sum + count, 0);

    let dominantLanguages = [];

    if (totalRepos > 0) {
      dominantLanguages = Object.entries(languageCount)
        .map(([language, count]) => ({
          name: language,
          value: Math.round((count / totalRepos) * 100),
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
    }

    return {
      ok: true,
      data: {
        user: userData,
        repos: reposData,
        repoMostStars,
        dominantLanguages,
      }
    };
  } catch (err) {
    return {
      ok: false,
      error: "Error de conexión con GitHub"
    };
  }
}
