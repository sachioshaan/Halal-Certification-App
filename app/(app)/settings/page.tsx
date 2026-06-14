"use client";

import { useState } from "react";
import { CreditCard, Bell, Shield, Puzzle, Building2, CheckCircle2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import { invoices, workspace } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const SETTINGS_TABS = [
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Puzzle },
];

const NOTIFICATION_SETTINGS = [
  { id: "cert_expiry", label: "Certificate Expiry Alert", desc: "When a halal certificate is expiring within 30 days" },
  { id: "task_assigned", label: "Task Assigned to Me", desc: "When a task is assigned to your account" },
  { id: "app_status", label: "Application Status Change", desc: "When your application status changes" },
  { id: "doc_upload", label: "Document Uploaded", desc: "When a new document is added to the workspace" },
  { id: "ai_rec", label: "AI Recommendations", desc: "When AI generates new recommendations" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [notifications, setNotifications] = useState<Record<string, { email: boolean; inApp: boolean }>>({
    cert_expiry: { email: true, inApp: true },
    task_assigned: { email: true, inApp: true },
    app_status: { email: true, inApp: false },
    doc_upload: { email: false, inApp: true },
    ai_rec: { email: false, inApp: true },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage workspace, billing, and account preferences"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left nav */}
        <nav className="flex flex-row lg:flex-col gap-1 lg:w-48 shrink-0 overflow-x-auto">
          {SETTINGS_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left whitespace-nowrap",
                activeTab === id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Workspace */}
          {activeTab === "workspace" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Workspace Settings</CardTitle>
                <CardDescription>General workspace configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Workspace Name</Label>
                    <Input defaultValue={workspace.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Category</Label>
                    <Select defaultValue="fb">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fb">Food & Beverage</SelectItem>
                        <SelectItem value="logistics">Logistics</SelectItem>
                        <SelectItem value="cosmetics">Cosmetics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select defaultValue="kl">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kl">Asia/Kuala_Lumpur (UTC+8)</SelectItem>
                        <SelectItem value="sg">Asia/Singapore (UTC+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ms">Bahasa Malaysia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {/* Billing */}
          {activeTab === "billing" && (
            <div className="space-y-4">
              <Card className="border-primary/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">Current Plan: Pro</CardTitle>
                      <CardDescription>RM 299 / month · Renews 1 Mar 2025</CardDescription>
                    </div>
                    <Badge className="bg-primary">Pro</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Locations Used", value: "3 / 5" },
                      { label: "Users", value: "5 / 10" },
                      { label: "Documents", value: "15 / ∞" },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center rounded-lg bg-muted/50 p-3">
                        <div className="text-sm font-semibold">{value}</div>
                        <div className="text-xs text-muted-foreground">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">Update Payment Method</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Invoice History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>PDF</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((inv) => (
                        <TableRow key={inv.id}>
                          <TableCell className="font-medium text-sm">{inv.id}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{inv.date}</TableCell>
                          <TableCell className="text-sm font-medium">{inv.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs text-green-700 border-green-200 bg-green-50">{inv.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">Download</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about compliance events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  <div className="grid grid-cols-3 text-xs text-muted-foreground font-medium mb-3 pb-2 border-b">
                    <span>Event</span>
                    <span className="text-center">Email</span>
                    <span className="text-center">In-App</span>
                  </div>
                  {NOTIFICATION_SETTINGS.map((setting) => (
                    <div key={setting.id} className="grid grid-cols-3 items-center py-3 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{setting.label}</p>
                        <p className="text-xs text-muted-foreground">{setting.desc}</p>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [setting.id]: { ...prev[setting.id], email: !prev[setting.id].email },
                            }))
                          }
                          className={cn(
                            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                            notifications[setting.id]?.email ? "bg-primary" : "bg-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                              notifications[setting.id]?.email ? "translate-x-4" : "translate-x-0.5"
                            )}
                          />
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button
                          onClick={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [setting.id]: { ...prev[setting.id], inApp: !prev[setting.id].inApp },
                            }))
                          }
                          className={cn(
                            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                            notifications[setting.id]?.inApp ? "bg-primary" : "bg-gray-200"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                              notifications[setting.id]?.inApp ? "translate-x-4" : "translate-x-0.5"
                            )}
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">2FA Status</p>
                      <p className="text-xs text-muted-foreground">Currently disabled</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Active Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { device: "Chrome on Windows", location: "Kuala Lumpur, MY", time: "Now (current session)", current: true },
                    { device: "Safari on iPhone 15", location: "Kuala Lumpur, MY", time: "2 hours ago", current: false },
                  ].map((session) => (
                    <div key={session.device} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{session.device}</p>
                        <p className="text-xs text-muted-foreground">{session.location} · {session.time}</p>
                      </div>
                      {session.current ? (
                        <Badge variant="outline" className="text-xs text-green-700 border-green-200">Current</Badge>
                      ) : (
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">Revoke</Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Integrations */}
          {activeTab === "integrations" && (
            <div className="space-y-4">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">MYeHALAL Integration</CardTitle>
                      <CardDescription>Direct integration with JAKIM&apos;s MYeHALAL portal</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This integration will allow you to submit applications and sync data directly with the MYeHALAL portal. Available when HalalCert becomes a registered JAKIM-approved partner.
                  </p>
                  <Button variant="outline" className="mt-4" disabled>
                    Connect MYeHALAL
                  </Button>
                </CardContent>
              </Card>

              {[
                { name: "MySSM (Suruhanjaya Syarikat Malaysia)", desc: "Auto-fetch company registration data", status: "Coming Soon" },
                { name: "OCR Document Scanner", desc: "AI-powered document data extraction", status: "Available" },
                { name: "E-mail / SMTP", desc: "Custom email server for notifications", status: "Available" },
              ].map((int) => (
                <Card key={int.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-sm">{int.name}</CardTitle>
                        <CardDescription className="text-xs">{int.desc}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {int.status === "Available" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                        )}
                        <Button variant="outline" size="sm" disabled={int.status === "Coming Soon"} className="h-7 text-xs">
                          {int.status === "Available" ? "Configure" : "Soon"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
