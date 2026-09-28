const AcademicEvidenceSection = () => {
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
          {/* Left Text Description */}
          <div className="lg:col-span-6 flex flex-col gap-space-sm">
            <span className="inline-flex items-center gap-2 text-primary font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              যাচাইকৃত দ্বীনী পাঠদান প্রণালী
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              সুশৃঙ্খল ক্লাস ও মানসম্মত পাঠদানের ঐতিহ্য
            </h2>
            <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
              শায়েস্তাগঞ্জ জামিয়া হুসাইনিয়া মাদ্রাসায় তাজবিদভিত্তিক কুরআন হিফজ থেকে শুরু করে ফযিলত (মেশকাত) পর্যন্ত প্রতিটি স্তরে রয়েছে বিষয়ভিত্তিক অভিজ্ঞ ওস্তাদগণের তত্ত্বাবধান। ছাত্রদের সার্বক্ষণিক নৈতিক মূল্যায়ন ও ইলমি অগ্রগতি নিবিড়ভাবে পর্যবেক্ষণ করা হয়।
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm mt-space-sm">
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container/60 shadow-xs">
                <span className="material-symbols-outlined text-primary text-[28px]">fact_check</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">ত্রৈমাসিক মূল্যায়ন</h4>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  নিয়মিত পরীক্ষা ও সাপ্তাহিক মৌখিক পর্যালোচনা।
                </p>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-surface-container/60 shadow-xs">
                <span className="material-symbols-outlined text-primary text-[28px]">psychology</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">নৈতিক তারবিয়াত</h4>
                <p className="font-body-sm text-body-sm text-secondary mt-1">
                  সুন্নাহ ভিত্তিক চরিত্র গঠন ও শিষ্টাচার চর্চা।
                </p>
              </div>
            </div>
          </div>

          {/* Right Snapshot of Official Academic Documentation */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest p-3 border border-surface-container-low">
              <img
                alt="জামিয়া হুসাইনিয়া মাদ্রাসা একাডেমিক ক্লাসের তালিকা ও রেজিস্টার"
                className="w-full h-auto rounded-2xl object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8l61QfTI4qqygZwD3EqQNGg5jWeLB3BrQgEOXlfYjxgHjFjeifC97IUE7VwsGiWse4ULtO69KT9A_los_4sE3dHx9MCjsScRDjHVDx8Dm0B55a45eaTu5MoOa9AnCcJupktSwUoztdq78cf2YT74UAxq-KsXZLf1OoZFaIw5ZRydWyCFBRdKnCNrEzMj15aijsLWXDLIYqsGCj3aOAcmez3xAn7wqdw1lMpvrQYIevSkKch45ed6JKWR6FhHGGqtX"
                onError={(e) => {
                  e.currentTarget.src = "/unnamed.jpg";
                }}
              />
              <div className="p-space-sm flex items-center justify-between text-secondary">
                <span className="font-label-sm text-label-sm">
                  শায়েস্তাগঞ্জ জামিয়া হুসাইনিয়া রেজিস্টার রেকর্ড
                </span>
                <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  দাপ্তরিক তথ্য সংরক্ষিত
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicEvidenceSection;
