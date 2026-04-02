import { Movie } from "./type";

export const DUMMY_MOVIES: Movie[] = [
  { id: "1", title: "Interstellar", year: "2014", rating: 8.6, color: "from-blue-900" },
  { id: "2", title: "The Dark Knight", year: "2008", rating: 9.0, color: "from-gray-900" },
  { id: "3", title: "Inception", year: "2010", rating: 8.8, color: "from-purple-900" },
  { id: "4", title: "Oppenheimer", year: "2023", rating: 8.3, color: "from-orange-900" },
  { id: "5", title: "Dune", year: "2021", rating: 8.0, color: "from-yellow-900" },
  { id: "6", title: "Avatar", year: "2009", rating: 7.8, color: "from-teal-900" },
  { id: "7", title: "The Matrix", year: "1999", rating: 8.7, color: "from-green-900" },
  { id: "8", title: "Parasite", year: "2019", rating: 8.5, color: "from-red-900" },
  { id: "9", title: "Tenet", year: "2020", rating: 7.3, color: "from-indigo-900" },
  { id: "10", title: "Gravity", year: "2013", rating: 7.7, color: "from-slate-900" },
];

export const HERO: Movie = {
  id: "11",
  title: "Dune: Part Two",
  year: "2024",
  rating: 8.5,
  overview:
    "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he must prevent a terrible future only he can foresee.",
};