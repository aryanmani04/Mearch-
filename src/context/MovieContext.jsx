import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext(null);

const loadFromStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadUserFromStorage = () => {
  try {
    const raw = localStorage.getItem("mearch:user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => loadFromStorage("mearch:favourites"));
  const [watchlist, setWatchlist] = useState(() => loadFromStorage("mearch:watchlist"));
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null); // { message: string, id: number }
  const [user, setUser] = useState(() => loadUserFromStorage());

  const showToast = (message) => {
    setToast({ message, id: Date.now() });
  };

  useEffect(() => {
    localStorage.setItem("mearch:favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("mearch:watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleFavourite = (movie) => {
    setFavourites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      showToast(
        exists ? `Removed "${movie.title}" from favourites` : `Added "${movie.title}" to favourites`
      );
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  };

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      showToast(
        exists ? `Removed "${movie.title}" from watchlist` : `Added "${movie.title}" to watchlist`
      );
      return exists ? prev.filter((m) => m.id !== movie.id) : [...prev, movie];
    });
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("mearch:user", JSON.stringify(user));
    } else {
      localStorage.removeItem("mearch:user");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    showToast("Signed out");
  };

  const isFavourite = (id) => favourites.some((m) => m.id === id);
  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  return (
    <MovieContext.Provider
      value={{
        favourites,
        watchlist,
        toggleFavourite,
        toggleWatchlist,
        isFavourite,
        isInWatchlist,
        searchQuery,
        setSearchQuery,
        toast,
        setToast,
        user,
        login,
        logout,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
  const ctx = useContext(MovieContext);
  if (!ctx) throw new Error("useMovies must be used within a MovieProvider");
  return ctx;
};