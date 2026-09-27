import { useEffect } from "react";
import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/bengaliUtils";
import StudentAvatar from "./StudentAvatar";

const FormerStudentModal = ({ isOpen, student, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !student) return null;


  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      id="alumniDetailModal"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-[#f1f3ff]/50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-md text-sm sm:text-base text-primary font-semibold">
              সাবেক ছাত্রের বিস্তারিত তথ্য
            </span>
          </div>
          <button
            aria-label="বন্ধ করুন"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* Avatar / Profile Icon */}
          <div className="mb-4">
            <StudentAvatar
              className="w-20 h-20"
              iconSize="text-[44px]"
              name={student.name}
              priority={true}
              roundedClassName="rounded-2xl"
              src={student.image}
            />
          </div>

          <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-slate-900">
            {student.name}
          </h3>

          {student.current && (
            <span className="mt-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-label-md text-xs sm:text-sm font-medium">
              {student.current}
            </span>
          )}

          {/* Details Table */}
          <div className="w-full mt-6 space-y-3 text-left bg-[#f1f3ff]/60 p-4 rounded-xl border border-slate-200/60">
            {student.pass_year && (
              <div className="flex items-center justify-between py-2 border-b border-slate-200/60">
                <span className="text-slate-600 font-body-sm text-xs sm:text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                  পাশের সাল
                </span>
                <span className="text-slate-900 font-semibold font-body-sm text-xs sm:text-sm">
                  {toBengaliDigits(student.pass_year)} ({student.pass_year})
                </span>
              </div>
            )}

            {student.address && (
              <div className="flex items-center justify-between py-2 border-b border-slate-200/60">
                <span className="text-slate-600 font-body-sm text-xs sm:text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                  ঠিকানা
                </span>
                <span className="text-slate-800 font-medium font-body-sm text-xs sm:text-sm">
                  {student.address}
                </span>
              </div>
            )}

            {student.mobile && (
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-600 font-body-sm text-xs sm:text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary">phone_android</span>
                  যোগাযোগ
                </span>
                <span className="text-slate-800 font-semibold font-body-sm text-xs sm:text-sm tracking-wide">
                  {student.mobile}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <span className="text-slate-500 font-label-sm text-xs">
            জামিয়া হুসাইনিয়া মাদ্রাসা পরিবার
          </span>
          <button
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

FormerStudentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  student: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default FormerStudentModal;
