"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReadinessScore } from "@/components/shared/readiness-score";
import { LinkButton } from "@/components/shared/link-button";
import { applications } from "@/lib/mock-data";
import { useRouter } from "next/navigation";

const ALL_STATUSES = ["All", "Draft", "In Progress", "In Review", "Submitted", "Approved"];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const router = useRouter();

  const filtered = activeTab === "All"
    ? applications
    : applications.filter((a) => a.status === activeTab);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Applications"
        description="Manage your halal certification applications"
        action={
          <LinkButton href="/applications/new">
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </LinkButton>
        }
      />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-base">All Applications</CardTitle>
              <CardDescription>{applications.length} total applications</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-8">
                {ALL_STATUSES.map((s) => (
                  <TabsTrigger key={s} value={s} className="text-xs h-7 px-2.5">
                    {s}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference No</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Readiness</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((app) => (
                <TableRow
                  key={app.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/applications/${app.id}`)}
                >
                  <TableCell className="font-medium">{app.referenceNo}</TableCell>
                  <TableCell className="text-sm">{app.type}</TableCell>
                  <TableCell className="text-sm max-w-[180px] truncate">{app.locationName}</TableCell>
                  <TableCell className="text-sm">{app.scheme}</TableCell>
                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${app.readinessScore >= 80 ? "bg-green-500" : app.readinessScore >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${app.readinessScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{app.readinessScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {app.submittedDate ?? app.createdDate}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                      <Link href={`/applications/${app.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    <FileText className="h-8 w-8 mx-auto mb-2 opacity-30" />
                    No applications with status &quot;{activeTab}&quot;
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
