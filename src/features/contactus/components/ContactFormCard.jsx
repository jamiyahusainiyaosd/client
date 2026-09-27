import React from "react";
import PropTypes from "prop-types";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";

const ContactFormCard = ({ handleSubmit, isPending }) => {
  const { payload, setPayload } = useContactPayload();
  const { fieldErrors, setFieldErrors } = useFieldError();

  const onChange = (e) => {
    const { name, value } = e.target;
    setPayload((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [`${name}Error`]: "" }));
  };

  const inputClass = (errorKey) =>
    `w-full pl-11 pr-4 py-3 text-sm rounded-xl transition-all outline-none ${
      fieldErrors[errorKey]
        ? "bg-rose-50/70 border border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20 text-slate-900"
        : "bg-white border border-slate-200/80 focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-800 placeholder:text-slate-400 shadow-xs"
    }`;

  return (
    <div
      className="bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-5 sm:p-7 lg:p-8 shadow-xs"
      data-purpose="contact-form-card"
    >
      {/* Form Header */}
      <div className="mb-6 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-primary flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">
            edit_note
          </span>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            সরাসরি বার্তা পাঠান
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            আপনার যেকোনো প্রশ্ন, জিজ্ঞাসা বা মতামত লিখে পাঠান
          </p>
        </div>
      </div>

      {/* Contact Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Field 1: Full Name */}
        <div>
          <label
            className="block text-xs font-semibold text-slate-700 mb-1.5"
            htmlFor="full_name"
          >
            আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            </div>
            <input
              className={inputClass("nameError")}
              id="full_name"
              name="name"
              value={payload.name || ""}
              onChange={onChange}
              placeholder="উদা: আব্দুল্লাহ আল মামুন"
              type="text"
            />
          </div>
          {fieldErrors.nameError && (
            <p className="mt-1 text-xs text-rose-500 font-medium">
              {fieldErrors.nameError}
            </p>
          )}
        </div>

        {/* Field 2: Email Address */}
        <div>
          <label
            className="block text-xs font-semibold text-slate-700 mb-1.5"
            htmlFor="email"
          >
            আপনার ই-মেইল এড্রেস <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                mail
              </span>
            </div>
            <input
              className={`${inputClass("emailError")} font-sans`}
              id="email"
              name="email"
              value={payload.email || ""}
              onChange={onChange}
              placeholder="example@gmail.com"
              type="email"
            />
          </div>
          {fieldErrors.emailError && (
            <p className="mt-1 text-xs text-rose-500 font-medium">
              {fieldErrors.emailError}
            </p>
          )}
        </div>

        {/* Field 3: Phone Number */}
        <div>
          <label
            className="block text-xs font-semibold text-slate-700 mb-1.5"
            htmlFor="phone"
          >
            ফোন নম্বর (ঐচ্ছিক)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                call
              </span>
            </div>
            <input
              className={`${inputClass("phoneError")} font-sans`}
              id="phone"
              name="phone"
              value={payload.phone || ""}
              onChange={onChange}
              placeholder="০১XXXXXXXXX"
              type="tel"
            />
          </div>
          {fieldErrors.phoneError && (
            <p className="mt-1 text-xs text-rose-500 font-medium">
              {fieldErrors.phoneError}
            </p>
          )}
        </div>

        {/* Field 4: Message Content */}
        <div>
          <label
            className="block text-xs font-semibold text-slate-700 mb-1.5"
            htmlFor="message"
          >
            আপনার বার্তা <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                chat
              </span>
            </div>
            <textarea
              className={`${inputClass("messageError")} resize-none min-h-[140px]`}
              id="message"
              name="message"
              value={payload.message || ""}
              onChange={onChange}
              placeholder="আপনার বার্তা বা প্রশ্ন বিস্তারিত লিখুন..."
              rows={4}
            />
          </div>
          {fieldErrors.messageError && (
            <p className="mt-1 text-xs text-rose-500 font-medium">
              {fieldErrors.messageError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>বার্তা পাঠানো হচ্ছে...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px] -rotate-45">
                  send
                </span>
                <span>বার্তা পাঠান</span>
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500 pt-1">
          <span className="material-symbols-outlined text-[15px] text-primary">
            lock
          </span>
          <span>আপনার তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত থাকবে।</span>
        </div>
      </form>
    </div>
  );
};

ContactFormCard.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};

export default ContactFormCard;
