import { Download, FileBarChart2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

const REPORT_TYPES = [
  {
    id: "readiness",
    title: "Readiness Report",
    description: "Full readiness evaluation for a selected application including all requirement checks, scores, and blocking issues.",
    icon: "📊",
    badge: "Application",
  },
  {
    id: "expiring",
    title: "Expiring Documents Report",
    description: "All documents expiring within the next 30, 60, or 90 days across all records in the workspace.",
    icon: "📋",
    badge: "Documents",
  },
  {
    id: "employee",
    title: "Employee Compliance Report",
    description: "Halal role assignments, certification status, food handler certs, and typhoid vaccination records.",
    icon: "👥",
    badge: "Employees",
  },
  {
    id: "ingredient",
    title: "Ingredient Risk Report",
    description: "Risk analysis of all ingredients including risk flags, supplier cert status, and critical items without valid halal evidence.",
    icon: "🧪",
    badge: "Ingredients",
  },
];

const RECENT_REPORTS = [
  { name: "Readiness Report – APP-2024-001", generated: "2025-02-18", generatedBy: "Ahmad Faris", size: "245 KB", type: "Readiness" },
  { name: "Expiring Documents – Feb 2025", generated: "2025-02-15", generatedBy: "Nurul Hidayah", size: "88 KB", type: "Expiring Docs" },
  { name: "Employee Compliance – Q1 2025", generated: "2025-02-10", generatedBy: "Siti Aisyah", size: "156 KB", type: "Employee" },
  { name: "Ingredient Risk – All Locations", generated: "2025-02-01", generatedBy: "Nurul Hidayah", size: "312 KB", type: "Ingredient Risk" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Generate compliance and readiness reports for your workspace"
      />

      {/* Report cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {REPORT_TYPES.map((report) => (
          <Card key={report.id} className="hover:border-primary/30 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{report.icon}</span>
                  <div>
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">{report.badge}</Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="mt-2">{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <FileBarChart2 className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Recent Reports</CardTitle>
          </div>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>By</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_REPORTS.map((report) => (
                <TableRow key={report.name}>
                  <TableCell className="font-medium text-sm">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{report.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{report.generated}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{report.generatedBy}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{report.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
