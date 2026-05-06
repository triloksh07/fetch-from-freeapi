import React, { useState, useEffect, useCallback } from "react";
import {
  Utensils,
  Globe,
  Tag,
  PlayCircle,
  RefreshCw,
  ChefHat,
  Clock,
  BookOpen,
  ChevronRight,
} from "lucide-react";

// --- UTILITIES ---

// Convert flat ingredient keys into a clean array of objects
const extractIngredients = (mealData) => {
  if (!mealData) return [];
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealData[`strIngredient${i}`];
    const measure = mealData[`strMeasure${i}`];

    // Only add if the ingredient actually exists and isn't just whitespace
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        id: i,
        name: ingredient.trim(),
        amount: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
};

// Convert standard YT link to Embed link
const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
  return videoIdMatch
    ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
    : null;
};

export default function MealsApp() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recipe");

  const url = "https://api.freeapi.app/api/v1/public/meals/meal/random";

  const fetchRandomMeal = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();
      return json;
    } catch (error) {
      console.error("Meal fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function load() {
      const data = await fetchRandomMeal();
      // console.log(`meal data from ${url}`);
      setMeal(data.data);
    }
    load();
  }, [fetchRandomMeal]);

  // Pre-process data before rendering
  const ingredients = extractIngredients(meal);
  const embedUrl = getYouTubeEmbedUrl(meal?.strYoutube);
  const tags = meal?.strTags ? meal.strTags.split(",") : [];

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-slate-800 font-sans p-4 sm:p-8 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg shadow-orange-500/30">
              <ChefHat className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                Culinary Explorer
              </h1>
              <p className="text-slate-500 font-medium">
                Discover global recipes
              </p>
            </div>
          </div>
          <button
            onClick={fetchRandomMeal}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-xl shadow-slate-900/20 disabled:opacity-50 active:scale-95"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            Get a Random Meal
          </button>
        </header>

        {loading || !meal ? (
          /* SKELETON LOADER */
          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 animate-pulse flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 aspect-square bg-slate-200 rounded-3xl"></div>
            <div className="w-full md:w-1/2 space-y-4 pt-4">
              <div className="h-10 bg-slate-200 rounded-xl w-3/4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded-md w-20"></div>
                <div className="h-6 bg-slate-200 rounded-md w-24"></div>
              </div>
              <div className="h-64 bg-slate-200 rounded-2xl mt-8"></div>
            </div>
          </div>
        ) : (
          /* MAIN CONTENT BLOCK */
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row">
              {/* Image Container */}
              <div className="w-full md:w-1/2 relative h-[60vh] md:h-auto min-h-[400px]">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Gradient Overlay for Text Readability if we wanted to overlay text, but keeping it clean here */}
              </div>

              {/* Title & Metadata Container */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                {/* Meta Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                    <Utensils className="w-4 h-4" /> {meal.strCategory}
                  </span>
                  <span className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                    <Globe className="w-4 h-4" /> {meal.strArea}
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight mb-6">
                  {meal.strMeal}
                </h2>

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    <Tag className="w-5 h-5 text-slate-400" />
                    {tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-slate-500 font-medium text-sm"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Custom Tab Switcher */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full max-w-sm">
                  <button
                    onClick={() => setActiveTab("recipe")}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${
                      activeTab === "recipe"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <BookOpen className="w-4 h-4" /> Recipe
                  </button>
                  {embedUrl && (
                    <button
                      onClick={() => setActiveTab("video")}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-center items-center gap-2 ${
                        activeTab === "video"
                          ? "bg-white text-red-600 shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <PlayCircle className="w-4 h-4" /> Video Guide
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* TAB CONTENT */}
            <div className="p-8 md:p-12 border-t border-slate-100 bg-slate-50/50">
              {activeTab === "recipe" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Ingredients Sidebar */}
                  <div className="lg:col-span-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      Ingredients
                    </h3>
                    <ul className="space-y-3">
                      {ingredients.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm border border-slate-100"
                        >
                          <span className="font-semibold text-slate-700">
                            {item.name}
                          </span>
                          <span className="text-orange-600 font-bold text-sm bg-orange-50 px-2 py-1 rounded-lg">
                            {item.amount}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions Main */}
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">
                      Instructions
                    </h3>
                    <div className="prose prose-slate max-w-none">
                      {meal.strInstructions
                        .split(/\r\n|\n/)
                        .map((paragraph, idx) => {
                          if (!paragraph.trim()) return null;
                          return (
                            <p
                              key={idx}
                              className="text-slate-600 leading-relaxed text-lg mb-4 flex gap-4"
                            >
                              <span className="text-orange-300 font-black text-2xl select-none flex-shrink-0">
                                <ChevronRight className="w-6 h-6 mt-1" />
                              </span>
                              <span>{paragraph}</span>
                            </p>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "video" && embedUrl && (
                <div className="w-full flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Follow Along
                  </h3>
                  <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
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
        )}
      </div>
    </div>
  );
}
