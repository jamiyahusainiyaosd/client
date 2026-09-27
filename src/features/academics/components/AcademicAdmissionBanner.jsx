import { Link } from "react-router-dom";

const AcademicAdmissionBanner = () => {
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="relative bg-on-secondary-fixed text-surface-container-lowest rounded-3xl p-space-xl overflow-hidden shadow-2xl">
          {/* Subtle Decorative Background Spheres */}
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-tertiary/20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl flex flex-col gap-space-md">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 text-primary-fixed font-label-md text-label-md w-fit">
              <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
              নতুন শিক্ষাবর্ষে ভর্তি চলছে
            </span>

            <h2 className="font-headline-lg text-headline-lg text-surface-container-lowest leading-tight">
              আপনার সন্তানকে দ্বীনি ও আদর্শ শিক্ষায় গড়ে তুলতে চান?
            </h2>

            <p className="font-body-lg text-body-lg text-surface-variant leading-relaxed">
              নূরানী শিশু শ্রেণি থেকে শুরু করে উচ্চতর ফযিলত জামাত পর্যন্ত সীমিত আসনে ভর্তি কার্যক্রম চলমান রয়েছে। আজই অনলাইন আবেদন সম্পন্ন করুন অথবা বিস্তারিত পাঠ্যক্রম সিলেবাস সংগ্রহ করুন।
            </p>

            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <Link
                className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:bg-primary transition-all font-label-lg text-label-lg px-space-lg py-3 rounded-xl shadow-md cursor-pointer"
                to="/admission"
              >
                <span className="material-symbols-outlined text-[20px]">edit_document</span>
                <span>ভর্তি আবেদন করুন</span>
              </Link>
              <a
                className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-label-lg text-label-lg px-space-lg py-3 rounded-xl transition-colors cursor-pointer"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
                <span>সিলেবাস ও পাঠ্যসূচি ডাউনলোড</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicAdmissionBanner;
