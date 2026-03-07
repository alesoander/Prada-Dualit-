import { useNavigate } from "react-router";
import { ArrowLeft, Heart, Share2, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useMemo, useState } from "react";

const basePerfumes = [
  {
    id: 1,
    name: "Light",
    subtitle: "Intimate intensity",
    image: "https://lh3.googleusercontent.com/d/1K4CEnhtiWCUd98ALhgOMYINjX-aFrthT",
    notes: ["White pear", "Italian bergamot", "Damask rose"],
    description: "Ideal for daytime wear, for restrained gestures, for those who dominate without announcing it",
    price: "2 Sprays",
    match: 100,
  },
  {
    id: 2,
    name: "Intense",
    subtitle: "Presence in the room",
    image: "https://lh3.googleusercontent.com/d/1jm9N6RvSOiT4TddT5t9mrdVmFSG0gCXm",
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
    match: 100,
  };

// randInt HERE 
  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // useMemo HERE
  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const perfumes = useMemo(() => {
    // sprays: each >= 1, sum <= 7
    const sprays1 = randInt(1, 6);
    const sprays2 = randInt(1, 7 - sprays1);

    // descriptions: must be different between id 1 and id 2
    const applicationDescriptions = [
      "Apply on the neck (very warm, projects well).",
      "Apply on the wrists (the classic pulse point).",
      "Apply on the collarbones (the scent rises naturally).",
    ];

    const shuffled = [...applicationDescriptions].sort(() => Math.random() - 0.5);
    const desc1 = shuffled[0];
    const desc2 = shuffled[1];

    return basePerfumes.map((p) => {
      const sprays = p.id === 1 ? sprays1 : sprays2;
      const description = p.id === 1 ? desc1 : desc2;

      return {
        ...p,
        description,
        price: `${sprays} Spray${sprays === 1 ? "" : "s"}`,
      };
    });
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-10 p-4">
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
          
          {/* White container with rounded corners (keeps 896/1263 aspect) */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
         <div className="relative w-full aspect-[896/1263]">
  <ImageWithFallback
    src={featuredPerfume.image}
    alt={featuredPerfume.name}
    className="w-full h-full object-cover"
  />
  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg">
    {featuredPerfume.match}% Match
  </div>
</div>
            <div className="p-6">
              <h3 className="text-2xl text-gray-800 mb-1">{featuredPerfume.name}</h3>
              <p className="text-purple-600 mb-4">{featuredPerfume.subtitle}</p>

              {/* View Details + hover summary */}
<div className="relative group">
  <button
    type="button"
    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
  >
    View Details
  </button>

  {/* Hover card */}
  <div
    className="
      pointer-events-none
      absolute left-1/2 top-full z-20 mt-3 w-[min(92vw,420px)] -translate-x-1/2
      opacity-0 translate-y-1 scale-[0.98]
      transition-all duration-200
      group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
    "
  >
    <div className="rounded-2xl border border-purple-100 bg-white/95 backdrop-blur shadow-2xl p-4 text-left">
      {/* title */}
      <p className="text-xs uppercase tracking-wider text-purple-700/80">
        Prada Dualitá
      </p>
      <h4 className="text-lg text-gray-900 leading-snug">
        Your Time, Your Intensity
      </h4>

      {/* summarized identity */}
      <p className="mt-2 text-sm text-gray-700">
        A contemporary luxury fragrance celebrating duality—two complementary
        intensities in one iconic hourglass bottle, crafted with recycled
        materials and refined rosé metallic details.
      </p>

      {/* 2 intensities summary */}
      <div className="mt-3 grid gap-2">
        <div className="rounded-xl bg-purple-50/70 p-3">
          <p className="text-xs font-semibold text-purple-800">
            Light Intensity — Intimate Elegance
          </p>
          <p className="text-sm text-gray-700">
            White pear + Italian bergamot over Damask rose &amp; orange blossom,
            finishing in white musk and cashmere wood—perfect for daytime and
            quiet confidence.
          </p>
        </div>

        <div className="rounded-xl bg-pink-50/70 p-3">
          <p className="text-xs font-semibold text-pink-800">
            Intense — Magnetic Presence
          </p>
          <p className="text-sm text-gray-700">
            Ripe pear + warm bergamot with a fuller rose and lush orange blossom,
            settling into musk, soft amber and warm woods—ideal for evening and
            presence.
          </p>
        </div>
      </div>

      {/* Ritual AI */}
      <div className="mt-3 rounded-xl border border-gray-100 bg-white p-3">
        <p className="text-xs font-semibold text-gray-800">Ritual AI (NFC)</p>
        <p className="text-sm text-gray-700">
          Tap your smartphone near the bottle to activate a guided digital ritual
          and choose the right intensity for the moment.
        </p>
      </div>
    </div>
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

               <div className="mb-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 p-3">
                  <p className="text-[11px] uppercase tracking-wider text-purple-700/80 mb-1">
                    How to apply
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    {perfume.description}
                  </p>
                </div>

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
