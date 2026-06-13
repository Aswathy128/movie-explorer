import React from 'react'
import MovieCard from './MovieCard';

const MovieList = ({movies}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* each movie in movies is shown as card */}
      {
        movies.map((movie)=>( 
          <MovieCard 
          key={movie.id}
          movie={movie}
          />  
        ))
      }
    </div>
  );
}

export default MovieList;
