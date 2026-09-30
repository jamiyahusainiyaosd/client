import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import teacherService from "../../teachers/services/teacher.services";
import academicsServices from "../../academics/services/academics.services";
import { toBengaliDigits } from "../../academics/utils/academicUtils";

const HomeIntro = () => {
  // Dynamic teachers count from live Backend API
  const { data: teachersData } = useQuery({
    queryKey: ["teachersList"],
    queryFn: async () => {
      try {
        const res = await teacherService.getAllTeacher(1, 100);
        return res?.data;
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  // Dynamic academics data from live Backend API (all items)
  const { data: academicsData } = useQuery({
    queryKey: ["academicsAll"],
    queryFn: () => academicsServices.getAllAcademic(1, 100),
    staleTime: 1000 * 60 * 5,
  });

  // Calculate live dynamic metrics from API
  const teacherCount = useMemo(() => {
    const raw =
      teachersData?.data ||
      teachersData?.results ||
      (Array.isArray(teachersData) ? teachersData : []);
    const count = teachersData?.count ?? raw.length;
    return count > 0 ? count : 23;
  }, [teachersData]);

  const studentCount = useMemo(() => {
    const raw =
      academicsData?.data?.data ||
      academicsData?.data?.results ||
      academicsData?.data ||
      academicsData?.results ||
      (Array.isArray(academicsData) ? academicsData : []);
    const list = Array.isArray(raw) ? raw : [];

    // Sum students from live academic classes
    const totalStudents = list.reduce(
      (sum, item) => sum + (Number(item?.student_count) || 0),
      0
    );

    return totalStudents > 0 ? totalStudents : 600;
  }, [academicsData]);

  const cards = [
    {
      icon: Clock,
      title: "ক্লাস সিডিউল",
      body: (
        <>
          সপ্তাহে ৬ দিন সকাল{" "}
          <span className="font-semibold text-primary">৯:০০</span> থেকে{" "}
          <span className="font-semibold text-primary">দুপুর ১:৩০</span>{" "}
          পর্যন্ত। শুক্রবার ছুটি।
        </>
      ),
    },
    {
      icon: BookOpen,
      title: "পাঠ্য কর্মসূচি",
      body: "হিফয, নুরানী, ইলমুত তাজবীদ, ইফতা, তাকমীলসহ বিভিন্ন মানের শিক্ষাক্রম।",
    },
    {
      icon: GraduationCap,
      title: "পরিবেশ ও মনিটরিং",
      body: "শান্তিপূর্ণ, শালীন পরিবেশে পাঠদান। তাহযীব–আখলাকের উপর বিশেষ গুরুত্ব।",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* 3 Core Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-xs hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-lg bg-[#f1f3ff] text-primary shrink-0 shadow-2xs border border-slate-200/60">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-main">{card.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-body leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Trust Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-2xs border border-slate-200/60">
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
          </div>
          <div>
            <span className="block font-bold text-base sm:text-lg text-main">১৯৯৩ ইং</span>
            <span className="block text-[11px] sm:text-xs text-muted">প্রতিষ্ঠাকাল</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-2xs border border-slate-200/60">
            <span className="material-symbols-outlined text-[22px]">groups</span>
          </div>
          <div>
            <span className="block font-bold text-base sm:text-lg text-main">
              {toBengaliDigits(studentCount)}+ ছাত্র
            </span>
            <span className="block text-[11px] sm:text-xs text-muted">দ্বীনি শিক্ষার্থী</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-2xs border border-slate-200/60">
            <span className="material-symbols-outlined text-[22px]">school</span>
          </div>
          <div>
            <span className="block font-bold text-base sm:text-lg text-main">
              {toBengaliDigits(teacherCount)} জন
            </span>
            <span className="block text-[11px] sm:text-xs text-muted">উস্তাদ ও কর্মচারী</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5 flex items-center gap-3.5 shadow-xs hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f1f3ff] text-primary flex items-center justify-center shrink-0 shadow-2xs border border-slate-200/60">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div>
            <span className="block font-bold text-base sm:text-lg text-main">১০০%</span>
            <span className="block text-[11px] sm:text-xs text-muted">সুন্নাতি আদর্শ ও আমল</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-slate-100">
          <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-primary text-white flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[26px]">mosque</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              জামিয়া হুসাইনিয়া <span className="text-primary">মাদ্রাসা</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted font-medium mt-0.5">
              হবিগঞ্জ জেলার ঐতিহ্যবাহী কওমি দ্বীনি শিক্ষা প্রতিষ্ঠান
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-body text-bengali">
          <p>
            জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ জেলার ঐতিহ্যবাহী ও
            সুপরিচিত দ্বীনি শিক্ষা প্রতিষ্ঠানগুলোর অন্যতম। শায়েস্তাগঞ্জ সংলগ্ন
            লস্করপুর একসময় তরফ রাজ্যের রাজধানী ছিল। বর্তমানেও শায়েস্তাগঞ্জ
            রেলপথ ও সড়কপথে সিলেট বিভাগের অন্যতম প্রবেশদ্বার।
          </p>
          <p>
            এত গুরুত্বপূর্ণ এলাকা হওয়া সত্ত্বেও আশির দশক পর্যন্ত বিশাল এ অঞ্চলে
            কোনো কওমী মাদরাসা ছিল না। মুসলিম জনগোষ্ঠীর দ্বীনি ইলমের
            প্রয়োজনীয়তা বিবেচনা করে এ অঞ্চলের বিশিষ্ট বুযুর্গ শায়েখ সৈয়দ
            আহমদ (চাঁন মিয়া) রহ. নিজের জমি ওয়াক্‌ফ করে মাদরাসা প্রতিষ্ঠা করেন।
          </p>
          <p>
            আওলাদে রাসূল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ
            মাদানী রহ. এর নামানুসারে নামকরণ করা হয়{" "}
            <span className="font-semibold text-primary">
              "জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ"
            </span>
            । প্রতিষ্ঠালগ্ন থেকেই আলেম–উলামা ও সাধারণ মানুষের আস্থা অর্জন করে
            প্রতিষ্ঠানটি আজ সুপ্রতিষ্ঠিত।
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between gap-2 sm:gap-4">
          <span className="text-[11px] sm:text-xs text-muted font-medium whitespace-nowrap truncate">
            শায়েস্তাগঞ্জ নতুনব্রিজ সংলগ্ন, হবিগঞ্জ
          </span>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm font-bold text-primary hover:text-primary-hover transition-colors whitespace-nowrap flex-shrink-0"
          >
            <span>সম্পূর্ণ ইতিহাস পড়ুন</span>
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeIntro;
