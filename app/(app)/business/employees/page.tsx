"use client";

import { useState } from "react";
import { Plus, Filter, Pencil, Trash2 } from "lucide-react";
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
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { AiRecommendations } from "@/components/shared/ai-recommendations";
import { employees, locations } from "@/lib/mock-data";

const AI_RECS = [
  {
    id: "emp-1",
    text: "Ahmad bin Razali's food handler certificate expires in 14 days. Renew and upload the new certificate to maintain compliance.",
  },
  {
    id: "emp-2",
    text: "Central Kitchen has no active Halal PIC assigned. Assign one from your existing employees to meet the Food Premises requirement.",
  },
];

export default function EmployeesPage() {
  const [locationFilter, setLocationFilter] = useState<string | null>("All Locations");
  const [roleFilter, setRoleFilter] = useState<string | null>("All Roles");
  const [editEmployee, setEditEmployee] = useState<typeof employees[0] | null>(null);
  const [deleteEmployee, setDeleteEmployee] = useState<typeof employees[0] | null>(null);

  const filtered = employees.filter((e) => {
    const locOk = !locationFilter || locationFilter === "All Locations" || e.locationId === locationFilter;
    const roleOk = !roleFilter || roleFilter === "All Roles" || e.halalRole === roleFilter;
    return locOk && roleOk;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Track employee halal compliance status and certifications"
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Employees", value: employees.length, color: "text-primary" },
          { label: "Muslim", value: employees.filter((e) => e.status === "Muslim").length, color: "text-green-600" },
          { label: "With Halal Role", value: employees.filter((e) => e.halalRole).length, color: "text-blue-600" },
          { label: "Expiring Certs", value: employees.filter((e) => e.certStatus === "Expiring Soon" || e.foodHandlerCert === "Expiring Soon").length, color: "text-amber-600" },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="p-4 text-center">
              <div className={`text-xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AiRecommendations recommendations={AI_RECS} />

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Employee List</CardTitle>
              <CardDescription>{filtered.length} employees</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={locationFilter} onValueChange={(val) => setLocationFilter(val)}>
                <SelectTrigger className="w-40 h-8 text-xs">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  {locations.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={(val) => setRoleFilter(val)}>
                <SelectTrigger className="w-36 h-8 text-xs">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Roles">All Roles</SelectItem>
                  <SelectItem value="Halal PIC">Halal PIC</SelectItem>
                  <SelectItem value="Halal Supervisor">Halal Supervisor</SelectItem>
                  <SelectItem value="Halal Executive">Halal Executive</SelectItem>
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
                <TableHead>IC / Passport</TableHead>
                <TableHead>Nationality</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employment</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Halal Role</TableHead>
                <TableHead>Halal Cert</TableHead>
                <TableHead>Food Handler</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium text-sm">{emp.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">{emp.icNo}</TableCell>
                  <TableCell className="text-sm">{emp.nationality}</TableCell>
                  <TableCell><StatusBadge status={emp.status} /></TableCell>
                  <TableCell><StatusBadge status={emp.employmentType} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[140px] truncate">{emp.locationName}</TableCell>
                  <TableCell>
                    {emp.halalRole ? (
                      <StatusBadge status={emp.halalRole} />
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {emp.certStatus !== "N/A" ? (
                      <StatusBadge status={emp.certStatus} />
                    ) : (
                      <span className="text-xs text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={emp.foodHandlerCert} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditEmployee(emp)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => setDeleteEmployee(emp)}>
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

      {/* Edit Employee Dialog */}
      <Dialog open={!!editEmployee} onOpenChange={() => setEditEmployee(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>Update employee information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input defaultValue={editEmployee?.name} />
            </div>
            <div className="space-y-2">
              <Label>IC / Passport No</Label>
              <Input defaultValue={editEmployee?.icNo} />
            </div>
            <div className="space-y-2">
              <Label>Nationality</Label>
              <Input defaultValue={editEmployee?.nationality} />
            </div>
            <div className="space-y-2">
              <Label>Employment Type</Label>
              <Input defaultValue={editEmployee?.employmentType} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input defaultValue={editEmployee?.locationName} />
            </div>
            <div className="space-y-2">
              <Label>Halal Role</Label>
              <Input defaultValue={editEmployee?.halalRole ?? ""} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditEmployee(null)}>Cancel</Button>
            <Button onClick={() => setEditEmployee(null)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Employee Dialog */}
      <Dialog open={!!deleteEmployee} onOpenChange={() => setDeleteEmployee(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
            <DialogDescription>Are you sure you want to delete {deleteEmployee?.name}? This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteEmployee(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => setDeleteEmployee(null)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
