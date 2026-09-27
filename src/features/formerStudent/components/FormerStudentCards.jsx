import PropTypes from "prop-types";
import { toBengaliDigits } from "../utils/bengaliUtils";
import StudentAvatar from "./StudentAvatar";

const FormerStudentCards = ({
  students = [],
  onOpenDetails,
  onResetFilters,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs h-64 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-[52px] h-[52px] rounded-2xl bg-slate-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2 bg-[#f1f3ff]/50 p-3 rounded-xl">
              <div className="h-3 bg-slate-200 rounded w-4/5" />
              <div className="h-3 bg-slate-200 rounded w-3/5" />
            </div>
            <div className="h-10 bg-slate-200 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div
        className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-xs mb-10"
        id="noResultsBlock"
      >
        <div className="w-14 h-14 rounded-2xl bg-[#f1f3ff] text-primary flex items-center justify-center mx-auto mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[30px]">
            person_search
          </span>
        </div>
        <h3 className="font-headline-sm text-lg font-bold text-slate-900">
          কোন সাবেক ছাত্রের তথ্য মেলেনি
        </h3>
        <p className="text-secondary text-sm mt-1">
          অনুগ্রহ করে সঠিক নাম, ব্যাচ বা ফোন নম্বর দিয়ে পুনরায় চেষ্টা করুন।
        </p>
        <button
          className="mt-5 px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm cursor-pointer hover:bg-primary/90 transition-colors shadow-xs"
          id="resetSearchBtn"
          onClick={onResetFilters}
          type="button"
        >
          সকল তালিকা প্রদর্শন করুন
        </button>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
      id="alumniGrid"
    >
      {students.map((student) => {
        const passYearBengali = toBengaliDigits(student.pass_year || "");

        return (
          <div
            key={student.id}
            className="alumni-card group site-card-alt hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
            data-location={student.address}
            data-name={student.name}
            data-phone={student.mobile}
            data-year={student.pass_year}
          >
            <div>
              {/* Header inside Card */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <StudentAvatar
                    className="w-[52px] h-[52px]"
                    iconSize="text-[28px]"
                    name={student.name}
                    priority={true}
                    roundedClassName="rounded-2xl"
                    src={student.image}
                  />

                  <div>
                    <h3 className="font-headline-sm text-base sm:text-lg font-bold text-main group-hover:text-primary transition-colors line-clamp-1">
                      {student.name}
                    </h3>
                    {student.current && (
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-white text-primary text-xs font-medium border border-slate-200/70 line-clamp-1 max-w-[210px] shadow-xs">
                        {student.current}
                      </span>
                    )}
                  </div>
                </div>

                {student.pass_year && (
                  <span className="px-2.5 py-1 rounded-lg bg-white text-primary border border-primary-border/60 text-xs font-semibold shrink-0 shadow-xs">
                    {passYearBengali}
                  </span>
                )}
              </div>

              {/* Detail List */}
              <div className="space-y-2.5 py-3 bg-white rounded-xl px-3.5 my-3 border border-slate-200/70 shadow-xs">
                {student.address && (
                  <div className="flex items-center gap-2.5 text-secondary">
                    <span className="material-symbols-outlined text-[17px] text-primary shrink-0">
                      location_on
                    </span>
                    <span className="text-body-sm text-xs sm:text-sm text-slate-700 font-medium line-clamp-1">
                      {student.address}
                    </span>
                  </div>
                )}

                {student.mobile && (
                  <div className="flex items-center gap-2.5 text-secondary">
                    <span className="material-symbols-outlined text-[17px] text-primary shrink-0">
                      phone_android
                    </span>
                    <span className="text-body-sm text-xs sm:text-sm text-slate-700 font-medium tracking-wide">
                      {student.mobile}
                    </span>
                  </div>
                )}

                {student.pass_year && (
                  <div className="flex items-center gap-2.5 text-secondary">
                    <span className="material-symbols-outlined text-[17px] text-primary shrink-0">
                      school
                    </span>
                    <span className="text-body-sm text-xs sm:text-sm text-slate-600">
                      পাশের সাল:{" "}
                      <strong className="text-slate-900 font-semibold">
                        {passYearBengali || student.pass_year}
                      </strong>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Card Action - Full width elegant view details button */}
            <div className="pt-3 mt-2 border-t border-slate-200/70">
              <button
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-primary hover:text-white text-primary font-medium text-sm border border-slate-200/80 transition-colors duration-200 cursor-pointer shadow-xs active:scale-98"
                onClick={() => onOpenDetails(student)}
                type="button"
              >
                <span>বিস্তারিত তথ্য দেখুন</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

FormerStudentCards.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object),
  onOpenDetails: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default FormerStudentCards;
