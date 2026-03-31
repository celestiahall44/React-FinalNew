import React, { useEffect, useMemo, useRef, useState } from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Camera from '../../assets/videophotography.jpg'
import Searchbar from '../../components/Searchbar/Searchbar'
import Footer from '../../components/Footer/Footer'
import Moviecards from '../../components/Moviecards/Moviecards'
import { searchMovies } from '../../index'
import filter_icon from '../../assets/filter_icon.svg'
import caret_icon from '../../assets/caret_icon.svg'

const HOME_SEARCH_STATE_KEY = 'flix-home-search-state'

function readSavedSearchState() {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const savedState = window.sessionStorage.getItem(HOME_SEARCH_STATE_KEY)
    return savedState ? JSON.parse(savedState) : null
  } catch {
    return null
  }
}

function Home() {
  const savedStateRef = useRef(readSavedSearchState())
  const savedState = savedStateRef.current || {}
  const [movies, setMovies] = useState(savedState.movies || [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(savedState.error || '')
  const [sortBy, setSortBy] = useState(savedState.sortBy || 'title-asc')
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || '')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortMenuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.sessionStorage.setItem(
      HOME_SEARCH_STATE_KEY,
      JSON.stringify({
        movies,
        error,
        sortBy,
        searchQuery,
      })
    )
  }, [movies, error, sortBy, searchQuery])

  const sortedMovies = useMemo(() => {
    const nextMovies = [...movies]

    switch (sortBy) {
      case 'title-desc':
        return nextMovies.sort((a, b) => b.Title.localeCompare(a.Title))
      case 'year-desc':
        return nextMovies.sort((a, b) => Number(b.Year) - Number(a.Year))
      case 'year-asc':
        return nextMovies.sort((a, b) => Number(a.Year) - Number(b.Year))
      case 'title-asc':
      default:
        return nextMovies.sort((a, b) => a.Title.localeCompare(b.Title))
    }
  }, [movies, sortBy])

  const handleSearch = async (query) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setMovies([])
      setError('Type a movie title to search.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const results = await searchMovies(query)
      setMovies(results)
      if (results.length === 0) {
        setError('No movies found.')
      }
    } catch (err) {
      setError(err.message || 'Error loading movies.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    setIsSortOpen(false)
  }

  return (
    <div className="home">
      <Navbar />
      <div className="camera">
        <img src={Camera} alt="" className="banner-img"/>
        <Searchbar onSearch={handleSearch} initialQuery={searchQuery} />
      </div>
      {movies.length > 0 && !isLoading && !error ? (
        <section className="results-toolbar">
          <div className="results-sort-menu" ref={sortMenuRef}>
            <button
              type="button"
              className="results-sort-trigger"
              onClick={() => setIsSortOpen((prevOpen) => !prevOpen)}
              aria-haspopup="menu"
              aria-expanded={isSortOpen}
            >
              <img src={filter_icon} alt="Sort movies" className="results-sort-icon" />
              <img
                src={caret_icon}
                alt="Open sort menu"
                className={`results-sort-caret ${isSortOpen ? 'open' : ''}`}
              />
            </button>
            {isSortOpen ? (
              <div className="results-sort-dropdown" role="menu">
                <button type="button" onClick={() => handleSortChange('title-asc')}>Title (A-Z)</button>
                <button type="button" onClick={() => handleSortChange('title-desc')}>Title (Z-A)</button>
                <button type="button" onClick={() => handleSortChange('year-desc')}>Year (Newest)</button>
                <button type="button" onClick={() => handleSortChange('year-asc')}>Year (Oldest)</button>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
      <Moviecards movies={sortedMovies} isLoading={isLoading} error={error} />
      <Footer />
    </div>
  )
}

export default Home
