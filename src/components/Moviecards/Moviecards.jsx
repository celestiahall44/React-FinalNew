import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Moviecards.css'

const Moviecards = ({ movies, isLoading, error }) => {
  const rowRef = useRef(null)
  const navigate = useNavigate()

  const handleWheel = (event) => {
    const row = rowRef.current

    if (!row) {
      return
    }

    const hasHorizontalOverflow = row.scrollWidth > row.clientWidth

    if (!hasHorizontalOverflow) {
      return
    }

    // Keep wheel interaction scoped to the movie row.
    event.preventDefault()
    event.stopPropagation()

    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
    row.scrollLeft += delta
  }

  if (isLoading) {
    return <section className="moviecards-status">Loading movies...</section>
  }

  if (error) {
    return <section className="moviecards-status">{error}</section>
  }

  if (!movies.length) {
    return null
  }

  return (
    <section className="moviecards" ref={rowRef} onWheel={handleWheel}>
      {movies.map((movie) => (
        <article
          className="movie-card"
          key={movie.imdbID}
          role="button"
          tabIndex={0}
          onClick={() => navigate(`/movie/${movie.imdbID}`)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              navigate(`/movie/${movie.imdbID}`)
            }
          }}
        >
          <img
            className="movie-poster"
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
            alt={`${movie.Title} poster`}
          />
          <h3 className="movie-title">{movie.Title}</h3>
        </article>
      ))}
    </section>
  )
}

export default Moviecards
