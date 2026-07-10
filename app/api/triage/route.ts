import { triageMessage } from '@/lib/ai/triage';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const triageData = await triageMessage(message);
    return NextResponse.json(triageData);
  } catch (error) {
    return NextResponse.json({ error: 'Triage failed' }, { status: 500 });
  }
}
