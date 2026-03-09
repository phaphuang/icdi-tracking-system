"use client"

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, UserCog, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { role, setRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (role) {
      router.push("/dashboard");
    }
  }, [role, router]);

  const handleLogin = (selectedRole: any) => {
    setRole(selectedRole);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">ICDI Startup Project Tracking System</h1>
          <p className="text-lg text-slate-500">Select your role to continue to the dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => handleLogin('student')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                Student
              </CardTitle>
              <CardDescription>Submit projects, view advisor quotas, and track progress.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => handleLogin('advisor')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Advisor
              </CardTitle>
              <CardDescription>Manage student requests, review submissions, and track workload.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => handleLogin('coordinator')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5 text-indigo-600" />
                Coordinator
              </CardTitle>
              <CardDescription>Manage schedules, check for duplicates, and oversee the process.</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => handleLogin('executive')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                Executive
              </CardTitle>
              <CardDescription>View analytics, success rates, and advisor workload distribution.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
