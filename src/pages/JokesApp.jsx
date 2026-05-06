import React, { useState, useEffect, useCallback } from "react";
import {
  Dices,
  List,
  RefreshCcw,
  Hash,
  Terminal,
  Sparkles,
} from "lucide-react";
import { fetchData } from "../../lib/fetch";

export default function JokesApp() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI State: 'single' for the random generator, 'list' for the feed
  const [viewMode, setViewMode] = useState("single");

  // State for the currently displayed random joke
  const [activeRandomJoke, setActiveRandomJoke] = useState(null);

  // Function to pick a random joke from our cached array
  const pickRandomJoke = useCallback((jokesArray) => {
    if (!jokesArray || jokesArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * jokesArray.length);
    setActiveRandomJoke(jokesArray[randomIndex]);
  }, []);

  const url = "https://api.freeapi.app/api/v1/public/randomjokes";
  // const quote = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  // const quotesApi = "https://api.freeapi.app/api/v1/public/quotes";

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchData(url);
      console.log("data from jokes api: ", res.payload);
      setJokes(res.payload);
      pickRandomJoke(res.payload);
      // console.log("data from jokes api after set: ", jokes);
      // console.log("random joke from api: ", activeRandomJoke);
      setLoading(false);
    }
    loadData();
  }, [pickRandomJoke, url]);

  return (
    <div className="min-h-screen bg-[#FFF0E5] text-black font-mono p-4 sm:p-8 flex justify-center selection:bg-orange-400">
      <div className="w-full max-w-4xl">
        {/* HEADER & CONTROLS */}
        <header className="mb-12 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 border-4 border-black bg-white p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl transform -rotate-1 hover:rotate-0 transition-transform">
            <Terminal className="w-8 h-8 text-orange-600" />
            <h1 className="text-2xl font-black uppercase tracking-tighter">
              Chuck.API
            </h1>
          </div>

          {/* View Toggle */}
          <div className="flex bg-white border-4 border-black rounded-xl p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setViewMode("single")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-colors ${
                viewMode === "single"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <Dices className="w-5 h-5" /> Randomizer
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wide transition-colors ${
                viewMode === "list"
                  ? "bg-black text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <List className="w-5 h-5" /> Feed View
            </button>
          </div>
        </header>

        {loading ? (
          /* NEO-BRUTALIST LOADER */
          <div className="w-full h-64 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-2xl flex flex-col items-center justify-center gap-4">
            <RefreshCcw className="w-12 h-12 animate-spin text-orange-500" />
            <p className="font-bold text-xl uppercase tracking-widest">
              Fetching Data...
            </p>
          </div>
        ) : (
          <main>
            {/* --- VIEW 1: SINGLE RANDOM JOKE --- */}
            {viewMode === "single" && activeRandomJoke && (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="w-full relative border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 sm:p-12 mb-12">
                  {/* Decorative Elements */}
                  <div className="absolute -top-6 -left-6 bg-orange-400 border-4 border-black rounded-full p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>

                  {/* ID & Category Badge */}
                  <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
                    <span className="flex items-center gap-1 font-black text-xl text-gray-500">
                      <Hash className="w-6 h-6" /> {activeRandomJoke.id}
                    </span>
                    {activeRandomJoke.categories?.length > 0 && (
                      <span className="bg-black text-white px-4 py-1.5 uppercase font-bold text-sm tracking-widest">
                        {activeRandomJoke.categories[0]}
                      </span>
                    )}
                  </div>

                  {/* Joke Content */}
                  <p className="text-2xl sm:text-4xl font-bold leading-tight font-sans tracking-tight">
                    "{activeRandomJoke.content}"
                  </p>
                </div>

                {/* Randomize Button */}
                <button
                  onClick={() => pickRandomJoke(jokes)}
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-white transition-all duration-200 bg-orange-500 border-4 border-black rounded-xl hover:bg-orange-400 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest text-xl"
                >
                  <RefreshCcw className="w-6 h-6 mr-3 group-active:animate-spin" />{" "}
                  Hit Me Again
                </button>
              </div>
            )}

            {/* --- VIEW 2: LIST / FEED VIEW --- */}
            {viewMode === "list" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-8 duration-500">
                {jokes.map((joke) => (
                  <div
                    key={joke.id}
                    className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-black text-gray-400 text-lg">
                        #{joke.id}
                      </span>
                      {joke.categories?.length > 0 && (
                        <span className="bg-orange-200 border-2 border-black px-2 py-0.5 text-xs font-bold uppercase">
                          {joke.categories[0]}
                        </span>
                      )}
                    </div>

                    <p className="text-lg font-bold font-sans">
                      {joke.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}
