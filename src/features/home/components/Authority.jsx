import { CheckCircle } from "lucide-react";
import SmoothImage from "../../../components/SmoothImage";
const avaterImage = "/muhtamim.webp";

export const Authority = ({ name, title }) => {
  return (
    <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50  transition-all duration-200">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-slate-200  group-hover:border-emerald-300  transition-colors">
          <SmoothImage
            src={avaterImage}
            fallbackSrc="/avater.png"
            alt={name}
            containerClassName="h-full w-full"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Professional verified badge */}
        <div className="absolute -bottom-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-white  border border-slate-200 ">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-900  leading-snug">
          {name}
        </h3>
        <p className="text-xs text-emerald-600  font-medium mt-0.5">{title}</p>
      </div>
    </div>
  );
};

export default Authority;
