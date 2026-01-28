//Esta clase es para obtener datos de persona buscada en git
export class SkillsDataClass {
  constructor(githubClient) {
    this.githubClient = githubClient; // un constructor con el que definimos la variable gitHubClient
  }

  async fetchSkillsData(username) {
    const query = `
      query($userName:String!) {
        user(login: $userName) {
          login
          avatarUrl
          followers { totalCount }
          repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, orderBy: {field: STARGAZERS, direction: DESC}) {
            totalCount
            nodes {
              name
              url
              stargazerCount
              forkCount
              updatedAt
              primaryLanguage { name }
              languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
                edges { size node { name } }
              }
              issues(states: OPEN) { totalCount }
              pullRequests(states: OPEN) { totalCount }
            }
          }
          contributionsCollection {
            totalCommitContributions
            totalPullRequestContributions
            totalIssueContributions
            totalRepositoryContributions
          }
        }
      }
    `;

    const response = await this.githubClient.query(query, { userName: username });
    if (!response || !response.user) throw new Error('Usuario no encontrado');

    return this.processSkillsData(response.user);
  }

  processSkillsData(userData) {
    const { login, avatarUrl, followers, repositories, contributionsCollection } = userData;
    const repos = repositories?.nodes || [];

    // Acumular uso de lenguajes por tamaño (si hay datos) o por conteo de repos
    const langTotals = {};
    repos.forEach(repo => {
      const edges = repo.languages?.edges || [];
      if (edges.length) {
        edges.forEach(({ size, node }) => {
          if (!node?.name) return;
          langTotals[node.name] = (langTotals[node.name] || 0) + (size || 0);
        });
      } else if (repo.primaryLanguage?.name) {
        // fallback si no hay tamaños
        langTotals[repo.primaryLanguage.name] = (langTotals[repo.primaryLanguage.name] || 0) + 1;
      }
    });

    const totalLangSize = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
    const languageUsage = Object.entries(langTotals)
      .map(([name, value]) => ({ name, value: Math.round((value / totalLangSize) * 100) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);

    const skillRadar = this.buildSkillRadar(langTotals);

    // Stars / forks / top repo
    let totalStars = 0;
    let totalForks = 0;
    let topRepo = null;
    repos.forEach(repo => {
      totalStars += repo.stargazerCount || 0;
      totalForks += repo.forkCount || 0;
      if (!topRepo || (repo.stargazerCount || 0) > topRepo.stars) {
        topRepo = {
          name: repo.name,
          stars: repo.stargazerCount || 0,
          forks: repo.forkCount || 0,
          url: repo.url,
        };
      }
    });

    const activeRepos = repos.filter(repo => {
      const updated = new Date(repo.updatedAt);
      const daysDiff = (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 180; // activos en últimos 6 meses
    }).length;

    const contributions = {
      commits: contributionsCollection?.totalCommitContributions || 0,
      pullRequests: contributionsCollection?.totalPullRequestContributions || 0,
      issues: contributionsCollection?.totalIssueContributions || 0,
      reposCreated: contributionsCollection?.totalRepositoryContributions || 0,
    };

    return {
      user: {
        login,
        avatar_url: avatarUrl,
        followers: followers?.totalCount || 0,
        public_repos: repositories?.totalCount || 0,
      },
      languageUsage,
      skillRadar,
      totalStars,
      totalForks,
      topRepo,
      activeRepos,
      contributions,
    };
  }

  buildSkillRadar(langTotals) {
    // Mapear lenguajes a áreas de habilidad
    const clusters = {
      Frontend: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Vue', 'Svelte', 'Astro', 'TSX', 'JSX'],
      Backend: ['Node', 'Node.js', 'Java', 'Kotlin', 'C#', 'Go', 'PHP', 'Ruby', 'Scala', 'Elixir', 'Rust'],
      Data: ['Python', 'R', 'SQL', 'PLpgSQL', 'PLSQL'],
      DevOps: ['Dockerfile', 'Shell', 'Bash', 'PowerShell', 'HCL', 'YAML'],
      Mobile: ['Swift', 'Objective-C', 'Kotlin', 'Java', 'Dart'],
      Game: ['C++', 'C#', 'Rust'],
    };

    const clusterTotals = {};
    Object.entries(langTotals).forEach(([lang, value]) => {
      Object.entries(clusters).forEach(([cluster, langs]) => {
        if (langs.includes(lang)) {
          clusterTotals[cluster] = (clusterTotals[cluster] || 0) + value;
        }
      });
    });

    const sum = Object.values(clusterTotals).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(clusterTotals)
      .map(([name, value]) => ({ subject: name, A: Math.round((value / sum) * 100), fullMark: 100 }))
      .sort((a, b) => b.A - a.A);
  }
}
