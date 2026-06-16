"use client";

import { useState } from "react";
import { Plus, Eye } from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { AiRecommendations } from "@/components/shared/ai-recommendations";
import { suppliers } from "@/lib/mock-data";

const AI_RECS = [
  {
    id: "sup-1",
    text: "2 suppliers have no halal certificate on file. Consider requesting certificates from Pandan Rasa Sdn Bhd and Kilang Tepung Makmur before your next application renewal.",
  },
  {
    id: "sup-2",
    text: "Supplier 'Delima Spices Sdn Bhd' certificate expires in 28 days. Request a renewal now to avoid blocking your active Food Premises application.",
  },
];

export default function SuppliersPage() {
  const [selected, setSelected] = useState<typeof suppliers[0] | null>(null);

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

      <AiRecommendations recommendations={AI_RECS} />

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
                <TableHead className="w-[60px]">View</TableHead>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelected(sup)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>{selected.name}</SheetTitle>
                <SheetDescription>Supplier Detail</SheetDescription>
              </SheetHeader>
              <div className="space-y-4">
                {[
                  ["Registration No", selected.registrationNo],
                  ["Contact Person", selected.contactPerson],
                  ["Email", selected.email],
                  ["Phone", selected.phone],
                  ["Address", selected.address],
                  ["Halal Cert Body", selected.halalCertBody ?? "—"],
                  ["Halal Cert No", selected.halalCertNo ?? "—"],
                  ["Cert Expiry", selected.certExpiry ?? "—"],
                  ["Risk Level", selected.riskLevel],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Cert Status</p>
                  <StatusBadge status={selected.certStatus} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Supplied Ingredients</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.suppliedIngredients.map((ing) => (
                      <Badge key={ing} variant="secondary" className="text-xs">{ing}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
