import avaterImage from "/avater.png";

export const Authority = ({ name, title }) => {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200">
      <div className="relative flex-shrink-0">
        <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 group-hover:border-emerald-300 dark:group-hover:border-emerald-700 transition-colors">
          <img
            src={avaterImage}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 flex items-center justify-center rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 text-[10px]">
          ⭐
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {name}
        </h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-500 font-medium mt-1">
          {title}
        </p>
      </div>
    </div>
  );
};

export default Authority;