import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Search, Filter, Pill, BookOpen, Scale, Star, X, Info } from 'lucide-react';

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const drugs = [
    {
      id: 1,
      name: 'Metformin',
      formula: 'C4H11N5',
      mw: '129.16 g/mol',
      publications: 45,
      trials: 23,
      repurposingScore: 92,
      repurposingPotential: 'High',
      mechanism: 'AMPK activation, glucose metabolism',
      currentUse: 'Type 2 Diabetes'
    },
    {
      id: 2,
      name: 'Sildenafil',
      formula: 'C22H30N6O4S',
      mw: '474.58 g/mol',
      publications: 87,
      trials: 12,
      repurposingScore: 85,
      repurposingPotential: 'Medium',
      mechanism: 'PDE5 inhibition, vasodilation',
      currentUse: 'Erectile Dysfunction'
    },
    {
      id: 3,
      name: 'Aspirin',
      formula: 'C9H8O4',
      mw: '180.16 g/mol',
      publications: 120,
      trials: 56,
      repurposingScore: 78,
      repurposingPotential: 'Medium',
      mechanism: 'COX inhibition, anti-inflammatory',
      currentUse: 'Pain relief'
    },
    {
      id: 4,
      name: 'Simvastatin',
      formula: 'C25H38O5',
      mw: '418.57 g/mol',
      publications: 64,
      trials: 18,
      repurposingScore: 88,
      repurposingPotential: 'High',
      mechanism: 'HMG-CoA reductase inhibition',
      currentUse: 'Cholesterol'
    }
  ];

  const filteredDrugs = drugs.filter(drug => {
    const matchesSearch = drug.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drug.mechanism.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || drug.repurposingPotential.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Drug Discovery Search</h1>
          <p className="text-slate-500 mt-1">Explore our comprehensive library of chemical compounds and their repurposing potential.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search by name or mechanism of action..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all text-base rounded-xl"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            )}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-[180px] h-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="All Potential" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Potential</SelectItem>
                <SelectItem value="high">High Potential</SelectItem>
                <SelectItem value="medium">Medium Potential</SelectItem>
                <SelectItem value="low">Low Potential</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="secondary" className="h-12 w-12 p-0 flex items-center justify-center rounded-xl bg-slate-50 border-none hover:bg-slate-100">
              <Filter className="w-5 h-5 text-slate-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDrugs.length > 0 ? (
            filteredDrugs.map((drug) => (
              <motion.div
                key={drug.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border-slate-100 overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-inner">
                              <Pill className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 leading-tight">{drug.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{drug.formula}</span>
                                <span className="text-slate-200">|</span>
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{drug.mw}</span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            className={`rounded-full px-4 py-1.5 border-none font-bold text-xs uppercase tracking-widest ${drug.repurposingPotential === 'High'
                                ? 'bg-green-100 text-green-700 shadow-sm shadow-green-100'
                                : 'bg-amber-100 text-amber-700 shadow-sm shadow-amber-100'
                              }`}
                          >
                            {drug.repurposingPotential} Potential
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-1 bg-slate-50 rounded-lg">
                                <Info className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Mechanism of Action</p>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">{drug.mechanism}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-1 bg-slate-50 rounded-lg">
                                <Star className="w-4 h-4 text-slate-400" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-1">Current Indication</p>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium font-sans">{drug.currentUse}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-50/50 rounded-2xl p-4 flex justify-around items-center border border-slate-50">
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Publications</p>
                              <div className="flex items-center justify-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-blue-500" />
                                <span className="text-lg font-bold text-slate-800">{drug.publications}</span>
                              </div>
                            </div>
                            <div className="w-px h-8 bg-slate-200" />
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinical Trials</p>
                              <div className="flex items-center justify-center gap-1.5">
                                <Scale className="w-4 h-4 text-indigo-500" />
                                <span className="text-lg font-bold text-slate-800">{drug.trials}</span>
                              </div>
                            </div>
                            <div className="w-px h-8 bg-slate-200" />
                            <div className="text-center">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score</p>
                              <div className="flex items-center justify-center">
                                <span className="text-xl font-black text-blue-600">{drug.repurposingScore}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50/30 md:w-16 border-l border-slate-100 flex md:flex-col items-center justify-center py-4 gap-4 px-6 md:px-0">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl">
                          <Star className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-xl">
                          <Search className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center bg-white rounded-3xl border border-dashed border-slate-200"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">No matching drugs found</h3>
              <p className="text-slate-500 mt-2">Try searching for a different name, mechanism, or adjusting your filter.</p>
              <Button onClick={clearSearch} variant="link" className="mt-4 text-blue-600 font-bold">
                Clear search terms
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DrugSearch;
