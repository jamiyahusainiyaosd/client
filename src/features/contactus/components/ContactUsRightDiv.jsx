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

  const { mutate: submitContactForm, isPending } = useMutation({
    mutationKey: ["contactMessage"],
    mutationFn: (formData) => contactUsService.contactUsPostService(formData),
    onSuccess: (response) => {
      if (typeof resetPayload === "function") {
        resetPayload();
      }
      const successMessage =
        response?.data?.message ||
        response?.message ||
        "বার্তা সফলভাবে পাঠানো হয়েছে!";
      toast.success(successMessage);
    },
    onError: (error) => {
      console.error("Submission error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "একটি সমস্যা হয়েছে! দয়া করে আবার চেষ্টা করুন";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFieldErrors();

    try {
      const validationResult = contactFormSchema.safeParse(payload);
      if (!validationResult.success) {
        const { fieldErrors } = validationResult.error.flatten();
        Object.entries(fieldErrors).forEach(([field, [message]]) => {
          setFieldError(field, message);
        });
        return;
      }

      submitContactForm(payload);
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("একটি সমস্যা হয়েছে! দয়া করে আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <ContactUsForm handleSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export default ContactUsRightDiv;
