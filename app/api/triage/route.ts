import { processTriage } from '@/lib/ai/engine';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const result = await processTriage(message);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: "Failed to process triage" }, { status: 500 });
  }
}
