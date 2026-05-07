import React, { useState, useEffect, useCallback } from "react";
import { List, RefreshCcw, Terminal } from "lucide-react";
// import { Link } from "react-router-dom";
import { PageLayout } from "./lib/PageLayout";
import { fetchData } from "../../lib/fetch";

export default function JokesApp() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("single");
  const [activeRandomJoke, setActiveRandomJoke] = useState(null);

  const url = "https://official-joke-api.appspot.com/jokes/programming/ten";

  const pickRandomJoke = useCallback((jokesArray) => {
    if (!jokesArray || jokesArray.length === 0) return;
    const randomIndex = Math.floor(Math.random() * jokesArray.length);
    setActiveRandomJoke(jokesArray[randomIndex]);
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchData(url);
      const data = res.raw ?? res.payload ?? [];
      setJokes(data);
      pickRandomJoke(data);
      setLoading(false);
    }
    loadData();
  }, [pickRandomJoke]);

  return (
    <PageLayout title="Terminal_Jokes.v1" bgClass="bg-[#F8F9FA]">
      <main className="max-w-4xl mx-auto">
        {/* VIEW TOGGLE - Integrated into the new layout style */}
        <div className="flex mb-10 bg-slate-200/50 p-1 rounded-xl w-fit mx-auto border border-slate-300">
          <button
            onClick={() => setViewMode("single")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              viewMode === "single"
                ? "bg-white text-black shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Terminal className="w-4 h-4" /> Instance
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              viewMode === "list"
                ? "bg-white text-black shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <List className="w-4 h-4" /> Commit Log
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-300 rounded-3xl">
            <RefreshCcw className="w-8 h-8 animate-spin text-slate-400 mb-4" />
            <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">
              Initializing Stream...
            </p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* --- VIEW 1: SINGLE TERMINAL INSTANCE --- */}
            {viewMode === "single" && activeRandomJoke && (
              <div className="flex flex-col items-center gap-8">
                <div className="w-full font-mono bg-[#0D1117] text-slate-300 p-1 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,0.05)] rounded-xl overflow-hidden">
                  {/* Top Bar */}
                  <div className="bg-[#161B22] p-3 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-black uppercase">
                      node ./joke-fetcher.js
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-8 relative">
                    <div className="flex gap-4">
                      <span className="text-blue-400 font-bold">λ</span>
                      <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                        {activeRandomJoke.setup}
                      </p>
                    </div>

                    <div className="animate-in fade-in slide-in-from-left-4 duration-1000 delay-500 fill-mode-both">
                      <div className="flex gap-4 p-4 bg-green-500/5 border-l-2 border-green-500">
                        <span className="text-green-500 font-bold">→</span>
                        <p className="text-xl sm:text-2xl font-bold text-green-400 italic">
                          {activeRandomJoke.punchline}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => pickRandomJoke(jokes)}
                  className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-tighter hover:bg-slate-800 active:scale-95 transition-all shadow-lg"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Execute Next
                </button>
              </div>
            )}

            {/* --- VIEW 2: COMMIT LOG VIEW --- */}
            {viewMode === "list" && (
              <div className="space-y-3">
                {jokes.map((joke) => (
                  <div
                    key={joke.id}
                    className="group bg-white border border-slate-200 rounded-lg overflow-hidden transition-all hover:border-black hover:shadow-md"
                  >
                    <div className="p-4 flex items-start gap-4">
                      <div className="flex flex-col items-center py-1">
                        <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-orange-500"></div>
                        <div className="w-[1px] h-full bg-slate-200 group-hover:bg-slate-800"></div>
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400">
                            #00{joke.id}
                          </span>
                          <span className="text-[10px] font-mono font-black text-orange-600 bg-orange-50 px-1.5 rounded">
                            MODIFIED
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">
                          {joke.setup}
                        </h3>

                        {/* Auto-Reveal on Hover logic */}
                        <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out">
                          <div className="pt-2 border-t border-slate-100 mt-2 text-green-600 font-mono font-bold">
                            + {joke.punchline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </PageLayout>
  );
}
