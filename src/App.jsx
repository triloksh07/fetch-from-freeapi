import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Terminal,
  Utensils,
  Layout,
  PlaySquare,
  ArrowLeft,
  RefreshCw,
  ChefHat,
  ShoppingBag,
  Star,
  Cat,
  User,
  MapPin,
  Mail,
  Quote,
  Dices,
  ChevronRight,
  Video,
  Flame,
} from "lucide-react";

import MealsApp from "./pages/MealsApp";
import JokesApp from "./pages/JokesApp";
import YtApp from "./pages/VideoApp";
import RandomQuote from "./pages/RandomQuote";
import CatApp from "./pages/RandomCat";

function LandingHub() {
  const projects = [
    {
      path: "/youtube",
      name: "YouTube Interface",
      desc: "Video grid with iframe player",
      icon: PlaySquare,
      color: "text-red-500",
    },
    {
      path: "/meals",
      name: "Recipe Explorer",
      desc: "Culinary app with ingredient parsing",
      icon: Utensils,
      color: "text-orange-500",
    },
    {
      path: "/products",
      name: "Product Showcase",
      desc: "Modern e-commerce UI design",
      icon: ShoppingBag,
      color: "text-emerald-500",
    },
    {
      path: "/users",
      name: "Identity Generator",
      desc: "Glassmorphism profile cards",
      icon: User,
      color: "text-blue-500",
    },
    {
      path: "/cats",
      name: "Feline Fetcher",
      desc: "Image-heavy layouts",
      icon: Cat,
      color: "text-purple-500",
    },
    {
      path: "/jokes",
      name: "Chuck.API",
      desc: "Neo-brutalist joke generator",
      icon: Terminal,
      color: "text-yellow-500",
    },
    {
      path: "/quotes",
      name: "Daily Wisdom",
      desc: "Neo-brutalist quote generator",
      icon: Quote,
      color: "text-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto">
        <header className="py-8 border-b border-white/10 mb-12">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-6 bg-linear-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Trilok's Sandbox
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            A consolidated portfolio of API integrations, UI designs, and React
            architecture patterns. Built with discipline.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Link
              key={proj.path}
              to={proj.path}
              className="group block p-8 bg-neutral-900 border border-neutral-800 rounded-4xl hover:bg-neutral-800 transition-all hover:-translate-y-2 hover:border-neutral-600"
            >
              <div className="bg-neutral-950 p-4 rounded-2xl w-fit mb-6 shadow-inner border border-white/5">
                <proj.icon className={`w-8 h-8 ${proj.color}`} />
              </div>
              <h2 className="text-2xl font-bold mb-3">{proj.name}</h2>
              <p className="text-neutral-400 mb-8">{proj.desc}</p>
              <div className="flex items-center text-sm font-bold text-white/30 group-hover:text-white transition-colors">
                Explore App{" "}
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHub />} />
        <Route path="/youtube" element={<YtApp />} />
        <Route path="/meals" element={<MealsApp />} />
        {/* <Route path="/products" element={<ProductApp />} /> */}
        {/* <Route path="/users" element={<UserApp />} /> */}
        <Route path="/cats" element={<CatApp />} />
        <Route path="/jokes" element={<JokesApp />} />
        <Route path="/quotes" element={<RandomQuote />} />
      </Routes>
    </BrowserRouter>
  );
}
