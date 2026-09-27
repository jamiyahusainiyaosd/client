import PropTypes from "prop-types";
import NoticeCard from "./NoticeCard";

const NoticeCards = ({ notices = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-[#f1f3ff] rounded-2xl p-5 sm:p-6 h-56 border border-slate-200/80 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!notices || notices.length === 0) {
    return (
      <div
        className="text-center py-16 bg-[#f1f3ff] rounded-2xl border border-slate-200/80 p-6 my-6 shadow-xs"
        id="no-notices-msg"
      >
        <span className="material-symbols-outlined text-slate-400 text-[48px] mb-2">
          search_off
        </span>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          কোনো নোটিশ পাওয়া যায়নি
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          ভিন্ন শব্দ লিখে পুনরায় অনুসন্ধান করুন অথবা ফিল্টার পরিবর্তন করুন।
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 my-6"
      id="notices-grid"
    >
      {notices.map((item) => (
        <NoticeCard key={item.id} notice={item} />
      ))}
    </div>
  );
};

NoticeCards.propTypes = {
  notices: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

export default NoticeCards;
