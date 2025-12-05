// src/features/contactus/components/ContactUsForm.jsx
import { FaPaperPlane } from "react-icons/fa";
import { FiMail, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";

const ContactUsForm = ({ handleSubmit, isPending }) => {
  const { payload, setPayload } = useContactPayload();
  const { fieldErrors, setFieldErrors } = useFieldError();

  const onChange = (e) => {
    setPayload((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFieldErrors((p) => ({ ...p, [`${e.target.name}Error`]: "" }));
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-xl 
      border border-emerald-100/70 dark:border-emerald-600/40 p-8 
      backdrop-blur-xl transition-all duration-300">

      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">
        বার্তা পাঠান
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Input Field */}
        {[
          { name: "name", icon: FiUser, placeholder: "আপনার নাম" },
          { name: "email", icon: FiMail, placeholder: "আপনার ই-মেইল" },
          { name: "phone", icon: FiPhone, placeholder: "ফোন নাম্বার" },
        ].map((item) => (
          <div key={item.name} className="relative">
            <item.icon className="absolute left-4 top-3 text-slate-400 
              group-focus-within:text-emerald-600 transition" />

            <input
              type="text"
              name={item.name}
              value={payload[item.name]}
              onChange={onChange}
              placeholder={item.placeholder}
              className={`w-full pl-12 pr-4 py-3 bg-transparent border-b-2
              text-slate-800 dark:text-slate-200 placeholder-slate-400 
              dark:placeholder-slate-500 focus:outline-none
              transition-all ${
                fieldErrors[`${item.name}Error`]
                  ? "border-red-500"
                  : "border-slate-300 dark:border-slate-600 focus:border-emerald-500"
              }`}
            />

            {fieldErrors[`${item.name}Error`] && (
              <p className="text-sm text-red-500 mt-1">
                {fieldErrors[`${item.name}Error`]}
              </p>
            )}
          </div>
        ))}

        {/* Message Input */}
        <div className="relative">
          <FiMessageSquare className="absolute top-3 left-4 text-slate-400" />

          <textarea
            name="message"
            rows="4"
            onChange={onChange}
            value={payload.message}
            placeholder="আপনার বার্তা লিখুন..."
            className={`w-full pl-12 pr-4 py-3 bg-transparent border-b-2 
            text-slate-800 dark:text-slate-200 placeholder-slate-400
            dark:placeholder-slate-500 focus:outline-none resize-none ${
              fieldErrors.messageError
                ? "border-red-500"
                : "border-slate-300 dark:border-slate-600 focus:border-emerald-500"
            }`}
          />

          {fieldErrors.messageError && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.messageError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 
          to-emerald-500 text-white font-semibold shadow-md shadow-emerald-700/40 
          hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 
          flex items-center justify-center gap-2"
        >
          {isPending ? "প্রক্রিয়াধীন..." : <><FaPaperPlane /> বার্তা পাঠান</>}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
