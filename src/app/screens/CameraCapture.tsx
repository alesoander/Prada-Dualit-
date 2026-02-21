import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Camera, Upload, RefreshCw, ArrowRight, SwitchCamera } from "lucide-react";

export default function CameraCapture() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const blackStreamTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const stopStream = (s: MediaStream | null) => {
    s?.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    streamRef.current = stream;
  }, [stream]);

  useEffect(() => {
    return () => {
      if (blackStreamTimerRef.current !== null) {
        clearTimeout(blackStreamTimerRef.current);
      }
      stopStream(streamRef.current);
    };
  }, []);

  const attachStream = (video: HTMLVideoElement, mediaStream: MediaStream): Promise<void> =>
    new Promise((resolve, reject) => {
      video.srcObject = mediaStream;
      const onReady = () => {
        video.removeEventListener("loadedmetadata", onReady);
        video.play().then(resolve).catch(reject);
      };
      video.addEventListener("loadedmetadata", onReady);
    });

  const startCamera = async (requestedFacingMode?: "environment" | "user") => {
    setCapturedImage(null);
    setError(null);
    const video = videoRef.current;
    if (!video) return;

    const primary = requestedFacingMode ?? facingMode;
    const fallback: "environment" | "user" = primary === "environment" ? "user" : "environment";

    const tryStart = async (constraints: MediaTrackConstraints) => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: constraints,
        audio: false,
      });
      await attachStream(video, mediaStream);
      setStream(mediaStream);
      setIsCameraActive(true);

      // Detect black-stream: check videoWidth a short time after play starts.
      // Guard against stale callbacks by verifying the track is still live.
      if (blackStreamTimerRef.current !== null) {
        clearTimeout(blackStreamTimerRef.current);
      }
      blackStreamTimerRef.current = setTimeout(() => {
        blackStreamTimerRef.current = null;
        const track = mediaStream.getVideoTracks()[0];
        if (track && track.readyState === "live" && video.videoWidth === 0) {
          stopStream(mediaStream);
          setStream(null);
          setIsCameraActive(false);
          setError(
            "Camera started but no video frames were received. Try switching camera or use upload."
          );
        }
      }, 2000);
    };

    try {
      await tryStart({ facingMode: { ideal: primary } });
      setFacingMode(primary);
    } catch {
      // Fall back to the other camera if the requested one is unavailable
      try {
        await tryStart({ facingMode: { ideal: fallback } });
        setFacingMode(fallback);
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Camera access denied. Please use upload option instead.");
      }
    }
  };

  const switchCamera = async () => {
    const next: "environment" | "user" = facingMode === "environment" ? "user" : "environment";
    stopStream(stream);
    setStream(null);
    setIsCameraActive(false);
    await startCamera(next);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg");

    stopStream(stream);
    setStream(null);
    setIsCameraActive(false);
    sessionStorage.setItem("capturedImage", dataUrl);
    setCapturedImage(dataUrl);
  };

  const continueToAnalyzing = () => {
    navigate("/analyzing");
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        stopStream(stream);
        setStream(null);
        setIsCameraActive(false);
        const dataUrl = e.target?.result as string;
        sessionStorage.setItem("capturedImage", dataUrl);
        navigate("/analyzing");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-center mb-8 text-3xl text-gray-800">
          Capture Your Moment
        </h1>

        <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden shadow-2xl mb-8">
          {/* Video is always mounted so videoRef is available before isCameraActive is set */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover${isCameraActive && !capturedImage ? "" : " hidden"}`}
          />
          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : !isCameraActive ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 cursor-pointer"
              onClick={startCamera}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") startCamera(); }}
              role="button"
              tabIndex={0}
              aria-label="Start camera"
            >
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <Camera className="w-16 h-16 text-white" />
              </div>
              <p className="text-white text-lg text-center">Start camera or upload a photo</p>
              {error && (
                <p className="text-yellow-300 text-sm mt-4 text-center">{error}</p>
              )}
            </div>
          ) : null}

          {/* Switch camera button – shown while camera is active */}
          {isCameraActive && !capturedImage && (
            <button
              onClick={switchCamera}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              aria-label="Switch camera"
            >
              <SwitchCamera className="w-5 h-5" />
            </button>
          )}

          {/* Camera frame overlay */}
          <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none">
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
          </div>
        </div>

        {/* Hidden canvas for frame grab */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          className="hidden"
        />

        {!isCameraActive && !capturedImage ? (
          <div className="space-y-3">
            <button
              onClick={startCamera}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-6 h-6" />
              Start Camera
            </button>
            <button
              onClick={triggerFileUpload}
              className="w-full py-4 bg-white text-purple-600 border-2 border-purple-500 rounded-full text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Upload className="w-6 h-6" />
              Upload Photo
            </button>
          </div>
        ) : isCameraActive ? (
          <button
            onClick={capturePhoto}
            className="w-full py-4 bg-white text-purple-600 rounded-full text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Camera className="w-6 h-6" />
            Capture Photo
          </button>
        ) : capturedImage ? (
          <div className="space-y-3">
            <button
              onClick={continueToAnalyzing}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-6 h-6" />
              Continue
            </button>
            <button
              onClick={retake}
              className="w-full py-4 bg-white text-purple-600 border-2 border-purple-500 rounded-full text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-6 h-6" />
              Retake
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}