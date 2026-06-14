"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ChevronRight,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { tasks, workspace } from "@/lib/mock-data";

const openTaskCount = tasks.filter((t) => t.status === "Open").length;

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <Sidebar>
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
            <Collapsible defaultOpen={isActive("/business")} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger>
                  <SidebarMenuButton isActive={isActive("/business")}>
                    <Building2 />
                    <span>Business Setup</span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/business/company")}
                        render={<Link href="/business/company" />}
                      >
                        Company
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/business/locations")}
                        render={<Link href="/business/locations" />}
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        Locations
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/business/employees")}
                        render={<Link href="/business/employees" />}
                      >
                        <Users className="h-3.5 w-3.5" />
                        Employees
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/business/users")}
                        render={<Link href="/business/users" />}
                      >
                        <UserCog className="h-3.5 w-3.5" />
                        Users & Roles
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        {/* HALAL DATA */}
        <SidebarGroup>
          <SidebarGroupLabel>Halal Data</SidebarGroupLabel>
          <SidebarMenu>
            <Collapsible defaultOpen={isActive("/halal-data")} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger>
                  <SidebarMenuButton isActive={isActive("/halal-data")}>
                    <FlaskConical />
                    <span>Halal Data</span>
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/halal-data/suppliers")}
                        render={<Link href="/halal-data/suppliers" />}
                      >
                        <Truck className="h-3.5 w-3.5" />
                        Suppliers
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/halal-data/ingredients")}
                        render={<Link href="/halal-data/ingredients" />}
                      >
                        <FlaskConical className="h-3.5 w-3.5" />
                        Ingredients
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/halal-data/menus")}
                        render={<Link href="/halal-data/menus" />}
                      >
                        <UtensilsCrossed className="h-3.5 w-3.5" />
                        Menus / Products
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        isActive={isActive("/halal-data/documents")}
                        render={<Link href="/halal-data/documents" />}
                      >
                        <FolderOpen className="h-3.5 w-3.5" />
                        Documents
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
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
