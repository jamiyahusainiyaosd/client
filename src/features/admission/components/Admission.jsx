import React from "react";

const Admission = ({
  ClassName,
  new_admission_fee,
  old_admission_fee,
  new_total_fee,
  old_total_fee,
  additional_fee,
  admission_end_date,
  required_documents,
  seat_availability,
}) => {
  return (
    <tr className="whitespace-nowrap">
      <td className="border p-10">{ClassName}</td>
      <td className="border p-10">{new_admission_fee} টাকা</td>
      <td className="border p-10">{old_admission_fee} টাকা</td>
      <td className="border p-10">{new_total_fee} টাকা</td>
      <td className="border p-10">{old_total_fee} টাকা</td>
      <td className="border p-10">{additional_fee} টাকা</td>
      <td className="border p-10">{admission_end_date}</td>
      <td className="border p-10">{required_documents}</td>
      <td
        className={`border p-10 ${
          seat_availability
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
