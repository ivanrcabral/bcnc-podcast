import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import PodcastChapter from "./components/podcast-chapter/PodcastChapter";
import Podcast from "./components/podcast/Podcast";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/podcast/:podcastId",
      element: <Podcast />
    },
    {
      path: "/podcast/:podcastId/episode/:episodeId",
      element: <PodcastChapter />
    }
  ]);