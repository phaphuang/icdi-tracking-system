"use client"

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileUp, Search, Eye, CheckCircle, Clock } from "lucide-react";

export default function ProjectsPage() {
  const { role } = useAuth();

  if (!role) return null;

  if (role === 'student') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">My Project</h2>
            <p className="text-slate-500">Track your startup project progress across the 3 courses.</p>
          </div>
          <Button>
            <FileUp className="h-4 w-4 mr-2" />
            New Submission
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-indigo-500 ring-1 ring-indigo-500 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="default">Current</Badge>
                <span className="text-xs font-medium text-slate-500">Term 1/2569</span>
              </div>
              <CardTitle className="mt-2">888399</CardTitle>
              <CardDescription>Startup Project I</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Advisor:</span>
                  <span className="font-medium">Dr. Smith</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-amber-600 font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> In Progress
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="opacity-60 bg-slate-50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="secondary">Upcoming</Badge>
                <span className="text-xs font-medium text-slate-500">Term 2/2569</span>
              </div>
              <CardTitle className="mt-2">888498</CardTitle>
              <CardDescription>Startup Project II</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 mt-4 text-center">Requires completion of 888399</p>
            </CardContent>
          </Card>

          <Card className="opacity-60 bg-slate-50">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="secondary">Upcoming</Badge>
                <span className="text-xs font-medium text-slate-500">Term 1/2570</span>
              </div>
              <CardTitle className="mt-2">888499</CardTitle>
              <CardDescription>Startup Project III</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-500 mt-4 text-center">Requires completion of 888498</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submissions & Milestones (888399)</CardTitle>
            <CardDescription>Upload your deliverables and track evaluation status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deliverable</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Feedback</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Project Proposal</TableCell>
                  <TableCell>15 Aug 2026</TableCell>
                  <TableCell><Badge variant="success">Approved</Badge></TableCell>
                  <TableCell className="text-slate-500 text-sm">Good scope.</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Business Plan Draft</TableCell>
                  <TableCell>30 Sep 2026</TableCell>
                  <TableCell><Badge variant="warning">Pending Review</Badge></TableCell>
                  <TableCell className="text-slate-500 text-sm">-</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mid-term Presentation</TableCell>
                  <TableCell>15 Oct 2026</TableCell>
                  <TableCell><Badge variant="secondary">Not Submitted</Badge></TableCell>
                  <TableCell className="text-slate-500 text-sm">-</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Upload</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  // View for Advisors, Coordinators, Executives
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {role === 'advisor' ? 'My Students' : 'All Projects'}
          </h2>
          <p className="text-slate-500">Manage and track student startup projects.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input type="search" placeholder="Search projects..." className="pl-9" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <Tabs defaultValue="888399" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="888399">888399 (I)</TabsTrigger>
          <TabsTrigger value="888498">888498 (II)</TabsTrigger>
          <TabsTrigger value="888499">888499 (III)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="888399" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Students</TableHead>
                    {role !== 'advisor' && <TableHead>Advisor</TableHead>}
                    <TableHead>Latest Submission</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">EcoTrack App</TableCell>
                    <TableCell>John D., Sarah M.</TableCell>
                    {role !== 'advisor' && <TableCell>Dr. Smith</TableCell>}
                    <TableCell className="text-sm text-slate-500">Business Plan (2 days ago)</TableCell>
                    <TableCell><Badge variant="warning">Needs Review</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">FinLearn Platform</TableCell>
                    <TableCell>Mike T.</TableCell>
                    {role !== 'advisor' && <TableCell>Dr. Johnson</TableCell>}
                    <TableCell className="text-sm text-slate-500">Proposal (1 week ago)</TableCell>
                    <TableCell><Badge variant="success">On Track</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">HealthSync IoT</TableCell>
                    <TableCell>Alice W., Bob K.</TableCell>
                    {role !== 'advisor' && <TableCell>Dr. Smith</TableCell>}
                    <TableCell className="text-sm text-slate-500">None</TableCell>
                    <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="888498" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              Select a project to view details for course 888498.
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="888499" className="mt-6">
          <Card>
            <CardContent className="p-12 text-center text-slate-500">
              Select a project to view details for course 888499.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
