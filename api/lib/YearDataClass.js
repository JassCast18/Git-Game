// api/lib/YearDataClass.js

export class YearDataClass {
  constructor(githubClient) {
    this.githubClient = githubClient;
  }

  async fetchYearData(username) {
    try {
      const query = `
        query($userName:String!) {
          user(login: $userName) {
            login
            avatarUrl
            followers { totalCount }
            repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
              totalCount
              nodes {
                name
                stargazerCount
                url
                primaryLanguage { name }
              }
            }
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `;

      const response = await this.githubClient.query(query, { userName: username });
      if (!response || !response.user) throw new Error('Usuario no encontrado');

      return this.processYearData(response.user);
    } catch (error) {
      console.error('Error fetching year data:', error);
      throw error;
    }
  }

  processYearData(userData) {
    const { login, avatarUrl, followers, repositories, contributionsCollection } = userData;

    // --- PROCESAMIENTO DE MESES CORREGIDO ---
    const monthlyData = {};
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    contributionsCollection.contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        const date = new Date(day.date);
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];

        if (!monthlyData[monthName]) {
          monthlyData[monthName] = 0;
        }
        monthlyData[monthName] += day.contributionCount;
      });
    });

    // Convertir a array, ordenar por commits y tomar los 5 mejores
    const monthlyContributions = Object.entries(monthlyData)
      .map(([name, commits]) => ({ name, commits }))
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);

    // ... resto de tu lógica de lenguajes y retorno ...
    return {
      user: {
        login,
        avatar_url: avatarUrl,
        followers: followers.totalCount,
        public_repos: repositories.totalCount,
      },
      repoMostStars: repositories.nodes.length > 0 ? {
        name: repositories.nodes[0].name,
        stargazers_count: repositories.nodes[0].stargazerCount,
        html_url: repositories.nodes[0].url,
      } : null,
      dominantLanguages: this.getLanguages(repositories.nodes),
      monthlyContributions, 
    };
  }

  getLanguages(nodes) {
    const langCounts = {};
    nodes.forEach(repo => {
      const lang = repo.primaryLanguage?.name;
      if (lang) langCounts[lang] = (langCounts[lang] || 0) + 1;
    });
    const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
    return Object.entries(langCounts)
      .map(([name, count]) => ({ name, value: Math.round((count / total) * 100) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }
}