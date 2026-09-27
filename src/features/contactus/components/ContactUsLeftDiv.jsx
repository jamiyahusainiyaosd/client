import React from "react";
import ContactMap from "./ContactMap";
import ContactDirectCards from "./ContactDirectCards";

const ContactUsLeftDiv = () => {
  return (
    <section
      className="w-full lg:col-span-6 space-y-6"
      data-purpose="map-and-direct-details"
    >
      <ContactMap />
      <ContactDirectCards />
    </section>
  );
};

export default ContactUsLeftDiv;