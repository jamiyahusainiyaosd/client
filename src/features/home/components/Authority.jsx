import avaterImage from "/avater.png";

const Authority = ({ name, title }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50/70 via-white to-white dark:from-emerald-900/60 dark:via-slate-900 dark:to-slate-950 dark:border-emerald-500/40 shadow-md shadow-emerald-900/10 hover:shadow-xl transition-all duration-300 px-4 py-5">
      <div className="flex flex-col items-center text-center gap-3">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 opacity-60 blur group-hover:opacity-90 transition-opacity" />
          <div className="relative h-28 w-28 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden shadow-lg shadow-emerald-900/40">
            <img
              src={avaterImage}
              alt={`${name}'s avatar`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs ring-2 ring-white dark:ring-slate-950">
            ⭐
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            {name}
          </h3>
          <p className="mt-1 text-xs font-medium tracking-wide text-emerald-700 dark:text-emerald-300">
            {title}
          </p>
        </div>
      </div>
    </article>
  );
};

export default Authority;