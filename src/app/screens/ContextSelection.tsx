import { useState } from "react";
import { useNavigate } from "react-router";
import { Clock, Calendar, MapPin, Thermometer, ArrowRight } from "lucide-react";

const timeOptions = ["Day", "Afternoon", "Night"];
const seasonOptions = ["Winter", "Summer", "Autumn", "Spring"];
const occasionOptions = ["Romantic Date", "Shopping", "Family Meeting", "Sport", "Business"];

export default function ContextSelection() {
  const [selectedTime, setSelectedTime] = useState<string>("Day");
  const [selectedSeason, setSelectedSeason] = useState<string>("Spring");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("Shopping");
  const [temperature, setTemperature] = useState<number>(22);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-prada-warm-50 p-6 pb-32 overflow-y-auto">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8 pt-4">
          <h1 className="text-3xl text-gray-800 mb-2">
            Set Your Context
          </h1>
          <p className="text-gray-600">Help us personalize your experience</p>
        </div>

        {/* Time of Day */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-prada-gold" />
            <h2 className="text-xl text-gray-800">Time of Day</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {timeOptions.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-4 rounded-xl transition-all ${
                  selectedTime === time
                    ? "bg-prada-gold text-prada-ink shadow-prada scale-105"
                    : "bg-white text-gray-700 shadow hover:shadow-md"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Season */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-prada-gold" />
            <h2 className="text-xl text-gray-800">Season</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {seasonOptions.map((season) => (
              <button
                key={season}
                onClick={() => setSelectedSeason(season)}
                className={`py-3 px-4 rounded-xl transition-all ${
                  selectedSeason === season
                    ? "bg-prada-gold text-prada-ink shadow-prada scale-105"
                    : "bg-white text-gray-700 shadow hover:shadow-md"
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        {/* Type of Occasion */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-prada-gold" />
            <h2 className="text-xl text-gray-800">Type of Occasion</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {occasionOptions.map((occasion) => (
              <button
                key={occasion}
                onClick={() => setSelectedOccasion(occasion)}
                className={`py-3 px-4 rounded-xl transition-all ${
                  selectedOccasion === occasion
                    ? "bg-prada-gold text-prada-ink shadow-prada scale-105"
                    : "bg-white text-gray-700 shadow hover:shadow-md"
                }`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-prada-gold" />
            <h2 className="text-xl text-gray-800">Temperature</h2>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Current Temperature</span>
              <span className="text-3xl text-prada-gold">{temperature}°C</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-lg appearance-none cursor-pointer"
              style={{
                accentColor: "#d4a574",
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>0°C</span>
              <span>40°C</span>
            </div>
          </div>
        </div>

        {/* Fixed Continue Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
          <div className="w-full max-w-md mx-auto">
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-prada-gold text-prada-ink rounded-full text-lg shadow-prada hover:bg-prada-wine hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
