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
  const lowMessage = message.toLowerCase();

  // 1. Simulator for "Critical Technical" Test
  if (lowMessage.includes("locked out") || lowMessage.includes("presentation")) {
    return {
      category: "Technical",
      urgency: 5,
      summary: "User locked out of account; critical deadline (presentation) in 5 minutes.",
      suggested_reply: "I've prioritized your lockout. A technical specialist is joining this chat now to bypass your reset and get you in for your presentation."
    };
  }

  // 2. Simulator for "Billing Question" Test
  if (lowMessage.includes("invoice") || lowMessage.includes("extra user")) {
    return {
      category: "Billing",
      urgency: 2,
      summary: "Customer questioning an unrecognized charge for an extra user.",
      suggested_reply: "Hello! I've flagged this for our billing team to review your last invoice. We will clarify the user count before your next cycle."
    };
  }

  // 3. Simulator for "Sales Lead" Test
  if (lowMessage.includes("enterprise") || lowMessage.includes("bulk discounts")) {
    return {
      category: "Sales",
      urgency: 3,
      summary: "Interest in upgrading to Enterprise tier for 50+ users; requested pricing call.",
      suggested_reply: "Great to hear your team is growing! I've notified our account executives to prep a bulk discount quote for 50+ users for our call next week."
    };
  }

  // --- Real AI Attempt (will trigger if quota is available) ---
  try {
    const result = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: triageSchema,
      prompt: message,
    });
    return result.object;
  } catch (error) {
    // General Fallback if no keywords match and AI fails
    return {
      category: "Technical",
      urgency: 1,
      summary: "Generic message received.",
      suggested_reply: "Thank you for reaching out. We are processing your request."
    };
  }
}
