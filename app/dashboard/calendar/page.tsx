"use client"

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Bell, Plus, ChevronLeft, ChevronRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CalendarPage() {
  const { role } = useAuth();

  if (!role) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Milestone Calendar</h2>
          <p className="text-slate-500">Track important dates, deadlines, and events for startup projects.</p>
        </div>
        {role === 'coordinator' && (
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle className="text-lg font-semibold text-slate-800">August 2026</CardTitle>
                <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Month</Badge>
                <Badge variant="outline" className="text-slate-500 hover:bg-slate-50 cursor-pointer">Week</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mock Calendar Grid */}
              <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="py-2 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 grid-rows-5 h-[400px]">
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 5; // offset to start month on Saturday
                  const isCurrentMonth = day > 0 && day <= 31;
                  const isToday = day === 15;
                  
                  return (
                    <div 
                      key={i} 
                      className={`border-r border-b border-slate-100 p-1 min-h-[80px] transition-colors hover:bg-slate-50 ${!isCurrentMonth ? 'bg-slate-50/50 text-slate-400' : 'text-slate-700'} ${isToday ? 'bg-indigo-50/30' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <span className={`text-sm font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white' : ''}`}>
                          {isCurrentMonth ? day : (day <= 0 ? 31 + day : day - 31)}
                        </span>
                      </div>
                      
                      {/* Mock Events */}
                      {day === 5 && (
                        <div className="mt-1 px-1.5 py-1 bg-amber-100 text-amber-800 text-xs rounded truncate border border-amber-200" title="Advisor Matching Opens">
                          Advisor Matching Opens
                        </div>
                      )}
                      {day === 12 && (
                        <div className="mt-1 px-1.5 py-1 bg-red-100 text-red-800 text-xs rounded truncate border border-red-200" title="Advisor Request Deadline">
                          Advisor Request Deadline
                        </div>
                      )}
                      {day === 15 && (
                        <div className="mt-1 px-1.5 py-1 bg-indigo-100 text-indigo-800 text-xs rounded truncate border border-indigo-200 font-medium" title="Project Proposal Due">
                          Project Proposal Due
                        </div>
                      )}
                      {day === 28 && (
                        <div className="mt-1 px-1.5 py-1 bg-emerald-100 text-emerald-800 text-xs rounded truncate border border-emerald-200" title="Proposal Feedback Released">
                          Feedback Released
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-start p-3 rounded-lg bg-red-50 border border-red-100">
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Advisor Request Deadline</h4>
                  <p className="text-xs text-red-700 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Today, 23:59
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    You have not sent any advisor requests yet.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="mt-0.5">
                  <CalendarIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Project Proposal Due</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Aug 15, 2026
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs bg-white">Course 888399</Badge>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Proposal Feedback Released</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> Aug 28, 2026
                  </p>
                  <Badge variant="outline" className="mt-2 text-xs bg-white">Course 888399</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-indigo-50 to-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-indigo-900">Sync Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 mb-4">
                Sync ICDI Startup milestones with your personal calendar to never miss a deadline.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start text-slate-700 bg-white hover:bg-slate-50 border-slate-200">
                  <svg className="w-4 h-4 mr-2 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  Google Calendar
                </Button>
                <Button variant="outline" className="w-full justify-start text-slate-700 bg-white hover:bg-slate-50 border-slate-200">
                  <svg className="w-4 h-4 mr-2 text-[#0078D4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.55 21H3v-8.55h8.55V21zM21 21h-8.55v-8.55H21V21zm-9.45-9.45H3V3h8.55v8.55zm9.45 0h-8.55V3H21v8.55z" />
                  </svg>
                  Outlook Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
