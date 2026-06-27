"use client";

import { useState } from "react";
import { Plus, Filter, Eye, Pencil, Trash2, Search } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { AiRecommendations } from "@/components/shared/ai-recommendations";
import { ingredients, menus } from "@/lib/mock-data";

const AI_RECS = [
  {
    id: "ing-1",
    text: "3 high-risk ingredients are linked to Nasi Lemak Special — Santan Segar, Pes Cili, and Pewarna Makanan. Recommend sourcing JAKIM-certified alternatives before the next application.",
  },
  {
    id: "ing-2",
    text: "Gelatin Serbuk (ING-008) has an expired certificate. This ingredient is marked Critical and will block any application that includes it.",
  },
];

const RISK_FLAG_LABELS: Record<string, { label: string; emoji: string; className: string }> = {
  "animal-derived": { label: "Animal", emoji: "🐄", className: "bg-orange-100 text-orange-700 border-orange-200" },
  "alcohol": { label: "Alcohol", emoji: "⚠️", className: "bg-red-100 text-red-700 border-red-200" },
  "gelatin": { label: "Gelatin", emoji: "🧪", className: "bg-purple-100 text-purple-700 border-purple-200" },
  "flavoring": { label: "Flavoring", emoji: "🌿", className: "bg-blue-100 text-blue-700 border-blue-200" },
};

export default function IngredientsPage() {
  const [riskFilter, setRiskFilter] = useState<string | null>("All Ingredients");
  const [search, setSearch] = useState("");
  const [viewIngredient, setViewIngredient] = useState<typeof ingredients[0] | null>(null);
  const [editIngredient, setEditIngredient] = useState<typeof ingredients[0] | null>(null);
  const [deleteIngredient, setDeleteIngredient] = useState<typeof ingredients[0] | null>(null);

  const filtered = ingredients.filter((ing) => {
    const filterOk = (() => {
      if (!riskFilter || riskFilter === "All Ingredients") return true;
      if (riskFilter === "High Risk / Critical") return ing.isCritical;
      if (riskFilter === "Cert Expired") return ing.certStatus === "Expired";
      if (riskFilter === "Cert Expiring") return ing.certStatus === "Expiring Soon";
      return true;
    })();
    const searchOk = !search.trim() || ing.name.toLowerCase().includes(search.toLowerCase()) || ing.brand.toLowerCase().includes(search.toLowerCase()) || ing.supplierName.toLowerCase().includes(search.toLowerCase());
    return filterOk && searchOk;
  });

  const stats = [
    { label: "Total", value: ingredients.length, color: "text-primary" },
    { label: "High Risk / Critical", value: ingredients.filter((i) => i.isCritical).length, color: "text-red-600" },
    { label: "Cert Valid", value: ingredients.filter((i) => i.certStatus === "Valid").length, color: "text-green-600" },
    { label: "Cert Expired", value: ingredients.filter((i) => i.certStatus === "Expired").length, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ingredients"
        description="Track ingredient halal status and risk flags"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Ingredient
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
              <CardTitle className="text-base">Ingredient List</CardTitle>
              <CardDescription>{filtered.length} ingredients</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, brand, supplier..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-8 w-56 text-xs"
                />
              </div>
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={riskFilter} onValueChange={(val) => setRiskFilter(val)}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Ingredients">All Ingredients</SelectItem>
                  <SelectItem value="High Risk / Critical">High Risk / Critical</SelectItem>
                  <SelectItem value="Cert Expired">Cert Expired</SelectItem>
                  <SelectItem value="Cert Expiring">Cert Expiring</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Risk Flags</TableHead>
                <TableHead>Critical</TableHead>
                <TableHead>Cert Status</TableHead>
                <TableHead>Cert Expiry</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((ing) => (
                <TableRow
                  key={ing.id}
                  className={
                    ing.certStatus === "Expired"
                      ? "bg-red-50/30"
                      : ing.certStatus === "Expiring Soon"
                      ? "bg-amber-50/30"
                      : ""
                  }
                >
                  <TableCell className="font-medium text-sm">{ing.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{ing.brand}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">{ing.supplierName}</TableCell>
                  <TableCell className="text-sm">{ing.countryOfOrigin}</TableCell>
                  <TableCell className="text-xs">
                    <Badge variant="outline">{ing.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ing.riskFlags.length === 0 ? (
                        <span className="text-xs text-muted-foreground">—</span>
                      ) : (
                        ing.riskFlags.map((flag) => {
                          const config = RISK_FLAG_LABELS[flag];
                          return config ? (
                            <Badge key={flag} variant="outline" className={`text-[10px] px-1.5 py-0 ${config.className}`}>
                              {config.emoji} {config.label}
                            </Badge>
                          ) : null;
                        })
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {ing.isCritical ? (
                      <Badge variant="outline" className="text-xs text-red-700 border-red-200 bg-red-50">Critical</Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell><StatusBadge status={ing.certStatus} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{ing.certExpiry ?? "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewIngredient(ing)}>
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditIngredient(ing)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteIngredient(ing)}>
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

      {/* View Ingredient Sheet */}
      <Sheet open={!!viewIngredient} onOpenChange={() => setViewIngredient(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto p-6">
          {viewIngredient && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>{viewIngredient.name}</SheetTitle>
                <SheetDescription>{viewIngredient.category} · {viewIngredient.brand}</SheetDescription>
              </SheetHeader>
              <div className="space-y-4">
                {[
                  ["Brand", viewIngredient.brand],
                  ["Supplier", viewIngredient.supplierName],
                  ["Manufacturer", viewIngredient.supplierName],
                  ["Country of Origin", viewIngredient.countryOfOrigin],
                  ["Category", viewIngredient.category],
                ].map(([label, value]) => (
                  <div key={String(label)}>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Risk Flags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {viewIngredient.riskFlags.length === 0 ? (
                      <span className="text-sm text-muted-foreground">None</span>
                    ) : (
                      viewIngredient.riskFlags.map((flag) => {
                        const config = RISK_FLAG_LABELS[flag];
                        return config ? (
                          <Badge key={flag} variant="outline" className={`text-xs ${config.className}`}>
                            {config.emoji} {config.label}
                          </Badge>
                        ) : null;
                      })
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Halal Certification</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={viewIngredient.certStatus} />
                      {viewIngredient.isCritical && (
                        <Badge variant="outline" className="text-xs text-red-700 border-red-200 bg-red-50">Critical</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Cert No: HC-{viewIngredient.id.replace("ING-", "")}-2024</p>
                    <p className="text-sm text-muted-foreground">Expiry: {viewIngredient.certExpiry ?? "—"}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Linked Menus</p>
                  <div className="space-y-1.5">
                    {menus.filter((m) => m.ingredients.includes(viewIngredient.id)).length === 0 ? (
                      <span className="text-sm text-muted-foreground">Not used in any menu</span>
                    ) : (
                      menus.filter((m) => m.ingredients.includes(viewIngredient.id)).map((m) => (
                        <div key={m.id} className="text-sm py-1 border-b last:border-0">
                          {m.name} <span className="text-muted-foreground">({m.category})</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Edit Ingredient Dialog */}
      <Dialog open={!!editIngredient} onOpenChange={() => setEditIngredient(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Ingredient</DialogTitle>
            <DialogDescription>Update ingredient information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={editIngredient?.name} />
            </div>
            <div className="space-y-2">
              <Label>Brand</Label>
              <Input defaultValue={editIngredient?.brand} />
            </div>
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Input defaultValue={editIngredient?.supplierName} />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input defaultValue={editIngredient?.countryOfOrigin} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input defaultValue={editIngredient?.category} />
            </div>
            <div className="space-y-2">
              <Label>Risk Flags</Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(RISK_FLAG_LABELS).map(([key, config]) => (
                  <label key={key} className="flex items-center gap-1.5 text-xs">
                    <input type="checkbox" defaultChecked={editIngredient?.riskFlags.includes(key as never)} className="rounded" />
                    {config.emoji} {config.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditIngredient(null)}>Cancel</Button>
            <Button onClick={() => setEditIngredient(null)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Ingredient Dialog */}
      <Dialog open={!!deleteIngredient} onOpenChange={() => setDeleteIngredient(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Ingredient</DialogTitle>
            <DialogDescription>Are you sure you want to delete {deleteIngredient?.name}? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteIngredient(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setDeleteIngredient(null)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
