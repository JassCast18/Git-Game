// api/github.js

import { YearDataClass } from './lib/YearDataClass.js';
import { SkillsDataClass } from './lib/SkillsDataClass.js';

/**
 * Cliente GraphQL para GitHub
 */
class GitHubGraphQLClient {
  constructor(token) {
    this.token = token;
    this.endpoint = 'https://api.github.com/graphql';
  }

  /**
   * Ejecuta una consulta GraphQL
   * @param {string} query - La consulta GraphQL
   * @param {Object} variables - Variables para la consulta
   * @returns {Promise<Object>} Respuesta de la API
   */
  async query(query, variables = {}) {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
      }

      return data.data;
    } catch (error) {
      console.error('GraphQL Query Error:', error);
      throw error;
    }
  }
}

/**
 * Instancia del cliente GraphQL
 */
const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
if (!githubToken) {
  console.warn('⚠️ VITE_GITHUB_TOKEN no está configurado. Agrega un token en tu archivo .env');
}

const githubClient = new GitHubGraphQLClient(githubToken);

/**
 * Instancia de YearDataClass
 */
export const yearDataHandler = new YearDataClass(githubClient);

/**
 * Instancia de SkillsDataClass (datos de habilidades a lo largo del tiempo)
 */
export const skillsDataHandler = new SkillsDataClass(githubClient);

// Exportar el cliente para futuras clases
export { GitHubGraphQLClient, githubClient };
