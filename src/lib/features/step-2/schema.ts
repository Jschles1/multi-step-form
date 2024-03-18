import { z } from "zod";

const step2Schema = z.object({
  plan: z.enum(["arcade", "advanced", "pro"]),
  billingType: z.enum(["monthly", "yearly"]),
});

export type Step2State = z.infer<typeof step2Schema>;

export default step2Schema;
