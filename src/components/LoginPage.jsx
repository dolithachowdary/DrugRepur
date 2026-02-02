import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dna, Lock, Mail, ArrowRight, User, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call with dummy credentials
    setTimeout(() => {
      if (formData.email === 'admin@gmail.com' && formData.password === '123456') {
        onLogin();
      } else {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-3/5 bg-[#f8fafc] relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#e2e8f0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotGrid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Dna className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">DrugRepur AI</span>
            </div>

            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-6">
              Accelerating Drug Discovery with <span className="text-blue-600">Intelligence.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Our advanced AI platform helps researchers identify new therapeutic uses for existing drugs, significantly reducing time and costs in the drug development pipeline.
            </p>

            <div className="space-y-4">
              {[
                "AI-driven predictive modeling",
                "Extensive chemical library access",
                "Real-time analysis & reporting",
                "Secure collaborative workspace"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Right Side - Forms */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-8 sm:px-16 lg:px-12 xl:px-20 py-12 bg-white relative">
        <div className="max-w-md w-full mx-auto">
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">DrugRepur AI</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-slate-500">
              {isLogin
                ? 'Please enter your details to access your account.'
                : 'Join our research community and start discovering.'}
            </p>
          </div>

          {/* Toggle Tab */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8 relative">
            <motion.div
              className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm z-0"
              initial={false}
              animate={{
                left: isLogin ? '4px' : '50%',
                right: isLogin ? '50%' : '4px'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg z-1 relative transition-colors ${isLogin ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg z-1 relative transition-colors ${!isLogin ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign Up
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-slate-700 font-semibold text-sm">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="fullName"
                        placeholder="Dr. Sarah Johnson"
                        className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all rounded-xl"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700 font-semibold text-sm">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="sarah.j@research.org"
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all rounded-xl"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-700 font-semibold text-sm">Password</Label>
                    {isLogin && (
                      <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 transition-all rounded-xl"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all disabled:opacity-70 mt-4 overflow-hidden relative group"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>{isLogin ? 'Sign In to Account' : 'Create Research Account'}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-6">
            <p className="text-sm text-slate-500 text-center">
              &copy; 2024 DrugRepur Intelligence Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
