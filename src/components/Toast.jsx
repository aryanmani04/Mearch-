import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useMovies } from "../context/MovieContext";

const Toast = () => {
  const { toast, setToast } = useMovies();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast, setToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div
        key={toast.id}
        className="pointer-events-auto
                   flex items-center gap-2 px-4 py-3 rounded-xl
                   bg-zinc-900/80 backdrop-blur-md border border-white/10
                   shadow-2xl text-sm text-white
                   animate-toast-in"
      >
        <CheckCircle2 size={16} className="text-green-400 shrink-0" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;