import React,{useState} from 'react';
const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="flex gap-3 mb-6">
      <input
        type="text"
        value={searchQuery}     
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }
      }
        placeholder="Search for a movie..."
        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none
        focus:ring-2 focus:ring-blue-500 text-white"
      />

      <button onClick={onSearch} className="px-6 py-3 bg-blue-600 text-white rounded-lg 
      hover:bg-blue-700 transition font-semibold">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
