"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, Search, ChevronRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  applications: "Applications",
  new: "New Application",
  business: "Business Setup",
  company: "Company",
  locations: "Locations",
  employees: "Employees",
  users: "Users & Roles",
  "halal-data": "Halal Data",
  suppliers: "Suppliers",
  ingredients: "Ingredients",
  menus: "Menus / Products",
  documents: "Documents",
  compliance: "Compliance",
  tasks: "Tasks",
  checklists: "Checklists",
  reports: "Reports",
  "ai-assistant": "AI Assistant",
  settings: "Settings",
};

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];

  let path = "";
  for (const seg of segments) {
    path += `/${seg}`;
    const label = routeLabels[seg] ?? seg;
    crumbs.push({ label, href: path });
  }

  return crumbs;
}

export function TopBar() {
  const pathname = usePathname();
  const crumbs = buildBreadcrumbs(pathname);
  const [lang, setLang] = useState<"EN" | "MY">("EN");

  return (
    <header className="flex h-14 items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {i === crumbs.length - 1 ? (
              <span className="font-medium text-foreground">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-foreground transition-colors">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-56 pl-8 h-9 text-sm"
          />
        </div>

        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-1.5 text-xs font-medium"
          onClick={() => setLang(lang === "EN" ? "MY" : "EN")}
        >
          <Globe className="h-3.5 w-3.5" />
          <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold">{lang}</span>
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-destructive">
            5
          </Badge>
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">AF</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Ahmad Faris</p>
                <p className="text-xs text-muted-foreground">faris@nasilemaksb.com.my</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/login" className="w-full">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
