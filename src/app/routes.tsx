import { createBrowserRouter } from "react-router";
import CameraCapture from "./screens/CameraCapture";
import AnalyzingPhoto from "./screens/AnalyzingPhoto";
import MoodSelection from "./screens/MoodSelection";
import ContextSelection from "./screens/ContextSelection";
import PerfumeResults from "./screens/PerfumeResults";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CameraCapture,
  },
  {
    path: "/analyzing",
    Component: AnalyzingPhoto,
  },
  {
    path: "/mood",
    Component: MoodSelection,
  },
  {
    path: "/context",
    Component: ContextSelection,
  },
  {
    path: "/results",
    Component: PerfumeResults,
  },
], { basename: import.meta.env.BASE_URL });
