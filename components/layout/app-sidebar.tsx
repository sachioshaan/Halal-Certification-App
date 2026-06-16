"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Building2,
  MapPin,
  Users,
  UserCog,
  Truck,
  FlaskConical,
  UtensilsCrossed,
  FolderOpen,
  CheckSquare,
  ClipboardList,
  BarChart3,
  Sparkles,
  Settings,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { tasks, workspace } from "@/lib/mock-data";

const openTaskCount = tasks.filter((t) => t.status === "Open").length;

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  const [businessOpen, setBusinessOpen] = useState(true);
  const [halalOpen, setHalalOpen] = useState(true);

  return (
    <Sidebar collapsible="none">
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-1 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <ShieldCheck className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-sidebar-foreground">HalalCert</span>
            <span className="text-xs text-muted-foreground truncate max-w-[140px]">{workspace.name}</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* MAIN */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isActive("/dashboard")}
                render={<Link href="/dashboard" />}
              >
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isActive("/applications")}
                render={<Link href="/applications" />}
              >
                <FileText />
                <span>Applications</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* SETUP */}
        <SidebarGroup>
          <SidebarGroupLabel>Setup</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setBusinessOpen((v) => !v);
                }}
                onKeyDown={(e) => e.key === "Enter" && setBusinessOpen((v) => !v)}
                style={{ cursor: "pointer" }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors select-none"
              >
                <Building2 className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">Business Setup</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${businessOpen ? "rotate-180" : ""}`}
                />
              </div>
            </SidebarMenuItem>

            {businessOpen && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/business/company")} render={<Link href="/business/company" />}>
                    <Building2 className="h-4 w-4 shrink-0 ml-4" />
                    <span>Company</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/business/locations")} render={<Link href="/business/locations" />}>
                    <MapPin className="h-4 w-4 shrink-0 ml-4" />
                    <span>Locations</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/business/employees")} render={<Link href="/business/employees" />}>
                    <Users className="h-4 w-4 shrink-0 ml-4" />
                    <span>Employees</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/business/users")} render={<Link href="/business/users" />}>
                    <UserCog className="h-4 w-4 shrink-0 ml-4" />
                    <span>Users &amp; Roles</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* HALAL DATA */}
        <SidebarGroup>
          <SidebarGroupLabel>Halal Data</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  setHalalOpen((v) => !v);
                }}
                onKeyDown={(e) => e.key === "Enter" && setHalalOpen((v) => !v)}
                style={{ cursor: "pointer" }}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors select-none"
              >
                <FlaskConical className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">Halal Data</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${halalOpen ? "rotate-180" : ""}`}
                />
              </div>
            </SidebarMenuItem>

            {halalOpen && (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/halal-data/suppliers")} render={<Link href="/halal-data/suppliers" />}>
                    <Truck className="h-4 w-4 shrink-0 ml-4" />
                    <span>Suppliers</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/halal-data/ingredients")} render={<Link href="/halal-data/ingredients" />}>
                    <FlaskConical className="h-4 w-4 shrink-0 ml-4" />
                    <span>Ingredients</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/halal-data/menus")} render={<Link href="/halal-data/menus" />}>
                    <UtensilsCrossed className="h-4 w-4 shrink-0 ml-4" />
                    <span>Menus / Products</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive={isActive("/halal-data/documents")} render={<Link href="/halal-data/documents" />}>
                    <FolderOpen className="h-4 w-4 shrink-0 ml-4" />
                    <span>Documents</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        {/* COMPLIANCE */}
        <SidebarGroup>
          <SidebarGroupLabel>Compliance</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isActive("/compliance/tasks")}
                render={<Link href="/compliance/tasks" />}
              >
                <CheckSquare />
                <span>Tasks</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>{openTaskCount}</SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isActive("/compliance/checklists")}
                render={<Link href="/compliance/checklists" />}
              >
                <ClipboardList />
                <span>Checklists</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isActive("/compliance/reports")}
                render={<Link href="/compliance/reports" />}
              >
                <BarChart3 />
                <span>Reports</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* TOOLS */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={isActive("/ai-assistant")}
                render={<Link href="/ai-assistant" />}
              >
                <Sparkles />
                <span>AI Assistant</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={isActive("/settings")}
              render={<Link href="/settings" />}
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="h-auto py-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-xs font-medium">AF</AvatarFallback>
              </Avatar>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-sm font-medium truncate">Ahmad Faris</span>
                <span className="text-xs text-muted-foreground truncate">faris@nasilemaksb.com.my</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
