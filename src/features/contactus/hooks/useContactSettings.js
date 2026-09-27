import { useQuery } from "@tanstack/react-query";
import { themeService } from "../../../services/theme.service";

export const DEFAULT_CONTACT_SETTINGS = {
  primary_phone: "+8801751699909",
  primary_phone_label: "মাদরাসা অফিস ও তথ্য হেল্পলাইন",
  secondary_phone: "",
  secondary_phone_label: "জরুরি যোগাযোগ",
  whatsapp_number: "+8801751699909",
  whatsapp_label: "হোয়াটসঅ্যাপ হেল্পলাইন",
  bkash_number: "01751699909",
  bkash_type: "personal",
  bkash_type_display: "পার্সোনাল (Personal)",
  nagad_number: "",
  nagad_type: "personal",
  nagad_type_display: "পার্সোনাল (Personal)",
  rocket_number: "",
  rocket_type: "personal",
  rocket_type_display: "পার্সোনাল (Personal)",
  primary_email: "jamiyahusainiya1@gmail.com",
  primary_email_label: "সাধারণ তথ্য ও অফিশিয়াল যোগাযোগ",
  secondary_email: "",
  secondary_email_label: "ভর্তি ও দাপ্তরিক যোগাযোগ",
  address: "শায়েস্তাগঞ্জ - হবিগঞ্জ রোড, কুটিরগাঁও রোড সংলগ্ন, শায়েস্তাগঞ্জ, হবিগঞ্জ",
  office_hours: "প্রতিদিন সকাল ৯:০০ হতে আসর এবং আসর হতে মাগরিব পর্যন্ত অফিস খোলা থাকে।",
  google_maps_url: "https://maps.app.goo.gl/rNkJg8y8g",
  facebook_url: "https://facebook.com",
  youtube_url: "https://youtube.com",
};

export const useContactSettings = () => {
  const query = useQuery({
    queryKey: ["contactSettings"],
    queryFn: themeService.getContactSetting,
    staleTime: 1000 * 60 * 5,
  });

  const contactData = query.data ? { ...DEFAULT_CONTACT_SETTINGS, ...query.data } : DEFAULT_CONTACT_SETTINGS;

  return {
    ...query,
    contact: contactData,
  };
};

export default useContactSettings;
