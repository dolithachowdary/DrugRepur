import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Clock, CheckCircle, ChevronRight, Activity, Zap, Beaker, X } from 'lucide-react';

const FlowIcon = ({ className }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 12C4 12 7 12 9 12C11 12 13 14 13 16C13 18 15 20 17 20C19 20 20 20 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 12C4 12 7 12 9 12C11 12 13 10 13 8C13 6 15 4 17 4C19 4 20 4 20 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="4" cy="12" r="2.5" fill="currentColor" />
    <circle cx="20" cy="4" r="2.5" fill="currentColor" />
    <circle cx="20" cy="20" r="2.5" fill="currentColor" />
  </svg>
);

const Node = ({ label, sublabel, color, type, index }) => {
  const themes = {
    blue: "bg-blue-50/50 border-blue-400 text-blue-700 shadow-blue-100",
    purple: "bg-purple-50/50 border-purple-400 text-purple-700 shadow-purple-100",
    red: "bg-red-50/50 border-red-400 text-red-700 shadow-red-100",
    green: "bg-green-50/50 border-green-400 text-green-700 shadow-green-100",
    orange: "bg-orange-50/50 border-orange-400 text-orange-700 shadow-orange-100",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`relative px-6 py-4 rounded-[1.5rem] border-2 flex flex-col items-center justify-center min-w-[160px] shadow-lg h-[90px] z-10 bg-white/80 backdrop-blur-sm ${themes[color] || ''}`}
    >
      <div className="absolute top-2 left-4 flex items-center gap-1.5 opacity-40">
        <div className={`w-1.5 h-1.5 rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'purple' ? 'bg-purple-500' : color === 'red' ? 'bg-red-500' : color === 'green' ? 'bg-green-500' : 'bg-orange-500'}`} />
        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{type}</span>
      </div>
      <span className="font-extrabold text-sm text-center leading-tight mt-2">{label}</span>
      {sublabel && <span className="text-[10px] opacity-60 font-bold text-center mt-1">{sublabel}</span>}
    </motion.div>
  );
};

const FlowGraph = ({ result }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-10">
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="grid grid-cols-5 gap-4 items-center relative z-10 w-full max-w-6xl h-full py-12">

        {/* Level 1: Project */}
        <div className="flex justify-center">
          <Node label={result.from} type="Project" color="blue" index={0} />
        </div>

        {/* Level 2: Module */}
        <div className="flex justify-center">
          <Node label={result.drug} type="Structure" color="purple" index={1} />
        </div>

        {/* Level 3: Sprints */}
        <div className="flex flex-col gap-10 justify-center">
          <Node label="Target Protein" sublabel="Receptor Match" type="Sprint" color="red" index={2} />
          <Node label="Downstream" sublabel="Signaling Flow" type="Sprint" color="red" index={3} />
        </div>

        {/* Level 4: Goal */}
        <div className="flex justify-center">
          <Node label="Clinical Syn." type="Goal" color="green" index={4} />
        </div>

        {/* Level 5: Task */}
        <div className="flex justify-center">
          <Node label={result.to} type="Final Indication" color="orange" index={5} />
        </div>
      </div>

      {/* Connection Paths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path d="M 120, 300 L 280, 300" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 320, 300 C 380, 300 420, 180 480, 180" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 320, 300 C 380, 300 420, 420 480, 420" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 520, 180 C 580, 180 620, 300 680, 300" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 520, 420 C 580, 420 620, 300 680, 300" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <path d="M 720, 300 L 880, 300" stroke="#94a3b8" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
};

const results = [
  {
    id: 1,
    drug: 'Metformin',
    from: 'Type 2 Diabetes',
    to: "Alzheimer's",
    mechanism: 'AMPK activation → reduced tau phosphorylation',
    similarity: 94.0,
    successProb: 73,
    evidence: 'Phase II completed',
    risk: 'Low',
    timeline: '2-3 years',
    icon: <Clock className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 2,
    drug: 'Sildenafil',
    from: 'Erectile Dysfunction',
    to: 'Pulmonary Hypertension',
    mechanism: 'PDE5 inhibition → vasodilation',
    similarity: 89.5,
    successProb: 85,
    evidence: 'Approved',
    risk: 'Very Low',
    timeline: 'N/A',
    icon: <CheckCircle className="w-5 h-5 text-emerald-500" />
  },
];

const RepurposingResults = () => {
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <div className="space-y-6 w-full px-6 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Repurposing Analysis Results</h1>
            <p className="text-sm text-gray-500">Comprehensive drug repurposing opportunities ranked by potential</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="similarity">
              <SelectTrigger className="w-[200px] h-10 bg-white border-gray-200 text-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="similarity">Similarity Score</SelectItem>
                <SelectItem value="success">Success Probability</SelectItem>
                <SelectItem value="risk">Risk Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <Card className="bg-white shadow-sm border-gray-200 rounded-lg group overflow-hidden">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 shadow-inner">
                      {result.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-800 tracking-tight">{result.drug}</h3>
                      </div>
                      <p className="text-sm text-gray-500 font-medium">
                        {result.from} <span className="text-gray-300 mx-1">→</span> {result.to}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                        <Activity className="w-3 h-3" />
                        {result.mechanism}
                      </p>
                    </div>
                  </div>

                  <Badge className={`rounded-md px-2 py-0.5 font-bold text-[10px] tracking-tight border-none ${result.similarity > 90 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {result.similarity}% confidence
                  </Badge>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Similarity</p>
                    <p className="text-lg font-bold text-green-600 leading-none">{result.similarity}%</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Success Prob.</p>
                    <p className="text-base font-bold text-gray-800 leading-none">{result.successProb}%</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Clinical Stage</p>
                    <p className="text-sm font-semibold text-gray-700">{result.evidence}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Risk Level</p>
                    <Badge variant="outline" className={`rounded-md px-2 py-0 border-none font-bold text-[10px] ${result.risk === 'Low' || result.risk === 'Very Low' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {result.risk}
                    </Badge>
                  </div>
                  <div className="flex items-end justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedResult(result)}
                      className="flex items-center gap-2 h-9 px-3 rounded-md text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FlowIcon className="w-4 h-4" />
                      <span className="text-xs font-semibold">Analyze Pathway</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 lg:p-12">
            {/* Dark simple backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResult(null)}
              className="absolute inset-0 bg-slate-900/40"
            />

            {/* Modal Content - Structured Flex Layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-7xl h-full max-h-[90vh] z-10 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-10 pb-2 flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Repurposing Pathway Analysis
                  </h2>
                  <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">
                    Technical Transformation Flow
                  </p>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 transition-all duration-200 border border-slate-100 shadow-sm"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Content Area - Just the Graph */}
              <div className="flex-1 min-h-0">
                <FlowGraph result={selectedResult} />
              </div>

              {/* Footer - Metrics Bar */}
              <div className="p-10 pt-0">
                <div className="bg-slate-50 rounded-[2rem] border border-slate-100 p-8 flex justify-between items-center">
                  <div className="flex-1 border-r border-slate-200 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Homology Score</p>
                    <p className="text-3xl font-black text-slate-900 leading-none">98.4<small className="text-sm opacity-40 ml-1">%</small></p>
                  </div>
                  <div className="flex-1 border-r border-slate-200 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Receptor Affinity</p>
                    <p className="text-3xl font-black text-slate-900 leading-none">89.2<small className="text-sm opacity-40 ml-1">%</small></p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Clinical Index</p>
                    <p className="text-3xl font-black text-slate-900 leading-none">74.5<small className="text-sm opacity-40 ml-1">%</small></p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RepurposingResults;