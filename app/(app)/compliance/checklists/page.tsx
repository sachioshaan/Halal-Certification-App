"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, MinusCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { applications, requirementResults } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const REQ_CATEGORIES = ["Document", "Employee", "Ingredient", "Supplier", "Location"];

function StatusIcon({ status }: { status: string }) {
  if (status === "passed") return <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />;
  if (status === "failed") return <XCircle className="h-4 w-4 text-red-600 shrink-0" />;
  if (status === "warning") return <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />;
  return <MinusCircle className="h-4 w-4 text-gray-400 shrink-0" />;
}

export default function ChecklistsPage() {
  const [selectedApp, setSelectedApp] = useState<string | null>("APP-001");
  const [openCategories, setOpenCategories] = useState<string[]>(REQ_CATEGORIES);

  const toggleCategory = (cat: string) => {
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const passed = requirementResults.filter((r) => r.status === "passed").length;
  const failed = requirementResults.filter((r) => r.status === "failed").length;
  const warning = requirementResults.filter((r) => r.status === "warning").length;
  const total = requirementResults.length;
  const score = Math.round((passed / total) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Requirement Checklists"
        description="Review compliance requirements for your applications"
        action={
          <Button variant="outline">
            Re-evaluate
          </Button>
        }
      />

      {/* App selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Viewing checklist for:</span>
        <Select value={selectedApp} onValueChange={(val) => setSelectedApp(val)}>
          <SelectTrigger className="w-64 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {applications.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.referenceNo} — {a.locationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Summary bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-700">{passed} Passed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="text-sm font-medium text-red-700">{failed} Failed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span className="text-sm font-medium text-amber-700">{warning} Warnings</span>
            </div>
            <div className="ml-auto text-sm font-semibold">
              Overall: <span className={score >= 80 ? "text-green-600" : score >= 60 ? "text-amber-600" : "text-red-600"}>{score}%</span>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden flex">
            <div className="bg-green-500 h-full" style={{ width: `${(passed / total) * 100}%` }} />
            <div className="bg-amber-400 h-full" style={{ width: `${(warning / total) * 100}%` }} />
            <div className="bg-red-500 h-full" style={{ width: `${(failed / total) * 100}%` }} />
          </div>
        </CardContent>
      </Card>

      {/* Accordion sections */}
      <div className="space-y-3">
        {REQ_CATEGORIES.map((cat) => {
          const catReqs = requirementResults.filter((r) => r.category === cat);
          const catPassed = catReqs.filter((r) => r.status === "passed").length;
          const isOpen = openCategories.includes(cat);

          return (
            <Card key={cat}>
              <button
                className="w-full"
                onClick={() => toggleCategory(cat)}
              >
                <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-sm">{cat} Requirements</CardTitle>
                      <span className="text-xs text-muted-foreground">{catPassed}/{catReqs.length} passed</span>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                  </div>
                </CardHeader>
              </button>
              {isOpen && (
                <CardContent className="space-y-2 pt-0">
                  {catReqs.map((req) => (
                    <div
                      key={req.id}
                      className={cn(
                        "flex items-start gap-3 rounded-lg p-3 text-sm",
                        req.status === "failed" && "bg-red-50/60",
                        req.status === "warning" && "bg-amber-50/60",
                        req.status === "passed" && "bg-green-50/30"
                      )}
                    >
                      <StatusIcon status={req.status} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium">{req.name}</span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              req.severity === "Blocking" && "border-red-200 text-red-700 bg-red-50",
                              req.severity === "Warning" && "border-amber-200 text-amber-700 bg-amber-50",
                              req.severity === "Recommended" && "border-gray-200 text-gray-600"
                            )}
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
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
