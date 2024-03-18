import { z } from "zod";

const step3Schema = z.object({
  onlineStore: z.boolean().optional(),
  largerStorage: z.boolean().optional(),
  customizableProfile: z.boolean().optional(),
});

export type Step3State = z.infer<typeof step3Schema>;

export default step3Schema;
