import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Watchlist from "./pages/Watchlist";
import Favourite from "./pages/Favourite";
import Auth from "./pages/Auth";
import Toast from "./components/Toast";
import ScrollToTop from "./components/ScrollToTop";
import { MovieProvider } from "./context/MovieContext";
import "./App.css";

function App() {
  return (
    <MovieProvider>
        <div className="min-h-screen bg-linear-to-br from-zinc-950 via-black to-zinc-900 relative">
          <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_55%)]" />
          <div className="relative z-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </div>
        </div>
        <Toast />
        <ScrollToTop />
    </MovieProvider>
  );
}

export default App;