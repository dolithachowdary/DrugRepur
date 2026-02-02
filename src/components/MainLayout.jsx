import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Search, Target, BarChart, TestTube, Dna, UploadCloud, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Dashboard from '../pages/Dashboard';
import DrugSearch from '../pages/DrugSearch';
import TargetAnalysis from '../pages/TargetAnalysis';
import RepurposingResults from '../pages/RepurposingResults';
import MolecularViewer from '../pages/MolecularViewer';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
  { name: 'Drug Search', icon: Search, component: DrugSearch },
  { name: 'Target Analysis', icon: Target, component: TargetAnalysis },
  { name: 'Repurposing Results', icon: BarChart, component: RepurposingResults },
  { name: 'Molecular Viewer', icon: TestTube, component: MolecularViewer },
];

const MainLayout = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const ActiveComponent = navItems.find(item => item.name === activeTab)?.component;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <Dna className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-gray-800">DrugRepur</span>
          <span className="text-gray-500 text-sm">Drug Repurposing Platform</span>
        </div>
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="Search drugs, targets, diseases..." className="pl-10 bg-gray-100" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="primary" onClick={onLogout}>
            <UploadCloud className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="ghost" size="icon" onClick={onLogout}>
            <LogOut className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col">
          <nav className="px-6 py-2 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              {navItems.map(item => (
                <Button
                  key={item.name}
                  variant={activeTab === item.name ? 'secondary' : 'ghost'}
                  onClick={() => setActiveTab(item.name)}
                  className="h-9"
                >
                  <item.icon className={`w-4 h-4 mr-2 ${activeTab === item.name ? 'text-blue-600' : 'text-gray-600'}`} />
                  {item.name}
                </Button>
              ))}
            </div>
          </nav>
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {ActiveComponent && <ActiveComponent />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;