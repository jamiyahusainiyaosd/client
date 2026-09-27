import React from "react";
import PageTitle from "../utils/PageTitle";
import AllDonors from "../features/expatriateGrant/components/AllDonors";

const ExpatriateGrantsPage = () => {
  return (
    <>
      <PageTitle title="আমাদের সম্মানিত প্রবাসী অনুদান দাতাগণ | জামিয়া হুসাইনিয়া মাদ্রাসা, শায়েস্তাগঞ্জ" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        <AllDonors />
      </main>
    </>
  );
};

export default ExpatriateGrantsPage;