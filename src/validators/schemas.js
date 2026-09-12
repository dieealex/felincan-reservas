import { z } from "zod";

export const serviceCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  duration: z.number().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
  available: z.boolean()
});

export const serviceUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  duration: z.number().min(1).optional(),
  price: z.number().min(0).optional(),
  category: z.string().min(1).optional(),
  available: z.boolean().optional()
});

export const bookingCreateSchema = z.object({
  clientName: z.string().min(1),
  clientEmail: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  status: z.string().min(1)
});

export const addServiceSchema = z.object({
  bid: z.string().length(24),
  sid: z.string().length(24)
});
