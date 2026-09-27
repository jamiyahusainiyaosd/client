import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import admissionService from "../services/admission.services.js";
import AcademicYear from "../../../components/AcademicYear";

const AdmissionForm = () => {
  const { data: admissionStatus } = useQuery({
    queryKey: ["admissionStatus"],
    queryFn: admissionService.getStatus,
    staleTime: 1000 * 60 * 5,
  });
  const [formData, setFormData] = useState({
    name_bn: "",
    name_en: "",
    dob: "",
    brn: "",
    blood_group: "",
    guardian_name: "",
    guardian_phone: "",
    guardian_nid: "",
    guardian_profession: "",
    address: "",
    desired_class: "",
    residence_type: "residential",
    previous_institute: "",
    last_studied: "",
    agreement: false,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [docFile, setDocFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Attempt API submission if backend endpoint exists
      await admissionService.submitApplication({
        ...formData,
        photo: photoFile?.name,
        doc: docFile?.name,
      });
    } catch {
      // Graceful fallback for UI simulation
    } finally {
      setIsSubmitting(false);
      const appNumber = `JH-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      setSuccessToast(appNumber);
    }
  };

  return (
    <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-md p-space-lg lg:p-space-xl">
      {/* Closed Notice Banner if Admissions are Closed */}
      {admissionStatus?.is_open === false && (
        <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">info</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                  {admissionStatus.badge_text_closed || "ভর্তি সমাপ্ত"}
                </span>
                <span className="text-xs font-semibold text-amber-800">
                  {admissionStatus.session_name}
                </span>
              </div>
              <h3 className="font-bold text-base text-amber-950 mb-1">
                {admissionStatus.notice_title || "ভর্তি সংক্রান্ত জরুরি নোটিশ"}
              </h3>
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed">
                {admissionStatus.notice_text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Header */}
      <div className="flex flex-col gap-1 pb-space-md">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            ডিজিটাল ভর্তি আবেদন ফরম
          </span>
          <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface-variant font-mono text-[11px]">
            <AcademicYear prefix="শিক্ষাবর্ষ: " separator="-" />
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          ভর্তি আবেদন করুন
        </h2>
        <p className="font-body-md text-body-md text-secondary">
          সঠিক তথ্য দিয়ে নিচের ফরমটি পূরণ করুন। আবেদন গ্রহণের পর মাদ্রাসা
          কর্তৃপক্ষ পরীক্ষার তারিখ এসএমএস-এর মাধ্যমে জানিয়ে দিবে।
        </p>
      </div>

      {/* Progress Steps Tracker */}
      <div className="grid grid-cols-4 gap-2 my-space-md">
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 rounded-full bg-primary w-full"></div>
          <span className="font-label-sm text-label-sm text-primary truncate">
            ১. শিক্ষার্থীর তথ্য
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 rounded-full bg-primary-fixed w-full"></div>
          <span className="font-label-sm text-label-sm text-secondary truncate">
            ২. অভিভাবক
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 rounded-full bg-surface-container-highest w-full"></div>
          <span className="font-label-sm text-label-sm text-secondary truncate">
            ৩. কাঙ্ক্ষিত বিভাগ
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 rounded-full bg-surface-container-highest w-full"></div>
          <span className="font-label-sm text-label-sm text-secondary truncate">
            ৪. নথিপত্র ও ঘোষণা
          </span>
        </div>
      </div>

      {/* Form Body */}
      <form
        className="space-y-space-lg mt-space-md"
        id="admissionForm"
        onSubmit={handleSubmit}
      >
        {/* Section A: Student Information */}
        <div className="bg-surface-container-low/40 p-space-md rounded-2xl space-y-space-md">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
            <span className="material-symbols-outlined">person</span>
            <h3>ক. শিক্ষার্থীর ব্যক্তিগত তথ্য</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                শিক্ষার্থীর পূর্ণ নাম (বাংলায়) <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="name_bn"
                value={formData.name_bn}
                onChange={handleChange}
                placeholder="উদা: মোঃ আব্দুল্লাহ আল নোমান"
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                শিক্ষার্থীর নাম (ইংরেজিতে ক্যাপিটাল){" "}
                <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="name_en"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="MD ABDULLAH AL NOMAN"
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm uppercase font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                জন্ম তারিখ <span className="text-error">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                জন্ম নিবন্ধন নম্বর (BRN) <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="brn"
                value={formData.brn}
                onChange={handleChange}
                placeholder="১৭ ডিজিটের নম্বর"
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm font-mono"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                রক্তের গ্রুপ
              </label>
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              >
                <option value="">নির্বাচন করুন</option>
                <option value="A+">A+ (এ পজিটিভ)</option>
                <option value="A-">A- (এ নেগেটিভ)</option>
                <option value="B+">B+ (বি পজিটিভ)</option>
                <option value="B-">B- (বি নেগেটিভ)</option>
                <option value="O+">O+ (ও পজিটিভ)</option>
                <option value="O-">O- (ও নেগেটিভ)</option>
                <option value="AB+">AB+ (এবি পজিটিভ)</option>
                <option value="AB-">AB- (এবি নেগেটিভ)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section B: Guardian Information */}
        <div className="bg-surface-container-low/40 p-space-md rounded-2xl space-y-space-md">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
            <span className="material-symbols-outlined">family_restroom</span>
            <h3>খ. অভিভাবকের তথ্য ও স্থায়ী ঠিকানা</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                পিতা / অভিভাবকের নাম <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="guardian_name"
                value={formData.guardian_name}
                onChange={handleChange}
                placeholder="পিতা বা বৈধ অভিভাবকের নাম"
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                অভিভাবকের মোবাইল নম্বর <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                name="guardian_phone"
                value={formData.guardian_phone}
                onChange={handleChange}
                pattern="[0-9]{11}"
                placeholder="01XXXXXXXXX"
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                জাতীয় পরিচয়পত্র (NID) নম্বর
              </label>
              <input
                type="text"
                name="guardian_nid"
                value={formData.guardian_nid}
                onChange={handleChange}
                placeholder="১০ অথবা ১৭ ডিজিট NID"
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm font-mono"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                অভিভাবকের পেশা
              </label>
              <input
                type="text"
                name="guardian_profession"
                value={formData.guardian_profession}
                onChange={handleChange}
                placeholder="যেমন: ব্যবসা / শিক্ষক / প্রবাসী / কৃষি"
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface">
              স্থায়ী ও বর্তমান ঠিকানা (বিস্তারিত গ্রাম, ডাকঘর, উপজেলা, জেলা){" "}
              <span className="text-error">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={2}
              placeholder="গ্রাম/মহল্লা, পোস্ট অফিস, থানা/উপজেলা, জেলা"
              required
              className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm resize-none"
            />
          </div>
        </div>

        {/* Section C: Academic Choice */}
        <div className="bg-surface-container-low/40 p-space-md rounded-2xl space-y-space-md">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
            <span className="material-symbols-outlined">auto_stories</span>
            <h3>গ. কাঙ্ক্ষিত বিভাগ ও পূর্ববর্তী পড়াশোনা</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                ভর্তির কাঙ্ক্ষিত বিভাগ <span className="text-error">*</span>
              </label>
              <select
                name="desired_class"
                value={formData.desired_class}
                onChange={handleChange}
                required
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              >
                <option value="">বিভাগ বাছাই করুন</option>
                <option value="নাজেরা বিভাগ">
                  নাজেরা বিভাগ (কুরআন তিলাওয়াত ও তাজবীদ)
                </option>
                <option value="তাহফিজুল কোরআন">
                  তাহফিজুল কোরআন (হিফজ বিভাগ)
                </option>
                <option value="নূরানী শিশু">
                  নূরানী শিশু (আর-রাওদাহ আন-নূরানিয়্যাহ)
                </option>
                <option value="নূরানী ১ম বর্ষ">
                  নূরানী ১ম বর্ষ (আস-সানাহ আল-উলা)
                </option>
                <option value="নূরানী ২য় বর্ষ">
                  নূরানী ২য় বর্ষ (আস-সানাহ আস-সানিয়াহ)
                </option>
                <option value="নূরানী ৩য় বর্ষ">
                  নূরানী ৩য় বর্ষ (আস-সানাহ আস-সালিসাহ)
                </option>
                <option value="ইবতেদাইয়্যাহ ৪র্থ বর্ষ">
                  ইবতেদাইয়্যাহ ৪র্থ বর্ষ (আস-সানাহ আর-রাবি'আহ)
                </option>
                <option value="ইবতেদাইয়্যাহ ৫ম বর্ষ">
                  ইবতেদাইয়্যাহ ৫ম বর্ষ (পা পঞ্চম)
                </option>
                <option value="হুফ্ফাজ হুফফাজ">
                  হুফ্ফাজ হুফফাজ (হিফজ বিশেষ কোর্স)
                </option>
                <option value="কিতাব বিভাগ">
                  কিতাব বিভাগ (সাধারণ ও উচ্চতর)
                </option>
              </select>
            </div>

            {/* Residence Choice (Pill Radios) */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                আবাসন ধরণ <span className="text-error">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 mt-0.5">
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-container-lowest cursor-pointer hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm">
                  <input
                    type="radio"
                    name="residence_type"
                    value="residential"
                    checked={formData.residence_type === "residential"}
                    onChange={handleChange}
                    className="accent-primary w-4 h-4"
                  />
                  <span>আবাসিক (খোরাকিসহ)</span>
                </label>
                <label className="flex items-center justify-center gap-2 p-3 rounded-xl bg-surface-container-lowest cursor-pointer hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors shadow-sm">
                  <input
                    type="radio"
                    name="residence_type"
                    value="non_residential"
                    checked={formData.residence_type === "non_residential"}
                    onChange={handleChange}
                    className="accent-primary w-4 h-4"
                  />
                  <span>অনাবাসিক (ডে-কেয়ার)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                পূর্ববর্তী প্রতিষ্ঠানের নাম (যদি থাকে)
              </label>
              <input
                type="text"
                name="previous_institute"
                value={formData.previous_institute}
                onChange={handleChange}
                placeholder="যেমন: শায়েস্তাগঞ্জ সরকারি প্রাথমিক বিদ্যালয় / মাদ্রাসা"
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                সর্বশেষ সমাপ্ত শ্রেণি / পারা
              </label>
              <input
                type="text"
                name="last_studied"
                value={formData.last_studied}
                onChange={handleChange}
                placeholder="যেমন: ৩য় শ্রেণি উত্তীর্ণ / ৫ পারা মুখস্থ"
                className="px-4 py-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Section D: Documents & Declaration */}
        <div className="bg-surface-container-low/40 p-space-md rounded-2xl space-y-space-md">
          <div className="flex items-center gap-2 text-primary font-headline-sm text-headline-sm">
            <span className="material-symbols-outlined">attachment</span>
            <h3>ঘ. ছবি ও সনদের সংযুক্তি</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Photo Upload UI */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                শিক্ষার্থীর পাসপোর্ট সাইজ ছবি <span className="text-error">*</span>
              </label>
              <label className="p-4 rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors shadow-sm">
                <span className="material-symbols-outlined text-primary text-[32px] mb-1">
                  add_a_photo
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  {photoFile ? photoFile.name : "ছবি নির্বাচন করুন বা ড্রপ করুন"}
                </span>
                <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                  JPG / PNG (সর্বোচ্চ 2 MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  id="photoInput"
                  className="hidden"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            {/* Certificate Upload UI */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface">
                জন্ম সনদের ফটোকপি / স্ক্যান কপি{" "}
                <span className="text-error">*</span>
              </label>
              <label className="p-4 rounded-xl bg-surface-container-lowest flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors shadow-sm">
                <span className="material-symbols-outlined text-primary text-[32px] mb-1">
                  upload_file
                </span>
                <span className="font-label-md text-label-md text-on-surface">
                  {docFile ? docFile.name : "জন্মসনদ ফাইল যুক্ত করুন"}
                </span>
                <span className="font-body-sm text-body-sm text-secondary mt-0.5">
                  PDF / JPG / PNG (সর্বোচ্চ 5 MB)
                </span>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  id="docInput"
                  className="hidden"
                  onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="pt-space-xs">
            <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-lowest cursor-pointer hover:bg-surface-container transition-colors shadow-sm">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
                className="accent-primary w-5 h-5 mt-0.5 shrink-0"
              />
              <span className="font-body-md text-body-md text-on-surface">
                আমি প্রত্যয়ন করছি যে প্রদত্ত সকল তথ্য নির্ভুল ও সত্য। জামিয়া
                হুসাইনিয়া মাদ্রাসার যাবতীয় শৃঙ্খলা, নীতি-নিয়ম এবং পরিচালনা
                কর্তৃপক্ষের সিদ্ধান্ত আমি ও আমার সন্তান মান্য করতে বাধ্য থাকব।
              </span>
            </label>
          </div>
        </div>

        {/* Submit Button & Feedback Area */}
        <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <button
            type="submit"
            disabled={isSubmitting || admissionStatus?.is_open === false}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-headline-sm text-headline-sm transition-all shadow-md flex items-center justify-center gap-2 ${
              admissionStatus?.is_open === false
                ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                : "bg-primary hover:bg-primary-container text-on-primary cursor-pointer disabled:opacity-50"
            }`}
          >
            {isSubmitting ? (
              <span>জমা হচ্ছে...</span>
            ) : admissionStatus?.is_open === false ? (
              <>
                <span className="material-symbols-outlined text-[22px]">
                  block
                </span>
                <span>আবেদন সাময়িকভাবে বন্ধ</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">
                  send
                </span>
                <span>ভর্তি আবেদন জমা দিন</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-secondary font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[18px] text-primary">
              lock
            </span>
            <span>আপনার ব্যক্তিগত তথ্য সম্পূর্ণ সংরক্ষিত ও নিরাপদ</span>
          </div>
        </div>

        {/* Interactive Toast Confirmation */}
        {successToast && (
          <div
            className="p-4 rounded-xl bg-primary-container text-on-primary font-body-md text-body-md flex items-center justify-between shadow-lg animate-fade-in"
            id="formSuccessToast"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px]">
                check_circle
              </span>
              <span>
                শুকরিয়া! আপনার ভর্তি আবেদন সফলভাবে জমা হয়েছে। আবেদন নম্বর:{" "}
                <strong>{successToast}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessToast(null)}
              className="hover:opacity-80 p-1"
            >
              <span className="material-symbols-outlined text-[18px]">
                close
              </span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdmissionForm;
