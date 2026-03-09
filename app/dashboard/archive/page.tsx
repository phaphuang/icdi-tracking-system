"use client"

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, ExternalLink, Calendar as CalendarIcon, User, Tag } from "lucide-react";

export default function ArchivePage() {
  const { role } = useAuth();

  if (!role) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Historical Database</h2>
          <p className="text-slate-500">Search past startup projects for reference and anti-duplication.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      <Card className="bg-white border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <Input 
                type="search" 
                placeholder="Search by keyword, project name, student, or advisor..." 
                className="pl-10 h-12 text-base bg-slate-50 border-slate-200 focus-visible:ring-indigo-500" 
              />
            </div>
            <Button className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
              Search
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-slate-500 py-1 mr-2">Popular tags:</span>
            {["AI/ML", "HealthTech", "FinTech", "EdTech", "E-commerce", "IoT"].map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-slate-200 text-slate-600 font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          Search Results <span className="text-sm font-normal text-slate-500">(124 projects found)</span>
        </h3>
        
        {[
          { 
            title: "MediConnect: AI-driven Patient Triage", 
            year: "2568", 
            students: "Alice Wong, Bob Chen", 
            advisor: "Dr. Sarah Johnson",
            tags: ["HealthTech", "AI/ML"],
            abstract: "A mobile application that uses machine learning algorithms to pre-triage patients based on symptoms before they arrive at the clinic, reducing wait times and optimizing doctor schedules."
          },
          { 
            title: "FinSmart: Personal Finance for Gen Z", 
            year: "2567", 
            students: "Charlie Davis", 
            advisor: "Dr. Alan Smith",
            tags: ["FinTech", "Mobile App"],
            abstract: "An educational finance app gamifying saving and investing for university students, featuring micro-investing capabilities and AI-driven spending insights."
          },
          { 
            title: "AgriSense: IoT Soil Monitoring", 
            year: "2567", 
            students: "David Lee, Emma White", 
            advisor: "Dr. Robert Wilson",
            tags: ["AgriTech", "IoT", "Hardware"],
            abstract: "Low-cost IoT sensors for small-scale farmers to monitor soil moisture and nutrient levels in real-time, connected to a dashboard that provides actionable insights for crop management."
          }
        ].map((project, i) => (
          <Card key={i} className="hover:border-indigo-200 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-indigo-600 border-indigo-200 bg-indigo-50">
                        Completed
                      </Badge>
                      <span className="text-sm text-slate-500 flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" /> Academic Year {project.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{project.title}</h4>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.abstract}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1.5 text-slate-400" />
                      <span className="font-medium text-slate-700 mr-1">Students:</span> {project.students}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1.5 text-slate-400" />
                      <span className="font-medium text-slate-700 mr-1">Advisor:</span> {project.advisor}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200">
                        <Tag className="h-3 w-3 mr-1" /> {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-row md:flex-col gap-2 justify-start md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                  <Button variant="outline" className="w-full justify-start text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-900">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" className="text-slate-600">Load More Results</Button>
      </div>
    </div>
  );
}
