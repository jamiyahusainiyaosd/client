import { CheckCircle } from "lucide-react";
import avaterImage from "/avater.png";

export const Authority = ({ name, title }) => {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors">
          <img
            src={avaterImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Professional verified badge */}
        <div className="absolute -bottom-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {name}
        </h3>
        <p className="text-xs text-emerald-600 dark:text-emerald-500 font-medium mt-0.5">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Authority;