"use client";

import { useState } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReadinessIndicator } from "@/components/shared/readiness-score";
import { menus, ingredients } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function MenusPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<typeof menus[0] | null>(null);

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

      {view === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {menus.map((menu) => (
            <Card
              key={menu.id}
              className="cursor-pointer hover:border-primary/30 transition-colors"
              onClick={() => setSelected(menu)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-sm font-medium">{menu.name}</CardTitle>
                  <div className={`h-2.5 w-2.5 rounded-full shrink-0 mt-1 ${menu.readiness === "pass" ? "bg-green-500" : menu.readiness === "warning" ? "bg-amber-500" : "bg-red-500"}`} />
                </div>
                <Badge variant="outline" className="text-xs w-fit">{menu.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground line-clamp-2">{menu.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{menu.ingredients.length} ingredients</span>
                  <span className={`font-medium ${menu.readiness === "pass" ? "text-green-600" : menu.readiness === "warning" ? "text-amber-600" : "text-red-600"}`}>
                    {menu.readinessScore}% ready
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{menu.locationName}</p>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.map((menu) => (
                  <TableRow key={menu.id} className="cursor-pointer" onClick={() => setSelected(menu)}>
                    <TableCell className="font-medium text-sm">{menu.name}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{menu.category}</Badge></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{menu.locationName}</TableCell>
                    <TableCell className="text-sm">{menu.ingredients.length}</TableCell>
                    <TableCell>
                      <ReadinessIndicator readiness={menu.readiness as "pass" | "warning" | "fail"} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
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
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
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
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
