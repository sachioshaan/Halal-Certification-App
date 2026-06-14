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
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { employees, locations } from "@/lib/mock-data";

export default function EmployeesPage() {
  const [locationFilter, setLocationFilter] = useState<string | null>("all");
  const [roleFilter, setRoleFilter] = useState<string | null>("all");

  const filtered = employees.filter((e) => {
    const locOk = !locationFilter || locationFilter === "all" || e.locationId === locationFilter;
    const roleOk = !roleFilter || roleFilter === "all" || e.halalRole === roleFilter;
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
                  <SelectItem value="all">All Locations</SelectItem>
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
                  <SelectItem value="all">All Roles</SelectItem>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
