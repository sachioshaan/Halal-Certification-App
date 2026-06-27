"use client";

import { useState } from "react";
import { Plus, LayoutGrid, List, Eye, Pencil, Trash2, Search, Filter } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReadinessIndicator } from "@/components/shared/readiness-score";
import { AiRecommendations } from "@/components/shared/ai-recommendations";
import { menus, ingredients } from "@/lib/mock-data";

const AI_RECS = [
  {
    id: "menu-1",
    text: "Nasi Lemak Special could use Supplier Delima Spices' certified coconut milk as a direct substitute for the current uncertified brand — same grade, valid until Dec 2025.",
  },
  {
    id: "menu-2",
    text: "3 menu items have ingredients with no halal certificate. Resolve these before creating a new application to avoid blocking requirements.",
  },
];

export default function MenusPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<typeof menus[0] | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const filteredMenus = menus.filter((m) => {
    const catOk = categoryFilter === "All Categories" || m.category === categoryFilter;
    const searchOk = !search.trim() || m.name.toLowerCase().includes(search.toLowerCase()) || m.category.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  const categories = Array.from(new Set(menus.map((m) => m.category)));

  const stats = [
    { label: "Total Menus", value: menus.length, color: "text-primary" },
    { label: "Fully Ready", value: menus.filter((m) => m.readiness === "pass").length, color: "text-green-600" },
    { label: "Needs Attention", value: menus.filter((m) => m.readiness === "warning").length, color: "text-amber-600" },
    { label: "Blocked", value: menus.filter((m) => m.readiness === "fail").length, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menus / Products"
        description="Manage menu items and their ingredient composition"
        action={
          <div className="flex items-center gap-2">
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-none h-8"
                onClick={() => setView("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-none h-8"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Menu
            </Button>
          </div>
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

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menus by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val ?? "All Categories")}>
            <SelectTrigger className="w-40 h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Categories">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMenus.map((menu) => (
            <Card key={menu.id} className="hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-medium">{menu.name}</CardTitle>
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1 ${menu.readiness === "pass" ? "bg-green-500" : menu.readiness === "warning" ? "bg-amber-500" : "bg-red-500"}`} />
                </div>
                <Badge variant="outline" className="text-xs w-fit">{menu.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2">{menu.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{menu.ingredients.length} ingredients</span>
                  <span className={`font-medium ${menu.readiness === "pass" ? "text-green-600" : menu.readiness === "warning" ? "text-amber-600" : "text-red-600"}`}>
                    {menu.readinessScore}% ready
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{menu.locationName}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 text-xs"
                  onClick={() => setSelected(menu)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1.5" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Ingredients</TableHead>
                  <TableHead>Readiness</TableHead>
                  <TableHead className="w-[60px]">View</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMenus.map((menu) => (
                  <TableRow key={menu.id}>
                    <TableCell className="font-medium text-sm">{menu.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{menu.category}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{menu.locationName}</TableCell>
                    <TableCell className="text-sm">{menu.ingredients.length}</TableCell>
                    <TableCell>
                      <ReadinessIndicator readiness={menu.readiness as "pass" | "warning" | "fail"} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelected(menu)}
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
      )}

      {/* Menu Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto p-6">
          {selected && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>{selected.name}</SheetTitle>
                <SheetDescription>{selected.category} · {selected.locationName}</SheetDescription>
              </SheetHeader>

              <div className="space-y-5">
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <div className={`h-3 w-3 rounded-full ${selected.readiness === "pass" ? "bg-green-500" : selected.readiness === "warning" ? "bg-amber-500" : "bg-red-500"}`} />
                  <span className="text-sm font-medium">Readiness: {selected.readinessScore}%</span>
                </div>

                <p className="text-sm text-muted-foreground">{selected.description}</p>

                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase mb-3">Ingredients ({selected.ingredients.length})</p>
                  <div className="space-y-2">
                    {selected.ingredients.map((ingId) => {
                      const ing = ingredients.find((i) => i.id === ingId);
                      if (!ing) return null;
                      return (
                        <div key={ingId} className="flex items-center justify-between rounded-lg border p-2.5">
                          <div>
                            <p className="text-sm font-medium">{ing.name}</p>
                            <p className="text-xs text-muted-foreground">{ing.supplierName}</p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {ing.isCritical && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-red-600 border-red-200">Critical</Badge>
                            )}
                            <StatusBadge status={ing.certStatus} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t mt-4">
                  <Button variant="outline" size="sm" className="flex-1"><Pencil className="mr-2 h-3.5 w-3.5" />Edit</Button>
                  <Button variant="destructive" size="sm" className="flex-1"><Trash2 className="mr-2 h-3.5 w-3.5" />Delete</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
