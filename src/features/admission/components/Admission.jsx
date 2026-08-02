const Admission = ({
  ClassName,
  class_level,
  form_fee,
  new_admission_fee,
  old_admission_fee,
  new_total_fee,
  old_total_fee,
  additional_fee,
  monthly_fee,
  admission_start_date,
  admission_end_date,
  required_documents,
  seat_availability,
}) => {
  return (
    <tr className="hover:bg-slate-50 transition-colors duration-150">
      {[
        { val: ClassName, font: "font-display font-semibold text-slate-900" },
        { val: class_level, font: "font-sans text-slate-700" },
        { val: `${form_fee} ৳`, font: "font-mono text-slate-700 font-medium" },
        { val: `${new_admission_fee} ৳`, font: "font-mono text-slate-700 font-medium" },
        { val: `${old_admission_fee} ৳`, font: "font-mono text-slate-700 font-medium" },
        { val: `${new_total_fee} ৳`, font: "font-mono text-slate-900 font-semibold" },
        { val: `${old_total_fee} ৳`, font: "font-mono text-slate-900 font-semibold" },
        { val: `${additional_fee} ৳`, font: "font-mono text-slate-700 font-medium" },
        { val: `${monthly_fee} ৳`, font: "font-mono text-slate-700 font-medium" },
        { val: admission_start_date, font: "font-mono text-slate-600 text-xs" },
        { val: admission_end_date, font: "font-mono text-slate-600 text-xs" },
        { val: required_documents, font: "font-sans text-slate-600 text-xs" },
      ].map((cell, idx) => (
        <td
          key={idx}
          className={`px-4 py-3.5 text-xs whitespace-nowrap ${cell.font}`}
        >
          {cell.val}
        </td>
      ))}
 
      <td className="px-4 py-3.5 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold font-mono uppercase tracking-wider ${
            seat_availability
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : "bg-red-50 text-red-700 border border-red-200/60"
          }`}
        >
          {seat_availability ? "খালি আছে" : "খালি নেই"}
        </span>
      </td>
    </tr>
  );
};
 
export default Admission;