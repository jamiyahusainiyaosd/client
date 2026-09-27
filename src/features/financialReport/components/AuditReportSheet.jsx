import React from "react";

const AuditReportSheet = ({ meta, isModal = false }) => {
  const members = meta?.committee_members || [];

  return (
    <div
      className={`p-4 sm:p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden font-sans ${
        isModal ? "p-6 md:p-8" : "mt-5"
      }`}
      data-purpose="sheet-content-preview-1"
    >
      <div className="flex justify-between items-start border-b pb-1 text-[9px] text-slate-600">
        <div>
          <div className="font-bold uppercase text-slate-800 tracking-tight">
            {meta?.auditor || "ইসলাম কাজী শফিক অ্যান্ড কোং"}
          </div>
          <div className="text-[8px] text-slate-500">{meta?.sub_auditor || "সনদপ্রাপ্ত হিসাববিদ (চার্টার্ড অ্যাকাউন্ট্যান্টস)"}</div>
        </div>
        <div className="text-right text-[8px] font-semibold text-slate-500">
          {meta?.annexure || "পরিশিষ্ট-ক১/৭"}
        </div>
      </div>

      <div className="text-center my-2.5">
        <h4 className="font-bold text-[11px] text-slate-900 leading-tight">
          {meta?.org_name || "জামিয়া হুসাইনিয়া মাদ্রাসা ও এতিমখানা"}
        </h4>
        <div className="text-[9px] font-semibold text-primary mt-0.5">
          {meta?.program || "সার্বিক দ্বীনি শিক্ষা ও ছাত্রকল্যাণ তহবিল"}
        </div>
        <div className="text-[8.5px] text-slate-600 italic">
          {meta?.notes_title || "আর্থিক বিবরণী সংক্রান্ত সমন্বিত নিরীক্ষা নোট"}
        </div>
        <div className="text-[8px] text-slate-600 font-medium">
          {meta?.year_ended || "সমাপ্ত অর্থবছর: ৩০ জুন, ২০২৫"}
        </div>
      </div>

      {/* Executive Members Table */}
      <div className="text-[9px] font-bold text-slate-800 mb-1.5 flex items-center justify-between">
        <span>পরিচালনা কমিটির সম্মানিত সদস্যদের তালিকা:</span>
        <span className="text-[8px] font-normal text-slate-500">শায়েস্তাগঞ্জ, হবিগঞ্জ</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full doc-preview-table mb-2 border-collapse text-[8.5px]">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>ক্রমিক</th>
              <th style={{ width: "26%" }}>নাম</th>
              <th style={{ width: "16%" }}>শিক্ষাগত যোগ্যতা</th>
              <th style={{ width: "16%" }}>পেশা</th>
              <th style={{ width: "14%" }}>পদবি</th>
              <th style={{ width: "20%" }}>ঠিকানা</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {members.map((m) => (
              <tr key={m.sl}>
                <td className="text-center font-bold">{m.sl}</td>
                <td className="font-medium text-slate-900">{m.name}</td>
                <td className="text-center">{m.qualification}</td>
                <td>{m.profession}</td>
                <td
                  className={`font-semibold ${
                    m.designation === "সভাপতি" || m.designation === "President"
                      ? "text-primary font-bold"
                      : ""
                  }`}
                >
                  {m.designation}
                </td>
                <td className="text-[8px]">{m.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Accounting Policies Brief Notes */}
      <div className="text-[8px] text-slate-700 leading-relaxed space-y-1.5 mt-3 pt-2 border-t border-slate-100">
        <div className="font-bold text-slate-900">১. হিসাব নিরীক্ষার নীতিমালা ও ভিত্তি:</div>
        <p className="pl-2 text-slate-600">
          উক্ত আর্থিক বিবরণী ঐতিহাসিক ব্যয় পদ্ধতি (Historical Cost Convention) এবং প্রচলিত ইসলামিক অ্যাকাউন্টিং স্ট্যান্ডার্ড অনুযায়ী প্রস্তুত করা হয়েছে। সকল প্রকার আয় ও দান সদকা যথাযথ ভাউচার ও রসিদের মাধ্যমে যাচাইপূর্বক সমন্বিত করা হয়েছে।
        </p>
        <div className="font-bold text-slate-900">
          ২. গুরুত্বপূর্ণ হিসাবরক্ষণ নীতিমালার সংক্ষিপ্তসার:
        </div>
        <div className="pl-2 space-y-1 text-slate-600">
          <p>
            <span className="font-semibold text-slate-700">২.০১ মুদ্রা ভিত্তি:</span> প্রতিষ্ঠানের সকল পরিসম্পদ, দায়, তহবিল, অনুদান, ফি ও ব্যয়ের যাবতীয় হিসাব বাংলাদেশি টাকায় (BDT) সংরক্ষিত হয়েছে।
          </p>
          <p>
            <span className="font-semibold text-slate-700">২.০২ তহবিল পৃথকীকরণ:</span> সাধারণ তহবিল, লিল্লাহ বোর্ডিং ও এতিম তহবিল, এবং মসজিদ-ভবন উন্নয়ন তহবিল সম্পূর্ণ পৃথক ব্যাংক অ্যাকাউন্টে কঠোর নজরদারির মাধ্যমে পরিচালিত হচ্ছে।
          </p>
        </div>
      </div>

      {/* Stamp Seal & Signature Block */}
      <div className="flex justify-between items-end mt-4 pt-2 border-t border-slate-200">
        <div className="text-[7.5px] text-slate-500">
          জামিয়া হুসাইনিয়া মাদ্রাসা অডিট শাখা
        </div>
        <div className="stamp-seal">
          <span className="font-bold">নিরীক্ষিত</span>
          <span>অডিট শাখা</span>
          <span>শায়েস্তাগঞ্জ</span>
          <span>২০২৪-২০২৫</span>
        </div>
        <div className="signature-line">সনদপ্রাপ্ত হিসাববিদ</div>
      </div>
    </div>
  );
};

export default AuditReportSheet;
