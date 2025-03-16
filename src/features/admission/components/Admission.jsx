import React from "react";
import Time from '../../../utils/formateData';

const Admission = ({
  ClassName, class_level, form_fee, new_admission_fee, old_admission_fee, new_total_fee, old_total_fee, additional_fee, monthly_fee, admission_start_date, admission_end_date, required_documents, seat_availability, admission_created, admission_updated,
}) => {
  return (
    <tr className="whitespace-nowrap">
      <td className="border p-10">{ClassName}</td>
      <td className="border p-10">{class_level}</td>
      <td className="border p-10">{form_fee} টাকা</td>
      <td className="border p-10">{new_admission_fee} টাকা</td>
      <td className="border p-10">{old_admission_fee} টাকা</td>
      <td className="border p-10">{new_total_fee} টাকা</td>
      <td className="border p-10">{old_total_fee} টাকা</td>
      <td className="border p-10">{additional_fee} টাকা</td>
      <td className="border p-10">{monthly_fee} টাকা</td>
      <td className="border p-10">{admission_start_date}</td>
      <td className="border p-10">{admission_end_date}</td>
      <td className="border p-10">{required_documents}</td>
      <td className="border p-10">
        {Time(admission_created)}
      </td>
      <td className="border p-10">
        {Time(admission_updated)}
      </td>
      <td
        className={`border p-10 ${seat_availability
          ? "bg-green-800 text-white"
          : "bg-red-800 text-white"
          }`}
      >
        {seat_availability ? "খালি আছে" : "খালি নেই"}
      </td>
    </tr>
  );
};

export default Admission;