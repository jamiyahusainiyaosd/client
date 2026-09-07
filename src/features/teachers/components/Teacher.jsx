import SmoothImage from "../../../components/SmoothImage";

const Teacher = ({ avatar, image, name, designation, phone_number, priority = false }) => {
  return (
    <div className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-150 hover:shadow-md hover:border-slate-300">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <SmoothImage
          src={avatar || image}
          fallbackSrc="/avater.png"
          alt={name}
          priority={priority}
          containerClassName="h-14 w-14 rounded-lg border-2 border-slate-200 group-hover:border-slate-300 transition-colors"
          className="h-full w-full object-cover"
        />
        <div className="absolute -bottom-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-emerald-600 border-2 border-white">
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </div>
      </div>
 
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition-colors font-display">
          {name}
        </h3>
 
        <p className="mt-0.5 text-xs text-emerald-600 font-semibold truncate">
          {designation}
        </p>
 
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <svg className="w-3 h-3 flex-shrink-0 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {phone_number || "প্রদান করা হয়নি"}
        </p>
      </div>
    </div>
  );
};
 
export default Teacher;