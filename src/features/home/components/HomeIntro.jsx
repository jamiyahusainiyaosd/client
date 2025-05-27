const HomeIntro = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">ক্লাস সিডিউল</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-justify">
            সপ্তাহে ৬ দিন ক্লাস হয় সকাল ৯ টা থেকে দুপুর ১.৩০ মিনিট পর্যন্ত। শুক্রবারে মাদ্রাসার ক্লাস বন্ধ থাকে।
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <svg className="w-6 h-6 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ, হবিগঞ্জ
          </h1>
        </div>
        
        <div className="space-y-5 text-justify">
          {[
            "📖 জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ, হবিগঞ্জ জেলার ঐতিহ্যবাহী ও প্রসিদ্ধ দ্বীনি শিক্ষা প্রতিষ্ঠানগুলোর অন্যতম। শায়েস্তাগঞ্জ সংলগ্ন লস্করপুর একসময় তরফ রাজ্যের রাজধানী ছিল। বর্তমানেও শায়েস্তাগঞ্জ রেলপথ ও সড়কপথে সিলেট বিভাগের অন্যতম প্রবেশদ্বার।",
            "এত গুরুত্বপূর্ণ এলাকা হওয়া সত্ত্বেও আশির দশক পর্যন্ত বিশাল এ অঞ্চলে কোনো কওমী মাদরাসা ছিল না। মুসলিম জনগোষ্ঠীর দ্বীনি ইলমের প্রয়োজনীয়তা বিবেচনা করে এ অঞ্চলের বিশিষ্ট বুযুর্গ শায়েখ সৈয়দ আহমদ (চাঁন মিয়া) রহ. তাঁর কয়েকজন ঘনিষ্ঠ বন্ধুর পরামর্শে নিজের জমি ওয়াক্‌ফ করে একটি মাদরাসা প্রতিষ্ঠা করেন।",
            "🕌 আওলাদে রাসূল (সা.) শায়খুল ইসলাম আল্লামা সাইয়্যেদ হুসাইন আহমদ মাদানী রহ. এর নামানুসারে মাদরাসার নামকরণ করেন 'জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ'।"
          ].map((text, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;