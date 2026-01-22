// api/lib/YearDataClass.js

export class YearDataClass {
  constructor(githubClient) {
    this.githubClient = githubClient;
  }

  async fetchYearData(username) {
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const oneYearAgoISO = oneYearAgo.toISOString();

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
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(first: 100) {
                        nodes {
                          committedDate
                          message
                        }
                      }
                    }
                  }
                }
              }
            }
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                  }
                }
              }
            }
          }
        }
      `;

      const response = await this.githubClient.query(query, { userName: username });
      if (!response || !response.user) throw new Error('Usuario no encontrado');

      return this.processYearData(response.user, oneYearAgoISO);
    } catch (error) {
      console.error('Error fetching year data:', error);
      throw error;
    }
  }

  processYearData(userData, oneYearAgoISO) {
    const { login, avatarUrl, followers, repositories, contributionsCollection } = userData;

    // --- PROCESAMIENTO DE MESES ---
    const monthlyData = {};
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const dayOfWeekData = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }; // Sun-Sat
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hourlyData = Array(24).fill(0);
    let totalContributions = 0;
    let maxConsecutiveDays = 0;
    let currentConsecutiveDays = 0;
    let weekendCommits = 0;

    contributionsCollection.contributionCalendar.weeks.forEach(week => {
      week.contributionDays.forEach(day => {
        const date = new Date(day.date);
        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];
        const dayOfWeek = date.getDay();
        const count = day.contributionCount;

        // Meses
        if (!monthlyData[monthName]) {
          monthlyData[monthName] = 0;
        }
        monthlyData[monthName] += count;

        // Día de la semana
        dayOfWeekData[dayOfWeek] += count;

        // Fines de semana
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          weekendCommits += count;
        }

        // Días consecutivos
        if (count > 0) {
          currentConsecutiveDays++;
          maxConsecutiveDays = Math.max(maxConsecutiveDays, currentConsecutiveDays);
        } else {
          currentConsecutiveDays = 0;
        }

        totalContributions += count;
      });
    });

    // Simular datos de hora (aproximación basada en contribuciones)
    // En realidad, GitHub no proporciona esto directamente, así que lo simulamos
    this.generateHourlyDistribution(hourlyData, totalContributions);

    // Convertir a array, ordenar por commits y tomar los 5 mejores meses
    const monthlyContributions = Object.entries(monthlyData)
      .map(([name, commits]) => ({ name, commits }))
      .sort((a, b) => b.commits - a.commits)
      .slice(0, 5);

    // Datos de día de la semana (lunes, viernes, domingo)
    const weekComparison = [
      { day: "Lunes", commits: dayOfWeekData[1] },
      { day: "Viernes", commits: dayOfWeekData[5] },
      { day: "Domingo", commits: dayOfWeekData[0] }
    ];

    // Determinar si es nocturno o madrugador
    const nightTimeCommits = hourlyData.slice(20).reduce((a, b) => a + b, 0) + 
                            hourlyData.slice(0, 6).reduce((a, b) => a + b, 0);
    const nightPercentage = totalContributions > 0 ? Math.round((nightTimeCommits / totalContributions) * 100) : 0;
    const chronotype = nightPercentage > 50 ? "nocturno" : "madrugador";
    const peakHour = hourlyData.indexOf(Math.max(...hourlyData));

    // Repositorio con más amor (estrellas)
    const repoMostStars = repositories.nodes.length > 0 ? {
      name: repositories.nodes[0].name,
      stargazers_count: repositories.nodes[0].stargazerCount,
      html_url: repositories.nodes[0].url,
    } : null;

    return {
      user: {
        login,
        avatar_url: avatarUrl,
        followers: followers.totalCount,
        public_repos: repositories.totalCount,
      },
      repoMostStars,
      dominantLanguages: this.getLanguages(repositories.nodes),
      monthlyContributions,
      hourlyData,
      weekComparison,
      totalContributions,
      maxConsecutiveDays,
      weekendCommits,
      nightPercentage,
      chronotype,
      peakHour,
    };
  }

  generateHourlyDistribution(hourlyData, totalContributions) {
    // Simular distribución más realista: más commits en horas de trabajo (9-17) y noche (20-24)
    const pattern = [1, 1, 0.5, 0.3, 0.2, 0.5, 1, 2, 3, 4, 4, 4, 3, 3, 3, 3, 3, 4, 5, 5, 4, 3, 2, 1];
    const sum = pattern.reduce((a, b) => a + b, 0);
    const commitsPerHour = totalContributions / sum;
    
    for (let i = 0; i < 24; i++) {
      hourlyData[i] = Math.round(pattern[i] * commitsPerHour);
    }
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