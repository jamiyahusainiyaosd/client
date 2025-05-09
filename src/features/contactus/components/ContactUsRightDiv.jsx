import React from "react";
import ContactUsForm from "./ContactUsForm";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import contactUsService from "../services/contactus.service";
import useContactPayload from "../hooks/useContactPayload";
import useFieldError from "../hooks/UseFieldError";
import contactFormSchema from "../../../schemas/contact.schemas";

const ContactUsRightDiv = () => {
  const { payload } = useContactPayload();
  const { setFieldError, resetFieldErrors } = useFieldError();
  
  const { mutate, isPending } = useMutation({
    mutationKey: ["contactMessage"],
    mutationFn: contactUsService.contactUsPostService,
    onSuccess: (data) => {
      toast.success(data?.data?.message, {
        style: {
          background: 'black',
          color: 'white',
          border: '1px solid #333'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      });
    },
    onError: (error) => {
      toast.error(error?.message || "একটি সমস্যা হয়েছে!", {
        style: {
          background: 'black',
          color: 'white',
          border: '1px solid #333'
        },
        iconTheme: {
          primary: 'white',
          secondary: 'black'
        }
      });
    },
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    resetFieldErrors();
    const fieldErrorsResult = contactFormSchema.safeParse(payload);
    if (!fieldErrorsResult.success) {
      const formatErrors = fieldErrorsResult.error.format();
      Object.entries(formatErrors)
        .filter(([key]) => key !== "_errors")
        .map(([field, value]) => {
          let message = "";
          if (Array.isArray(value)) {
            message = value[0];
          } else if (value?._errors) {
            message = value._errors[0];
          }
          setFieldError(field, message);
        });
      return;
    }
    mutate(payload);
  };
  
  return (
    <div className="w-full lg:w-1/2">
      <Toaster 
        containerClassName="contactPageToaster" 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'black',
            color: 'white',
            border: '1px solid #333',
            padding: '16px',
            borderRadius: '12px'
          }
        }}
      />
      <ContactUsForm handleSubmit={handleSubmit} isPending={isPending} />
    </div>
  );
};

export default ContactUsRightDiv;