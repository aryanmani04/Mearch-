import { Heart, Star, Bookmark } from "lucide-react";
import { useMovies } from "../context/MovieContext";

const Card = ({ movie }) => {
  const { title, year, genres, rating, poster, overview } = movie;
  const { toggleFavourite, isFavourite, toggleWatchlist, isInWatchlist } = useMovies();
  const favourited = isFavourite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="relative w-[45vw] max-w-64 sm:w-64 m-2.5 sm:m-6 rounded-2xl group">
      <div className="relative backdrop-blur-xl bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20">
        <div className="relative h-80 overflow-hidden">
          <img
            src={poster || "/placeholder-poster.png"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Constant dark tint so bright posters don't wash out the text, deepens further on hover */}
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/45 transition-colors duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <Star size={14} className="text-yellow-400" fill="currentColor" />
            <span className="text-xs font-semibold text-white">{rating}</span>
          </div>

          <div className="absolute top-3 right-3 z-20 flex gap-2">
            <button
              onClick={() => toggleWatchlist(movie)}
              aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              title={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              className={`p-2 rounded-full bg-black/50 backdrop-blur-md border cursor-pointer transition-colors duration-300 ${
                inWatchlist
                  ? "bg-blue-500/80 border-blue-400"
                  : "border-white/10 hover:bg-blue-500/80 hover:border-blue-400"
              }`}
            >
              <Bookmark
                size={16}
                className="text-white"
                fill={inWatchlist ? "currentColor" : "none"}
              />
            </button>

            <button
              onClick={() => toggleFavourite(movie)}
              aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
              title={favourited ? "Remove from favourites" : "Add to favourites"}
              className={`p-2 rounded-full bg-black/50 backdrop-blur-md border cursor-pointer transition-colors duration-300 ${
                favourited
                  ? "bg-red-500/80 border-red-400"
                  : "border-white/10 hover:bg-red-500/80 hover:border-red-400"
              }`}
            >
              <Heart
                size={16}
                className="text-white"
                fill={favourited ? "currentColor" : "none"}
              />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 z-10 transition-opacity duration-500 group-hover:opacity-0">
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-zinc-200 border border-white/10"
                >
                  {genre}
                </span>
              ))}
            </div>
            <h2 className="text-lg font-bold text-white truncate drop-shadow-md">
              {title}
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">{year}</p>
          </div>

          {/* Glassy hover panel with description and full details */}
          <div
            className="absolute inset-0 z-10 flex flex-col justify-end p-4
                       bg-zinc-950/70 backdrop-blur-md
                       opacity-0 translate-y-3
                       group-hover:opacity-100 group-hover:translate-y-0
                       transition-all duration-500 ease-out"
          >
            <div className="flex gap-1.5 mb-2 flex-wrap">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-zinc-200 border border-white/10"
                >
                  {genre}
                </span>
              ))}
            </div>
            <h2 className="text-lg font-bold text-white truncate drop-shadow-md">
              {title}
            </h2>
            <p className="text-xs text-zinc-400 mb-2">{year}</p>
            <p className="text-xs text-zinc-300 leading-relaxed line-clamp-4">
              {overview || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;