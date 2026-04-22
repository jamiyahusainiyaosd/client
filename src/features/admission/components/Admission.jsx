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
    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors duration-150">
      {[
        ClassName,
        class_level,
        `${form_fee} ৳`,
        `${new_admission_fee} ৳`,
        `${old_admission_fee} ৳`,
        `${new_total_fee} ৳`,
        `${old_total_fee} ৳`,
        `${additional_fee} ৳`,
        `${monthly_fee} ৳`,
        admission_start_date,
        admission_end_date,
        required_documents,
      ].map((cell, idx) => (
        <td
          key={idx}
          className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap"
        >
          {cell}
        </td>
      ))}
 
      <td className="px-4 py-3 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            seat_availability
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {seat_availability ? "খালি আছে" : "খালি নেই"}
        </span>
      </td>
    </tr>
  );
};
 
export default Admission;