/* eslint-disable no-unused-vars */
import { FiMail, FiMessageSquare, FiPhone, FiSend, FiUser } from "react-icons/fi";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";

const fields = [
  { name: "name", icon: FiUser, placeholder: "আপনার নাম", type: "text" },
  { name: "email", icon: FiMail, placeholder: "আপনার ই-মেইল", type: "email" },
  { name: "phone", icon: FiPhone, placeholder: "ফোন নাম্বার", type: "tel" },
];

const ContactUsForm = ({ handleSubmit, isPending }) => {
  const { payload, setPayload } = useContactPayload();
  const { fieldErrors, setFieldErrors } = useFieldError();

  const onChange = (e) => {
    setPayload((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFieldErrors((p) => ({ ...p, [`${e.target.name}Error`]: "" }));
  };

  const inputBase =
    "w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border bg-white/60  text-slate-800  placeholder-slate-400  focus:outline-none transition-all duration-150";
  const inputNormal =
    "border-slate-200  focus:border-emerald-500  focus:ring-1 focus:ring-emerald-500/30";
  const inputError =
    "border-red-400  focus:border-red-400 focus:ring-1 focus:ring-red-400/30";

  return (
    <div className="rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 ">
        <h3 className="text-sm font-bold text-slate-900 ">বার্তা পাঠান</h3>
        <p className="text-xs text-slate-400  mt-0.5">
          আপনার যেকোনো প্রশ্ন বা মন্তব্য জানান
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {fields.map(({ name, icon: Icon, placeholder, type }) => (
          <div key={name}>
            <div className="relative">
              <Icon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 "
              />
              <input
                type={type}
                name={name}
                value={payload[name]}
                onChange={onChange}
                placeholder={placeholder}
                className={`${inputBase} ${fieldErrors[`${name}Error`] ? inputError : inputNormal}`}
              />
            </div>
            {fieldErrors[`${name}Error`] && (
              <p className="mt-1 text-[11px] text-red-500">{fieldErrors[`${name}Error`]}</p>
            )}
          </div>
        ))}

        {/* Textarea */}
        <div>
          <div className="relative">
            <FiMessageSquare
              size={14}
              className="absolute left-3 top-3 text-slate-400 "
            />
            <textarea
              name="message"
              rows={4}
              onChange={onChange}
              value={payload.message}
              placeholder="আপনার বার্তা লিখুন..."
              className={`${inputBase} resize-none ${fieldErrors.messageError ? inputError : inputNormal}`}
            />
          </div>
          {fieldErrors.messageError && (
            <p className="mt-1 text-[11px] text-red-500">{fieldErrors.messageError}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm shadow-emerald-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              প্রক্রিয়াধীন...
            </>
          ) : (
            <>
              <FiSend size={14} />
              বার্তা পাঠান
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;