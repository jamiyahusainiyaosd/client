import { useNavigate } from "react-router-dom";
import Time from "../../../utils/formateData";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const Notice = ({ title, created_at, id }) => {
  const navigate = useNavigate();
  const handleDetails = () => navigate(`/notice/${id}`);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="p-6 flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <FaCalendarAlt className="text-black dark:text-white" />
          <span>{Time(created_at)}</span>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <a
          onClick={handleDetails}
          className="w-full flex gap-2"
        >
          বিস্তারিত দেখুন
          <FaArrowRight />
        </a>
      </div>
    </div>
  );
};

export default Notice;