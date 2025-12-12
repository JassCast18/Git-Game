export async function fetchGitHubUser(username) {
  if (!username) {
    return { ok: false, error: "Debes ingresar un usuario" };
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (res.status === 404) {
      return { ok: false, error: "Usuario no encontrado" };
    }

    if (!res.ok) {
      return { ok: false, error: "Error al buscar el usuario" };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (err) {
    return {
      ok: false,
      error: "Error de conexión con GitHub"
    };
  }
}
