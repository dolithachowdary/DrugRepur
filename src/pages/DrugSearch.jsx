import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Search, Filter, Pill, BookOpen, Scale, Star } from 'lucide-react';

const DrugSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const drugs = [
    {
      name: 'Metformin',
      formula: 'C4H11N5',
      mw: '129.16 g/mol',
      publications: 45,
      trials: 23,
      repurposingScore: 92,
      repurposingPotential: 'High'
    },
    {
      name: 'Sildenafil',
      formula: 'C22H30N6O4S',
      mw: '474.58 g/mol',
      publications: 87,
      trials: 12,
      repurposingScore: 85,
      repurposingPotential: 'Medium'
    },
    {
      name: 'Aspirin',
      formula: 'C9H8O4',
      mw: '180.16 g/mol',
      publications: 120,
      trials: 56,
      repurposingScore: 78,
      repurposingPotential: 'Medium'
    }
  ];

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || drug.repurposingPotential.toLowerCase() === filter)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Drug Search</h1>
            <p className="text-gray-500">Search and explore drug candidates for repurposing</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search drugs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High Potential</SelectItem>
                <SelectItem value="medium">Medium Potential</SelectItem>
                <SelectItem value="low">Low Potential</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Results */}
      <div className="grid gap-6">
        {filteredDrugs.map((drug, index) => (
          <motion.div
            key={drug.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Pill className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{drug.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Scale className="w-3 h-3" />
                        {drug.formula} • {drug.mw}
                      </p>
                    </div>
                  </div>
                  <Badge variant={drug.repurposingPotential === 'High' ? 'default' : 'secondary'} className="text-sm">
                    {drug.repurposingPotential}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-0">
                {/* Molecular Details */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Scale className="w-4 h-4" />
                    Molecular Details
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">Formula:</span> {drug.formula}</p>
                    <p><span className="text-gray-500">MW:</span> {drug.mw}</p>
                  </div>
                </div>

                {/* Research Activity */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Research Activity
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">Publications:</span> {drug.publications}</p>
                    <p><span className="text-gray-500">Trials:</span> {drug.trials}</p>
                  </div>
                </div>

                {/* Repurposing Potential */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Repurposing Potential
                  </h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-500">Score:</span> {drug.repurposingScore}%</p>
                    <Badge className="mt-1">{drug.repurposingPotential}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredDrugs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No drugs found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DrugSearch;
