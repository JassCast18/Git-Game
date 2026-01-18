// GUÍA DE INTEGRACIÓN - YearDataClass

/**
 * ESTRUCTURA DE LA NUEVA LÓGICA GraphQL
 * 
 * ✅ api/github.js
 *    └─ Conexión GraphQL + instancias de las clases
 *
 * ✅ api/lib/YearDataClass.js
 *    └─ Clase para manejar datos del modal ContenidoYear
 *
 * 📋 PRÓXIMAS CLASES (Para crear después):
 *    - SkillsDataClass.js (para ContenidoSkills)
 *    - VsDataClass.js (para ContenidoVs)
 */

/**
 * CÓMO USAR YearDataClass EN TUS COMPONENTES
 * 
 * 1. Importar el handler en tu componente
 * 2. Llamar a fetchYearData(username) cuando lo necesites
 * 
 * EJEMPLO DE USO:
 * 
 * import { yearDataHandler } from '../../../api/github.js';
 * 
 * const handleSearchUser = async (username) => {
 *   try {
 *     const yearData = await yearDataHandler.fetchYearData(username);
 *     setPlayer({
 *       data: {
 *         user: yearData.user,
 *         repoMostStars: yearData.repoMostStars,
 *         dominantLanguages: yearData.dominantLanguages,
 *       }
 *     });
 *   } catch (error) {
 *     console.error('Error:', error);
 *   }
 * };
 */

/**
 * DATOS QUE RETORNA YearDataClass.fetchYearData()
 * 
 * {
 *   user: {
 *     login: string,
 *     followers: number,
 *     public_repos: number,
 *   },
 *   repoMostStars: {
 *     name: string,
 *     stargazers_count: number,
 *     html_url: string,
 *   } | null,
 *   dominantLanguages: [
 *     { name: string, value: number },
 *     ...
 *   ]
 * }
 */

/**
 * VARIABLES DE ENTORNO NECESARIAS
 * 
 * Asegúrate de tener en tu archivo .env:
 * VITE_GITHUB_TOKEN=tu_token_aqui
 * 
 * Para obtener un token:
 * 1. Ve a https://github.com/settings/tokens/new
 * 2. Selecciona permisos: repo, public_repo, user
 * 3. Copia el token
 */

export {};
