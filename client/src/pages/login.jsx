import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Github, Chrome } from "lucide-react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email is invalid";
    if (!password) e.password = "Password is required";
    if (password && password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSocialLogin = async (provider, providerName) => {
    setIsLoading(true);
    setErrors({});
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(`${providerName} login successful:`, result.user);
      login({
        name: result.user.displayName,
        email: result.user.email
      });

      navigate("/");

    } catch (error) {
      console.error(`${providerName} login error:`, error);
      if (error.code === "auth/popup-closed-by-user") {
        setErrors({ social: `${providerName} login window was closed. Please try again.` });
      } else {
        setErrors({ social: `${providerName} login failed. Please ensure your Firebase config is correct.` });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
       },
       body: JSON.stringify({ email, password })
     });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

    // Store user in global context
      login(data.user);

    // Redirect to Home
      navigate("/");

    } catch (error) {
      setErrors({ email: error.message });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none -z-10"></div>

      <div className="w-full max-w-[440px] z-10">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20 mb-4 transform hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Compliance<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">IQ</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium">Empowering Startups with Legal Intelligence</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-3xl border border-slate-800/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="px-8 pt-10 pb-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-500 text-sm">Please enter your details to sign in.</p>
            </div>

            {errors.social && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                {errors.social}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-slate-950/50 border ${errors.email ? "border-red-500/50" : "border-slate-800 group-hover:border-slate-700 focus:border-purple-500/50"
                      } text-white pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all duration-300 focus:ring-4 focus:ring-purple-500/10 placeholder:text-slate-600`}
                    placeholder="name@company.com"
                  />
                </div>
                {errors.email && <p className="text-xs text-red-400 font-medium mt-1 ml-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label htmlFor="password" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Password
                  </label>
                  <Link to="#" className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-slate-950/50 border ${errors.password ? "border-red-500/50" : "border-slate-800 group-hover:border-slate-700 focus:border-purple-500/50"
                      } text-white pl-11 pr-12 py-3.5 rounded-xl outline-none transition-all duration-300 focus:ring-4 focus:ring-purple-500/10 placeholder:text-slate-600`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-400 font-medium mt-1 ml-1">{errors.password}</p>}
              </div>

              <div className="flex items-center py-1">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" />
                    <div className="w-5 h-5 bg-slate-950/50 border border-slate-800 rounded-md group-hover:border-purple-500/50 transition-colors flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-purple-500 rounded-sm opacity-0 check-mark"></div>
                    </div>
                  </div>
                  <span className="ml-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors font-medium">Keep me signed in</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden py-4 rounded-xl font-bold text-white transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/50"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em] text-slate-600 bg-[#0b1120] px-4 -mt-[1px]">
                Or continue with
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleSocialLogin(googleProvider, "Google")}
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50"
              >
                <Chrome size={18} />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin(githubProvider, "GitHub")}
                disabled={isLoading}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-slate-950/50 border border-slate-800 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-300 text-white font-semibold text-sm disabled:opacity-50"
              >
                <Github size={18} />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          {/* Footer Link */}
          <div className="bg-slate-950/50 px-8 py-5 border-t border-slate-800/50 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New to ComplianceIQ?{" "}
              <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex justify-center space-x-6 mt-8 animate-in fade-in duration-1000 delay-500">
          <Link to="#" className="text-xs font-semibold text-slate-500 hover:text-slate-400 transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-xs font-semibold text-slate-500 hover:text-slate-400 transition-colors">Terms of Use</Link>
          <Link to="#" className="text-xs font-semibold text-slate-500 hover:text-slate-400 transition-colors">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}