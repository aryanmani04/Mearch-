import { useState, useEffect } from "react";
import { Star, Bookmark } from "lucide-react";
import { getTrendingMovies } from "../services/tmdb";
import { useMovies } from "../context/MovieContext";

const Hero = () => {
  const [featured, setFeatured] = useState([]);
  const [index, setIndex] = useState(0);
  const { toggleWatchlist, isInWatchlist } = useMovies();

  useEffect(() => {
    let cancelled = false;
    getTrendingMovies()
      .then((movies) => {
        if (!cancelled) {
          // Only keep ones with a usable backdrop image
          setFeatured(movies.filter((m) => m.backdrop).slice(0, 6));
        }
      })
      .catch(() => {
        if (!cancelled) setFeatured([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Rotate to a new featured movie every 7 seconds
  useEffect(() => {
    if (featured.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [featured]);

  if (featured.length === 0) {
    return (
      <div className="px-4 sm:px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-white">Trending This Week</h1>
        <p className="text-zinc-400 mt-1">Discover what everyone's watching right now.</p>
      </div>
    );
  }

  const movie = featured[index];
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="relative w-full h-[60vh] min-h-[380px] overflow-hidden">
      {featured.map((m, i) => (
        <img
          key={m.id}
          src={m.backdrop}
          alt={m.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 md:px-10 pb-8 sm:pb-10 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-red-400 font-semibold mb-2 sm:mb-3">
          Trending This Week
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-3 transition-all duration-500">
          {movie.title}
        </h1>

        <div className="flex items-center flex-wrap gap-2 sm:gap-3 mb-4">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-xs font-semibold text-white">{movie.rating}</span>
          </div>
          <span className="text-zinc-300 text-sm">{movie.year}</span>
          {movie.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-zinc-200 border border-white/10"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 mb-5">
          {movie.overview}
        </p>

        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={() => toggleWatchlist(movie)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer transition-colors duration-200 ${
              inWatchlist
                ? "bg-blue-500/80 text-white border border-blue-400"
                : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
            }`}
          >
            <Bookmark size={16} fill={inWatchlist ? "currentColor" : "none"} />
            {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
          </button>

          {featured.length > 1 && (
            <div className="flex gap-1.5 ml-0 sm:ml-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show featured movie ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === index ? "w-6 bg-red-500" : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;