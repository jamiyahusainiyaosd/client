import Time from "../../../utils/formateData";

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
  admission_created,
  admission_updated,
}) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
        {ClassName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {class_level}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {form_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {new_admission_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {old_admission_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {new_total_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {old_total_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {additional_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {monthly_fee} টাকা
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {admission_start_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {admission_end_date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {required_documents}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            seat_availability
              ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
              : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100"
          }`}
        >
          {seat_availability ? "খালি আছে" : "খালি নেই"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {Time(admission_created)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {Time(admission_updated)}
      </td>
    </tr>
  );
};

export default Admission;