'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTriage = async () => {
    setLoading(true);
    const res = await fetch('/api/triage', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Customer Triage Dashboard</h1>
      <textarea 
        className="w-full p-4 border rounded-lg text-black"
        placeholder="Paste customer message here..."
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        onClick={handleTriage}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Run Triage'}
      </button>

      {result && (
        <div className="p-6 bg-gray-100 rounded-xl space-y-3 border-l-4 border-red-500">
          <div className="flex justify-between">
            <span className="font-bold">Category: {result.category}</span>
            <span className="text-red-600 font-black">Urgency: {result.urgency}/5</span>
          </div>
          <p className="italic text-gray-700">"{result.summary}"</p>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-bold text-sm mb-2 text-blue-600">Drafted Response:</h4>
            <p>{result.suggested_reply}</p>
          </div>
        </div>
      )}
    </main>
  );
}
