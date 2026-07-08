import { openai } from '@ai-sdk/openai';
import { generateStructuredOutput } from 'ai';
import { TriageSchema, TriageResult } from './schema';

export async function processTriage(message: string): Promise<TriageResult> {
  const getContext = (msg: string) => {
    if (msg.toLowerCase().includes('login')) return "KB: Fix login issues by clearing cache or using Incognito.";
    if (msg.toLowerCase().includes('charge')) return "KB: Billing cycles start on the 1st. Refunds take 5 days.";
    return "KB: Follow standard professional protocol.";
  };

  const { object } = await generateStructuredOutput({
    model: openai('gpt-4o'),
    schema: TriageSchema,
    prompt: `You are a support triage expert. Use context to draft a reply.
             CONTEXT: ${getContext(message)}
             MESSAGE: "${message}"`,
  });

  return object;
}
