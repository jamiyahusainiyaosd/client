import React from "react";
import Time from '../../../utils/formateData';

const Admission = ({
  ClassName, class_level, form_fee, new_admission_fee, old_admission_fee, new_total_fee, old_total_fee, additional_fee, monthly_fee, admission_start_date, admission_end_date, required_documents, seat_availability, admission_created, admission_updated,
}) => {
  return (
    <tr className="whitespace-nowrap text-center">
      <td className="border p-5">{ClassName}</td>
      <td className="border p-5">{class_level}</td>
      <td className="border p-5">{form_fee} টাকা</td>
      <td className="border p-5">{new_admission_fee} টাকা</td>
      <td className="border p-5">{old_admission_fee} টাকা</td>
      <td className="border p-5">{new_total_fee} টাকা</td>
      <td className="border p-5">{old_total_fee} টাকা</td>
      <td className="border p-5">{additional_fee} টাকা</td>
      <td className="border p-5">{monthly_fee} টাকা</td>
      <td className="border p-5">{admission_start_date}</td>
      <td className="border p-5">{admission_end_date}</td>
      <td className="border p-5">{required_documents}</td>
      <td className={`border p-5 ${seat_availability ? "bg-green-700 text-white" : "bg-red-700 text-white"}`}>
        {seat_availability ? "খালি আছে" : "খালি নেই"}
      </td>
      <td className="border p-5">{Time(admission_created)}</td>
      <td className="border p-5">{Time(admission_updated)}</td>
    </tr>
  );
};

export default Admission;