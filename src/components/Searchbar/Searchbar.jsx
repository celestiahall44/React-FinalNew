import React, { useEffect, useState } from 'react'
import './Searchbar.css'

function Searchbar({ onSearch, initialQuery = '', isLoading = false }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = () => {
    if (isLoading) {
      return
    }

    if (onSearch) {
      onSearch(query)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="search-bar">
      <h1 className="landing-title">Welcome to Flix </h1>
        <p className="landing-description">Discover the world of movies with us. Explore, review, and share your favorite films.</p>
        <div className="search-wrapper">
          <input
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="What would you like to watch?"
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value
              setQuery(nextQuery)

              if (!nextQuery.trim() && onSearch) {
                onSearch('')
              }
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            id="searchButton"
            className="search-button btn__hover-effect"
            onClick={handleSubmit}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
    </div>
  )
}

export default Searchbar
