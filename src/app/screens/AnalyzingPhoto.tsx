import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";

export default function AnalyzingPhoto() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mood");
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-ping opacity-75" />
        </div>

        <h2 className="text-2xl text-gray-800 mb-4">
          Analyzing Your Photo
        </h2>
        <p className="text-gray-600 text-lg">
          Understanding the context of your moment...
        </p>

        <div className="mt-8 flex justify-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
