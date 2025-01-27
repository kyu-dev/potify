const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const clientId = "c993e1aa52b24e3aa4c19d9a059c42d5";
const redirectUri = "http://localhost:5173/";
const scope = "user-read-private user-read-email playlist-modify-public playlist-modify-private";

// Génère un code verifier pour PKCE
const generateCodeVerifier = () => {
  const array = new Uint32Array(56);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join("");
};

// Génère un code challenge (SHA-256) à partir du code verifier
const generateCodeChallenge = async (codeVerifier) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Démarre le processus d'authentification
export const authenticateSpotify = async () => {
  const codeVerifier = generateCodeVerifier();
  window.localStorage.setItem("code_verifier", codeVerifier);

  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams(params).toString()}`;
  window.location.href = authUrl; // Redirige l'utilisateur
};

// Échange le code d'autorisation contre un token
const getToken = async (code) => {
  const codeVerifier = localStorage.getItem("code_verifier");

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  const response = await fetch(url, payload);
  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token); // Sauvegarde le refresh token
    console.log("Access token et refresh token stockés.");
  } else {
    console.error("Erreur lors de la récupération du token :", data);
  }
};

// Rafraîchit le token d'accès
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    console.error("Le token de rafraîchissement est manquant. Veuillez vous réauthentifier.");
    return;
  }

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  };

  try {
    const response = await fetch(url, payload);
    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("access_token", data.access_token);
      console.log("Access token rafraîchi avec succès.");
      return data.access_token;
    } else {
      console.error("Erreur lors du rafraîchissement du token :", data);
      return null;
    }
  } catch (error) {
    console.error("Erreur lors de la requête de rafraîchissement :", error);
    return null;
  }
};

// Recherche de morceaux sur Spotify
export const searchSpotify = async (searchTerm) => {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    console.warn("Token manquant ou expiré. Tentative de rafraîchissement...");
    accessToken = await refreshAccessToken();
    if (!accessToken) {
      console.error("Impossible de rafraîchir le token. Veuillez vous réauthentifier.");
      return [];
    }
  }

  try {
    const url = `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erreur lors de la recherche de morceaux: ${errorData.error.message}`);
    }

    const data = await response.json();
    return data.tracks.items; // Retourne les morceaux trouvés
  } catch (error) {
    console.error("Erreur API Spotify:", error);
    return [];
  }
};

// Exemple : gestion du code d'autorisation dans l'URL
const handleRedirect = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    await getToken(code);
    window.history.replaceState({}, document.title, "/"); // Nettoie l'URL après récupération du token
  }
};

// Appelle la fonction lors du chargement initial
handleRedirect();

export const createPlaylist = async (playlistData) => {
  const accessToken = localStorage.getItem("access_token");
  const userId = await getUserId(accessToken);

  const dataToSend = {
    name: playlistData.name,
    tracks: [] // On initialise les tracks ici, on les ajoutera plus tard
  };

  const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend)
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création de la playlist');
  }

  const playlist = await response.json();
  return playlist.id; // Retourne l'ID de la playlist créée
};

// Nouvelle fonction pour ajouter des morceaux à la playlist
export const addTracksToPlaylist = async (playlistId, trackUris) => {
  const accessToken = localStorage.getItem("access_token");

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uris: trackUris }) // Les URIs des morceaux à ajouter
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'ajout des morceaux à la playlist');
  }

  return await response.json(); // Retourne la réponse de l'API
};

// Fonction pour obtenir l'ID de l'utilisateur
const getUserId = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'ID de l\'utilisateur');
  }

  const data = await response.json();
  return data.id; // Retourne l'ID de l'utilisateur
};
