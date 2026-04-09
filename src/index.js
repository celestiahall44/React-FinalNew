const OMDB_API_KEY = "1026992b";
const OMDB_API_URL = "https://www.omdbapi.com";
const OMDB_API_KEY_FALLBACK = "1026992b";

function getApiKey() {
  return import.meta.env.VITE_OMDB_API_KEY || OMDB_API_KEY_FALLBACK;
}

function getApiUrl() {
  return import.meta.env.VITE_OMDB_API_URL;
}

export async function searchMovies(query) {
  const apiKey = getApiKey();
  const apiUrl = getApiUrl();
  if (!apiKey) {
    throw new Error("Missing VITE_OMDB_API_KEY in .env");
  }

  const searchRes = await fetch(
    `${OMDB_API_URL}?apikey=${apiKey}&s=${encodeURIComponent(query)}`
  );
  const searchData = await searchRes.json();

  if (searchData.Response !== "True") {
    return [];
  }

  const detailsPromises = searchData.Search.slice(0, 8).map(async (movie) => {
    const detailRes = await fetch(
      `${OMDB_API_URL}?apikey=${apiKey}&i=${movie.imdbID}&plot=short`
    );
    return detailRes.json();
  });

  return Promise.all(detailsPromises);
}

export async function getMovieById(imdbID) {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing VITE_OMDB_API_KEY in .env");
  }

  const detailRes = await fetch(
    `${OMDB_API_URL}?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=full`
  );
  const detailData = await detailRes.json();

  if (detailData.Response !== "True") {
    throw new Error(detailData.Error || "Movie details not found");
  }

  return detailData;
}