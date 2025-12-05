// src/features/contactus/components/ContactUsRightDiv.jsx
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import contactFormSchema from "../../../schemas/contact.schemas";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";
import contactUsService from "../services/contactus.service";
import ContactUsForm from "./ContactUsForm";

const ContactUsRightDiv = () => {
  const { setFieldError, resetFieldErrors } = useFieldError();
  const { payload, reset: resetPayload } = useContactPayload();

  const { mutate: submitForm, isPending } = useMutation({
    mutationKey: ["contactMessage"],
    mutationFn: contactUsService.contactUsPostService,
    onSuccess: (res) => {
      resetPayload();
      toast.success(res?.data?.message || "বার্তা সফলভাবে পাঠানো হয়েছে!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "একটি সমস্যা হয়েছে!");
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
    <div className="w-full lg:w-1/2">
      <ContactUsForm handleSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export default ContactUsRightDiv;
