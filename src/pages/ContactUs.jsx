// src/pages/ContactUs.jsx
import ContactPayloadProvider from "../features/contactus/providers/ContactPayloadProvider";
import PageTitle from "../utils/PageTitle";
import ContactUsLeftDiv from "../features/contactus/components/ContactUsLeftDiv";
import ContactUsRightDiv from "../features/contactus/components/ContactUsRightDiv";
import FieldErrorProvider from "../features/contactus/providers/FieldErrorProvider";

const ContactUs = () => {
  return (
    <>
      <PageTitle title="যোগাযোগ" />

      <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 
        dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pb-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36">
          
          {/* Header */}
          <div className="text-center mb-16">
            
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 
              text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              আমাদের সাথে যোগাযোগ
            </div>

            <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight 
              text-slate-900 dark:text-slate-50">
              আপনার{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 
              bg-clip-text text-transparent">
                মতামত ও প্রশ্ন
              </span>{" "}
              আমাদের জন্য গুরুত্বপূর্ণ
            </h1>

            <p className="mt-3 text-sm md:text-base text-slate-600 dark:text-slate-300 
              max-w-2xl mx-auto">
              আপনি যেকোনো প্রশ্ন, মতামত বা পরামর্শ শেয়ার করতে পারেন। আমাদের টিম দ্রুতই আপনার সাথে যোগাযোগ করবে।
            </p>

            <div className="mt-5 h-1 w-24 bg-gradient-to-r from-emerald-500 to-emerald-300 
              mx-auto rounded-full"></div>
          </div>

          {/* Contact Form Section */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <ContactUsLeftDiv />
            <ContactPayloadProvider>
              <FieldErrorProvider>
                <ContactUsRightDiv />
              </FieldErrorProvider>
            </ContactPayloadProvider>
          </div>

        </div>
      </main>
    </>
  );
};

export default ContactUs;
