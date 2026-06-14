"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { locations, employees, menus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Scheme & Type" },
  { id: 2, label: "Business Info" },
  { id: 3, label: "Scope" },
  { id: 4, label: "Review" },
];

const SCHEMES = [
  { id: "food_premises", label: "Food Premises", desc: "Restaurants, cafés, kiosks, food trucks" },
  { id: "fb_product", label: "F&B Product", desc: "Packaged food & beverage products" },
];

const APP_TYPES = [
  { id: "new", label: "New Application" },
  { id: "renewal", label: "Renewal" },
  { id: "menu_addition", label: "Menu Addition" },
];

export default function NewApplicationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [scheme, setScheme] = useState("food_premises");
  const [appType, setAppType] = useState("new");
  const [locationId, setLocationId] = useState("loc-001");
  const [picId, setPicId] = useState("emp-001");
  const [selectedMenus, setSelectedMenus] = useState<string[]>(["menu-001", "menu-003"]);

  const selectedLocation = locations.find((l) => l.id === locationId);
  const selectedPic = employees.find((e) => e.id === picId);
  const halalPics = employees.filter((e) => e.halalRole === "Halal PIC");

  function toggleMenu(id: string) {
    setSelectedMenus((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  function handleCreate() {
    router.push("/applications/APP-001");
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <PageHeader
        title="New Application"
        description="Create a new halal certification application"
      />

      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  step > s.id
                    ? "bg-primary border-primary text-white"
                    : step === s.id
                    ? "border-primary text-primary"
                    : "border-gray-200 text-gray-400"
                )}
              >
                {step > s.id ? <Check className="h-4 w-4" /> : s.id}
              </div>
              <span className={cn("text-xs hidden sm:block", step === s.id ? "text-primary font-medium" : "text-muted-foreground")}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("h-0.5 flex-1 mx-2 -mt-4", step > s.id ? "bg-primary" : "bg-gray-200")} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Scheme & Application Type</CardTitle>
            <CardDescription>Select the certification scheme and type of application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Certification Scheme</Label>
              <div className="grid grid-cols-2 gap-3">
                {SCHEMES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScheme(s.id)}
                    className={cn(
                      "text-left rounded-lg border-2 p-4 transition-colors",
                      scheme === s.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="font-medium text-sm">{s.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Label>Application Type</Label>
              <div className="flex gap-2 flex-wrap">
                {APP_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setAppType(t.id)}
                    className={cn(
                      "rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors",
                      appType === t.id ? "border-primary bg-primary/5 text-primary" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Select the company and location for this application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Company</Label>
              <div className="rounded-lg border-2 border-primary bg-primary/5 p-4">
                <div className="font-medium text-sm">Nasi Lemak Sdn Bhd</div>
                <div className="text-xs text-muted-foreground">SSM: 202301012345 (1234567-H)</div>
              </div>
            </div>
            <div className="space-y-3">
              <Label>Location</Label>
              <div className="space-y-2">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocationId(loc.id)}
                    className={cn(
                      "w-full text-left rounded-lg border-2 p-4 transition-colors",
                      locationId === loc.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{loc.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{loc.address}</div>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0">{loc.type}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Scope & PIC</CardTitle>
            <CardDescription>Select menus/products to include and assign a Halal PIC</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Included Menus / Products</Label>
              <p className="text-xs text-muted-foreground">Select all menus that will be covered under this application</p>
              <div className="space-y-2">
                {menus.map((menu) => (
                  <label
                    key={menu.id}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border-2 p-3 cursor-pointer transition-colors",
                      selectedMenus.includes(menu.id) ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selectedMenus.includes(menu.id)}
                      onChange={() => toggleMenu(menu.id)}
                    />
                    <div className={cn(
                      "h-4 w-4 rounded border-2 flex items-center justify-center shrink-0",
                      selectedMenus.includes(menu.id) ? "border-primary bg-primary" : "border-gray-300"
                    )}>
                      {selectedMenus.includes(menu.id) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{menu.name}</div>
                      <div className="text-xs text-muted-foreground">{menu.category} · {menu.ingredients.length} ingredients</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Label>Halal PIC</Label>
              <div className="space-y-2">
                {halalPics.map((emp) => (
                  <button
                    key={emp.id}
                    onClick={() => setPicId(emp.id)}
                    className={cn(
                      "w-full text-left rounded-lg border-2 p-3 transition-colors",
                      picId === emp.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="font-medium text-sm">{emp.name}</div>
                    <div className="text-xs text-muted-foreground">{emp.locationName} · Cert expires {emp.certExpiry}</div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Create</CardTitle>
            <CardDescription>Review your application details before creating</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg bg-muted/50 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Certification Scheme</div>
                  <div className="font-medium">{scheme === "food_premises" ? "Food Premises" : "F&B Product"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Application Type</div>
                  <div className="font-medium capitalize">{appType.replace("_", " ")}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Company</div>
                  <div className="font-medium">Nasi Lemak Sdn Bhd</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Location</div>
                  <div className="font-medium">{selectedLocation?.name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Halal PIC</div>
                  <div className="font-medium">{selectedPic?.name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">Menus Included</div>
                  <div className="font-medium">{selectedMenus.length} menu(s)</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2">Selected Menus</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedMenus.map((mid) => {
                  const m = menus.find((x) => x.id === mid);
                  return m ? (
                    <Badge key={mid} variant="secondary" className="text-xs">{m.name}</Badge>
                  ) : null;
                })}
              </div>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 text-sm">
              <p className="text-blue-700">After creating this application, the Requirement Engine will evaluate your data and generate a readiness report with any tasks required.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          Previous
        </Button>
        {step < 4 ? (
          <Button onClick={() => setStep((s) => s + 1)}>
            Next <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleCreate}>
            Create Application <Check className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
