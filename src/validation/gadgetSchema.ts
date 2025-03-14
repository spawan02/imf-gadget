import { z } from 'zod';

export const gadgetSchema = z.object({
  name: z.string().optional(),
  status: z.enum(['Available', 'Deployed', 'Destroyed', 'Decommissioned']),
});



export const statusSchema = z.object({
  status: z.enum(["Available", "Deployed", "Destroyed", "Decommissioned"]),
});

export const uuidValidator = z.object({
  id:z.string().uuid()
})
