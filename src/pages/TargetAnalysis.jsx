import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Plus, Target } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const TargetAnalysis = () => {
  const handleRunAnalysis = () => {
    toast({
      title: "🔬 Analysis Started!",
      description: "This is a demo. In a real app, this would trigger a complex backend process.",
    });
  };

  const handleAddTarget = () => {
    toast({
      title: "🚀 Feature in development!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt!",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">Target Analysis Setup</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Disease/Condition</label>
              <Select>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Select a disease..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alzheimers">Alzheimer's Disease</SelectItem>
                  <SelectItem value="parkinsons">Parkinson's Disease</SelectItem>
                  <SelectItem value="cancer">Cancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Analysis Type</label>
              <Select defaultValue="molecular">
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Analysis Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="molecular">Molecular Similarity</SelectItem>
                  <SelectItem value="pathway">Pathway Analysis</SelectItem>
                  <SelectItem value="genetic">Genetic Association</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleRunAnalysis} className="w-full md:w-auto">Run Analysis</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">Target Profiles</CardTitle>
            <Button variant="outline" size="sm" onClick={handleAddTarget}>
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Target
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex-shrink-0 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">BACE1</h3>
                    <p className="text-sm text-gray-500">Beta-secretase 1</p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">87% confidence</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Target Details</p>
                  <p className="font-medium text-gray-700">Type: Enzyme</p>
                  <p className="font-medium text-gray-700">Disease: Alzheimer's</p>
                </div>
                <div>
                  <p className="text-gray-500">Pathway</p>
                  <p className="font-medium text-gray-700">Amyloid Processing</p>
                </div>
                <div>
                  <p className="text-gray-500">Drug Landscape</p>
                  <p className="font-medium text-gray-700">12 Approved</p>
                  <p className="font-medium text-gray-700">45 Investigational</p>
                </div>
                <div className="flex items-end justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={handleAddTarget}>View Details</Button>
                  <Button variant="secondary" size="sm" onClick={handleAddTarget}>Analyze</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TargetAnalysis;