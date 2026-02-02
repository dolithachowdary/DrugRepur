import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, LogOut, Pill, TrendingUp, Database, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const Dashboard = ({ onLogout, onDrugSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const mockDrugs = [
    {
      id: 1,
      name: "Metformin",
      confidence: 92,
      mechanism: "AMPK activation, glucose metabolism",
      evidenceScore: 8.7,
      clinicalTrials: 15,
      publications: 342,
      targetDisease: "Alzheimer's Disease",
      currentUse: "Type 2 Diabetes",
      molecularWeight: "129.16 g/mol",
      halfLife: "4-8.7 hours"
    },
    {
      id: 2,
      name: "Aspirin",
      confidence: 87,
      mechanism: "COX inhibition, anti-inflammatory",
      evidenceScore: 8.2,
      clinicalTrials: 23,
      publications: 567,
      targetDisease: "Alzheimer's Disease",
      currentUse: "Pain relief, Cardiovascular protection",
      molecularWeight: "180.16 g/mol",
      halfLife: "2-3 hours"
    },
    {
      id: 3,
      name: "Simvastatin",
      confidence: 84,
      mechanism: "HMG-CoA reductase inhibition",
      evidenceScore: 7.9,
      clinicalTrials: 12,
      publications: 289,
      targetDisease: "Alzheimer's Disease",
      currentUse: "Cholesterol management",
      molecularWeight: "418.57 g/mol",
      halfLife: "1.9 hours"
    },
    {
      id: 4,
      name: "Lithium",
      confidence: 81,
      mechanism: "GSK-3β inhibition, neuroprotection",
      evidenceScore: 7.6,
      clinicalTrials: 8,
      publications: 156,
      targetDisease: "Alzheimer's Disease",
      currentUse: "Bipolar disorder",
      molecularWeight: "6.94 g/mol",
      halfLife: "18-36 hours"
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a disease name",
        description: "Enter a disease to search for potential drug repurposing opportunities",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setSearchResults(mockDrugs.map(drug => ({
        ...drug,
        targetDisease: searchQuery
      })));
      setIsSearching(false);
      toast({
        title: "Analysis Complete! 🧬",
        description: `Found ${mockDrugs.length} potential drug candidates for ${searchQuery}`,
      });
    }, 2000);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 80) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Drug Repurposing Platform</h1>
          <p className="text-gray-300">Discover new therapeutic applications for existing drugs</p>
        </div>
        <Button
          onClick={onLogout}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              Disease Analysis
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enter a disease name to discover potential drug repurposing opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="e.g., Alzheimer's Disease, Parkinson's Disease, Cancer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {isSearching ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {isSearching ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Cards */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Drugs Analyzed", value: "10,247", icon: Pill, color: "from-blue-500 to-cyan-500" },
            { label: "Confidence Score", value: "87%", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
            { label: "Publications", value: "1,354", icon: Database, color: "from-purple-500 to-pink-500" },
            { label: "Clinical Trials", value: "58", icon: Sparkles, color: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {/* Results */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Potential Drug Candidates for {searchQuery}
          </h2>
          <div className="grid gap-4">
            {searchResults.map((drug, index) => (
              <motion.div
                key={drug.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card 
                  className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                  onClick={() => onDrugSelect(drug)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{drug.name}</h3>
                        <p className="text-gray-300 mb-2">Current use: {drug.currentUse}</p>
                        <p className="text-sm text-gray-400">{drug.mechanism}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={`${getConfidenceColor(drug.confidence)} text-white mb-2`}>
                          {drug.confidence}% Confidence
                        </Badge>
                        <p className="text-sm text-gray-400">Evidence Score: {drug.evidenceScore}/10</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Clinical Trials</p>
                        <p className="text-white font-semibold">{drug.clinicalTrials}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Publications</p>
                        <p className="text-white font-semibold">{drug.publications}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Molecular Weight</p>
                        <p className="text-white font-semibold">{drug.molecularWeight}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {searchResults.length === 0 && !isSearching && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Pill className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Discover</h3>
          <p className="text-gray-300 max-w-md mx-auto">
            Enter a disease name above to start analyzing potential drug repurposing opportunities using our AI-powered platform.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;