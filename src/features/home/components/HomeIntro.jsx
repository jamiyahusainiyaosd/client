const HomeIntro = () => {
  const cards = [
    {
      icon: "🕒",
      title: "ক্লাস সিডিউল",
      body: (
        <>
          সপ্তাহে ৬ দিন সকাল{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">৯:০০</span>{" "}
          থেকে{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">দুপুর ১:৩০</span>{" "}
          পর্যন্ত। শুক্রবার ছুটি।
        </>
      ),
    },
    {
      icon: "📚",
      title: "পাঠ্য কর্মসূচি",
      body: "হিফয, নুরানী, ইলমুত তাজবীদ, ইফতা, তাকমীলসহ বিভিন্ন মানের শিক্ষাক্রম।",
    },
    {
      icon: "🕌",
      title: "পরিবেশ ও মনিটরিং",
      body: "শান্তিপূর্ণ, শালীন পরিবেশে পাঠদান। তাহযীব–আখলাকের উপর বিশেষ গুরুত্ব।",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(({ icon, title, body }, idx) => (
          <div
            key={idx}
            className="group rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm p-5 hover:border-emerald-200 dark:hover:border-emerald-800/60 hover:bg-white dark:hover:bg-slate-800/60 transition-all duration-200"
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-lg mb-3">
              {icon}
            </div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {body}
            </p>
          </div>
        ))}
      </div>

      {/* About section */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-600 text-white">
              <small style={{ fontSize: 7 }}>﷽</small>
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                জামিয়া হুসাইনিয়া মাদ্রাসা
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                হবিগঞ্জ জেলার ঐতিহ্যবাহী কওমি দ্বীনি শিক্ষা প্রতিষ্ঠান
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 text-justify">
          <p>
            📖 জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ জেলার ঐতিহ্যবাহী ও সুপরিচিত দ্বীনি শিক্ষা
            প্রতিষ্ঠানগুলোর অন্যতম। শায়েস্তাগঞ্জ সংলগ্ন লস্করপুর একসময় তরফ রাজ্যের রাজধানী ছিল।
            বর্তমানেও শায়েস্তাগঞ্জ রেলপথ ও সড়কপথে সিলেট বিভাগের অন্যতম প্রবেশদ্বার।
          </p>
          <p>
            এত গুরুত্বপূর্ণ এলাকা হওয়া সত্ত্বেও আশির দশক পর্যন্ত বিশাল এ অঞ্চলে কোনো কওমী মাদরাসা
            ছিল না। মুসলিম জনগোষ্ঠীর দ্বীনি ইলমের প্রয়োজনীয়তা বিবেচনা করে এ অঞ্চলের বিশিষ্ট বুযুর্গ
            শায়েখ সৈয়দ আহমদ (চাঁন মিয়া) রহ. নিজের জমি ওয়াক্‌ফ করে মাদরাসা প্রতিষ্ঠা করেন।
          </p>
          <p>
            🕌 আওলাদে রাসূল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ মাদানী রহ. এর নামানুসারে
            নামকরণ করা হয়{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              "জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ"
            </span>
            । প্রতিষ্ঠালগ্ন থেকেই আলেম–উলামা ও সাধারণ মানুষের আস্থা অর্জন করে প্রতিষ্ঠানটি আজ
            সুপ্রতিষ্ঠিত।
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;