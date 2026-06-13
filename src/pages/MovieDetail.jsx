import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetail =() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );

        const data = await response.json();

        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-white">
    
    {/* Backdrop Hero Section */}
    <div className="relative w-full h-72 md:h-96 overflow-hidden">

  <img
    src={
      movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : ""
    }
    alt={movie.title}
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="absolute bottom-6 left-6">
    <h1 className="text-4xl font-bold text-white">
      {movie.title}
    </h1>

    {movie.tagline && (
      <p className="text-gray-300 italic mt-2 text-lg">
        "{movie.tagline}"
      </p>
    )}
  </div>

  <button
    onClick={() => navigate("/")}
    className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
  >
    ← Back
  </button>

</div>

    {/* Main content */}
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 mt-6">
        
        {/* Poster */}
        <div>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full rounded-xl shadow-2xl"
            />
          ) : (
            <div className="w-full h-80 bg-gray-600 flex items-center justify-center rounded-xl">
              No Image
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {/* Show title here only if no backdrop */}
          {!movie.backdrop_path && (
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          )}

          {/* Tagline */}
          {movie.tagline && (
            <p className="text-gray-400 italic mb-4 text-lg">"{movie.tagline}"</p>
          )}

          {/* Release date */}
          <p className="text-gray-300 mb-2">
            <strong className="text-white">Release Date:</strong> {movie.release_date}
          </p>

          {/* Runtime */}
          {movie.runtime > 0 && (
            <p className="text-gray-300 mb-2">
              <strong className="text-white">Duration:</strong>{" "}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </p>
          )}

          {/* Status */}
          <p className="text-gray-300 mb-4">
            <strong className="text-white">Status:</strong> {movie.status}
          </p>

          {/* Rating */}
          <p className="mb-4">
            <span className="bg-yellow-300 text-black px-3 py-1 rounded-lg font-semibold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
          </p>

          {/* Genres */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-600 px-4 py-2 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-gray-200 leading-relaxed text-lg">
            <strong className="text-white">Overview:</strong> {movie.overview}
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default MovieDetail;
