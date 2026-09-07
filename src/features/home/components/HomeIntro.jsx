import { BookOpen, Clock, GraduationCap } from "lucide-react";

const HomeIntro = () => {
  const cards = [
    {
      icon: Clock,
      color: "text-emerald-600 ",
      bg: "bg-emerald-50 ",
      title: "ক্লাস সিডিউল",
      body: (
        <>
          সপ্তাহে ৬ দিন সকাল{" "}
          <span className="font-semibold text-emerald-600 ">৯:০০</span> থেকে{" "}
          <span className="font-semibold text-emerald-600 ">দুপুর ১:৩০</span>{" "}
          পর্যন্ত। শুক্রবার ছুটি।
        </>
      ),
    },
    {
      icon: BookOpen,
      color: "text-blue-600 ",
      bg: "bg-blue-50 ",
      title: "পাঠ্য কর্মসূচি",
      body: "হিফয, নুরানী, ইলমুত তাজবীদ, ইফতা, তাকমীলসহ বিভিন্ন মানের শিক্ষাক্রম।",
    },
    {
      icon: GraduationCap,
      color: "text-violet-600 ",
      bg: "bg-violet-50 ",
      title: "পরিবেশ ও মনিটরিং",
      body: "শান্তিপূর্ণ, শালীন পরিবেশে পাঠদান। তাহযীব–আখলাকের উপর বিশেষ গুরুত্ব।",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Info Cards — with Section Heading */}
      <div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-1 w-5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
              একটু জানুন
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 ">
            কেন আমাদের মাদ্রাসায়?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, color, bg, title, body }, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm p-5 hover:border-emerald-200  hover:bg-white  hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-xl ${bg} mb-3`}
              >
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="text-sm font-semibold text-slate-900  mb-1.5">
                {title}
              </h3>
              <p className="text-sm text-slate-500  leading-relaxed text-bengali">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-2xl border border-slate-200/80  bg-white/70  backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 ">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-emerald-600 text-white text-lg font-bold flex-shrink-0">
              ﷽
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 ">
                জামিয়া হুসাইনিয়া মাদ্রাসা
              </h2>
              <p className="text-xs text-slate-400 ">
                হবিগঞ্জ জেলার ঐতিহ্যবাহী কওমি দ্বীনি শিক্ষা প্রতিষ্ঠান
              </p>
            </div>
          </div>
        </div>

        {/* Body — removed Emoji, text-justify removed */}
        <div className="px-6 py-5 space-y-4 text-sm leading-relaxed text-slate-600  text-bengali">
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
            <span className="font-semibold text-emerald-700 ">
              "জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ"
            </span>
            । প্রতিষ্ঠালগ্ন থেকেই আলেম–উলামা ও সাধারণ মানুষের আস্থা অর্জন করে
            প্রতিষ্ঠানটি আজ সুপ্রতিষ্ঠিত।
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
