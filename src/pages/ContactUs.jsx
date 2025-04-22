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
      <div className="max-w-6xl w-[95%] mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-300">যোগাযোগ করুন</h2>
        <div className="flex flex-col items-center lg:flex-row gap-8">
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