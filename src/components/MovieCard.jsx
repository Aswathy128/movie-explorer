import React from 'react'
import { useNavigate } from "react-router-dom";


const MovieCard = ({movie}) => {
  const navigate = useNavigate();
  return (
    <div 
    className="bg-white rounded-lg shadow-md overflow-hidden
    cursor-pointer hover:scale-105 hover:shadow-2xl transition duration-300"
    onClick={() =>
      navigate(`/movie/${movie.id}`)
    } >
      {
      movie.poster_path ? (
      <img
      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-80 object-cover"
      />
    ) : (
    <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500" >
      No Image</div>
    )
    }
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2">
        {movie.title}
      </h3>
      <p className="text-sm text-gray-600 mb-1">
        Year: {movie.release_date?.slice(0,4)}
      </p>
      <p className="text-sm font-medium mb-2">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>
      <p className="text-sm text-gray-700 line-clamp-3">
        {movie.overview}
      </p>
    </div>
  </div>
  ); 
}

export default MovieCard
