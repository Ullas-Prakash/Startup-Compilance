import React from 'react';
import { useEffect } from "react";

const actions = [
  { id: 1, title: 'Privacy Policy', desc: 'Add a clear privacy policy describing data processing and retention.', status: 'Needed' },
  { id: 2, title: 'Data Processing Agreement', desc: 'Prepare DPA for vendors processing customer data.', status: 'Pending' },
  { id: 3, title: 'Cookie Consent', desc: 'Implement cookie banner and consent management.', status: 'Needed' },
  { id: 4, title: 'Security Assessment', desc: 'Schedule a basic security review and logging.', status: 'Completed' },
];

export default function Dashboard() {
  // Placeholder static risk score; in a real app this would be computed

  //test during frontend-backend linking
  useEffect(() => {
    fetch("http://localhost:8000/api/health")
      .then(res => res.json())
      .then(data => console.log("Backend says:", data))
      .catch(err => console.error(err));
  }, []);

  const score = 68; // out of 100
  const riskLevel = score >= 75 ? 'High' : score >= 40 ? 'Medium' : 'Low';

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">ComplianceIQ Dashboard</h1>
          <p className="text-sm text-slate-500">Overview of your startup’s legal and compliance posture</p>
        </div>
        <div className="text-sm text-slate-600">Welcome back</div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-1 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-medium text-slate-600">Overall risk</h2>
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-white border border-gray-100">
              <span className="text-3xl font-bold text-slate-800">{score}</span>
            </div>
            <div>
              <div className="text-sm text-slate-500">Risk level</div>
              <div className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${riskLevel === 'High' ? 'bg-red-100 text-red-700' : riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                {riskLevel}
              </div>
              <p className="mt-3 text-sm text-slate-500">This score is a static placeholder. Connect real data to evaluate dynamically.</p>
            </div>
          </div>
        </section>

        <section className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-slate-800">Recommended compliance actions</h3>
            <div className="text-sm text-slate-500">Priority based on score</div>
          </div>

          <div className="mt-4 space-y-3">
            {actions.map((a) => (
              <article key={a.id} className="p-4 rounded-md border border-gray-100 flex items-start justify-between bg-white">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">{a.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{a.desc}</p>
                </div>
                <div className="ml-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${a.status === 'Completed' ? 'bg-green-100 text-green-700' : a.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{a.status}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
