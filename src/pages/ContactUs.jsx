import React from "react";
import ContactPayloadProvider from "../features/contactus/providers/ContactPayloadProvider";
import PageTitle from "../utils/PageTitle";
import ContactUsLeftDiv from "../features/contactus/components/ContactUsLeftDiv";
import ContactUsRightDiv from "../features/contactus/components/ContactUsRightDiv";
import FieldErrorProvider from "../features/contactus/providers/FieldErrorProvider";

const ContactUs = () => {
  return (
    <>
      <PageTitle key={"contactPage"} title={"Contact"} />
      <div className="max-w-[1144px] w-[95%] mx-auto py-8">
        <h2 className="text-2xl font-bold text-center mb-6">যোগাযোগ করুন</h2>
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8">
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
