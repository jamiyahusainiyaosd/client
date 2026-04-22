import avatarImage from "/avater.png";
 
const Teacher = ({ avatar, name, designation, phone_number }) => {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-4 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:bg-white dark:hover:bg-slate-800/60 hover:shadow-sm transition-all duration-200">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={avatar || avatarImage}
          alt={name}
          className="h-14 w-14 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-700 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors"
          onError={(e) => (e.target.src = avatarImage)}
        />
        <div className="absolute -bottom-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900">
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
      </div>
 
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
          {name}
        </h3>
 
        <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-500 font-medium truncate">
          {designation}
        </p>
 
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone_number || "প্রদান করা হয়নি"}
        </p>
      </div>
    </div>
  );
};
 
export default Teacher;