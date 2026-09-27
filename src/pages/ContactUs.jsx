import React from "react";
import ContactPayloadProvider from "../features/contactus/providers/ContactPayloadProvider";
import FieldErrorProvider from "../features/contactus/providers/FieldErrorProvider";
import PageTitle from "../utils/PageTitle";
import ContactHero from "../features/contactus/components/ContactHero";
import ContactUsLeftDiv from "../features/contactus/components/ContactUsLeftDiv";
import ContactUsRightDiv from "../features/contactus/components/ContactUsRightDiv";

const ContactUs = () => {
  return (
    <>
      <PageTitle title="যোগাযোগ | জামিয়া হুসাইনিয়া মাদ্রাসা" />

      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        {/* Section 1: Hero Area (#f1f3ff) */}
        <ContactHero />

        {/* Section 2: Main Body Area (bg-white) */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Two-Column Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <ContactUsLeftDiv />
              <ContactPayloadProvider>
                <FieldErrorProvider>
                  <ContactUsRightDiv />
                </FieldErrorProvider>
              </ContactPayloadProvider>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ContactUs;