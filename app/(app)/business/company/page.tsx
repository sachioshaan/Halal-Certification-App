"use client";

import { useState } from "react";
import { Edit, Building2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { company, documents, applications } from "@/lib/mock-data";

export default function CompanyPage() {
  const [editing, setEditing] = useState(false);
  const companyDocs = documents.filter((d) => d.linkedTo === "Company");
  const certHistory = applications.filter((a) => a.status === "Approved");

  const fields = [
    { label: "Company Name", value: company.name },
    { label: "Registration No (SSM)", value: company.registrationNo },
    { label: "Business Type", value: company.businessType },
    { label: "Business Category", value: company.businessCategory },
    { label: "Business Size", value: company.businessSize },
    { label: "Address", value: company.address },
    { label: "Contact Person", value: company.contactPerson },
    { label: "Phone", value: company.phone },
    { label: "Email", value: company.email },
    { label: "Website", value: company.website },
    { label: "Established", value: String(company.establishedYear) },
    { label: "MYeHALAL Reference", value: company.myeHalalRef },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Profile"
        description="Manage your company registration and contact details"
        action={
          <Button
            variant={editing ? "default" : "outline"}
            onClick={() => setEditing(!editing)}
          >
            <Edit className="mr-2 h-4 w-4" />
            {editing ? "Save Changes" : "Edit Profile"}
          </Button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Company Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-5">
                {fields.map(({ label, value }) => (
                  <div key={label} className={label === "Address" ? "sm:col-span-2" : ""}>
                    <Label className="text-muted-foreground text-xs">{label}</Label>
                    {editing ? (
                      <Input
                        defaultValue={value}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm font-medium mt-1">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Company Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm">Company Documents</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {companyDocs.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents uploaded</p>
              ) : (
                companyDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type}</p>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                ))
              )}
              <Button variant="outline" size="sm" className="w-full mt-2">
                Upload Document
              </Button>
            </CardContent>
          </Card>

          {/* Cert History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Halal Certification History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">No previous certifications</p>
              ) : (
                certHistory.map((cert) => (
                  <div key={cert.id} className="rounded-lg border bg-green-50/40 p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{cert.referenceNo}</span>
                      <StatusBadge status={cert.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">{cert.locationName}</p>
                    {cert.myeHalalRefNo && (
                      <p className="text-xs text-muted-foreground mt-0.5">MYeHALAL: {cert.myeHalalRefNo}</p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
