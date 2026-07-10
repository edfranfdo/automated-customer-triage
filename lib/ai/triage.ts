import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

// Define the shape of our triage data
export const triageSchema = z.object({
  category: z.enum(['Billing', 'Technical', 'Sales']),
  urgency: z.number().min(1).max(5),
  summary: z.string(),
  suggested_reply: z.string(),
});

export async function triageMessage(message: string) {
  const result = await generateObject({
    model: openai('gpt-4o'),
    schema: triageSchema,
    system: `You are a customer support triage expert. 
             Analyze messages and categorize them accurately.
             Urgency 5 is for critical blockers like account lockouts or outages.`,
    prompt: message,
  });

  return result.object;
}
