"use client";

import { use } from "react";
import Link from "next/link";
import {
  RefreshCw,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MinusCircle,
  FileText,
  Clock,
  User,
  Bot,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReadinessScore } from "@/components/shared/readiness-score";
import {
  applications,
  requirementResults,
  documents,
  menus,
  activityLog,
} from "@/lib/mock-data";

const REQ_CATEGORIES = ["Document", "Employee", "Ingredient", "Supplier", "Location"];

function RequirementStatusIcon({ status }: { status: string }) {
  if (status === "passed") return <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />;
  if (status === "failed") return <XCircle className="h-4 w-4 text-red-600 shrink-0" />;
  if (status === "warning") return <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />;
  return <MinusCircle className="h-4 w-4 text-gray-400 shrink-0" />;
}

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const app = applications.find((a) => a.id === id) ?? applications[0];
  const appDocs = documents.filter((d) => d.linkedId === id || d.linkedTo === "Application");
  const appMenus = menus.filter((m) => app.includedMenus.includes(m.id));
  const appActivity = activityLog.filter((l) => l.record.includes("APP"));

  const sourceIcon = (source: string) => {
    if (source === "ai") return <Bot className="h-3 w-3" />;
    if (source === "system") return <Settings2 className="h-3 w-3" />;
    return <User className="h-3 w-3" />;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={app.referenceNo}
        description={`${app.scheme} · ${app.type} · ${app.locationName}`}
        action={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Re-evaluate
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Package
            </Button>
          </div>
        }
      />

      {/* Status bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <StatusBadge status={app.status} />
        <span className="text-sm text-muted-foreground">Created {app.createdDate}</span>
        {app.submittedDate && (
          <span className="text-sm text-muted-foreground">Submitted {app.submittedDate}</span>
        )}
        <span className="text-sm text-muted-foreground">PIC: {app.picName}</span>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="menus">Menus</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base">Application Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {[
                    ["Reference", app.referenceNo],
                    ["Scheme", app.scheme],
                    ["Type", app.type],
                    ["Location", app.locationName],
                    ["Halal PIC", app.picName],
                    ["Status", null],
                    ["Created", app.createdDate],
                    ["Last Updated", app.lastUpdated],
                  ].map(([label, value]) => (
                    <div key={String(label)}>
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium mt-0.5">
                        {label === "Status" ? <StatusBadge status={app.status} /> : value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center gap-3">
                  <ReadinessScore score={app.readinessScore} size="lg" />
                  <p className="text-sm text-center text-muted-foreground">Application Readiness</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Blocking Issues</span>
                    <span className="font-semibold text-red-600">{app.blockingIssues}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Warnings</span>
                    <span className="font-semibold text-amber-600">{app.warnings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Documents</span>
                    <span className="font-semibold">{appDocs.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Menus Included</span>
                    <span className="font-semibold">{appMenus.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Requirements */}
        <TabsContent value="requirements" className="mt-4 space-y-4">
          {/* Summary bar */}
          <div className="flex gap-4 flex-wrap">
            {[
              { label: "Passed", count: requirementResults.filter(r => r.status === "passed").length, color: "text-green-600 bg-green-50" },
              { label: "Failed", count: requirementResults.filter(r => r.status === "failed").length, color: "text-red-600 bg-red-50" },
              { label: "Warnings", count: requirementResults.filter(r => r.status === "warning").length, color: "text-amber-600 bg-amber-50" },
            ].map(({ label, count, color }) => (
              <div key={label} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium ${color}`}>
                <span>{count} {label}</span>
              </div>
            ))}
          </div>

          {REQ_CATEGORIES.map((cat) => {
            const catReqs = requirementResults.filter((r) => r.category === cat);
            if (!catReqs.length) return null;
            return (
              <Card key={cat}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">{cat} Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {catReqs.map((req) => (
                    <div key={req.id} className={`flex items-start gap-3 rounded-lg p-3 text-sm ${req.status === "failed" ? "bg-red-50/50" : req.status === "warning" ? "bg-amber-50/50" : ""}`}>
                      <RequirementStatusIcon status={req.status} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{req.name}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${req.severity === "Blocking" ? "border-red-200 text-red-700 bg-red-50" : req.severity === "Warning" ? "border-amber-200 text-amber-700 bg-amber-50" : "border-gray-200 text-gray-600"}`}
                          >
                            {req.severity}
                          </Badge>
                        </div>
                        {req.note && (
                          <p className="text-xs text-muted-foreground mt-1">{req.note}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        {/* Documents */}
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Required Documents</CardTitle>
              <CardDescription>Documents needed for this application</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Uploaded By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.slice(0, 8).map((doc) => (
                    <TableRow key={doc.id} className={doc.status === "Expiring Soon" ? "bg-amber-50/30" : doc.status === "Expired" ? "bg-red-50/30" : ""}>
                      <TableCell className="font-medium text-sm">{doc.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{doc.type}</TableCell>
                      <TableCell><StatusBadge status={doc.status} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{doc.expiryDate ?? "—"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{doc.uploadedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Menus */}
        <TabsContent value="menus" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Included Menus / Products</CardTitle>
              <CardDescription>{appMenus.length} items in scope for this application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {appMenus.map((menu) => (
                <div key={menu.id} className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{menu.name}</div>
                    <div className="text-xs text-muted-foreground">{menu.category} · {menu.ingredients.length} ingredients</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{menu.description}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${menu.readiness === "pass" ? "bg-green-500" : menu.readiness === "warning" ? "bg-amber-500" : "bg-red-500"}`} />
                    <span className={`text-sm font-medium ${menu.readiness === "pass" ? "text-green-600" : menu.readiness === "warning" ? "text-amber-600" : "text-red-600"}`}>
                      {menu.readinessScore}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLog.map((entry, i) => (
                  <div key={entry.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-7 w-7 rounded-full bg-muted items-center justify-center text-muted-foreground">
                        {sourceIcon(entry.source)}
                      </div>
                      {i < activityLog.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{entry.actor}</span>
                        <span className="text-xs text-muted-foreground">{new Date(entry.timestamp).toLocaleString("en-MY")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{entry.action}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{entry.module}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
