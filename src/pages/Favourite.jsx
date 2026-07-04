import Card from "../components/Card";
import { useMovies } from "../context/MovieContext";

const Favourite = () => {
  const { favourites } = useMovies();

  return (
    <div className="min-h-screen">
      <div className="px-6 pt-6">
        <h1 className="text-2xl font-bold text-white">Your Favourites</h1>
      </div>

      {favourites.length === 0 ? (
        <p className="text-zinc-400 text-center py-16">
          No favourites yet. Tap the heart on a movie card to add one.
        </p>
      ) : (
        <div className="flex flex-wrap justify-center py-6">
          {favourites.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourite;