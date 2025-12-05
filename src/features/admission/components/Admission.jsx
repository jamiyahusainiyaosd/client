// src/features/admission/components/Admission.jsx

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
    <tr className="hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20 transition-colors">
      {[
        ClassName,
        class_level,
        form_fee + " টাকা",
        new_admission_fee + " টাকা",
        old_admission_fee + " টাকা",
        new_total_fee + " টাকা",
        old_total_fee + " টাকা",
        additional_fee + " টাকা",
        monthly_fee + " টাকা",
        admission_start_date,
        admission_end_date,
        required_documents,
      ].map((cell, idx) => (
        <td
          key={idx}
          className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 
          dark:text-slate-300"
        >
          {cell}
        </td>
      ))}

      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow 
          ${
            seat_availability
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
              : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200"
          }`}
        >
          {seat_availability ? "খালি আছে" : "খালি নেই"}
        </span>
      </td>
    </tr>
  );
};

export default Admission;
