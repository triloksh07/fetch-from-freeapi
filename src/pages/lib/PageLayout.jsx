import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const PageLayout = ({ children, bgClass = "bg-neutral-50", title }) => {
  return (
    <div
      className={`min-h-screen ${bgClass} text-slate-900 font-sans p-4 sm:p-8 animate-in fade-in duration-500`}
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-black/5 hover:bg-white"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Hub
          </Link>
          {title && (
            <h2 className="text-xl font-black text-black opacity-30 uppercase tracking-widest hidden sm:block">
              {title}
            </h2>

            // <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest hidden sm:block">
            //   {title}
            // </h2>
          )}
        </header>
        {children}
      </div>
    </div>
  );
};

// export const PageLayoutLatest = ({
//   children,
//   bgClass = "bg-neutral-50",
//   title,
// }) => {
//   return (
//     <div
//       className={`min-h-screen ${bgClass} text-slate-900 font-sans p-4 sm:p-8 flex flex-col`}
//     >
//       <header className="mb-8 flex justify-between items-center w-full">
//         <Link
//           to="/"
//           className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold bg-white/80 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all"
//         >
//           <ArrowLeft className="w-5 h-5" /> Back to Hub
//         </Link>
//         {title && (
//           <h2 className="text-xl font-black text-black opacity-30 uppercase tracking-widest hidden sm:block">
//             {title}
//           </h2>
//         )}
//       </header>
//       <div className="flex-1 w-full flex flex-col">{children}</div>
//     </div>
//   );
// };
