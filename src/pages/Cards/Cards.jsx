import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Cards.css'
import { getMovieById } from '../../index'

const Cards = () => {
  const { imdbID } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1)
      return
    }

    navigate('/')
  }

  useEffect(() => {
    let isMounted = true

    async function loadMovie() {
      setIsLoading(true)
      setError('')

      try {
        const data = await getMovieById(imdbID)
        if (isMounted) {
          setMovie(data)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Could not load movie details.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (imdbID) {
      loadMovie()
    }

    return () => {
      isMounted = false
    }
  }, [imdbID])

  return (
    <div className="cards-page">
      <button type="button" className="cards-back" onClick={handleBackClick}>Back to results</button>

      {isLoading ? <p className="cards-status">Loading movie details...</p> : null}
      {error ? <p className="cards-status">{error}</p> : null}

      {!isLoading && !error && movie ? (
        <article className="movie-details-card">
          <img
            className="movie-details-poster"
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={`${movie.Title} poster`}
          />

          <div className="movie-details-content">
            <h1>{movie.Title}</h1>
            <p>{movie.Plot}</p>

            <div className="movie-details-grid">
              <p><strong>Year:</strong> {movie.Year}</p>
              <p><strong>Rated:</strong> {movie.Rated}</p>
              <p><strong>Runtime:</strong> {movie.Runtime}</p>
              <p><strong>Genre:</strong> {movie.Genre}</p>
              <p><strong>Director:</strong> {movie.Director}</p>
              <p><strong>Writer:</strong> {movie.Writer}</p>
              <p><strong>Actors:</strong> {movie.Actors}</p>
              <p><strong>Language:</strong> {movie.Language}</p>
              <p><strong>Country:</strong> {movie.Country}</p>
              <p><strong>Awards:</strong> {movie.Awards}</p>
              <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
              <p><strong>Released:</strong> {movie.Released}</p>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  )
}

export default Cards
