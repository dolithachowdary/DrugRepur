import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, Pill, TrendingUp, FileText, Users, Beaker, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DrugDetails = ({ drug, onBack, onLogout }) => {
  if (!drug) return null;

  const evidenceData = [
    { category: "Molecular Targets", score: 85, description: "Strong binding affinity to key disease targets" },
    { category: "Pathway Analysis", score: 78, description: "Significant overlap with disease pathways" },
    { category: "Clinical Evidence", score: 92, description: "Positive results in related conditions" },
    { category: "Safety Profile", score: 88, description: "Well-established safety in current use" },
    { category: "Biomarker Correlation", score: 73, description: "Moderate correlation with disease biomarkers" }
  ];

  const clinicalTrials = [
    { phase: "Phase I", status: "Completed", participants: 24, duration: "6 months", outcome: "Safe, well-tolerated" },
    { phase: "Phase II", status: "Ongoing", participants: 156, duration: "18 months", outcome: "Preliminary efficacy shown" },
    { phase: "Phase III", status: "Planned", participants: 500, duration: "36 months", outcome: "Not started" }
  ];

  const publications = [
    { title: "Neuroprotective effects in neurodegeneration models", journal: "Nature Neuroscience", year: 2023, citations: 127 },
    { title: "Molecular mechanisms of action in brain tissue", journal: "Cell", year: 2022, citations: 89 },
    { title: "Clinical outcomes in pilot study", journal: "Lancet Neurology", year: 2023, citations: 45 }
  ];

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div className="flex items-center">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{drug.name}</h1>
            <p className="text-gray-300">Detailed Analysis for {drug.targetDisease}</p>
          </div>
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

      {/* Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Confidence Score</p>
                <p className="text-2xl font-bold text-white">{drug.confidence}%</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Evidence Score</p>
                <p className="text-2xl font-bold text-white">{drug.evidenceScore}/10</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Clinical Trials</p>
                <p className="text-2xl font-bold text-white">{drug.clinicalTrials}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Publications</p>
                <p className="text-2xl font-bold text-white">{drug.publications}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="evidence" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-lg border-white/20">
            <TabsTrigger value="evidence" className="data-[state=active]:bg-white/20 text-white">
              Evidence Analysis
            </TabsTrigger>
            <TabsTrigger value="trials" className="data-[state=active]:bg-white/20 text-white">
              Clinical Trials
            </TabsTrigger>
            <TabsTrigger value="publications" className="data-[state=active]:bg-white/20 text-white">
              Publications
            </TabsTrigger>
            <TabsTrigger value="molecular" className="data-[state=active]:bg-white/20 text-white">
              Molecular Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="evidence" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">AI Evidence Analysis</CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive analysis of scientific evidence supporting drug repurposing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {evidenceData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-semibold">{item.category}</h4>
                      <Badge variant="outline" className="text-white border-white/20">
                        {item.score}%
                      </Badge>
                    </div>
                    <Progress value={item.score} className="h-2" />
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trials" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Clinical Trial Pipeline</CardTitle>
                <CardDescription className="text-gray-300">
                  Current and planned clinical trials for {drug.targetDisease}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clinicalTrials.map((trial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-semibold">{trial.phase}</h4>
                        <Badge 
                          variant={trial.status === 'Completed' ? 'default' : trial.status === 'Ongoing' ? 'secondary' : 'outline'}
                          className="text-white"
                        >
                          {trial.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Participants</p>
                          <p className="text-white">{trial.participants}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Duration</p>
                          <p className="text-white">{trial.duration}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Outcome</p>
                          <p className="text-white">{trial.outcome}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Key Publications</CardTitle>
                <CardDescription className="text-gray-300">
                  Recent scientific publications supporting this repurposing opportunity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publications.map((pub, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <h4 className="text-white font-semibold mb-2">{pub.title}</h4>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex gap-4">
                          <span className="text-gray-400">Journal: <span className="text-white">{pub.journal}</span></span>
                          <span className="text-gray-400">Year: <span className="text-white">{pub.year}</span></span>
                        </div>
                        <Badge variant="outline" className="text-white border-white/20">
                          {pub.citations} citations
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="molecular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Pill className="w-5 h-5 mr-2" />
                    Drug Properties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-400">Molecular Weight</p>
                    <p className="text-white font-semibold">{drug.molecularWeight}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Half-life</p>
                    <p className="text-white font-semibold">{drug.halfLife}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Mechanism of Action</p>
                    <p className="text-white font-semibold">{drug.mechanism}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Current Indication</p>
                    <p className="text-white font-semibold">{drug.currentUse}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Beaker className="w-5 h-5 mr-2" />
                    Target Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-400">Primary Targets</p>
                    <p className="text-white font-semibold">AMPK, mTOR pathway</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Secondary Targets</p>
                    <p className="text-white font-semibold">Inflammatory mediators</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Pathway Overlap</p>
                    <p className="text-white font-semibold">78% with disease pathways</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Binding Affinity</p>
                    <p className="text-white font-semibold">High (Kd = 2.3 μM)</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default DrugDetails;