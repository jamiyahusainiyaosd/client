import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import teacherService from "../../teachers/services/teacher.services";
import academicsServices from "../../academics/services/academics.services";
import { toBengaliDigits } from "../../academics/utils/academicUtils";

const AllAbout = () => {
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

  const academicStats = useMemo(() => {
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

    // Dynamic unique department / category count
    const categories = new Set(
      list.map((item) => item?.category || item?.level).filter(Boolean)
    );
    const deptCount =
      categories.size > 0 ? categories.size : list.length > 0 ? list.length : 6;

    return {
      studentCount: totalStudents > 0 ? totalStudents : 600,
      deptCount,
    };
  }, [academicsData]);

  return (
    <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen">
      <div className="flex flex-col w-full font-body-md text-body-md text-on-surface">
        {/* TOP BREADCRUMB & INTRO SCENIC BANNER */}
        <section className="w-full bg-[#f1f3ff] pt-8 sm:pt-10 lg:pt-12 pb-12 sm:pb-16 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb & Eyebrow */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-label-sm font-semibold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                মাদ্রাসা সম্পর্কে
              </span>
              <span className="text-secondary text-body-sm">•</span>
              <span className="text-secondary text-body-sm font-medium">ঐতিহ্য, আদর্শ ও অগ্রযাত্রা</span>
            </div>
            {/* Main Heading & Subtitle */}
            <div className="max-w-4xl">
              <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-[1.3] text-on-surface tracking-tight mb-3 sm:mb-4">
                জামিয়া হুসাইনিয়া — <span className="text-primary">ইতিহাস, বৈশিষ্ট্য</span> ও পরিকল্পনা
              </h1>
              <p className="font-body-lg text-sm sm:text-base lg:text-lg text-secondary leading-relaxed max-w-3xl">
                জামিয়া হুসাইনিয়ার প্রতিষ্ঠা, লক্ষ্য, তারবিয়ত ব্যবস্থা এবং ভবিষ্যৎ পরিকল্পনা সম্পর্কে একটি সমন্বিত ও প্রামাণ্য রূপরেখা।
              </p>
            </div>
            {/* Key Quick Metrics Overview Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10">
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px] sm:text-[26px]">calendar_month</span>
                </div>
                <div>
                  <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">১৯৯৩ ইং</span>
                  <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">প্রতিষ্ঠাকাল (১৪১৩ হি.)</span>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px] sm:text-[26px]">groups</span>
                </div>
                <div>
                  <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">
                    {toBengaliDigits(academicStats.studentCount)}+ ছাত্র
                  </span>
                  <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">দ্বীনি শিক্ষার্থী</span>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px] sm:text-[26px]">school</span>
                </div>
                <div>
                  <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">
                    {toBengaliDigits(teacherCount)} জন
                  </span>
                  <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">উস্তাদ ও কর্মচারী</span>
                </div>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[22px] sm:text-[26px]">account_balance</span>
                </div>
                <div>
                  <span className="block font-headline-sm text-sm sm:text-base lg:text-lg text-on-surface font-bold">
                    {toBengaliDigits(academicStats.deptCount)}টি বিভাগ
                  </span>
                  <span className="block font-label-sm text-[11px] sm:text-xs text-secondary">নুরানী থেকে কিতাব</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: HISTORY & SPIRITUAL FOUNDATION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">সূচনা ও ঐতিহ্য</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">মাদ্রাসার ইতিহাস ও প্রতিষ্ঠার প্রেক্ষাপট</h2>
              <div className="w-16 h-1 bg-primary rounded-full mt-2"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Founder Memorial Narrative */}
              <div className="lg:col-span-7 bg-[#f1f3ff] p-5 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col gap-4 sm:gap-5">
                <div className="flex items-start gap-4 pb-3 border-b border-slate-200/60">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-xs text-primary">
                    <span className="material-symbols-outlined text-[28px] sm:text-[32px]">diversity_3</span>
                  </div>
                  <div>
                    <span className="font-label-sm sm:font-label-md text-xs sm:text-sm text-primary block font-semibold">মাদ্রাসার প্রতিষ্ঠাতা — আধ্যাত্মিক মুরব্বী ও অনুপ্রেরণার কেন্দ্র</span>
                    <h3 className="font-headline-md text-lg sm:text-xl text-on-surface mt-0.5 font-bold">শায়খ সৈয়দ আহমদ (চাঁন মিয়া) রহ.</h3>
                    <span className="font-label-sm text-[11px] sm:text-xs text-secondary block mt-0.5">ওফাত: ১৮ রবীউল আউয়াল ১৪৩০ হি. / ১৫ ফেব্রুয়ারি ২০০৯ খ্রি. (শনিবার ভোর)</span>
                  </div>
                </div>
                <div className="relative pl-4 sm:pl-5 text-secondary leading-relaxed text-sm sm:text-base flex flex-col gap-3.5">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/40 rounded-full"></div>
                  <p>
                    শায়খ সৈয়দ আহমদ (চাঁন মিয়া) রাহমাতুল্লাহি আলাইহি আল্লাহর রাহে নিবেদিত প্রাণ তেমনই এক মহান ব্যক্তিত্ব। দীর্ঘ জীবন সমাপ্ত করে বিগত ১৮ রবীউল আউয়াল ১৪৩০ হিজরী মোতাবেক ১৫ ফেব্রুয়ারি ২০০৯ খ্রিস্টাব্দ শনিবার ভোরে ইন্তেকাল করেন। কারো মুখে তাঁর কোনো সমালোচনা শুনিনি জীবনে। বরং তাঁর কোনো সমালোচকের সন্ধানও পাইনি। অথচ প্রবাদ শুভ মানুষের সাথে মন্দ লোকও থাকে। কিন্তু শায়খের ক্ষেত্রে ছিল তাঁর উল্টো। দেশ বিদেশের মানুষের সাথে ছিল তাঁর উঠাবসা। তবু শায়খ যেন মানুষ হলেও আল্লাহ তা'আলা এ মানুষটির দোষগুলোকে এমনভাবে আড়াল করে রেখেছিলেন যে, আমাদের মত সন্তান— যারা ছায়ার মত বাবার সাথেই লেগে থাকে, তারাও দেখেনি।
                  </p>
                  <p>
                    বরং অপরিচিত বহুবিধ গুণী সাধারণ কর্মকর্তা কর্মক্ষমতা হারিয়ে ঘরে বসে পড়লেন—তখন দেখেছি প্রভাব ভিক্ষুক থেকে শুরু করে শিক্ষিত-সাধারণ, আলেম-উলামা ও দুনিয়ার অনেক উচ্চাসনে অধিষ্ঠিত মানুষের আগমন ঘটত তাঁর কাছে। তাদের কেউ তাঁর কাছে ক্ষমা চাইছেন, কেউ তাঁর অতীত অসহায়ত্ব ও দুর্বলতা এবং তাঁদের প্রতি তাঁর অবদান ও ইহসানের কথা স্মরণ করে কৃতজ্ঞতা জানাচ্ছেন। কেউ অতীত অপরাধ অকপট স্বীকার করে নিজের চোখের পানি ঝরাচ্ছেন। মানুষের ভাব প্রকাশের বিচিত্র ধারা আমরা দেখেছি। কিন্তু সাথে সাথে এও দেখেছি এতে তাঁর দিলে, চেহারায় সামান্যও কোনো পরিবর্তন হয় না। আল্লাহ আপনি তাঁর এ আসার প্রকাশ্য ও গোপন সব নেকছোট মাফ করে দিন।
                  </p>
                  <p>
                    ব্যক্তিগত জীবনে বাস্তবিক অর্থে তিনি ছিলেন দ্বীনের একটিই খাদেম, দ্বীনের পথে সংগ্রামী, আধ্যাত্মিক রাহবর, আলেম-উলামা তথা আল্লাহ ওয়ালাদের জন্য জীবন উৎসর্গকারী, দ্বীন ও দ্বীনী শিক্ষা প্রচারক, শিক্ষিত ও অশিক্ষিত, ধনী-দরিদ্র, হিন্দু-মুসলিম নির্বিশেষে- বিপন্নগ্রস্ত মানুষের পরম আশ্রয়; সমাজসেবক, বিশ্বস্ত আমানতদার দরবাদী ব্যবসায়ী, পরিবারের শিশু থেকে বৃদ্ধ সকলের কাছে সমান অভিভাবক একজন দূরদর্শী ইত্যাদি।
                  </p>
                  <p>
                    এক ব্যক্তির মধ্যে অনুরূপ গুণাবলিসমূহ সমাবেশ বিরল বটে, তবু পাওয়া যায়। কিন্তু সকলক্ষেত্রে নিরবচ্ছিন্নভাবে নিষ্ঠাবান, মুখলিস ও একনিষ্ঠ ও সফল হওয়া এক ব্যক্তির পক্ষে এ যুগে সত্যিই দুর্লভ। তিনি না জাগতিক বা ধর্মীয় দিক থেকে উচ্চ শিক্ষা লাভের কোনো সুযোগ পেয়েছিলেন না তাঁর বিরাট ধন-দৌলত ছিল যা তিনি মানুষের মাঝে বিলাবেন। না তিনি বড় কোনো নেতৃত্ব কর্তৃত্ব পেয়েছিলেন—যে কারণে দলমত নির্বিশেষে সর্বস্তরের সকল শ্রেণীর হাজার হাজার মানুষের এক অকুল মিছিল সেদিন সমবেত হয়েছিল তাঁকে বিদায় জানাতে চিরদিনের জন্য! বরং সত্যিই তিনি ছিলেন একজন সাধারণ, সাদামাটা জীবন যাপনে অভ্যস্ত অতি সাধারণ মানুষ। সত্যিই তিনি ছিলেন একজন সফল মানুষ। জয় করেছিলেন আল্লাহ্ তা'আলাকে ও তাঁর শ্রেষ্ঠসৃষ্টি মানুষের মনোজগতকে।
                  </p>
                </div>
              </div>
              {/* Context, Origin & Naming */}
              <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
                <div className="bg-[#f1f3ff] p-5 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary mb-4 shadow-xs">
                    <span className="material-symbols-outlined text-[26px]">domain</span>
                  </div>
                  <span className="font-label-sm sm:font-label-md text-xs sm:text-sm text-primary font-semibold block">ভূমিকা ও প্রেক্ষাপট</span>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mt-1 mb-3 font-bold">প্রতিষ্ঠার ঐতিহাসিক পটভূমি ও উদ্দেশ্য</h3>
                  <p className="text-secondary leading-relaxed text-sm sm:text-base">
                    জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ জেলার ঐতিহ্যবাহী ও সুপ্রসিদ্ধ দ্বীনি শিক্ষা প্রতিষ্ঠানগুলোর অন্যতম। শায়েস্তাগঞ্জ সংলগ্ন লস্করপুর এককালে তরফ রাজ্যের রাজধানী ছিল। বর্তমানের শায়েস্তাগঞ্জ রেলপথ ও সড়কপথে সিলেট বিভাগের অন্যতম প্রবেশদ্বার।
                  </p>
                  <p className="text-secondary leading-relaxed text-sm sm:text-base mt-3">
                    এত গুরুত্বপূর্ণ এলাকা হওয়া সত্ত্বেও আশির দশক পর্যন্ত বিশাল এ অঞ্চলে কোনো কওমী মাদ্রাসা ছিল না। মুসলিম জনগোষ্ঠীর দ্বীনি ইলমের প্রয়োজনীয়তা বিবেচনা করে এ অঞ্চলের বিশিষ্ট বুজুর্গ শায়খ সৈয়দ আহমদ (চাঁন মিয়া) রহ. নিজের জমি ওয়াক্‌ফ করে একটি মাদ্রাসা প্রতিষ্ঠা করেন।
                  </p>
                </div>
                {/* Naming Dedication Banner */}
                <div className="bg-[#f1f3ff] p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 relative overflow-hidden">
                  <div>
                    <div className="flex items-center gap-2 text-primary text-label-sm font-label-sm font-bold uppercase tracking-wider mb-2">
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      নামকরণের ইতিহাস
                    </div>
                    <h4 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-2 font-bold">
                      শায়খুল ইসলাম আল্লামা মাদানী রহ.-এর বরকতময় স্মৃতি
                    </h4>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      আওলাদে রাসুল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ মাদানী রহ.-এর পুণ্যময় নামানুসারে এ বিদ্যাপীঠের নামকরণ করা হয় <strong className="text-primary font-bold">"জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ"</strong>। সূচনালগ্ন থেকেই প্রতিষ্ঠানটি দ্বীনের সহিহ খেদমত ও সুন্নাতি আলোকবর্তিকা হয়ে সর্বস্তরের মানুষের আস্থা অর্জন করেছে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INSTITUTIONAL QUICK FACTS */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#f1f3ff] border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">কাঠামো ও পরিচিতি</span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">এক নজরে জামিয়া হুসাইনিয়া</h2>
                <p className="font-body-md text-sm sm:text-base text-secondary mt-1">প্রতিষ্ঠানের মূল তথ্য, সাংগঠনিক কাঠামো ও আর্থিক স্বচ্ছতা</p>
              </div>
              <div className="inline-flex items-center gap-2 text-primary text-label-md font-label-md bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200/80 w-fit">
                <span className="material-symbols-outlined text-[18px]">gavel</span>
                <span>আহলে সুন্নাত ওয়াল জামাআহ মতাদর্শী</span>
              </div>
            </div>
            {/* Structured Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">history_edu</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-secondary block">প্রতিষ্ঠাকাল</span>
                  <span className="font-headline-sm text-base sm:text-lg text-on-surface font-bold block mt-0.5">১৪১৩ হিজরি / ১৯৯৩ ইং</span>
                  <span className="font-body-sm text-xs text-secondary">বাংলা ১৪০০ সনে প্রতিষ্ঠিত</span>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">menu_book</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-secondary block">মূল মতাদর্শ</span>
                  <span className="font-headline-sm text-base sm:text-lg text-on-surface font-bold block mt-0.5">আহলে সুন্নাত ওয়াল জামাআহ</span>
                  <span className="font-body-sm text-xs text-secondary">দারুল উলুম দেওবন্দের শিক্ষানীতি অনুসরণ</span>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">person_check</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-secondary block">মুহতামিম ও শিক্ষাসচিব</span>
                  <span className="font-label-md text-sm text-on-surface font-semibold block mt-0.5">মুহতামিম: মাওলানা সৈয়দ তানভীর ছিফাতুল্লাহ</span>
                  <span className="font-body-sm text-xs text-secondary block mt-0.5">শিক্ষাসচিব: মাওলানা আব্দুল কুদ্দুস নোমান</span>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">badge</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-secondary block">শিক্ষক ও কর্মচারী</span>
                  <span className="font-headline-sm text-base sm:text-lg text-on-surface font-bold block mt-0.5">
                    মোট {toBengaliDigits(teacherCount)} জন
                  </span>
                  <span className="font-body-sm text-xs text-secondary">লাইভ এপিআই অনুযায়ী শিক্ষক ও স্টাফ</span>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">backpack</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-secondary block">ছাত্রসংখ্যা ও ব্যবস্থাপনা</span>
                  <span className="font-headline-sm text-base sm:text-lg text-on-surface font-bold block mt-0.5">
                    প্রায় {toBengaliDigits(academicStats.studentCount)}+ জন
                  </span>
                  <span className="font-body-sm text-xs text-secondary">আবাসিক ও অনাবাসিক শিক্ষার্থী</span>
                </div>
              </div>
              <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[22px]">account_tree</span>
                </div>
                <div>
                  <span className="font-label-sm text-xs text-secondary block">শিক্ষাদান বিভাগ</span>
                  <span className="font-headline-sm text-base sm:text-lg text-on-surface font-bold block mt-0.5">
                    মোট {toBengaliDigits(academicStats.deptCount)}টি বিভাগ
                  </span>
                  <span className="font-body-sm text-xs text-secondary leading-tight">ইবতেদাইয়্যাহ, নুরানী, মক্তব, হিফজ ও কিতাব বিভাগ</span>
                </div>
              </div>
            </div>
            {/* Financial Management Strip */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 sm:mt-8">
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <span className="material-symbols-outlined">payments</span>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold">আয়ের উৎস ও তহবিল কাঠামো</h3>
                </div>
                <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed mb-4">
                  মাদ্রাসাটি সম্পূর্ণভাবে ধর্মপ্রাণ জনসাধারণের ও প্রবাসী ভাই-বোনদের স্বতঃস্ফূর্ত দান-অনুদানে পরিচালিত হয়। আর্থিক স্বচ্ছতার জন্য প্রাতিষ্ঠানিক ৩টি পৃথক তহবিল পরিচালিত রয়েছে:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="bg-slate-50 border border-slate-200/70 p-3 sm:p-4 rounded-xl text-center">
                    <span className="font-label-md text-sm text-on-surface font-semibold block">জেনারেল ফান্ড</span>
                    <span className="font-body-sm text-xs text-secondary">দৈনন্দিন ব্যয় ও উন্নয়ন</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 p-3 sm:p-4 rounded-xl text-center">
                    <span className="font-label-md text-sm text-on-surface font-semibold block">গরিব ফান্ড</span>
                    <span className="font-body-sm text-xs text-secondary">দরিদ্র ও এতিম সাহায্য</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/70 p-3 sm:p-4 rounded-xl text-center">
                    <span className="font-label-md text-sm text-on-surface font-semibold block">কিতাব ফান্ড</span>
                    <span className="font-body-sm text-xs text-secondary">পাঠ্যপুস্তক ও গ্রন্থাগার</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <span className="material-symbols-outlined">volunteer_activism</span>
                    <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold">ছাত্রদের সুযোগ-সুবিধা</h3>
                  </div>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    দরিদ্র, মেধাবী শিক্ষার্থী এবং এতিমদের খাদ্য, বস্ত্র, উন্নত চিকিৎসা ও পাঠ্যপুস্তকসহ যাবতীয় পড়াশোনার খরচ মাদ্রাসার 'গরিব ফান্ড' থেকে সম্পূর্ণ বিনামূল্যে বহন করা হয়।
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-label-sm font-label-sm text-primary font-semibold">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>১০০% নিখরচায় সুবিধাভোগী অসংখ্য শিক্ষার্থী</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: MISSION & OBJECTIVES */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">নীতিমালা ও রূপকল্প</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
              <p className="font-body-md text-sm sm:text-base text-secondary mt-1">দ্বীনি শিক্ষা ও চারিত্রিক গঠনের মূল স্তম্ভসমূহ</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#f1f3ff] p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-4 shadow-xs">
                    <span className="material-symbols-outlined text-[28px]">auto_stories</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold text-primary block mb-1">স্তম্ভ ১</span>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-2 font-bold">বিশুদ্ধ জ্ঞান ও গবেষণা</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    সাহাবায়ে কেরাম ও আইম্মায়ে দ্বীনের গবেষণাপ্রসূত জ্ঞানের আলোকে শিক্ষার্থীদের কোরআন-সুন্নাহর পূর্ণাঙ্গ শিক্ষা দান করা।
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-primary font-label-md text-sm font-medium">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>কুরআন-সুন্নাহর সহিহ অনুসৃতি</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-4 shadow-xs">
                    <span className="material-symbols-outlined text-[28px]">psychology</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold text-primary block mb-1">স্তম্ভ ২</span>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-2 font-bold">আমল ও তাকওয়ার বিকাশ</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    দ্বীনি ইলম শিক্ষার পাশাপাশি শিক্ষার্থীদের ব্যক্তিজীবনে তা প্রতিফলিত করে সুন্নাতের একনিষ্ঠ অনুসারী, পরহেযগার ও মুত্তাকি হিসেবে গড়ে তোলা।
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-primary font-label-md text-sm font-medium">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>তাকওয়া ও আধ্যাত্মিক প্রশিক্ষণ</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center mb-4 shadow-xs">
                    <span className="material-symbols-outlined text-[28px]">campaign</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold text-primary block mb-1">স্তম্ভ ৩</span>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-2 font-bold">দাওয়াত ও সমাজের সংস্কার</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    শিক্ষার্থীদের সমাজের বাস্তব চ্যালেঞ্জ মোকাবেলায় ইসলামের জন্য নিবেদিতপ্রাণ দূরদর্শী মুবাল্লিগ ও আদর্শ মুয়াল্লিম হিসেবে প্রস্তুত করা।
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-primary font-label-md text-sm font-medium">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>যোগ্য দা-ঈ ও সমাজসংস্কারক তৈরি</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: KEY CHARACTERISTICS */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#f1f3ff] border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">আমাদের স্বাতন্ত্র্য</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">আমাদের বৈশিষ্ট্যসমূহ</h2>
              <p className="font-body-md text-sm sm:text-base text-secondary mt-1">অন্যান্য দ্বীনি প্রতিষ্ঠানের তুলনায় জামিয়ার অনন্য বৈশিষ্ট্য ও অবস্থান</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f1f3ff] flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px]">pin_drop</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-1.5 font-bold">মনোরম ভৌগোলিক অবস্থান</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    ঢাকা-সিলেট মহাসড়ক (এশিয়ান হাইওয়ে), শায়েস্তাগঞ্জ নতুনব্রিজ চৌরাস্তার (গোলচত্বর) সন্নিকটে হবিগঞ্জ-শায়েস্তাগঞ্জ সড়কের পাশে সবুজ-শ্যামল মনোরম ও কোলাহলমুক্ত পরিবেশে প্রতিষ্ঠানটি অবস্থিত। যা পড়ালেখার জন্য অত্যন্ত উপযোগী।
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f1f3ff] flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px]">visibility</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-1.5 font-bold">সার্বক্ষণিক নিবিড় তত্ত্বাবধান</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    শিক্ষকমণ্ডলীর সার্বক্ষণিক পিতৃসুলভ তত্ত্বাবধানে ছাত্রদের চরিত্র গঠন, শিষ্টাচার শিক্ষা, নিয়মিত অধ্যয়ন ও সুশৃঙ্খল সময়ানুবর্তিতা নিশ্চিত করে আদর্শ নাগরিক হিসেবে গড়ে তোলা হয়।
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f1f3ff] flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px]">translate</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-1.5 font-bold">বহুভাষিক ও যুগোপযোগী জ্ঞানচর্চা</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    বিশুদ্ধ আরবি শিক্ষার পাশাপাশি মাতৃভাষা বাংলা, আন্তর্জাতিক ভাষা ইংরেজি, অঙ্ক, ঐতিহ্যবাহী ইতিহাস ও ভূগোল নিয়মিত কারিকুলামে অত্যন্ত যত্নের সাথে পাঠদান করা হয়।
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex items-start gap-4 sm:gap-5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#f1f3ff] flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[28px] sm:text-[32px]">mosque</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface mb-1.5 font-bold">আমল ও আদর্শের বাস্তব অনুশীলন</h3>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed">
                    শুধুমাত্র তাত্ত্বিক পাঠ্যপুস্তকের মধ্যেই শিক্ষা সীমাবদ্ধ নয়; বরং পাঁচ ওয়াক্ত জামায়াতে নামাজ, তাহাজ্জুদ, সুন্নত ও নফল আমল এবং ইসলামী আখলাকের বাস্তব অনুশীলন করানো হয়।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: STUDENT FORMATION */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">তারবিয়াত ব্যবস্থা</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">তারবিয়াত বা ছাত্রগঠন বিভাগ</h2>
              <p className="font-body-lg text-sm sm:text-base text-secondary mt-2 leading-relaxed">
                শিক্ষার্থীদের সত্যিকার অর্থে ওয়ারিসান আম্বিয়া ও যুগোপযোগী দা-ঈ হিসেবে গড়ে তুলতে মাদ্রাসায় রয়েছে বহুমুখী ও সুশৃঙ্খল গঠনমূলক বিভিন্ন সক্রিয় শাখা—
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-[#f1f3ff] p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:bg-[#e8ebfc] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">record_voice_over</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">ক্বিরাআত ও তাজবিদ</h3>
                  <span className="font-body-sm text-xs text-secondary">সহিহ উচ্চারণ ও সুরচর্চা</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:bg-[#e8ebfc] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">local_library</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">কুতুবখানা বা গ্রন্থাগার</h3>
                  <span className="font-body-sm text-xs text-secondary">অমূল্য কিতাবের সুবিশাল ভাণ্ডার</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:bg-[#e8ebfc] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">menu_book</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">ছাত্র পাঠাগার</h3>
                  <span className="font-body-sm text-xs text-secondary">সাহিত্য ও সাধারণ জ্ঞান চর্চা</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:bg-[#e8ebfc] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">mic</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">বক্তৃতা প্রশিক্ষণ কর্মশালা</h3>
                  <span className="font-body-sm text-xs text-secondary">সাপ্তাহিক বক্তৃতা ও বিতর্ক ফোরাম</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:bg-[#e8ebfc] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">newspaper</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">দেয়ালিকা প্রকাশ</h3>
                  <span className="font-body-sm text-xs text-secondary">নিয়মিত সাহিত্য ও মননশীল সৃজন</span>
                </div>
              </div>
              <div className="bg-[#f1f3ff] p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4 hover:bg-[#e8ebfc] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[26px]">hotel</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold">আবাসিক ছাত্রাবাস</h3>
                  <span className="font-body-sm text-xs text-secondary">সুশৃঙ্খল ও নিরিবিলি আবাসিক পরিবেশ</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: FUTURE PLANS */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#f1f3ff] border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold block mb-1">উন্নয়ন রূপরেখা</span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold">ভবিষ্যৎ পরিকল্পনা</h2>
              <p className="font-body-md text-sm sm:text-base text-secondary mt-1">শিক্ষাব্যবস্থার সম্প্রসারণ ও প্রাতিষ্ঠানিক অবকাঠামোগত উন্নয়ন মহাপরিকল্পনা</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
              {/* Academic Plans */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[26px]">school</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-xs text-primary font-bold uppercase tracking-wide">একাডেমিক রূপরেখা</span>
                      <h3 className="font-headline-md text-lg sm:text-xl text-on-surface font-bold">ভবিষ্যৎ শিক্ষা পরিকল্পনা</h3>
                    </div>
                  </div>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed mb-4">
                    শিক্ষাব্যবস্থাকে আরও আধুনিক, গবেষণাভিত্তিক ও যুগোপযোগী করে ফলপ্রসূ রূপ দেওয়ার লক্ষ্যে গৃহীত পদক্ষেপসমূহ:
                  </p>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">কিতাব বিভাগকে দাওরায়ে হাদীস বা তাকমীল (মাস্টার্স) স্তরে উন্নীত করা।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">উচ্চতর ইসলামিক আইন বিষয়ক ইফতা ও ফিক্‌হ বিভাগ চালু করা।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">আধুনিক প্রচারমাধ্যমকে কাজে লাগিয়ে আদ-দাওয়াহ ও ইসলাম প্রচার বিভাগ চালু করা।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">গবেষণামূলক গ্রন্থ ও সাময়িকী মুদ্রণের জন্য সমৃদ্ধ প্রকাশনা বিভাগ চালু করা।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">উচ্চতর ইলমুত তাজবীদ ও ক্বিরাআত বিভাগ চালু করা।</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2 text-primary font-label-md text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span>ক্রমান্বয়ে বাস্তবায়নের কাজ প্রক্রিয়াধীন</span>
                </div>
              </div>
              {/* Infrastructure Plans */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[26px]">apartment</span>
                    </div>
                    <div>
                      <span className="font-label-sm text-xs text-primary font-bold uppercase tracking-wide">অবকাঠামো রূপরেখা</span>
                      <h3 className="font-headline-md text-lg sm:text-xl text-on-surface font-bold">ভবিষ্যৎ উন্নয়ন পরিকল্পনা</h3>
                    </div>
                  </div>
                  <p className="font-body-md text-sm sm:text-base text-secondary leading-relaxed mb-4">
                    অবকাঠামো, উন্নত আবাসন ব্যবস্থা, আধুনিক সুযোগ-সুবিধা ও সার্বিক পরিবেশ নিশ্চিতকরণের মহাপরিকল্পনা:
                  </p>
                  <ul className="flex flex-col gap-3">
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">domain_add</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">মাদ্রাসাকে পূর্ণ আবাসিক করার লক্ষ্যে উত্তরের পাশে পাঁচতলা বিশিষ্ট প্রশস্ত ভবন নির্মাণ।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">construction</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">দক্ষিণ পাশের পুরাতন নুরানী ভবন সম্পূর্ণ ভেঙে আধুনিক মানে পুনর্নির্মাণ।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">deck</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">দেশ-বিদেশের বিদগ্ধ মেহমান ও উলামায়ে কেরামের জন্য সুন্দর মেহমানখানা প্রস্তুত করা।</span>
                    </li>
                    <li className="flex items-start gap-3 bg-slate-50 border border-slate-200/60 p-3 sm:p-3.5 rounded-xl">
                      <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">handyman</span>
                      <span className="font-body-md text-xs sm:text-sm text-on-surface">বর্তমান চলমান নির্মাণাধীন বহুতল ভবনের অবশিষ্টাংশের কাজ দ্রুত সমাপ্ত করা।</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-on-surface font-label-md text-sm font-medium">
                  <span className="material-symbols-outlined text-primary text-[18px]">volunteer_activism</span>
                  <span className="text-secondary text-xs sm:text-sm">সকল শুভানুধ্যায়ী ও প্রবাসীদের দোয়া ও সহযোগিতা কাম্য</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: INSPIRING SPIRITUAL QUOTE */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-[#f1f3ff] border border-slate-200/80 p-6 sm:p-10 md:p-14 rounded-3xl overflow-hidden shadow-xs">
              <span className="material-symbols-outlined absolute right-4 sm:right-6 bottom-2 sm:bottom-4 text-[120px] sm:text-[160px] text-primary/5 select-none pointer-events-none">
                format_quote
              </span>
              <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">format_quote</span>
                </div>
                <span className="font-label-sm text-xs uppercase tracking-widest text-primary font-bold mb-3">
                  অনুপ্রেরণাদায়ী বাণী — দ্বীনি শিক্ষার মর্যাদা ও মাহাত্ম্য
                </span>
                <blockquote className="font-headline-md text-base sm:text-lg lg:text-xl text-slate-800 leading-relaxed mb-4">
                  "ইলমে দ্বীন এমন এক বিরাট নেয়ামত যে, বাধ্য হয়েও যারা তা গ্রহণ করে এবং উদ্দেশ্য না বুঝেও গবেষণার নূরানী পরিবেশে এসে পড়ে, তারাও আমাদের মেহেরবান লাযেলখো পায়। হয়তো আর তারা এই নিয়ামতের কদর করছে না, কিন্তু আল্লাহ যেদিন অনন্তকুন্ত খুলে দেবেন এবং ইলমের হাকিকত ও ফজিলত তাদের সামনে উদ্ঘাটিত করবেন, সেদিন তারা চোখের পানি ফেলে ফেলে ঘা-ব্যবহার জন্য দোয়া করবে এবং আন্তরিকভাবে কোরআনকে ভালোবাসবে।"
                </blockquote>
                <blockquote className="font-body-lg text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-4">
                  "সংক্ষেপে বললে, যে কোনোভাবেই দ্বীনি মাদ্রাসায় এসেছে এবং ইলমের নূরানী পরিবেশে দাখিল হয়েছে, সে এবং তার মা-বাবা আমাদের হৃদয় নিংড়ানো মেহেরবান লাযেলখো পাবে।"
                </blockquote>
                <div className="inline-flex flex-col items-center pt-2">
                  <span className="font-headline-sm text-base sm:text-lg text-primary tracking-wide font-bold">
                    — হযরত মাওলানা সাইয়্যেদ আবুল হাসান আলী নদভী রহ.
                  </span>
                  <span className="font-label-sm text-xs text-slate-500 mt-0.5">
                    বিশ্বখ্যাত ইসলামী চিন্তাবিদ ও লেখক
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AllAbout;
