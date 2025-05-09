import React from "react";
import ContactPayloadProvider from "../features/contactus/providers/ContactPayloadProvider";
import PageTitle from "../utils/PageTitle";
import ContactUsLeftDiv from "../features/contactus/components/ContactUsLeftDiv";
import ContactUsRightDiv from "../features/contactus/components/ContactUsRightDiv";
import FieldErrorProvider from "../features/contactus/providers/FieldErrorProvider";

const ContactUs = () => {
  return (
    <>
      <PageTitle title="যোগাযোগ" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-36">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
            <span className="relative">আমাদের সাথে যোগাযোগ করুন</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            আপনার যেকোনো প্রশ্ন বা মতামত আমাদের সাথে শেয়ার করুন। আমরা দ্রুততম
            সময়ে আপনার সাথে যোগাযোগ করব।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <ContactUsLeftDiv />
          <ContactPayloadProvider>
            <FieldErrorProvider>
              <ContactUsRightDiv />
            </FieldErrorProvider>
          </ContactPayloadProvider>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
