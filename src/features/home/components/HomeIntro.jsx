import React from "react";

const HomeIntro = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6">
      <ul className="mb-10 space-y-5">
        <li className="flex items-start gap-3 leading-relaxed text-justify text-gray-300 bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-cyan-400/30 transition-colors duration-300">
          <span className="text-2xl mt-0.5">👉</span>
          <span className="text-gray-200">
            সপ্তাহে ৬ দিন ক্লাস হয় সকাল ৯ টা থেকে দুপুর ১.৩০ মিনিট পর্যন্ত। শুক্রবারে মাদ্রাসার ক্লাস বন্ধ থাকে।
          </span>
        </li>
      </ul>
      
      <div className="w-full p-5 sm:p-7 rounded-xl bg-gradient-to-br from-gray-800/70 via-gray-800/50 to-gray-900/70 border border-gray-700 shadow-2xl hover:shadow-cyan-400/10 transition-all duration-500 group">
        <h1 className="text-xl sm:text-2xl font-bold mb-7 text-blue-300">
          🏫 জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
        </h1>
        
        <div className="space-y-5">
          <p className="text-base sm:text-lg leading-relaxed text-justify text-gray-300 bg-gray-900/30 p-4 rounded-lg border border-gray-700 group-hover:border-cyan-400/20 transition-colors duration-500">
            📖 জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ জেলার ঐতিহ্যবাহী ও প্রসিদ্ধ
            দ্বীনি শিক্ষা প্রতিষ্ঠানগুলোর অন্যতম। শায়েস্তাগঞ্জ সংলগ্ন লস্করপুর
            একসময় তরফ রাজ্যের রাজধানী ছিল। বর্তমানেও শায়েস্তাগঞ্জ রেলপথ ও সড়কপথে
            সিলেট বিভাগের অন্যতম প্রবেশদ্বার।
          </p>
          
          <p className="text-base sm:text-lg leading-relaxed text-justify text-gray-300 bg-gray-900/30 p-4 rounded-lg border border-gray-700 group-hover:border-cyan-400/20 transition-colors duration-500">
            এত গুরুত্বপূর্ণ এলাকা হওয়া সত্ত্বেও
            আশির দশক পর্যন্ত বিশাল এ অঞ্চলে কোনো কওমী মাদরাসা ছিল না। মুসলিম
            জনগোষ্ঠীর দ্বীনি ইলমের প্রয়োজনীয়তা বিবেচনা করে এ অঞ্চলের বিশিষ্ট
            বুযুর্গ শায়েখ সৈয়দ আহমদ (চাঁন মিয়া) রহ. তাঁর কয়েকজন ঘনিষ্ঠ বন্ধুর
            পরামর্শে নিজের জমি ওয়াক্‌ফ করে একটি মাদরাসা প্রতিষ্ঠা করেন।
          </p>
          
          <p className="text-base sm:text-lg leading-relaxed text-justify text-gray-300 bg-gray-900/30 p-4 rounded-lg border border-gray-700 group-hover:border-cyan-400/20 transition-colors duration-500">
            🕌 আওলাদে
            রাসূল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ মাদানী রহ. এর
            নামানুসারে মাদরাসার নামকরণ করেন 'জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ'।
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;