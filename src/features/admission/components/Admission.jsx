import React from "react";
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
    <tr className="whitespace-nowrap hover:bg-gray-700 transition-colors duration-200">
      <td className="border p-4 border-gray-600">{ClassName}</td>
      <td className="border p-4 border-gray-600">{class_level}</td>
      <td className="border p-4 border-gray-600">{form_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{new_admission_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{old_admission_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{new_total_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{old_total_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{additional_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{monthly_fee} টাকা</td>
      <td className="border p-4 border-gray-600">{admission_start_date}</td>
      <td className="border p-4 border-gray-600">{admission_end_date}</td>
      <td className="border p-4 border-gray-600">{required_documents}</td>
      <td
        className={`border p-4 border-gray-600 font-medium ${
          seat_availability
            ? "bg-green-800 text-green-100"
            : "bg-red-800 text-red-100"
        }`}
      >
        {seat_availability ? "খালি আছে" : "খালি নেই"}
      </td>
      <td className="border p-4 border-gray-600">{Time(admission_created)}</td>
      <td className="border p-4 border-gray-600">{Time(admission_updated)}</td>
    </tr>
  );
};

export default Admission;
