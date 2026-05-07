import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Cat } from "lucide-react";

import { PageLayout } from "./lib/PageLayout";
import { fetchData } from "../../lib/fetch";

export default function CatApp() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";

  const fetchCat = useCallback(async () => {
    setLoading(true);
    const res = await fetchData(url);
    if (res.raw?.data) setCat(res.raw.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      await fetchCat();
      setLoading(false);
    }
    loadData();
  }, [fetchCat]);

  return (
    <PageLayout bgClass="bg-purple-900" title="Feline Viewer">
      <div className="flex-1 flex flex-col items-center justify-center">
        {loading || !cat ? (
          <RefreshCw className="w-12 h-12 animate-spin text-purple-300" />
        ) : (
          <div className="w-full max-w-lg bg-white p-4 pb-8 sm:p-6 sm:pb-12 rounded-sm shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-square rounded-sm overflow-hidden mb-8 bg-neutral-100 border border-gray-200 shadow-inner">
              <img
                src={cat.url || cat.image}
                alt="Random Cat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 text-center">
              <h2 className="text-3xl font-black mb-2 text-neutral-800 font-mono tracking-tighter">
                {cat.breed || "Random Feline"}
              </h2>
              {cat.origin && (
                <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-4">
                  Origin: {cat.origin}
                </p>
              )}
              {cat.temperament && (
                <div className="inline-block bg-purple-100 text-purple-900 px-4 py-2 rounded-lg font-bold text-sm">
                  {cat.temperament}
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={fetchCat}
          disabled={loading}
          className="mt-12 bg-white text-purple-900 px-8 py-4 rounded-full font-black shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0"
        >
          Fetch New Cat
        </button>


      </div>
    </PageLayout>
  );
}
