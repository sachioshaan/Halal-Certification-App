"use client";

import { useState } from "react";
import { Plus, Filter } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { AiRecommendations } from "@/components/shared/ai-recommendations";
import { ingredients } from "@/lib/mock-data";

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
  const [riskFilter, setRiskFilter] = useState<string | null>("all");

  const filtered = ingredients.filter((ing) => {
    if (!riskFilter || riskFilter === "all") return true;
    if (riskFilter === "high") return ing.isCritical;
    if (riskFilter === "expired") return ing.certStatus === "Expired";
    if (riskFilter === "expiring") return ing.certStatus === "Expiring Soon";
    return true;
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
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={riskFilter} onValueChange={(val) => setRiskFilter(val)}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ingredients</SelectItem>
                  <SelectItem value="high">High Risk / Critical</SelectItem>
                  <SelectItem value="expired">Cert Expired</SelectItem>
                  <SelectItem value="expiring">Cert Expiring</SelectItem>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
