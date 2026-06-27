"use client";

import { useState } from "react";
import { Plus, Eye, Pencil, Trash2, Search } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editSupplier, setEditSupplier] = useState<typeof suppliers[0] | null>(null);
  const [deleteSupplier, setDeleteSupplier] = useState<typeof suppliers[0] | null>(null);

  const filtered = suppliers.filter((s) => {
    const matchesSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.contactPerson.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.certStatus === statusFilter || (statusFilter === "Expired" && !s.halalCertNo);
    return matchesSearch && matchesStatus;
  });

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Supplier List</CardTitle>
              <CardDescription>{filtered.length} registered suppliers</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search suppliers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 w-48 text-xs"
                />
              </div>
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val ?? "All")}>
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Valid">Valid</SelectItem>
                  <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((sup) => (
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
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setSelected(sup)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditSupplier(sup)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteSupplier(sup)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto p-6">
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
                <div className="flex gap-2 pt-4 border-t mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { setSelected(null); setEditSupplier(selected); }}><Pencil className="mr-2 h-3.5 w-3.5" />Edit</Button>
                  <Button variant="destructive" size="sm" className="flex-1" onClick={() => { setSelected(null); setDeleteSupplier(selected); }}><Trash2 className="mr-2 h-3.5 w-3.5" />Delete</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Supplier Dialog */}
      <Dialog open={!!editSupplier} onOpenChange={() => setEditSupplier(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Supplier</DialogTitle>
            <DialogDescription>Update supplier information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Supplier Name</Label>
              <Input defaultValue={editSupplier?.name} />
            </div>
            <div className="space-y-2">
              <Label>Registration No</Label>
              <Input defaultValue={editSupplier?.registrationNo} />
            </div>
            <div className="space-y-2">
              <Label>Contact Person</Label>
              <Input defaultValue={editSupplier?.contactPerson} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={editSupplier?.email} />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue={editSupplier?.phone} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSupplier(null)}>Cancel</Button>
            <Button onClick={() => setEditSupplier(null)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Supplier Dialog */}
      <Dialog open={!!deleteSupplier} onOpenChange={() => setDeleteSupplier(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Supplier</DialogTitle>
            <DialogDescription>Are you sure you want to delete {deleteSupplier?.name}? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteSupplier(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setDeleteSupplier(null)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
