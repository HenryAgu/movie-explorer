import { Movie } from "@/type"
import { MovieCard } from "./movie-card"

const LatestMovies = ({ trending }: { trending: Movie[] }) => {
    return (
        <div className='xl:px-16 px-5 py-20'>
            <p className="text-3xl sm:text-4xl font-black text-black leading-tight tracking-tight">Latest Movies</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 gap-5 lg:gap-10">
                {trending.slice(0, 20).map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default LatestMovies
