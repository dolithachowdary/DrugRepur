
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Database, Target, ArrowUpRight, CheckCircle, Clock, Star } from 'lucide-react';

const StatCard = ({ title, value, change, icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <p className="text-xs text-green-500 flex items-center">
          <ArrowUpRight className="w-3 h-3 mr-1" />
          {change}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Drugs', value: '12,847', change: '+2.3%', icon: <Database className="w-4 h-4 text-blue-600" />, color: 'bg-blue-100' },
    { title: 'Active Targets', value: '3,421', change: '+5.7%', icon: <Target className="w-4 h-4 text-green-600" />, color: 'bg-green-100' },
    { title: 'Repurposing Opportunities', value: '1,293', change: '+12.1%', icon: <ArrowUpRight className="w-4 h-4 text-purple-600" />, color: 'bg-purple-100' },
    { title: 'Success Rate', value: '78.4%', change: '+1.2%', icon: <CheckCircle className="w-4 h-4 text-teal-600" />, color: 'bg-teal-100' },
  ];

  const recentAnalyses = [
    { drug: 'Metformin', from: 'Type 2 Diabetes', to: "Alzheimer's Disease", similarity: '92.0%', time: '2 hours ago', potential: 'High Potential' },
    { drug: 'Sildenafil', from: 'Erectile Dysfunction', to: 'Pulmonary Hypertension', similarity: '89.5%', time: '1 day ago', potential: 'Medium Potential' },
    { drug: 'Aspirin', from: 'Pain Relief', to: 'Colorectal Cancer', similarity: '85.2%', time: '3 days ago', potential: 'Medium Potential' },
  ];

  const topTargets = [
    { name: 'EGFR', drugs: 45, opportunities: 12, score: 94 },
    { name: 'VEGFR2', drugs: 38, opportunities: 9, score: 91 },
    { name: 'BACE1', drugs: 29, opportunities: 7, score: 88 },
    { name: 'mTOR', drugs: 25, opportunities: 6, score: 85 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">Recent Analyses</CardTitle>
              <Clock className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAnalyses.map((analysis, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{analysis.drug}</p>
                      <p className="text-sm text-gray-500">{analysis.from} → {analysis.to}</p>
                      <p className="text-sm text-gray-500">Similarity: <span className="font-medium text-gray-700">{analysis.similarity}</span> • <span className="text-xs">{analysis.time}</span></p>
                    </div>
                    <Badge variant={analysis.potential === 'High Potential' ? 'default' : 'secondary'} className={analysis.potential === 'High Potential' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>{analysis.potential}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">Top Repurposing Targets</CardTitle>
              <Target className="w-5 h-5 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTargets.map((target, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{target.name}</p>
                      <p className="text-sm text-gray-500">{target.drugs} drugs • {target.opportunities} opportunities</p>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{target.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;