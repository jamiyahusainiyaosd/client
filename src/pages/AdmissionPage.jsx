import React from "react";
import PageTitle from "../utils/PageTitle";
import AllAdmissions from "../features/admission/components/AllAdmissions";

const AdmissionPage = () => {
  return (
    <>
      <PageTitle title="ভর্তি আবেদন ও নির্দেশনা | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <AllAdmissions />
      </main>
    </>
  );
};

export default AdmissionPage;