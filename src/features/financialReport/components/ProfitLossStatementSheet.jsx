import React from "react";

const ProfitLossStatementSheet = ({ meta, isModal = false }) => {
  const rows = meta?.financial_rows || [];
  const signatories = meta?.signatories || [
    { name: "মাওলানা তানভীর আহমদ", role: "মুহতামিম ও অধ্যক্ষ" },
    { name: "হাফেজ মোহাম্মদ কামরুজ্জামান", role: "কোষাধ্যক্ষ" },
    { name: "কাজী বাহেলুল হক", role: "সভাপতি, পরিচালনা কমিটি" },
    { name: "ইসলাম কাজী শফিক", role: "চার্টার্ড অ্যাকাউন্ট্যান্ট" }
  ];

  return (
    <div
      className={`p-4 sm:p-5 bg-white border border-slate-200/90 rounded-xl shadow-xs overflow-hidden font-sans ${
        isModal ? "p-6 md:p-8" : "mt-5"
      }`}
      data-purpose="sheet-content-preview-2"
    >
      <div className="text-center border-b pb-2 mb-2">
        <h4 className="font-extrabold text-[11px] text-slate-900 tracking-wider">
          {meta?.company || "জামিয়া হুসাইনিয়া মাদ্রাসা ও এতিমখানা, শায়েস্তাগঞ্জ"}
        </h4>
        <div className="text-[9px] font-bold text-primary mt-0.5">
          {meta?.statement_title || "আয়-ব্যয় ও আর্থিক উদ্বৃত্তের সমন্বিত বার্ষিক বিবরণী"}
        </div>
        <div className="text-[8px] font-medium text-slate-600 mt-0.5">
          {meta?.period || "১ জুলাই ২০২৪ হতে ৩০ জুন ২০২৫ সমাপ্ত অর্থবছর"}
        </div>
      </div>

      {/* Financial Values Table */}
      <div className="overflow-x-auto">
        <table className="w-full doc-preview-table mb-2 border-collapse text-[8.5px]">
          <thead>
            <tr>
              <th className="align-middle" rowSpan={2} style={{ width: "40%" }}>
                হিসাবের খাত ও বিবরণ
              </th>
              <th className="align-middle text-center" rowSpan={2} style={{ width: "12%" }}>
                নোট
              </th>
              <th className="text-center" colSpan={4}>
                অর্থবছরের ত্রৈমাসিক বিভাজন (টাকায়)
              </th>
            </tr>
            <tr>
              <th style={{ width: "12%" }}>১ম ত্রৈমাসিক</th>
              <th style={{ width: "12%" }}>২য় ত্রৈমাসিক</th>
              <th style={{ width: "12%" }}>৩য় ত্রৈমাসিক</th>
              <th style={{ width: "12%" }}>৪র্থ ত্রৈমাসিক</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {rows.map((r, idx) => (
              <tr key={idx} className={`${r.bg || ""} ${r.is_bold ? "font-bold text-slate-900" : ""}`}>
                <td className={`${r.is_bold ? "font-semibold text-slate-900" : ""} ${r.indent ? "pl-3 text-slate-600" : ""}`}>
                  {r.particulars}
                </td>
                <td className="text-center text-slate-500 font-mono text-[8px]">{r.notes}</td>
                <td
                  className={`text-right font-mono ${
                    r.is_negative ? "text-rose-700" : ""
                  }`}
                >
                  {r.q1}
                </td>
                <td className="text-right font-mono">{r.q2}</td>
                <td
                  className={`text-right font-mono ${
                    r.is_negative ? "text-rose-700" : ""
                  }`}
                >
                  {r.q3}
                </td>
                <td
                  className={`text-right font-mono ${
                    r.is_negative ? "text-rose-700" : ""
                  }`}
                >
                  {r.q4}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signatures Row */}
      <div className="grid grid-cols-4 gap-2 pt-4 pb-1 text-center">
        {signatories.map((sig, idx) => (
          <div key={idx}>
            <div className="signature-line mx-auto font-semibold text-[8px] text-slate-800">
              {sig.name}
            </div>
            <div className="text-[7px] text-slate-500 mt-0.5">{sig.role}</div>
          </div>
        ))}
      </div>

      {/* Corporate Seal & Date */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200 text-[8px] text-slate-600">
        <div>
          <div>{meta?.dated || "তারিখ: ১৫ জুলাই, ২০২৫"}</div>
          <div>{meta?.place || "স্থান: শায়েস্তাগঞ্জ, হবিগঞ্জ"}</div>
        </div>
        <div className="w-14 h-14 rounded-full border border-emerald-600/40 bg-emerald-50/40 flex items-center justify-center text-center text-[7px] text-primary font-bold leading-tight">
          সিলমোহর
          <br />
          শায়েস্তাগঞ্জ
        </div>
      </div>
    </div>
  );
};

export default ProfitLossStatementSheet;
