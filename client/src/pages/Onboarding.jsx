import React, { useState } from 'react';

const INDUSTRIES = ['SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Other'];
const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Germany', 'India'];

export default function Onboarding() {
  const [industry, setIndustry] = useState('SaaS');
  const [country, setCountry] = useState('United States');
  const [features, setFeatures] = useState({ data: false, payments: false, analytics: false });

  const toggleFeature = (key) => {
    setFeatures((f) => ({ ...f, [key]: !f[key] }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    // Placeholder: proceed to dashboard or next step
    console.log('Onboarding submitted', { industry, country, features });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">Tell us about your startup</h2>
          <p className="text-sm text-slate-500 mt-1">This helps us tailor the compliance assessment to your business.</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-slate-800">Company profile</h3>
                <p className="text-sm text-slate-500">Step 1 of 1</p>
              </div>
              <div className="w-48 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Industry</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {INDUSTRIES.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <fieldset>
              <legend className="text-sm font-medium text-slate-700">Features you use</legend>
              <div className="mt-3 space-y-2">
                <label className="inline-flex items-center space-x-3">
                  <input type="checkbox" checked={features.data} onChange={() => toggleFeature('data')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Collects user data (forms, profiles)</span>
                </label>

                <label className="inline-flex items-center space-x-3">
                  <input type="checkbox" checked={features.payments} onChange={() => toggleFeature('payments')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Payments or billing</span>
                </label>

                <label className="inline-flex items-center space-x-3">
                  <input type="checkbox" checked={features.analytics} onChange={() => toggleFeature('analytics')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-700">Analytics / tracking</span>
                </label>
              </div>
            </fieldset>

            <div className="pt-4 border-t border-gray-100">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-650 text-white px-4 py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
