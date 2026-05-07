import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Quote } from "lucide-react";

import { fetchData } from "../../lib/fetch";
import { PageLayout } from "./lib/PageLayout";

import {
  Terminal,
  Utensils,
  Layout,
  PlaySquare,
  ArrowLeft,
  // RefreshCw,
  ShoppingBag,
  Star,
  Cat,
  User,
  MapPin,
  Mail,
  // Quote,
  ChevronRight,
  Dices,
  List,
  RefreshCcw,
  Hash,
  Sparkles,
  Search,
  PlayCircle,
  ChefHat,
  BookOpen,
  Heart,
  X,
  Check,
  Globe,
} from "lucide-react";

const TextGeneratorUI = ({
  type,
  title,
  icon: Icon,
  colorTheme,
  fetcher,
  isJoke,
  data,
  loading,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <header className="mb-12 flex items-center gap-4 border-4 border-black bg-white p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl transform -rotate-1">
        <Icon className={`w-8 h-8 ${colorTheme}`} />
        {/* <h1 className="text-2xl font-black text-black uppercase tracking-tighter">
          {title}
        </h1> */}
        <h1
          className={`text-2xl font-black uppercase tracking-tighter ${colorTheme}`}
        >
          {title}
        </h1>
      </header>

      <div className="w-full max-w-3xl relative border-4 border-black bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-8 sm:p-12 mb-12 min-h-[300px] flex flex-col justify-center">
        {loading || !data ? (
          <div className="flex justify-center">
            <RefreshCw className={`w-12 h-12 animate-spin ${colorTheme}`} />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
              <span className="font-black text-xl text-gray-500">
                #{data.id}
              </span>
              {isJoke && data.categories?.length > 0 && (
                <span className="bg-black text-white px-4 py-1.5 uppercase font-bold text-sm tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {data.categories[0]}
                </span>
              )}
            </div>
            <p className="text-2xl sm:text-4xl font-bold leading-tight font-sans tracking-tight">
              "{data.content}"
            </p>
            {!isJoke && data.author && (
              <p className="mt-8 text-xl font-black text-right">
                — {data.author}
              </p>
            )}
          </>
        )}
      </div>

      <button
        onClick={fetcher}
        disabled={loading}
        className="px-10 py-5 font-black text-white transition-all duration-200 bg-black border-4 border-black rounded-xl hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none uppercase tracking-widest text-xl disabled:opacity-50"
      >
        <RefreshCw
          className={`inline w-6 h-6 mr-3 ${loading ? "animate-spin" : ""}`}
        />{" "}
        Hit Me Again
      </button>
    </div>
  );
};

export default function RandomQuote() {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const mockQuote = {
  //     identifier: "Quote of the Day",
  //     tag: "Inspirational",
  //     content: "The only way to do great work is to love what you do.",
  //     author: "Steve Jobs",
  //   };

  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    const res = await fetchData(url);
    setQuote(res.payload);
    // if (res.raw?.data) setQuote(res.raw.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function loadData() {
      //   setLoading(true);
      //   const res = await fetchData(url);
      //   setQuote(res.payload);
      //   setLoading(false);
      fetchQuote();
    }
    loadData();
  }, [fetchQuote]);

  return (
    <PageLayout bgClass="bg-[#f0f9ff]" title="Wisdom Generator">
      <TextGeneratorUI
        type="quote"
        title="Wisdom.API"
        icon={Quote}
        colorTheme="text-blue-600"
        data={quote}
        loading={loading}
        fetcher={fetchQuote}
        isJoke={false}
      />
    </PageLayout>
  );
}
