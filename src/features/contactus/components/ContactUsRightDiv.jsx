import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import contactFormSchema from "../../../schemas/contact.schemas";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";
import contactUsService from "../services/contactus.service";
import ContactFormCard from "./ContactFormCard";

const ContactUsRightDiv = () => {
  const { setFieldError, resetFieldErrors } = useFieldError();
  const { payload, reset: resetPayload } = useContactPayload();

  const { mutate: submitForm, isPending } = useMutation({
    mutationKey: ["contactMessage"],
    mutationFn: contactUsService.contactUsPostService,
    onSuccess: (res) => {
      resetPayload();
      toast.success(
        res?.data?.message || "ধন্যবাদ! আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে।"
      );
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          "বার্তা পাঠাতে সমস্যা হয়েছে, আবার চেষ্টা করুন!"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetFieldErrors();

    const validation = contactFormSchema.safeParse(payload);
    if (!validation.success) {
      const { fieldErrors } = validation.error.flatten();
      Object.entries(fieldErrors).forEach(([field, [msg]]) =>
        setFieldError(field, msg)
      );
      return;
    }

    submitForm(payload);
  };

  return (
    <section
      className="w-full lg:col-span-6"
      data-purpose="contact-form-container"
    >
      <ContactFormCard handleSubmit={handleSubmit} isPending={isPending} />
    </section>
  );
};

export default ContactUsRightDiv;