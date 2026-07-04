import { useState } from "react";
import logo from "../assets/logo.png";
import { Search, X, CircleUserRound, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

const Navbar = () => {
  const { searchQuery, setSearchQuery, user, logout } = useMovies();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 bg-zinc-950/70 backdrop-blur-xl border-b border-white/10 text-white shadow-lg shadow-black/20">
      <div className="flex items-center justify-between py-3 px-4 sm:px-6">
        <NavLink to={"/"} onClick={goHomeFresh} className="shrink-0">
          <div className="flex items-center text-xl sm:text-2xl">
            <img
              className="h-8 sm:h-10 brightness-0 invert"
              src={logo}
              alt="Mearch Logo"
            />
            <span className="font-bold tracking-wide">Mearch</span>
          </div>
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-10 xl:gap-16 ml-8">
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

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search: full input on md+, toggleable icon on small screens */}
          <div className="hidden md:flex items-center bg-zinc-900/70 border border-zinc-700 rounded-lg py-2 px-3 transition-all duration-200 focus-within:border-red-500/70 focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-red-500/20">
            <input
              className="bg-transparent outline-none placeholder:text-zinc-500 text-sm w-40 lg:w-48"
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

          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="Toggle search"
            title="Search"
            className="md:hidden p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
          >
            {searchOpen ? <X size={22} className="text-zinc-300" /> : <Search size={22} className="text-zinc-300" />}
          </button>

          {user ? (
            <button
              onClick={logout}
              className="flex items-center justify-center h-9 w-9 rounded-full cursor-pointer
                         bg-linear-to-br from-red-500 to-blue-600 text-white text-sm font-semibold
                         hover:opacity-85 transition-opacity duration-200 shrink-0"
              aria-label="Sign out"
              title={`Signed in as ${user.name} · Click to sign out`}
            >
              {user.name?.charAt(0).toUpperCase() || "U"}
            </button>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer shrink-0"
              aria-label="Sign in or sign up"
              title="Sign in / Sign up"
            >
              <CircleUserRound size={28} className="text-zinc-300" />
            </button>
          )}

          {/* Hamburger, mobile/tablet only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            title="Menu"
            className="lg:hidden p-2 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
          >
            {menuOpen ? <X size={22} className="text-zinc-300" /> : <Menu size={22} className="text-zinc-300" />}
          </button>
        </div>
      </div>

      {/* Collapsible search bar for small screens */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center bg-zinc-900/70 border border-zinc-700 rounded-lg py-2 px-3 transition-all duration-200 focus-within:border-red-500/70 focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-red-500/20">
            <input
              autoFocus
              className="bg-transparent outline-none placeholder:text-zinc-500 text-sm w-full"
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
        </div>
      )}

      {/* Mobile/tablet dropdown menu */}
      {menuOpen && (
        <ul className="lg:hidden flex flex-col gap-1 px-4 pb-4 border-t border-white/10 pt-3">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                title={link.name}
                onClick={link.path === "/" ? goHomeFresh : closeMenu}
                className={({ isActive }) =>
                  `block text-md cursor-pointer transition-all duration-140 py-2 px-2 rounded-lg hover:text-red-400 hover:bg-white/5 ${
                    isActive ? "text-red-500" : "text-zinc-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;