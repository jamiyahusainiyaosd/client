import { FaBullseye } from "react-icons/fa";
import { aboutData } from "../../../constants/aboutData";

const AimsAndObjectivesInfo = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 h-full">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg mr-4">
          <FaBullseye className="text-blue-500 dark:text-blue-400 text-xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          লক্ষ্য ও উদ্দেশ্য
        </h3>
      </div>
      <ul className="space-y-3">
        {aboutData.goals.map((goal, index) => (
          <li
            key={index}
            className="text-justify text-gray-700 dark:text-gray-300 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 dark:before:bg-blue-400 before:rounded-full"
          >
            {goal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AimsAndObjectivesInfo;
