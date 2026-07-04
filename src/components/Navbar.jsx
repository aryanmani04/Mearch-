import logo from "../assets/logo.png";
import { Search, X, CircleUserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery, user, logout } = useMovies();
  const navigate = useNavigate();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Watchlist", path: "/watchlist" },
    { name: "Favourite", path: "/favourite" },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    navigate("/");
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const goHomeFresh = () => {
    setSearchQuery("");
  };

  return (
    <nav className="sticky top-0 z-40 flex bg-zinc-950/70 backdrop-blur-xl border-b border-white/10 items-center justify-between text-white py-3 px-6 shadow-lg shadow-black/20">
      <NavLink to={"/"} onClick={goHomeFresh}>
        <div className="flex items-center text-2xl">
          <img
            className="h-10 brightness-0 invert"
            src={logo}
            alt="Mearch Logo"
          />
          <span className="font-bold tracking-wide">Mearch</span>
        </div>
      </NavLink>

      <ul className="flex items-center gap-16 ml-8">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              title={link.name}
              onClick={link.path === "/" ? goHomeFresh : undefined}
              className={({ isActive }) =>
                `text-md cursor-pointer transition-all duration-140 hover:text-red-400  ${
                  isActive
                    ? "text-red-500 border-b border-red-500 pb-2"
                    : "text-zinc-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-zinc-900/70 border border-zinc-700 rounded-lg py-2 px-3 transition-all duration-200 focus-within:border-red-500/70 focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-red-500/20">
          <input
            className="bg-transparent outline-none placeholder:text-zinc-500 text-sm w-48"
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery ? (
            <button
              onClick={clearSearch}
              aria-label="Clear search"
              title="Clear search"
              className="text-zinc-400 ml-2 cursor-pointer hover:text-white transition-colors duration-150"
            >
              <X size={18} />
            </button>
          ) : (
            <Search className="text-zinc-500 ml-2" size={18} />
          )}
        </div>

        {user ? (
          <button
            onClick={logout}
            className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer
                       bg-linear-to-br from-red-500 to-blue-600 text-white text-sm font-semibold
                       hover:opacity-85 transition-opacity duration-200"
            aria-label="Sign out"
            title={`Signed in as ${user.name} · Click to sign out`}
          >
            {user.name?.charAt(0).toUpperCase() || "U"}
          </button>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
            aria-label="Sign in or sign up"
            title="Sign in / Sign up"
          >
            <CircleUserRound size={28} className="text-zinc-300" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;