import React from "react";

const AdmissionStatsBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-margin py-space-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
        {/* Stat 1 */}
        <div className="p-space-md rounded-2xl bg-surface-container-low flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">
              account_tree
            </span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface block font-mono">
              ৯+ বিভাগ
            </span>
            <span className="font-body-sm text-body-sm text-secondary">
              নূরানী থেকে কিতাব বিভাগ
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-space-md rounded-2xl bg-surface-container-low flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">bed</span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface block font-mono">
              সুশৃঙ্খল আবাসন
            </span>
            <span className="font-body-sm text-body-sm text-secondary">
              নিরাপদ ও স্বাস্থ্যসম্মত পরিবেশ
            </span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-space-md rounded-2xl bg-surface-container-low flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">
              restaurant
            </span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface block font-mono">
              ২০০০ ৳ খোরাকি
            </span>
            <span className="font-body-sm text-body-sm text-secondary">
              পুষ্টিকর ৩ বেলার আহার
            </span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="p-space-md rounded-2xl bg-surface-container-low flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[28px]">
              support_agent
            </span>
          </div>
          <div>
            <span className="font-headline-sm text-headline-sm text-on-surface block font-mono">
              সহায়তা কেন্দ্র
            </span>
            <span className="font-body-sm text-body-sm text-secondary">
              +8801751699909
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionStatsBanner;
