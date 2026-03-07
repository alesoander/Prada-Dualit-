import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Heart, Share2, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const perfumes = [
  {
    id: 1,
    name: "Light",
    subtitle: "Intimate intensity",
    image: "https://lh3.googleusercontent.com/d/1GxDtvTRNKvgzsBXRVzkrY_zB4-eNAAGy",
    notes: ["White pear", "Italian bergamot", "Damask rose"],
    description: "Ideal for daytime wear, for restrained gestures, for those who dominate without announcing it",
    price: "2 Sprays",
    match: 100,
  },
  {
    id: 2,
    name: "Intense",
    subtitle: "Presence in the room",
    image: "https://lh3.googleusercontent.com/d/1roycXSRyKKMnEzffpfv2OsTWKXhDwX6g",
    notes: ["Ripe pear", "Warm bergamot", "Full-bodied rose"],
    description: "Ideal for the evening, exuding sensuality and for those who want to show they are in control",
    price: "3 Sprays",
    match: 100,
  },
];

export default function PerfumeResults() {
  const navigate = useNavigate();
  const [selectedPerfume, setSelectedPerfume] = useState<number | null>(null);

  const featuredPerfume = {
    name: "Dualitá",
    subtitle: "Your Perfect Match",
    image: "https://lh3.googleusercontent.com/d/1u8YmynDSSt9HZqiLbGYtZic-HTzVJBEq",
    match: 98,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-10 p-4">
        <div className="w-full max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/context")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl text-gray-800">Your Recommendations</h1>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto p-6 pb-8">
        {/* Featured Perfume */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl text-gray-800">Best Match</h2>
          </div>
          
         <div className="relative w-full aspect-[896/1263]">
  <ImageWithFallback
    src={featuredPerfume.image}
    alt={featuredPerfume.name}
    className="w-full h-full object-contain"
  />
  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
    {featuredPerfume.match}% Match
  </div>
</div>
            <div className="p-6">
              <h3 className="text-2xl text-gray-800 mb-1">{featuredPerfume.name}</h3>
              <p className="text-purple-600 mb-4">{featuredPerfume.subtitle}</p>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                View Details
              </button>
            </div>
          </div>
       

        {/* Other Recommendations */}
        <div className="mb-4">
          <h2 className="text-2xl text-gray-800 mb-4 text-center">For a complete Dualitá</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all cursor-pointer ${
                selectedPerfume === perfume.id ? "ring-4 ring-purple-500 scale-105" : "hover:shadow-xl"
              }`}
              onClick={() => setSelectedPerfume(perfume.id)}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-sm shadow">
                  {perfume.match}%
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg text-gray-800 mb-1">{perfume.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{perfume.subtitle}</p>
                
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-1">Key Notes</p>
                  <div className="flex flex-wrap gap-1">
                    {perfume.notes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {perfume.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg text-purple-600">{perfume.price}</span>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Start Over Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full mt-8 py-4 bg-white text-purple-600 border-2 border-purple-500 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Start New Search
        </button>
      </div>
    </div>
  );
}
