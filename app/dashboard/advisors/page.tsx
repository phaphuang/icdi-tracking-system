"use client"

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Check, X, Info } from "lucide-react";

export default function AdvisorsPage() {
  const { role } = useAuth();

  if (!role) return null;

  if (role === 'student') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Advisor Matching</h2>
            <p className="text-slate-500">Find and request an advisor for your startup project.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input type="search" placeholder="Search by name or expertise..." className="pl-9" />
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-indigo-900">Matching Period Open</h4>
            <p className="text-sm text-indigo-700 mt-1">
              You can send up to 3 requests simultaneously. Advisors have 7 days to respond.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Dr. Alan Smith", expertise: "AI/ML, FinTech", load: 8, quota: 10, status: "Available" },
            { name: "Dr. Sarah Johnson", expertise: "HealthTech, IoT", load: 12, quota: 12, status: "Full" },
            { name: "Dr. Michael Chen", expertise: "EdTech, SaaS", load: 5, quota: 8, status: "Available" },
            { name: "Dr. Emily Davis", expertise: "E-commerce, Blockchain", load: 14, quota: 15, status: "Available" },
            { name: "Dr. Robert Wilson", expertise: "AgriTech, GreenTech", load: 9, quota: 10, status: "Limited" },
          ].map((advisor, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">
                    {advisor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <Badge variant={advisor.status === 'Full' ? 'destructive' : advisor.status === 'Limited' ? 'warning' : 'success'}>
                    {advisor.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{advisor.name}</CardTitle>
                <CardDescription className="text-indigo-600 font-medium">{advisor.expertise}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Load:</span>
                    <span className="font-medium">{advisor.load} / {advisor.quota} students</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                    <div 
                      className={`h-2 rounded-full ${advisor.status === 'Full' ? 'bg-red-500' : advisor.status === 'Limited' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${(advisor.load / advisor.quota) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button 
                  className="w-full" 
                  disabled={advisor.status === 'Full'}
                  variant={advisor.status === 'Full' ? 'secondary' : 'default'}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (role === 'advisor') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">My Quota & Requests</h2>
          <p className="text-slate-500">Manage your student capacity and pending requests.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader>
              <CardTitle>Current Capacity</CardTitle>
              <CardDescription>Term 1/2569</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <div className="text-5xl font-bold text-indigo-600">8<span className="text-2xl text-slate-400">/10</span></div>
                <p className="text-sm text-slate-500 mt-2">Students currently advising</p>
              </div>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Course 888399:</span>
                  <span className="font-medium">4 students</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Course 888498:</span>
                  <span className="font-medium">3 students</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Course 888499:</span>
                  <span className="font-medium">1 student</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6">Update Quota</Button>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Pending Requests (3)</CardTitle>
              <CardDescription>Review and accept/reject student requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Team Alpha", project: "EcoTrack App", course: "888399", date: "2 days ago" },
                  { name: "John Doe", project: "FinLearn Platform", course: "888399", date: "3 days ago" },
                  { name: "Sarah Smith", project: "HealthSync IoT", course: "888399", date: "1 week ago" },
                ].map((req, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-200 rounded-lg gap-4">
                    <div>
                      <h4 className="font-medium text-slate-900">{req.name}</h4>
                      <p className="text-sm text-slate-500 mt-1">Project: {req.project}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">{req.course}</Badge>
                        <span className="text-xs text-slate-400">{req.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700">
                        <Check className="h-4 w-4 mr-1" /> Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Coordinator & Executive view
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Advisors & Quotas</h2>
          <p className="text-slate-500">Overview of advisor workload and capacity.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input type="search" placeholder="Search advisors..." className="pl-9" />
          </div>
          <Button variant="outline">Export CSV</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Advisor Name</th>
                  <th className="px-6 py-4 font-medium">Expertise</th>
                  <th className="px-6 py-4 font-medium">Current Load</th>
                  <th className="px-6 py-4 font-medium">Max Quota</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[
                  { name: "Dr. Alan Smith", expertise: "AI/ML, FinTech", load: 8, quota: 10, status: "Available" },
                  { name: "Dr. Sarah Johnson", expertise: "HealthTech, IoT", load: 12, quota: 12, status: "Full" },
                  { name: "Dr. Michael Chen", expertise: "EdTech, SaaS", load: 5, quota: 8, status: "Available" },
                  { name: "Dr. Emily Davis", expertise: "E-commerce, Blockchain", load: 14, quota: 15, status: "Available" },
                  { name: "Dr. Robert Wilson", expertise: "AgriTech, GreenTech", load: 9, quota: 10, status: "Limited" },
                ].map((advisor, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{advisor.name}</td>
                    <td className="px-6 py-4 text-slate-500">{advisor.expertise}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{advisor.load}</span>
                        <div className="w-16 bg-slate-100 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${advisor.status === 'Full' ? 'bg-red-500' : advisor.status === 'Limited' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${(advisor.load / advisor.quota) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{advisor.quota}</td>
                    <td className="px-6 py-4">
                      <Badge variant={advisor.status === 'Full' ? 'destructive' : advisor.status === 'Limited' ? 'warning' : 'success'}>
                        {advisor.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">Edit Quota</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
