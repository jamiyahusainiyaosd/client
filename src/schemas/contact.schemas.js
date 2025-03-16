import { z } from 'zod';

const contactFormSchema = z.object({
  name: z
    .string()
    .nonempty("আপনার নামটি ফিলাপ করুন"), 
  email: z
    .string()
    .nonempty("আপনার ইমেইল ফিলাপ করুন") 
    .email("আপনার ইমেজইল টি ভুল, আবার সঠিক ইমেইল দিয়ে চেষ্টা করুন"), 
  phone: z
    .string()
    .nonempty("১১ ডিজিটের আপনার ফোন নাম্বার দিন") 
    .regex(/^\d{11}$/, "ভুল ফোন নাম্বার (১১ ডিজিটের নাম্বার দিন)"), 
  message: z
    .string()
    .nonempty("মেসেজ বক্স খালি রাখা যাবে না")
});

export default contactFormSchema