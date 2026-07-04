import { useState, useEffect, useRef, useCallback } from "react";
import Card from "../components/Card";
import Hero from "../components/Hero";
import { useMovies } from "../context/MovieContext";
import { getPopularMovies, searchMovies } from "../services/tmdb";

const Home = () => {
  const { searchQuery } = useMovies();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  // Reset to page 1 whenever the search query changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
  }, [searchQuery]);

  // Fetch whenever page or query changes
  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const { movies: results, totalPages: pages } = searchQuery.trim()
          ? await searchMovies(searchQuery, page)
          : await getPopularMovies(page);

        if (!cancelled) {
          setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
          setTotalPages(pages || 1);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const timeout = setTimeout(fetchMovies, page === 1 ? 400 : 0);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const loadMore = useCallback(() => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  // Set up the infinite scroll sentinel
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          loadMore();
        }
      },
      { rootMargin: "300px" }
    );

    if (sentinelRef.current) observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [loading, page, totalPages, loadMore]);

  return (
    <div className="min-h-screen">
      {!searchQuery.trim() && <Hero />}

      <div className="px-4 sm:px-6 pt-8">
        <h2 className="text-2xl font-bold text-white">
          {searchQuery.trim() ? `Results for "${searchQuery}"` : "Popular Movies"}
        </h2>
      </div>

      {error && (
        <p className="text-red-400 text-center py-16">
          Something went wrong: {error}
        </p>
      )}

      {!error && !loading && movies.length === 0 && (
        <p className="text-zinc-400 text-center py-16">No movies found.</p>
      )}

      {!error && (
        <div className="flex flex-wrap justify-center py-6">
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {loading && (
        <p className="text-zinc-400 text-center py-8">Loading movies...</p>
      )}

      {/* Sentinel element that triggers the next page load when scrolled into view */}
      <div ref={sentinelRef} className="h-4" />
    </div>
  );
};

export default Home;