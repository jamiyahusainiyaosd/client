const HomeIntro = () => {
  return (
    <section className="max-w-4xl mx-auto space-y-8">
      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-md p-5 flex flex-col gap-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 text-xl">
            🕒
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            ক্লাস সিডিউল
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            সপ্তাহে ৬ দিন সকাল{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-300">
              ৯:০০
            </span>{" "}
            টা থেকে{" "}
            <span className="font-semibold text-emerald-600 dark:text-emerald-300">
              দুপুর ১:৩০
            </span>{" "}
            পর্যন্ত ক্লাস চলমান থাকে। শুক্রবার ছুটির দিন।
          </p>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-md p-5 flex flex-col gap-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 text-xl">
            📚
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            পাঠ্য কর্মসূচি
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            হিফয, নুরানী, ইলমুত তাজবীদ, ইফতা, তাকমীলসহ বিভিন্ন মানের
            শিক্ষাক্রম কুরআন ও সহীহ সুন্নাহের আলোকে সাজানো।
          </p>
        </div>

        <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-md p-5 flex flex-col gap-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300 text-xl">
            🕌
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            পরিবেশ ও মনিটরিং
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            শান্তিপূর্ণ, শালীন ও নিরাপদ পরিবেশে পাঠদান, তাহযীব–আখলাকের
            উপর বিশেষ গুরুত্ব ও সার্বক্ষণিক তত্ত্বাবধান।
          </p>
        </div>
      </div>

      {/* About section */}
      <div className="bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-900/20 p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-700/40">
           <small style={{fontSize: 7}}> ﷽</small>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-50">
              জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              হবিগঞ্জ জেলার ঐতিহ্যবাহী কওমি দ্বীনি শিক্ষা প্রতিষ্ঠানগুলোর
              অন্যতম
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-200 text-justify">
          <p>
            📖 জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ জেলার ঐতিহ্যবাহী ও
            সুপরিচিত দ্বীনি শিক্ষা প্রতিষ্ঠানগুলোর অন্যতম। শায়েস্তাগঞ্জ
            সংলগ্ন লস্করপুর একসময় তরফ রাজ্যের রাজধানী ছিল। বর্তমানেও
            শায়েস্তাগঞ্জ রেলপথ ও সড়কপথে সিলেট বিভাগের অন্যতম প্রবেশদ্বার।
          </p>
          <p>
            এত গুরুত্বপূর্ণ এলাকা হওয়া সত্ত্বেও আশির দশক পর্যন্ত বিশাল এ
            অঞ্চলে কোনো কওমী মাদরাসা ছিল না। মুসলিম জনগোষ্ঠীর দ্বীনি ইলমের
            প্রয়োজনীয়তা বিবেচনা করে এ অঞ্চলের বিশিষ্ট বুযুর্গ শায়েখ সৈয়দ
            আহমদ (চাঁন মিয়া) রহ. কয়েকজন ঘনিষ্ঠ আলেমের পরামর্শে নিজের জমি
            ওয়াক্‌ফ করে একটি মাদরাসা প্রতিষ্ঠা করেন।
          </p>
          <p>
            🕌 আওলাদে রাসূল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ
            মাদানী রহ. এর নামানুসারে মাদরাসার নামকরণ করা হয়{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              “জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ”
            </span>
            । প্রতিষ্ঠালগ্ন থেকেই আলেম–উলামা ও সাধারণ মানুষের আস্থা ও
            ভালোবাসা অর্জন করে প্রতিষ্ঠানটি আজ সুপ্রতিষ্ঠিত।
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
