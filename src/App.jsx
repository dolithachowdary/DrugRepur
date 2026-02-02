import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/toaster';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('drugRepurposingAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('drugRepurposingAuth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('drugRepurposingAuth');
    setIsAuthenticated(false);
  };

  return (
    <>
      <Helmet>
        <title>DrugRepur - AI Drug Repurposing Platform</title>
        <meta name="description" content="DrugRepur - An advanced AI-powered platform for drug repurposing research. Discover existing drugs with potential for treating new diseases through intelligent analysis." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoginPage onLogin={handleLogin} />
            </motion.div>
          ) : (
            <motion.div
              key="authenticated"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MainLayout onLogout={handleLogout} />
            </motion.div>
          )}
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
}

export default App;