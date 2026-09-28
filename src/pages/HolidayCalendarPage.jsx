import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../utils/PageTitle";
import HolidayHero from "../features/holiday/components/HolidayHero";
import HolidayTable from "../features/holiday/components/HolidayTable";
import holidayService from "../features/holiday/services/holiday.services";

const HolidayCalendarPage = () => {
  const [activeYear, setActiveYear] = useState("2025-2026");

  const { data: allHolidays } = useQuery({
    queryKey: ["holidays", activeYear],
    queryFn: () => holidayService.getAllHolidays(activeYear),
    staleTime: 1000 * 60 * 5,
  });

  const totalHolidays = Array.isArray(allHolidays)
    ? allHolidays.length
    : allHolidays?.results?.length || 15;

  return (
    <>
      <PageTitle title="বার্ষিক ছুটির তালিকা ও শিক্ষাপঞ্জিকা | জামিয়া হুসাইনিয়া মাদ্রাসা" />
      <main className="w-full pt-[132px] sm:pt-[100px] lg:pt-[106px] bg-[#f1f3ff] min-h-screen flex flex-col">
        {/* Top Hero Section */}
        <HolidayHero
          activeYear={activeYear}
          onSelectYear={setActiveYear}
          totalHolidays={totalHolidays}
        />

        {/* Main Body Section */}
        <section className="w-full bg-white py-8 sm:py-12 flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HolidayTable activeYear={activeYear} />
          </div>
        </section>
      </main>
    </>
  );
};

export default HolidayCalendarPage;
