// api/lib/YearDataClass.js

export class YearDataClass {
  constructor(githubClient) {
    this.githubClient = githubClient;
  }

  /**
   * Obtiene los datos de actividad del año y estadísticas generales
   * @param {string} username - El nombre de usuario de GitHub
   * @returns {Promise<Object>} Datos procesados para ContenidoYear
   */
  async fetchYearData(username) {
    try {
      const query = `
        query($userName:String!) {
          user(login: $userName) {
            login
            followers {
              totalCount
            }
            repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
              totalCount
              nodes {
                name
                stargazerCount
                url
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      `;

      const response = await this.githubClient.query(query, { userName: username });
      
      if (!response || !response.user) {
        throw new Error('Usuario no encontrado');
      }

      return this.processYearData(response.user);
    } catch (error) {
      console.error('Error fetching year data:', error);
      throw error;
    }
  }

  /**
   * Procesa los datos crudos de GraphQL en el formato esperado por ContenidoYear
   * @param {Object} userData - Datos del usuario desde GraphQL
   * @returns {Object} Datos formateados
   */
  processYearData(userData) {
    const { login, followers, repositories } = userData;

    // Obtener datos del usuario
    const user = {
      login,
      followers: followers.totalCount,
      public_repos: repositories.totalCount,
    };

    // Encontrar el repositorio con más estrellas
    const repoMostStars = repositories.nodes.length > 0 
      ? {
          name: repositories.nodes[0].name,
          stargazers_count: repositories.nodes[0].stargazerCount,
          html_url: repositories.nodes[0].url,
        }
      : null;

    // Procesar lenguajes dominantes
    const langCounts = {};
    repositories.nodes.forEach(repo => {
      const lang = repo.primaryLanguage?.name;
      if (lang) {
        langCounts[lang] = (langCounts[lang] || 0) + 1;
      }
    });

    const totalReposConLenguaje = Object.values(langCounts).reduce((a, b) => a + b, 0);

    const dominantLanguages = Object.entries(langCounts)
      .map(([name, count]) => ({
        name,
        value: Math.round((count / totalReposConLenguaje) * 100)
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); // Top 5

    return {
      user,
      repoMostStars,
      dominantLanguages,
    };
  }
}
