"use client";

import { useState } from "react";
import { Upload, Filter } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { documents } from "@/lib/mock-data";

const DOC_TYPES = ["All", "Company Registration", "Business Licence", "Food Premise Registration",
  "Halal Training Certificate", "Supplier Halal Certificate", "Ingredient Specification",
  "SOP", "Menu List", "Appointment Letter", "Pest Control Record", "Food Handler Certificate"];

export default function DocumentsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = typeFilter === "All"
    ? documents
    : documents.filter((d) => d.type === typeFilter);

  const stats = [
    { label: "Total", value: documents.length, color: "text-primary" },
    { label: "Valid", value: documents.filter((d) => d.status === "Valid").length, color: "text-green-600" },
    { label: "Expiring", value: documents.filter((d) => d.status === "Expiring Soon").length, color: "text-amber-600" },
    { label: "Expired", value: documents.filter((d) => d.status === "Expired").length, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Vault"
        description="Centralised storage for all compliance documents"
        action={
          <Button onClick={() => setUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
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

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">Documents</CardTitle>
              <CardDescription>{filtered.length} documents</CardDescription>
            </div>
            <div className="overflow-x-auto">
              <Tabs value={typeFilter} onValueChange={setTypeFilter}>
                <TabsList className="h-8">
                  {["All", "Company Registration", "Business Licence", "Halal Training Certificate", "Supplier Halal Certificate", "SOP"].map((t) => (
                    <TabsTrigger key={t} value={t} className="text-xs h-7 px-2.5">
                      {t === "Halal Training Certificate" ? "Halal Cert" : t === "Supplier Halal Certificate" ? "Supplier Cert" : t}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Linked To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>By</TableHead>
                <TableHead className="w-[80px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((doc) => (
                <TableRow
                  key={doc.id}
                  className={
                    doc.status === "Expiring Soon"
                      ? "bg-amber-50/40"
                      : doc.status === "Expired"
                      ? "bg-red-50/30"
                      : ""
                  }
                >
                  <TableCell className="font-medium text-sm">{doc.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{doc.type}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{doc.linkedTo}</TableCell>
                  <TableCell><StatusBadge status={doc.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.expiryDate ?? "—"}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.uploadDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.uploadedBy}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Upload a compliance document to the vault.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Document Name</Label>
              <Input placeholder="e.g., Supplier Cert – Delima Spices 2025" />
            </div>
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {DOC_TYPES.filter((t) => t !== "All").map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Expiry Date (if applicable)</Label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <Label>File</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 transition-colors">
                <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>Cancel</Button>
            <Button onClick={() => setUploadOpen(false)}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
