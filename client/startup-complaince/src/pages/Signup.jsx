import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name) e.name = 'Full name is required';
    if (!email) e.email = 'Email is required';
    if (!password) e.password = 'Password is required';
    if (password && password.length < 8) e.password = 'Use at least 8 characters';
    if (password !== confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    // Placeholder for signup action
    console.log('Signup submit', { name, email });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md ring-1 ring-gray-100 p-6">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-slate-800">Create account</h1>
          <p className="text-sm text-slate-500 mt-1">Start your compliance assessment with ComplianceIQ</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.name && <small className="text-red-500">{errors.name}</small>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.email && <small className="text-red-500">{errors.email}</small>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.password && <small className="text-red-500">{errors.password}</small>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Confirm password</span>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.confirm && <small className="text-red-500">{errors.confirm}</small>}
            </label>

            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-650 text-white px-4 py-2 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Create account
            </button>

            <div className="text-center text-sm text-slate-600">
              <span>Already have an account? </span>
              <Link to="/login" className="text-blue-600 underline">Log in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
