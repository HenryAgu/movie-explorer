import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchFilter } from '../search-filter'

// Mock Next.js navigation hooks to avoid actual dynamic routing in tests
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

describe('SearchFilter', () => {
  it('updates input value on user input change', () => {
    render(<SearchFilter />)
    const input = screen.getByPlaceholderText(/search for movies/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'Interstellar' } })
    expect(input.value).toBe('Interstellar')
  })

  it('renders a list of years for filtering', () => {
      render(<SearchFilter />)
      const options = screen.getAllByRole('option')
      expect(options.length).toBeGreaterThan(100)
      expect(screen.getByText('2025')).toBeInTheDocument()
  })
})
