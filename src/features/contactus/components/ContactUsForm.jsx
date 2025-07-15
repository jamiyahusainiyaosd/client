import { FaPaperPlane } from "react-icons/fa";
import { FiMail, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";

const ContactUsForm = ({ handleSubmit, isPending }) => {
  const { payload, setPayload } = useContactPayload();
  const { fieldErrors, setFieldErrors } = useFieldError();

  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [`${e.target.name}Error`]: "" }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 h-full transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        বার্তা পাঠান
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiUser className="text-gray-500 dark:text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            name="name"
            placeholder="আপনার নাম"
            value={payload.name}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 bg-transparent border-b-2 ${
              fieldErrors.nameError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white"
            } focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
          />
          {fieldErrors.nameError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {fieldErrors.nameError}
            </p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiMail className="text-gray-500 dark:text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="আপনার ই-মেইল"
            value={payload.email}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 bg-transparent border-b-2 ${
              fieldErrors.emailError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white"
            } focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
          />
          {fieldErrors.emailError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {fieldErrors.emailError}
            </p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiPhone className="text-gray-500 dark:text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="আপনার ফোন নাম্বার"
            value={payload.phone}
            onChange={handleChange}
            className={`w-full pl-12 pr-4 py-3 bg-transparent border-b-2 ${
              fieldErrors.phoneError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white"
            } focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
          />
          {fieldErrors.phoneError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {fieldErrors.phoneError}
            </p>
          )}
        </div>

        <div className="relative group">
          <div className="absolute top-4 left-4">
            <FiMessageSquare className="text-gray-500 dark:text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
          </div>
          <textarea
            name="message"
            value={payload.message}
            onChange={handleChange}
            rows="4"
            placeholder="আপনার বার্তা লিখুন..."
            className={`w-full pl-12 pr-4 py-3 bg-transparent border-b-2 ${
              fieldErrors.messageError
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white"
            } focus:outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none`}
          />
          {fieldErrors.messageError && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {fieldErrors.messageError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
            isPending
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
          }`}
        >
          {isPending ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              প্রক্রিয়াধীন...
            </>
          ) : (
            <>
              <FaPaperPlane />
              বার্তা পাঠান
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
