import { z } from 'zod';

// ============================================================
// Grievance Form Schema — Zod Validation
// Path: src/schema/grievanceSchema.ts
//
// This schema validates all fields of the grievance submission
// form. Error messages are written in plain, friendly language
// suitable for non-technical / elderly users.
// ============================================================

export const grievanceSchema = z.object({
  // Required: title (min 5 chars, max 100 chars)
  title: z
    .string()
    .min(1, { message: 'Please write a short title for your grievance.' })
    .min(5, { message: 'Title should be at least 5 characters long.' })
    .max(100, { message: 'Title should be concise (max 100 characters).' }),

  // Required: description (min 10 chars, max 1000 chars)
  description: z
    .string()
    .min(1, { message: 'Please describe your grievance in detail.' })
    .min(10, { message: 'Please provide more detail (at least 10 characters).' })
    .max(1000, { message: 'Description is too long. Please keep it under 1000 characters.' }),

  // Required: full name (min 3 chars)
  fullName: z
    .string()
    .min(1, { message: 'Please enter your full name.' })
    .min(3, { message: 'Full name should be at least 3 characters.' })
    .max(50, { message: 'Full name should not exceed 50 characters.' }),

  // Required: valid email address
  email: z
    .string()
    .min(1, { message: 'Please enter your email address.' })
    .email({ message: 'Email format is incorrect. Example: name@email.com' }),

  // Optional: phone number (10-15 digits)
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]{10,15}$/.test(val), {
      message: 'Please enter a valid phone number (at least 10 digits).',
    }),

  // Required: category selection
  category: z.enum(['Complaint', 'Feedback', 'Suggestion'], {
    message: 'Please select a category: Complaint, Feedback, or Suggestion.',
  }),

  // Required: priority selection
  priority: z.enum(['Low', 'Medium', 'High'], {
    message: 'Please select a priority: Low, Medium, or High.',
  }),
});

// TypeScript type inferred from the schema
export type GrievanceSchemaType = z.infer<typeof grievanceSchema>;

// ============================================================
// Alias exports — the form uses `subject` instead of `title`
// to match the internal data model. This adapter maps them.
// ============================================================
export const grievanceFormSchema = grievanceSchema.extend({
  subject: z
    .string()
    .min(1, { message: 'Please write a short subject for your grievance.' })
    .min(5, { message: 'Subject should be at least 5 characters.' })
    .max(100, { message: 'Subject should be concise (max 100 characters).' }),
}).omit({ title: true });

export type GrievanceFormSchemaType = z.infer<typeof grievanceFormSchema>;
