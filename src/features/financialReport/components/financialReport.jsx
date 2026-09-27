import PropTypes from "prop-types";
import AllFinancialReports from "./AllFinancialReports";

export default function FinancialReport({ academicSession }) {
  return <AllFinancialReports academicSession={academicSession} />;
}

FinancialReport.propTypes = {
  academicSession: PropTypes.string,
};