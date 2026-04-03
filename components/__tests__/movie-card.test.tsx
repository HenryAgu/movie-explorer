import React from 'react'
import { render, screen } from '@testing-library/react'
import { MovieCard } from '../movie-card'
import { Movie } from '@/types'


// For Nextjs Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}))

jest.mock('@/lib/tmbd', () => ({
  posterUrl: (path: string) => `https://image.tmdb.org/t/p/w342${path}`,
}))

const mockMovie: Movie = {
  id: 1,
  title: 'Inception',
  original_title: 'Inception',
  overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
  release_date: '2010-07-16',
  vote_average: 8.8,
  vote_count: 34000,
  popularity: 120.5,
  backdrop_path: '/backdrop.jpg',
  poster_path: '/poster.jpg',
  genre_ids: [28, 878, 12],
  media_type: 'movie',
  original_language: 'en',
  adult: false,
  video: false,
}

describe('MovieCard', () => {
  it('renders the movie title correctly', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByText('Inception')).toBeInTheDocument()
  })

  it('displays the release year extracted from the date string', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByText('2010')).toBeInTheDocument()
  })

  it('renders the rating badge with the correct value', () => {
    render(<MovieCard movie={mockMovie} />)
    expect(screen.getByText('★ 8.8')).toBeInTheDocument()
  })
  it('renders the poster image with the correct alt text', () => {
    render(<MovieCard movie={mockMovie} />)
    const img = screen.getByAltText('Inception') as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain('/poster.jpg')
  })
})
