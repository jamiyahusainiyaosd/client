import { useState } from "react";
import PropTypes from "prop-types";
import { formatDonationAmount } from "../utils/donorUtils";

const DonorCard = ({ donor }) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const {
    name = "সম্মানিত দাতা",
    member_type = "প্রবাসী",
    status = "সক্রীয়",
    address = "",
    mobile = "",
    chadar_amount = null,
    image = null,
  } = donor || {};

  const handleCopy = () => {
    if (mobile) {
      navigator.clipboard?.writeText(mobile);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const imageSrc = !imgError && image ? image : null;
  const displayAmount = formatDonationAmount(chadar_amount);

  return (
    <article className="group bg-[#f1f3ff] border border-slate-200/80 rounded-2xl p-5 sm:p-6 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top Profile Header with Large Image and Badges */}
        <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
          {/* Donor Portrait Avatar */}
          <div className="relative shrink-0">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={name}
                onError={() => setImgError(true)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white shadow-sm bg-white"
                loading="lazy"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 border-white shadow-sm flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[40px]">
                  person
                </span>
              </div>
            )}
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-xs"
              title="সক্রিয় শুভাকাঙ্ক্ষী"
            >
              <span className="material-symbols-outlined text-white text-[12px]">
                check
              </span>
            </span>
          </div>

          {/* Name & Identity Badges */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                {member_type || "প্রবাসী"}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium text-emerald-700 bg-white border border-emerald-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{status || "সক্রীয়"}</span>
              </span>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-snug">
              {name}
            </h2>
            <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
              দ্বীনি শিক্ষার সম্মানিত পৃষ্ঠপোষক ও হিতাকাঙ্ক্ষী
            </p>
          </div>
        </div>

        {/* Structured Details in Inner White Box */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/80 space-y-2.5 shadow-xs mb-3.5">
          {/* Location */}
          <div className="flex items-center gap-2.5 text-xs text-slate-700">
            <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
              location_on
            </span>
            <div className="truncate flex-1">
              <span className="text-slate-400 block text-[10px]">
                বর্তমান অবস্থান / প্রবাস
              </span>
              <span className="font-semibold text-slate-800 truncate block">
                {address || "সৌদি প্রবাসী"}
              </span>
            </div>
          </div>

          {/* Phone Number with Copy Feature */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2.5 truncate">
              <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                call
              </span>
              <div>
                <span className="text-slate-400 block text-[10px]">
                  যোগাযোগ নম্বর
                </span>
                <span
                  className="font-semibold text-slate-800"
                  dir="ltr"
                >
                  {mobile || "তথ্য নেই"}
                </span>
              </div>
            </div>

            {mobile && mobile !== "তথ্য নেই" && (
              <button
                type="button"
                onClick={handleCopy}
                title="নম্বর কপি করুন"
                className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50 text-slate-600 hover:bg-primary/10 hover:text-primary border border-slate-200/80 transition-all flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {copied ? "check" : "content_copy"}
                </span>
                <span>{copied ? "কপি হয়েছে" : "কপি"}</span>
              </button>
            )}
          </div>

          {/* Donation / Chandar Amount */}
          <div className="flex items-center gap-2.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
            <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0">
              volunteer_activism
            </span>
            <div>
              <span className="text-slate-400 block text-[10px]">
                মাসিক / বার্ষিক অনুদান
              </span>
              <span className="font-bold text-slate-800 text-xs">
                {displayAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Respectful Recognition Footer Note */}
      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
        <span className="italic text-[11px] text-slate-500 line-clamp-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px] text-slate-400">
            format_quote
          </span>
          দ্বীনি খেদমতে নিবেদিতপ্রাণ শুভাকাঙ্ক্ষী
        </span>
        <span className="text-[11px] text-emerald-700 font-medium">
          জাযাকুমুল্লাহু খাইরান
        </span>
      </div>
    </article>
  );
};

DonorCard.propTypes = {
  donor: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    member_type: PropTypes.string,
    status: PropTypes.string,
    address: PropTypes.string,
    mobile: PropTypes.string,
    chadar_amount: PropTypes.any,
    image: PropTypes.string,
  }),
};

export default DonorCard;
