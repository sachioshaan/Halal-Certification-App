import { Plus } from "lucide-react";
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
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { suppliers } from "@/lib/mock-data";

export default function SuppliersPage() {
  const stats = [
    { label: "Total Suppliers", value: suppliers.length, color: "text-primary" },
    { label: "Certified", value: suppliers.filter((s) => s.certStatus === "Valid").length, color: "text-green-600" },
    { label: "Expiring Soon", value: suppliers.filter((s) => s.certStatus === "Expiring Soon").length, color: "text-amber-600" },
    { label: "Expired / None", value: suppliers.filter((s) => s.certStatus === "Expired" || !s.halalCertNo).length, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers"
        description="Manage your halal-certified ingredient suppliers"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Supplier List</CardTitle>
          <CardDescription>{suppliers.length} registered suppliers</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Reg No</TableHead>
                <TableHead>Supplied Ingredients</TableHead>
                <TableHead>Halal Cert Body</TableHead>
                <TableHead>Cert Status</TableHead>
                <TableHead>Cert Expiry</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((sup) => (
                <TableRow
                  key={sup.id}
                  className={
                    sup.certStatus === "Expired"
                      ? "bg-red-50/30"
                      : sup.certStatus === "Expiring Soon"
                      ? "bg-amber-50/30"
                      : ""
                  }
                >
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{sup.name}</p>
                      <p className="text-xs text-muted-foreground">{sup.contactPerson}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">{sup.registrationNo}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {sup.suppliedIngredients.map((ing) => (
                        <span key={ing} className="text-xs bg-secondary px-1.5 py-0.5 rounded">{ing}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{sup.halalCertBody ?? "—"}</TableCell>
                  <TableCell><StatusBadge status={sup.certStatus} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{sup.certExpiry ?? "—"}</TableCell>
                  <TableCell><StatusBadge status={sup.riskLevel} /></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
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
