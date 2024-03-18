import { z } from "zod";

const step1Schema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid phone number."),
});

export type Step1State = z.infer<typeof step1Schema>;

export default step1Schema;
