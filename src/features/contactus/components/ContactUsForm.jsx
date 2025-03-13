import React from "react";
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
    <>
      <form onSubmit={handleSubmit} className="p-6 shadow-2xl rounded-lg">
        {/* Name Field */}
        <div className="mb-4">
          <label className="block font-medium mb-1">নাম</label>
          <input
            type="text"
            name="name"
            placeholder="আপনার নাম"
            value={payload.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
          />
          {fieldErrors.nameError && (
            <p className="text-sm">{fieldErrors.nameError}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ই-মেইল</label>
          <input
            type="email"
            name="email"
            placeholder="আপনার ই-মেইল"
            value={payload.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
          />
          {fieldErrors.emailError && (
            <p className="text-sm">{fieldErrors.emailError}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label className="block font-medium mb-1">ফোন নাম্বার</label>
          <input
            type="text"
            name="phone"
            placeholder="আপনার ফোন নাম্বার ১১ ডিজিটের"
            value={payload.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
          />
          {fieldErrors.phoneError && (
            <p className="text-sm">{fieldErrors.phoneError}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-4">
          <label className="block font-medium mb-1">মেসেজ</label>
          <textarea
            name="message"
            value={payload.message}
            onChange={handleChange}
            rows="4"
            placeholder="মাদ্রাসা কতৃপক্ষের সাথে আপনি কোন বিষয়ে কথা বলতে চান তা বিস্তারিত লি আপনার ইমেইল পাঠানোর পর কোনো উত্তর না পান তাহলে ফোন করে বা সরাসরি মাদ্রাসায় এসে কথা বলুন।"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
          />
          {fieldErrors.messageError && (
            <p className="text-sm">{fieldErrors.messageError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="button1" disabled={isPending}>
          {isPending ? "লোডিং..." : "সাবমিট"}
        </button>
      </form>
    </>
  );
};

export default ContactUsForm;
