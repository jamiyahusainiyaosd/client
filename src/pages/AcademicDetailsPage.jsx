import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import AcademicDetail from "../features/academics/components/AcademicDetail";
import academicsServices from "../features/academics/services/academics.services";
import PageTitle from "../utils/PageTitle";
import Loader from "../components/Loader";

const AcademicDetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`academicDetail${id}`],
    queryFn: () => academicsServices.getOneAcademic(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const info = data?.data?.data || data?.data;

  if (isLoading) {
    return (
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex items-center justify-center">
        <Loader />
      </main>
    );
  }

  if (!info) {
    return (
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <span className="material-symbols-outlined text-slate-400 text-[56px] mb-2">
            menu_book
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            ক্লাসের তথ্য পাওয়া যায়নি
          </h2>
          <p className="text-slate-600 mt-1 mb-6 text-sm">
            অনুরোধকৃত ক্লাসটির কোনো রেকর্ড সিস্টেমে পাওয়া যায়নি।
          </p>
          <Link
            to="/academic"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-sm shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            সকল ক্লাসের তালিকায় ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const className = info?.class_name || "";
  const classTitle = info?.class_title || "";
  const classStudentCount = info?.student_count ?? 0;
  const classSetCount = info?.number_seat ?? 0;
  const createdAt = info?.class_created || "";
  const classDescription = info?.class_description || "";
  const courseCode = info?.course_code || "";
  const level = info?.category || info?.level || "";
  const admissionStatus = info?.admission_status || "ভর্তি চলমান";
  const routineBadge = info?.routine_badge || "";
  const teacherNote = info?.teacher_note || "";

  const customFeatures = [
    { title: info?.feature_1_title, desc: info?.feature_1_desc },
    { title: info?.feature_2_title, desc: info?.feature_2_desc },
    { title: info?.feature_3_title, desc: info?.feature_3_desc },
    { title: info?.feature_4_title, desc: info?.feature_4_desc },
  ].filter((f) => f.title && f.desc);

  const customRoutines = [
    { time: info?.routine_1_time, title: info?.routine_1_title, label: "১ম অধিবেশন" },
    { time: info?.routine_2_time, title: info?.routine_2_title, label: "২য় অধিবেশন" },
    { time: info?.routine_3_time, title: info?.routine_3_title, label: "৩য় অধিবেশন" },
  ].filter((r) => r.time && r.title);

  return (
    <>
      <PageTitle title={`${className ? `${className} | ` : ""}জামিয়া হুসাইনিয়া মাদ্রাসা`} />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen">
        <div className="flex flex-col w-full">
          <AcademicDetail
            className={className}
            classDescription={classDescription}
            classSetCount={classSetCount}
            classStudentCount={classStudentCount}
            classTitle={classTitle}
            courseCode={courseCode}
            createdAt={createdAt}
            id={id}
            level={level}
            admissionStatus={admissionStatus}
            routineBadge={routineBadge}
            teacherNote={teacherNote}
            customFeatures={customFeatures}
            customRoutines={customRoutines}
          />
        </div>
      </main>
    </>
  );
};

export default AcademicDetailPage;