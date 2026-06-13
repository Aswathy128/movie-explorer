import React,{useState,useEffect} from 'react'
import {Routes,Route} from "react-router-dom";
import MovieList from "./components/MovieList"
import SearchBar from "./components/SearchBar"
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/Navbar';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

function App() {
  const [movies,setMovies]=useState([]);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [activeTab, setActiveTab] = useState("trending");

  const [searchQuery,setSearchQuery]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  async function searchMovies(searchQuery, page=1){
    // If search box is empty
    if (!searchQuery.trim()) {
    setMovies([]);
    setHasSearched(false);
    setError("");
    return;
  }
    try{
      setLoading(true);
      setError("");
      setHasSearched(true);

      const API_KEY = import.meta.env.VITE_API_KEY;
      const response= await fetch(  `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`)
      const data=await response.json()
      console.log(data.results)
      setMovies(data.results)

      setCurrentPage(data.page)
      console.log(data.total_pages);
      console.log("Current page:", data.page);
      console.log("Total pages:", data.total_pages);
      console.log("Total results:", data.total_results);
      setTotalPages(data.total_pages)

      setLoading(false);
      setError("");
    }
    catch(error){
      setLoading(false)
      setError("Something went wrong");
    }
  }

  function handlePageChange(newPage) {
  searchMovies(searchQuery, newPage);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

  useEffect(() => {
    async function fetchHomeMovies() {
      try {
        const API_KEY = import.meta.env.VITE_API_KEY;
        // Trending Movies
        const trendingResponse = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        const trendingData = await trendingResponse.json();
        setTrendingMovies(trendingData.results);
        // Popular Movies
        const popularResponse = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
        const popularData = await popularResponse.json();
        setPopularMovies(popularData.results);
      } 
      catch (error) {
      console.log(error);
    }
  }
  fetchHomeMovies();
}, []);

  return (
    <Routes>
      <Route path="/"
      element={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="max-w-7xl mx-auto p-5">
          <Navbar/>
          <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={() => searchMovies(searchQuery)}
          />     {/*passing props from parent o child */}
          {!hasSearched &&(
          <div className="flex justify-center gap-4 my-6">
            <button onClick={() => setActiveTab("trending")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "trending"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-black"
            }`} >
              🔥 Trending
            </button>
            <button onClick={() => setActiveTab("popular")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "popular"
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-black"
            }`} >
              ⭐ Popular
            </button>
          </div>
          )}
          {/*<p className="text-white font-semibold mb-6 text-lg">Results Found: {movies.length}</p>*/}
          {loading && (
            <div className="flex flex-col items-center py-10">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white mt-4">Loading movies...</p>
            </div>
          )}
          {error && <p className="text-red-400 text-center text-lg">{error}</p>}
          {!loading &&
          !error &&
          hasSearched &&
          movies.length === 0 && (
          <p className="text-white text-center text-lg mt-10">No movies found!</p>
          )}
          {!loading && !error && movies.length > 0 ? (
            <>
            <MovieList movies={movies} />
            <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            />
            </>
          ):(
            <>
            {activeTab === "trending" && (
              <MovieList movies={trendingMovies} />
              )}
            {activeTab === "popular" && (
              <MovieList movies={popularMovies} />
               )}
            </>

          )}
          <Footer/>

      </div>
    </div>
      }
      />
      <Route path="/movie/:id"
      element={<MovieDetail/>}
      />
    </Routes>
  );
}

export default App;
