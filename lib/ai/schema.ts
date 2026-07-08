import { z } from 'zod';

export const TriageSchema = z.object({
  category: z.enum(['Billing', 'Technical', 'Sales']),
  urgency_score: z.number().min(1).max(5),
  summary: z.string(),
  is_login_issue: z.boolean(),
  suggested_reply: z.string(),
});

export type TriageResult = z.infer<typeof TriageSchema>;
