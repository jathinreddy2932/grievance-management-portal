import { z } from 'zod';

// Friendly, polite validation schema geared towards non-technical or elderly users.
// Avoid terms like "invalid string format" or "required field".
export const grievanceFormSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Please enter your full name.' })
    .min(3, { message: 'Full name should be at least 3 letters long.' })
    .max(50, { message: 'Full name should not exceed 50 letters.' }),
  
  email: z
    .string()
    .min(1, { message: 'Please enter your email address so we can contact you.' })
    .email({ message: 'The email address format does not look right. (Example: name@email.com)' }),
  
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9+\-\s()]{10,15}$/.test(val), {
      message: 'Please enter a valid phone number (at least 10 digits).',
    }),
  
  subject: z
    .string()
    .min(1, { message: 'Please write a short subject or title for your grievance.' })
    .min(5, { message: 'Subject should have at least 5 characters.' })
    .max(100, { message: 'Subject should be concise (max 100 characters).' }),
  
  category: z.enum(['Complaint', 'Feedback', 'Suggestion'], {
    message: 'Please choose one of the options: Complaint, Feedback, or Suggestion.',
  }),
  
  priority: z.enum(['Low', 'Medium', 'High'], {
    message: 'Please choose a priority: Low, Medium, or High.',
  }),
  
  description: z
    .string()
    .min(1, { message: 'Please describe your grievance or feedback in detail.' })
    .min(10, { message: 'Please provide a bit more detail (at least 10 characters).' })
    .max(1000, { message: 'Description is too long. Please limit to 1000 characters.' }),
});

export type GrievanceFormData = z.infer<typeof grievanceFormSchema>;
