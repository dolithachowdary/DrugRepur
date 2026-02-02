import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Eye, UploadCloud, ZoomIn, ZoomOut, Settings, RotateCw } from 'lucide-react';
import { toast } from '../components/ui/use-toast';

const MolecularViewer = () => {
  const handleExport = () => {
    toast({
      title: "🚀 Feature in development!",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt!",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">Molecular Visualization</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Eye className="w-4 h-4 mr-2" />
                Labels
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <UploadCloud className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Select defaultValue="metformin">
              <SelectTrigger className="w-[200px] bg-gray-50">
                <SelectValue placeholder="Select a drug" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metformin">Metformin</SelectItem>
                <SelectItem value="sildenafil">Sildenafil</SelectItem>
                <SelectItem value="aspirin">Aspirin</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-md">
              <Button size="sm" variant="secondary">3D</Button>
              <Button size="sm" variant="ghost">2D</Button>
              <Button size="sm" variant="ghost">Surface</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">Metformin Structure</CardTitle>
              <span className="text-sm font-mono text-gray-500">C₄H₁₁N₅</span>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <img alt="3D model of a metformin molecule" className="w-full h-full object-contain" src="https://images.unsplash.com/photo-1678549563261-4641d6e5a4c4" />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button size="icon" variant="secondary" className="bg-gray-800/50 hover:bg-gray-700/50 text-white"><ZoomIn className="w-5 h-5" /></Button>
                  <Button size="icon" variant="secondary" className="bg-gray-800/50 hover:bg-gray-700/50 text-white"><ZoomOut className="w-5 h-5" /></Button>
                  <Button size="icon" variant="secondary" className="bg-gray-800/50 hover:bg-gray-700/50 text-white"><RotateCw className="w-5 h-5" /></Button>
                  <Button size="icon" variant="secondary" className="bg-gray-800/50 hover:bg-gray-700/50 text-white"><Settings className="w-5 h-5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-white shadow-sm h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Molecular Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm text-gray-500">Molecular Weight</p>
                  <p className="text-xs text-gray-400">Mass of the molecule</p>
                </div>
                <p className="font-semibold text-gray-800">129.16 g/mol</p>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm text-gray-500">LogP</p>
                  <p className="text-xs text-gray-400">Lipophilicity coefficient</p>
                </div>
                <p className="font-semibold text-gray-800">-2.64</p>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm text-gray-500">H-Bond Donors</p>
                  <p className="text-xs text-gray-400">Number of hydrogen bond donors</p>
                </div>
                <p className="font-semibold text-gray-800">4</p>
              </div>
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm text-gray-500">H-Bond Acceptors</p>
                  <p className="text-xs text-gray-400">Number of hydrogen bond acceptors</p>
                </div>
                <p className="font-semibold text-gray-800">5</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MolecularViewer;