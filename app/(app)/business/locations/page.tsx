"use client";

import { useState } from "react";
import { Plus, MapPin, Users, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { ReadinessScore } from "@/components/shared/readiness-score";
import { locations, employees, menus } from "@/lib/mock-data";

export default function LocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  const stats = [
    { label: "Total Locations", value: locations.length, color: "text-primary" },
    { label: "Active", value: locations.filter((l) => l.status === "Active").length, color: "text-green-600" },
    { label: "Pending Certification", value: locations.filter((l) => !l.applications.length).length, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Locations"
        description="Manage your business premises and branches"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Location cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc) => {
          const locEmployees = employees.filter((e) => e.locationId === loc.id);
          const locMenus = menus.filter((m) => m.locationId === loc.id);
          return (
            <Card
              key={loc.id}
              className="cursor-pointer hover:border-primary/40 transition-colors"
              onClick={() => setSelectedLocation(loc)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-sm font-semibold">{loc.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{loc.city}, {loc.state}</p>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">{loc.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground line-clamp-2">{loc.address}</p>

                {/* Readiness */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Readiness</span>
                    <span className={`font-medium ${loc.readinessScore >= 80 ? "text-green-600" : loc.readinessScore >= 60 ? "text-amber-600" : "text-red-600"}`}>
                      {loc.readinessScore}%
                    </span>
                  </div>
                  <Progress value={loc.readinessScore} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {locEmployees.length} employees
                  </span>
                  <span className="flex items-center gap-1">
                    <UtensilsCrossed className="h-3 w-3" />
                    {locMenus.length} menus
                  </span>
                  <StatusBadge status={loc.status} />
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add new card */}
        <Card className="border-dashed border-2 hover:border-primary/40 cursor-pointer transition-colors flex items-center justify-center min-h-[200px]">
          <div className="text-center text-muted-foreground">
            <Plus className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-sm">Add New Location</p>
          </div>
        </Card>
      </div>

      {/* Location Detail Sheet */}
      <Sheet open={!!selectedLocation} onOpenChange={() => setSelectedLocation(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedLocation && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>{selectedLocation.name}</SheetTitle>
                <SheetDescription>{selectedLocation.type} · {selectedLocation.status}</SheetDescription>
              </SheetHeader>

              <div className="space-y-5">
                <ReadinessScore score={selectedLocation.readinessScore} size="md" className="items-start" />

                <div className="space-y-3">
                  {[
                    ["Type", selectedLocation.type],
                    ["Address", selectedLocation.address],
                    ["City", selectedLocation.city + ", " + selectedLocation.state],
                    ["Operating Since", selectedLocation.operatingStartDate],
                    ["Authority Licence", selectedLocation.localAuthorityLicence],
                    ["Food Premise Reg", selectedLocation.foodPremiseReg],
                  ].map(([label, value]) => (
                    <div key={String(label)}>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Employees</p>
                  {employees
                    .filter((e) => e.locationId === selectedLocation.id)
                    .map((emp) => (
                      <div key={emp.id} className="flex items-center justify-between py-1.5 border-b last:border-0 text-sm">
                        <span>{emp.name}</span>
                        {emp.halalRole && <Badge variant="outline" className="text-xs">{emp.halalRole}</Badge>}
                      </div>
                    ))}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Applications</p>
                  {selectedLocation.applications.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No applications yet</p>
                  ) : (
                    selectedLocation.applications.map((id) => (
                      <div key={id} className="text-sm text-primary">{id}</div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
