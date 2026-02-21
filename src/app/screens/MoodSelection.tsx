import { useState } from "react";
import { useNavigate } from "react-router";
import { Smile, Heart, Zap, Sun, Shield } from "lucide-react";

const moods = [
  { id: "confident", label: "Confident", icon: Zap, color: "from-orange-400 to-red-500" },
  { id: "calm", label: "Calm", icon: Heart, color: "from-blue-400 to-cyan-500" },
  { id: "bold", label: "Bold", icon: Shield, color: "from-purple-500 to-pink-600" },
  { id: "light", label: "Light", icon: Sun, color: "from-yellow-400 to-orange-400" },
  { id: "protected", label: "Protected", icon: Shield, color: "from-green-400 to-teal-500" },
];

export default function MoodSelection() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setTimeout(() => {
      navigate("/context");
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Smile className="w-16 h-16 mx-auto mb-4 text-purple-600" />
          <h1 className="text-3xl text-gray-800 mb-2">
            How Are You Feeling?
          </h1>
          <p className="text-gray-600">Choose the mood that fits you best</p>
        </div>

        <div className="space-y-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.id;
            
            return (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`w-full p-6 rounded-2xl transition-all duration-300 transform ${
                  isSelected
                    ? "scale-105 shadow-2xl"
                    : "hover:scale-102 shadow-lg hover:shadow-xl"
                } bg-gradient-to-r ${mood.color}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-2xl text-white">{mood.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
