import React, { useState } from "react";
import { baseUrl } from "../constants/env.constants";
import mapImage from "/map.png";
import PageTitle from "../utils/PageTitle";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "আপনার নামটি ফিলাপ করুন";
    }
    if (!formData.email.trim()) {
      newErrors.email = "আপনার ইমেইল ফিলাপ করুন";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "আপনার ইমেজইল টি ভুল, আবার সঠিক ইমেইল দিয়ে চেষ্টা করুন";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "১১ ডিজিটের আপনার ফোন নাম্বার দিন";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "ভুল ফোন নাম্বার (১১ ডিজিটের নাম্বার দিন)";
    }
    if (!formData.message.trim()) {
      newErrors.message = "মেসেজ বক্স খালি রাখা যাবে না";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage("Your message has been sent successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          setErrors({
            form: data.detail || "Something went wrong, please try again.",
          });
        }
      } catch (err) {
        setErrors({
          form: "Failed to send the message. Please try again.",
          err,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <PageTitle key={"contactPage"} title={"Contact"} />
      <div className="max-w-[1144px] w-[95%] mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-6">যোগাযোগ করুন</h2>

        {successMessage && (
          <div className="mb-4 font-semibold text-center p-3 rounded">
            {successMessage}
          </div>
        )}

        {errors.form && (
          <div className="mb-4 font-semibold text-center p-3 rounded">
            {errors.form}
          </div>
        )}

        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8">
          {/* Google Map Image Section (Left) */}
          <div className="w-full md:w-1/2 h-auto mb-6 md:mb-0">
            <img
              src={mapImage}
              alt="Google Map"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Contact Form Section (Right) */}
          <div className="w-full md:w-1/2 border-1 rounded-2xl">
            <form onSubmit={handleSubmit} className="p-6 shadow-2xl rounded-lg">
              {/* Name Field */}
              <div className="mb-4">
                <label className="block font-medium mb-1">নাম</label>
                <input
                  type="text"
                  name="name"
                  placeholder="আপনার নাম"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                />
                {errors.name && <p className="text-sm">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block font-medium mb-1">ই-মেইল</label>
                <input
                  type="email"
                  name="email"
                  placeholder="আপনার ই-মেইল"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                />
                {errors.email && <p className="text-sm">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div className="mb-4">
                <label className="block font-medium mb-1">ফোন নাম্বার</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="আপনার ফোন নাম্বার ১১ ডিজিটের"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                />
                {errors.phone && <p className="text-sm">{errors.phone}</p>}
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <label className="block font-medium mb-1">মেসেজ</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="মাদ্রাসা কতৃপক্ষের সাথে আপনি কোন বিষয়ে কথা বলতে চান তা বিস্তারিত লি আপনার ইমেইল পাঠানোর পর কোনো উত্তর না পান তাহলে ফোন করে বা সরাসরি মাদ্রাসায় এসে কথা বলুন।"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2"
                />
                {errors.message && <p className="text-sm">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="button1" disabled={loading}>
                {loading ? "লোডিং..." : "সাবমিট"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
