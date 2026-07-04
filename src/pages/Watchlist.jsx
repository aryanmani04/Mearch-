import Card from "../components/Card";
import { useMovies } from "../context/MovieContext";

const Watchlist = () => {
  const { watchlist } = useMovies();

  return (
    <div className="min-h-screen">
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-white">Your Watchlist</h1>
      </div>

      {watchlist.length === 0 ? (
        <p className="text-zinc-400 text-center py-16">
          Your watchlist is empty. Add movies from the home page.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center py-6">
          {watchlist.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;