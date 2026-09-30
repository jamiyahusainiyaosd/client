import PropTypes from "prop-types";
import TeacherCard from "./TeacherCard";
import Loader from "../../../components/Loader";

const TeacherCards = ({ teachers = [], isLoading = false }) => {
  if (isLoading) {
    return <Loader message="শিক্ষকমণ্ডলীর তথ্য লোড হচ্ছে..." />;
  }

  if (!teachers || teachers.length === 0) {
    return (
      <div
        className="text-center py-16 bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-6 my-6 shadow-xs"
        id="no-teachers-msg"
      >
        <span className="material-symbols-outlined text-slate-400 text-[48px] mb-2">
          person_search
        </span>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          কোনো শিক্ষকের তথ্য পাওয়া যায়নি
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          অনুগ্রহ করে সঠিক নাম বা পদবি দিয়ে পুনরায় অনুসন্ধান করুন।
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-6"
      id="teachers-grid"
    >
      {teachers.map((item) => (
        <TeacherCard key={item.id} teacher={item} />
      ))}
    </div>
  );
};

TeacherCards.propTypes = {
  teachers: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

export default TeacherCards;
