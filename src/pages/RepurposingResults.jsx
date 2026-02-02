import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { UploadCloud, Star, Clock, CheckCircle } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const results = [
  { drug: 'Metformin', from: 'Type 2 Diabetes', to: "Alzheimer's Disease", mechanism: 'AMPK activation → reduced tau phosphorylation', similarity: 94.0, successProb: 73, evidence: 'Phase II completed', risk: 'Low', timeline: '2-3 years', score: 156, icon: <Clock className="w-5 h-5 text-yellow-600" /> },
  { drug: 'Sildenafil', from: 'Erectile Dysfunction', to: 'Pulmonary Arterial Hypertension', mechanism: 'PDE5 inhibition → vasodilation', similarity: 89.5, successProb: 85, evidence: 'Approved', risk: 'Very Low', timeline: 'N/A', score: 89, icon: <CheckCircle className="w-5 h-5 text-green-600" /> },
];

const RepurposingResults = () => {
  const handleExport = () => {
    toast({
      title: "📤 Exporting Results...",
      description: "This is a demo. Your results would be exported as a CSV file.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Repurposing Analysis Results</h1>
            <p className="text-gray-500">Comprehensive drug repurposing opportunities ranked by potential</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="similarity">
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="similarity">Sort by Similarity Score</SelectItem>
                <SelectItem value="success">Sort by Success Probability</SelectItem>
                <SelectItem value="risk">Sort by Risk Level</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleExport}>
              <UploadCloud className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                      {result.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{result.drug}</h3>
                      <p className="text-sm text-gray-500">{result.from} → {result.to}</p>
                      <p className="text-sm text-gray-500 mt-1">{result.mechanism}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{result.score}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Similarity Score</p>
                    <p className="font-bold text-lg text-green-600">{result.similarity}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Success Probability</p>
                    <p className="font-semibold text-gray-700">{result.successProb}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Clinical Evidence</p>
                    <p className="font-semibold text-gray-700">{result.evidence}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Risk Level</p>
                    <Badge className={result.risk === 'Low' ? 'bg-green-100 text-green-700' : 'bg-emerald-100 text-emerald-700'}>{result.risk}</Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">Timeline</p>
                    <p className="font-semibold text-gray-700">{result.timeline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RepurposingResults;