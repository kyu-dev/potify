

const SPOTIFY_API_URL = "https://api.spotify.com/v1/search";


const ACCESS_TOKEN = ''; // inserez votre token


export const searchSpotify = async (searchTerm) => {
  try {
    const url = `${SPOTIFY_API_URL}?q=${encodeURIComponent(searchTerm)}&type=track&limit=10`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche de morceaux');
    }

    const data = await response.json();
    return data.tracks.items; // Retourne les morceaux trouvés
  } catch (error) {
    console.error("Erreur API Spotify:", error);
    return [];
  }
};