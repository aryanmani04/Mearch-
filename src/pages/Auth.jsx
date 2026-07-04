import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useMovies } from "../context/MovieContext";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const isLogin = mode === "login";

  // initialize the navigate function
  const navigate = useNavigate();
  const { login } = useMovies();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an API call with a timeout
    setTimeout(() => {
      console.log("Submitted Data:", formData);
      setIsLoading(false);
      setIsSuccess(true);

      // Log the user in so the Navbar can reflect it (name/initial for the avatar)
      login({
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
      });
    }, 1200);
  };

  // Function to handle the navigation
  const handleContinue = () => {
    // Reset form state just in case
    setFormData({ name: "", email: "", password: "" });
    setIsSuccess(false);

    // Navigate to Home (change "/" to "/home" or your specific route if needed)
    navigate("/");
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="relative backdrop-blur-xl bg-zinc-900/60 border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden transition-all duration-500">
          <div className="absolute -inset-1 -z-10 bg-linear-to-br from-red-500/20 via-transparent to-blue-500/20 rounded-2xl blur-2xl opacity-70" />

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mb-5">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {isLogin ? "Welcome back!" : "Account created!"}
              </h2>
              <p className="text-zinc-400 text-sm mb-8">
                {isLogin
                  ? "You have successfully logged in to Mearch."
                  : "Your account is ready to use across all devices."}
              </p>
              <button
                onClick={handleContinue}
                className="flex items-center justify-center gap-2 w-full cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl py-3 transition-all duration-200"
              >
                Continue to Dashboard <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h1 className="text-3xl font-bold text-white text-center mb-2 tracking-tight">
                {isLogin ? "Welcome back" : "Create account"}
              </h1>

              <p className="text-zinc-400 text-sm text-center mb-8">
                {isLogin
                  ? "Sign in to sync your watchlist and favourites"
                  : "Join Mearch to save movies across devices"}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLogin && (
                  <div className="group flex items-center bg-zinc-900/50 border border-zinc-700/50 rounded-xl py-3 px-4 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 transition-all duration-300">
                    <User size={18} className="text-zinc-500 group-focus-within:text-red-400 mr-3 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="bg-transparent outline-none placeholder:text-zinc-600 text-white w-full"
                    />
                  </div>
                )}

                <div className="group flex items-center bg-zinc-900/50 border border-zinc-700/50 rounded-xl py-3 px-4 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 transition-all duration-300">
                  <Mail size={18} className="text-zinc-500 group-focus-within:text-red-400 mr-3 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="bg-transparent outline-none placeholder:text-zinc-600 text-white w-full"
                  />
                </div>

                <div className="group flex items-center bg-zinc-900/50 border border-zinc-700/50 rounded-xl py-3 px-4 focus-within:border-red-500/50 focus-within:ring-1 focus-within:ring-red-500/50 transition-all duration-300">
                  <Lock size={18} className="text-zinc-500 group-focus-within:text-red-400 mr-3 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-transparent outline-none placeholder:text-zinc-600 text-white w-full"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 flex items-center justify-center gap-2 cursor-pointer bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 shadow-lg transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Please wait...
                    </>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>

              <p className="text-zinc-400 text-sm text-center mt-8">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setMode(isLogin ? "signup" : "login");
                    setFormData({ name: "", email: "", password: "" });
                  }}
                  className="text-red-400 hover:text-red-300 font-medium cursor-pointer transition-colors duration-200"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;