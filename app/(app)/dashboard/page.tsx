"use client";

import Link from "next/link";
import {
  FileText,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReadinessScore } from "@/components/shared/readiness-score";
import { LinkButton } from "@/components/shared/link-button";
import {
  applications,
  tasks,
  documents,
  dashboardStats,
  aiRecommendations,
} from "@/lib/mock-data";
import React from "react";

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const pendingTasks = tasks.filter((t) => t.status === "Open" || t.status === "In Progress").slice(0, 5);
  const expiringDocs = documents.filter((d) => d.status === "Expiring Soon").slice(0, 3);

  const stats = [
    { label: "Active Applications", value: dashboardStats.activeApplications, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Readiness Score", value: `${dashboardStats.readinessScore}%`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
    { label: "Open Tasks", value: dashboardStats.openTasks, icon: CheckSquare, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Expiring Soon", value: dashboardStats.expiringSoon, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  const readinessBreakdown = [
    { category: "Documents", score: 65 },
    { category: "Employees", score: 90 },
    { category: "Ingredients", score: 70 },
    { category: "Suppliers", score: 85 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back, Ahmad Faris. Here's your compliance overview."
        action={
          <LinkButton href="/applications/new">
            <FileText className="mr-2 h-4 w-4" />
            New Application
          </LinkButton>
        }
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-8 rounded-lg mb-3" />
                  <Skeleton className="h-7 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))
          : stats.map(({ label, value, icon: Icon, color, bg }) => (
              <Card key={label}>
                <CardContent className="p-6">
                  <div className={`h-9 w-9 rounded-lg ${bg} flex items-center justify-center mb-3`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className={`text-2xl font-bold ${color}`}>{value}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Readiness Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Readiness Breakdown</CardTitle>
            <CardDescription>APP-2024-001 — Main Outlet Bukit Bintang</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))
              : readinessBreakdown.map(({ category, score }) => (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{category}</span>
                      <span className={`font-medium ${score >= 80 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-600"}`}>
                        {score}%
                      </span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
          </CardContent>
        </Card>

        {/* Active Applications */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Active Applications</CardTitle>
              <CardDescription>Your current certification applications</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <Link href="/applications" className="flex items-center gap-1">View All <ChevronRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-5 w-16" />
                  </div>
                ))
              : applications.map((app) => (
                  <Link
                    key={app.id}
                    href={`/applications/${app.id}`}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-muted/50 transition-colors"
                  >
                    <ReadinessScore score={app.readinessScore} size="sm" showLabel={false} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{app.referenceNo}</p>
                      <p className="text-xs text-muted-foreground truncate">{app.locationName}</p>
                    </div>
                    <StatusBadge status={app.status} />
                  </Link>
                ))}
          </CardContent>
        </Card>
      </div>

      {/* Third Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Pending Tasks */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Pending Tasks</CardTitle>
              <CardDescription>{dashboardStats.openTasks} tasks require attention</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <Link href="/compliance/tasks" className="flex items-center gap-1">View All <ChevronRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/30 transition-colors">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${task.priority === "High" ? "bg-red-500" : task.priority === "Medium" ? "bg-amber-500" : "bg-blue-500"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.dueDate} · {task.assignedName}</p>
                </div>
                <StatusBadge status={task.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expiring Documents */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Expiring Documents</CardTitle>
              <CardDescription>{expiringDocs.length} documents expiring within 30 days</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              <Link href="/halal-data/documents" className="flex items-center gap-1">View All <ChevronRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {expiringDocs.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 rounded-lg border border-amber-100 bg-amber-50/40 p-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-amber-900 truncate">{doc.name}</p>
                  <p className="text-xs text-amber-700">{doc.type} · Expires {doc.expiryDate}</p>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="border-primary/20 bg-primary/[0.02]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">AI Recommendations</CardTitle>
          </div>
          <CardDescription>Actionable insights based on your current data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiRecommendations.map((rec) => (
            <div key={rec.id} className="flex items-start gap-3 rounded-lg border bg-white p-3">
              <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${rec.priority === "High" ? "bg-red-500" : "bg-amber-500"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{rec.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                <Badge variant="outline" className="mt-1.5 text-xs">{rec.linkedModule}</Badge>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Button size="sm" variant="outline" className="h-7 gap-1 text-xs">
                  <Check className="h-3 w-3" /> Accept
                </Button>
                <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-muted-foreground">
                  <X className="h-3 w-3" /> Dismiss
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
