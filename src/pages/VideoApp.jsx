import React, { useState, useEffect } from "react";
import {
  Menu,
  Search,
  Mic,
  Bell,
  Video,
  Home,
  PlaySquare,
  Clock,
  ThumbsUp,
  MoreVertical,
  History,
  MonitorPlay,
  Flame,
  Music,
  Gamepad2,
  Newspaper,
  X,
} from "lucide-react";

// --- UTILITY FUNCTIONS FOR RAW API DATA ---

// YouTube returns duration as "PT1H13M15S" or "PT30M2S". This parses it to "1:13:15"
const parseYouTubeDuration = (duration) => {
  if (!duration) return "0:00";
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = (match[1] || "").replace("H", "");
  const minutes = (match[2] || "").replace("M", "");
  const seconds = (match[3] || "").replace("S", "");

  let result = "";
  if (hours) result += `${hours}:`;
  // Pad minutes with 0 if there are hours, otherwise just use minutes or 0
  result += `${hours ? minutes.padStart(2, "0") : minutes || "0"}:`;
  result += seconds.padStart(2, "0") || "00";

  return result;
};

// Format 74000 to "74K"
const formatViews = (viewCount) => {
  const num = parseInt(viewCount);
  if (isNaN(num)) return "0";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

// Convert ISO date "2024-05-10T10:00:00Z" to "5 days ago"
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

// const CATEGORIES = [
//   "All",
//   "Live",
//   "News",
//   "Computer programming",
//   "Startup company",
//   "Podcasts",
//   "Music",
// ];

const SIDEBAR_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: Flame, label: "Shorts" },
  { icon: MonitorPlay, label: "Subscriptions" },
];

export default function YtApp() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState(null); // State for the iframe player

  const url = "https://api.freeapi.app/api/v1/public/youtube/videos";

  useEffect(() => {
    async function loadVideo() {
      try {
        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };
        const response = await fetch(url, options);
        const json = await response.json();
        setVideos(json.data.data);
      } catch (err) {
        console.error(`Error fetching ${url}:`, err);
      } finally {
        setLoading(false);
      }
    }
    loadVideo();
  }, []);

  if (loading) return <div>loading videos...</div>;

  return (
    <div className="flex flex-col top-[20rem] h-screen bg-[#0f0f0f] text-white overflow-hidden font-sans">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-2 h-14 bg-[#0f0f0f] z-20">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#272727] rounded-full transition-colors hidden sm:block">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1 cursor-pointer">
            <div className="bg-red-600 text-white rounded-lg p-1">
              <PlaySquare className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter hidden sm:block">
              YouTube
            </span>
          </div>
        </div>
        <div className="flex items-center flex-1 max-w-2xl ml-8 mr-4">
          <div className="flex w-full">
            <div className="flex w-full items-center bg-[#121212] border border-[#303030] rounded-l-full px-4 py-1.5 focus-within:border-blue-500">
              <Search className="w-5 h-5 text-gray-400 hidden md:block mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>
            <button className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-1.5 hover:bg-[#303030]">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside className="w-[72px] px-1 hidden sm:flex flex-col py-3 overflow-y-auto">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex flex-col items-center justify-center text-[10px] gap-1 px-0 py-4 rounded-xl hover:bg-[#272727]"
              >
                <Icon
                  className={`w-6 h-6 ${item.active ? "fill-white" : ""}`}
                />
                <span className="truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            );
          })}
        </aside>

        {/* FEED SECTION */}
        <main className="flex-1 overflow-y-auto bg-[#0f0f0f] p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {loading ? (
              <div>Loading videos...</div>
            ) : (
              videos.map((videoData, index) => {
                // --- MAP THE DATA STRUCTURE YOU PROVIDED ---
                const videoId = videoData.items.id;
                const snippet = videoData.items.snippet;
                const stats = videoData.items.statistics;
                const details = videoData.items.contentDetails;

                // Destructure exactly as you wrote
                const { title, channelTitle, publishedAt, thumbnails } =
                  snippet;
                const { viewCount } = stats;
                const { duration } = details;

                // Architect check: Use high-res thumbnail, fallback to default
                const bestThumbnail =
                  thumbnails?.maxres?.url ||
                  thumbnails?.high?.url ||
                  thumbnails?.default?.url;

                // YouTube API doesn't provide channel avatar in the video endpoint usually.
                // Fallback UI Avatar generator using the channel name
                const channelAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  channelTitle
                )}&background=272727&color=fff`;

                return (
                  <div
                    key={"uniqueid" + videoId + index}
                    className="flex flex-col gap-3 group cursor-pointer"
                    onClick={() => setActiveVideoId(videoId)} // This triggers the iframe overlay
                  >
                    {/* Thumbnail Container */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                      <img
                        src={bestThumbnail}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {/* Formatted Duration Overlay */}
                      <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                        {parseYouTubeDuration(duration)}
                      </div>
                    </div>

                    {/* Video Details */}
                    <div className="flex gap-3 items-start">
                      {/* Channel Avatar */}
                      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mt-0.5">
                        <img
                          src={channelAvatar}
                          alt={channelTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Text Details */}
                      <div className="flex flex-col overflow-hidden w-full pr-4">
                        <h3 className="text-white text-[15px] font-medium line-clamp-2 leading-tight mb-1">
                          {title}
                        </h3>
                        <div className="text-[#aaaaaa] text-sm flex flex-col">
                          <span className="hover:text-white transition-colors">
                            {channelTitle}
                          </span>
                          <div className="flex items-center text-[13px]">
                            {/* Formatted Stats */}
                            <span>{formatViews(viewCount)} views</span>
                            <span className="mx-1 text-[10px]">•</span>
                            <span>{formatTimeAgo(publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        {/* --- IN-APP VIDEO PLAYER OVERLAY (The Iframe method) --- */}
        {activeVideoId && (
          <div className="absolute inset-0 z-50 bg-[#0f0f0f] flex flex-col">
            <div className="flex justify-between items-center p-4 bg-black">
              <h2 className="text-lg font-bold">Now Playing</h2>
              <button
                onClick={() => setActiveVideoId(null)}
                className="p-2 bg-[#272727] hover:bg-red-600 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
