'use client';
import { useState } from 'react';
import { TriageResult } from '@/lib/ai/schema';

export default function Dashboard() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState<TriageResult[]>([]);

  const handleTriage = async () => {
    setLoading(true);
    const res = await fetch('/api/triage', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setTickets([data, ...tickets]);
    setInput('');
    setLoading(false);
  };

  return (
    <main className="max-w-4xl mx-auto p-8 font-sans">
      <h1 className="text-3xl font-bold mb-2">AI Feedback Triage</h1>
      <p className="text-gray-500 mb-8">Instantly categorize and prioritize customer feedback.</p>

      <div className="flex gap-2 mb-12">
        <input 
          className="flex-1 p-3 border rounded-lg shadow-sm"
          placeholder="Paste customer feedback here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={handleTriage}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Analyzing...' : 'Triage Message'}
        </button>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket, i) => (
          <div key={i} className="border rounded-xl p-6 shadow-sm bg-white border-l-8" 
               style={{ borderLeftColor: ticket.urgency_score >= 4 ? '#ef4444' : '#e5e7eb' }}>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {ticket.category}
              </span>
              <span className="text-gray-400 font-bold text-sm">Urgency: {ticket.urgency_score}/5</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{ticket.summary}</h3>
            <div className="bg-gray-50 p-4 rounded-lg italic text-gray-600 text-sm mb-4">
              "{ticket.suggested_reply}"
            </div>
            <button className="text-blue-600 text-sm font-semibold hover:underline">Apply Suggested Draft →</button>
          </div>
        ))}
      </div>
    </main>
  );
}
