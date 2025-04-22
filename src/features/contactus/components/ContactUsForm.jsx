import React from "react";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";
import { FiUser, FiMail, FiPhone, FiMessageSquare } from "react-icons/fi";

const ContactUsForm = ({ handleSubmit, isPending }) => {
  const { payload, setPayload } = useContactPayload();
  const { fieldErrors, setFieldErrors } = useFieldError();
  
  const handleChange = (e) => {
    setPayload((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors((prev) => ({ ...prev, [`${e.target.name}Error`]: "" }));
  };

  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 h-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">নাম</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              placeholder="আপনার নাম"
              value={payload.name}
              onChange={handleChange}
              className={`w-full pl-10 p-3 bg-gray-800 border ${fieldErrors.nameError ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300`}
            />
          </div>
          {fieldErrors.nameError && (
            <p className="text-red-400 text-sm mt-1">{fieldErrors.nameError}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">ই-মেইল</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="আপনার ই-মেইল"
              value={payload.email}
              onChange={handleChange}
              className={`w-full pl-10 p-3 bg-gray-800 border ${fieldErrors.emailError ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300`}
            />
          </div>
          {fieldErrors.emailError && (
            <p className="text-red-400 text-sm mt-1">{fieldErrors.emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">ফোন নাম্বার</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-400" />
            </div>
            <input
              type="text"
              name="phone"
              placeholder="আপনার ফোন নাম্বার ১১ ডিজিটের"
              value={payload.phone}
              onChange={handleChange}
              className={`w-full pl-10 p-3 bg-gray-800 border ${fieldErrors.phoneError ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300`}
            />
          </div>
          {fieldErrors.phoneError && (
            <p className="text-red-400 text-sm mt-1">{fieldErrors.phoneError}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-300 mb-2 font-medium">মেসেজ</label>
          <div className="relative">
            <div className="absolute top-3 left-3">
              <FiMessageSquare className="text-gray-400" />
            </div>
            <textarea
              name="message"
              value={payload.message}
              onChange={handleChange}
              rows="4"
              placeholder="মাদ্রাসা কতৃপক্ষের সাথে আপনি কোন বিষয়ে কথা বলতে চান তা বিস্তারিত লিখুন। আপনার ইমেইল পাঠানোর পর যদি কোনো উত্তর না পান তাহলে ফোন করে বা সরাসরি মাদ্রাসায় এসে কথা বলুন।"
              className={`w-full pl-10 p-3 bg-gray-800 border ${fieldErrors.messageError ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-300`}
            />
          </div>
          {fieldErrors.messageError && (
            <p className="text-red-400 text-sm mt-1">{fieldErrors.messageError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isPending 
              ? 'bg-cyan-700 cursor-not-allowed' 
              : 'bg-cyan-600 hover:bg-cyan-700'
          }`}
        >
          {isPending ? "লোডিং..." : "সাবমিট করুন"}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;