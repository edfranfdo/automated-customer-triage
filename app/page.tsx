'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTriage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Triage request failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-8 md:p-12 lg:p-24 text-black">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            AI Support Triage
          </h1>
          <p className="text-slate-500">
            Paste incoming customer messages to analyze intent and urgency instantly.
          </p>
        </div>

        {/* Input Section */}
        <div className="space-y-4">
          <textarea 
            className="w-full p-4 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none min-h-[150px] text-slate-700"
            placeholder="Example: My account is locked and I have a presentation in 5 minutes!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            onClick={handleTriage}
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Analyze Message'}
          </button>
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Result Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Category:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    result.category === 'Technical' ? 'bg-purple-100 text-purple-700' :
                    result.category === 'Billing' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {result.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Urgency:</span>
                  <span className={`text-lg font-black ${
                    result.urgency >= 4 ? 'text-red-600' : 
                    result.urgency >= 3 ? 'text-orange-500' : 
                    'text-green-600'
                  }`}>
                    {result.urgency}/5
                  </span>
                </div>
              </div>

              {/* Result Body */}
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">AI Summary</h3>
                  <p className="text-slate-700 leading-relaxed italic border-l-4 border-slate-300 pl-4 py-1">
                    "{result.summary}"
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Drafted Response</h3>
                  <div className="bg-white border border-slate-200 p-4 rounded-xl text-slate-800 leading-relaxed shadow-inner">
                    {result.suggested_reply}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
