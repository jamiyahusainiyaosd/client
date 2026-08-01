import ContactPayloadProvider from "../features/contactus/providers/ContactPayloadProvider";
import PageTitle from "../utils/PageTitle";
import ContactUsLeftDiv from "../features/contactus/components/ContactUsLeftDiv";
import ContactUsRightDiv from "../features/contactus/components/ContactUsRightDiv";
import FieldErrorProvider from "../features/contactus/providers/FieldErrorProvider";

const ContactUs = () => {
  return (
    <>
      <PageTitle title="যোগাযোগ" />

      <main className="min-h-screen bg-slate-50  pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 md:pt-40">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600 ">
                আমাদের সাথে যোগাযোগ
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 ">
              আপনার মতামত ও প্রশ্ন{" "}
              <span className="text-emerald-600 ">
                আমাদের জন্য গুরুত্বপূর্ণ
              </span>
            </h1>
            <p className="mt-2 text-sm text-slate-500  max-w-xl leading-relaxed">
              আপনি যেকোনো প্রশ্ন, মতামত বা পরামর্শ শেয়ার করতে পারেন। আমাদের টিম দ্রুতই আপনার সাথে যোগাযোগ করবে।
            </p>
            <div className="mt-4 h-px w-full bg-slate-200 " />
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
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