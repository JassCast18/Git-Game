export async function fetchGitHubUser(username) {
  if (!username) {
    return { ok: false, error: "Debes ingresar un usuario" };
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`), // traemos hasta 100 repos
    ]);

    if (userRes.status === 404) {
      return { ok: false, error: "Usuario no encontrado" };
    }

    if (!userRes.ok || !reposRes.ok) {
      return { ok: false, error: "Error al buscar el usuario o sus repositorios" };
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    // Procesar repos para sacar info que quieres:
    // Ejemplo: repositorio con más commits (usaremos el que tenga más 'stargazers_count' como proxy)
    let repoMostStars = null;
    if (Array.isArray(reposData) && reposData.length > 0) {
      repoMostStars = reposData.reduce((max, repo) => (repo.stargazers_count > (max?.stargazers_count || 0) ? repo : max), null);
    }

    // Lenguajes dominantes: podemos contar el lenguaje principal de cada repo
    const languageCount = {};
    reposData.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    // Ordenar lenguajes por cantidad de repositorios que usan ese lenguaje
    const dominantLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang)
      .slice(0, 3); // Los 3 lenguajes más usados

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
