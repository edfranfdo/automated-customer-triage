import { triageMessage } from '../../../lib/ai/triage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    console.log("Receiving message:", message); // Check terminal

    const triageData = await triageMessage(message);
    console.log("AI Response:", triageData); // Check terminal
    
    return NextResponse.json(triageData);
  } catch (error: any) {
    console.error("Triage Error:", error);
    return NextResponse.json({ error: error.message || 'Triage failed' }, { status: 500 });
  }
}
