import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Application statuses
  "Draft": { label: "Draft", className: "bg-gray-100 text-gray-700 border-gray-200" },
  "In Progress": { label: "In Progress", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "In Review": { label: "In Review", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "Submitted": { label: "Submitted", className: "bg-sky-100 text-sky-700 border-sky-200" },
  "Approved": { label: "Approved", className: "bg-green-100 text-green-700 border-green-200" },
  "Rejected": { label: "Rejected", className: "bg-red-100 text-red-700 border-red-200" },

  // Document / cert statuses
  "Valid": { label: "Valid", className: "bg-green-100 text-green-700 border-green-200" },
  "Expiring Soon": { label: "Expiring Soon", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "Expired": { label: "Expired", className: "bg-red-100 text-red-700 border-red-200" },
  "Missing": { label: "Missing", className: "bg-red-100 text-red-700 border-red-200" },
  "Uploaded": { label: "Uploaded", className: "bg-green-100 text-green-700 border-green-200" },
  "Pending Review": { label: "Pending Review", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "N/A": { label: "N/A", className: "bg-gray-100 text-gray-500 border-gray-200" },

  // Task statuses
  "Open": { label: "Open", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "Done": { label: "Done", className: "bg-green-100 text-green-700 border-green-200" },
  "Blocked": { label: "Blocked", className: "bg-red-100 text-red-700 border-red-200" },
  "Dismissed": { label: "Dismissed", className: "bg-gray-100 text-gray-500 border-gray-200" },

  // Risk levels
  "Low": { label: "Low", className: "bg-green-100 text-green-700 border-green-200" },
  "Medium": { label: "Medium", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "High": { label: "High", className: "bg-red-100 text-red-700 border-red-200" },

  // Halal roles
  "Halal PIC": { label: "Halal PIC", className: "bg-green-100 text-green-700 border-green-200" },
  "Halal Supervisor": { label: "Halal Supervisor", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "Halal Executive": { label: "Halal Executive", className: "bg-purple-100 text-purple-700 border-purple-200" },

  // User roles
  "Owner": { label: "Owner", className: "bg-purple-100 text-purple-700 border-purple-200" },
  "Admin": { label: "Admin", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "Application Manager": { label: "App Manager", className: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  "Consultant": { label: "Consultant", className: "bg-orange-100 text-orange-700 border-orange-200" },
  "Viewer": { label: "Viewer", className: "bg-gray-100 text-gray-600 border-gray-200" },

  // User status
  "Active": { label: "Active", className: "bg-green-100 text-green-700 border-green-200" },
  "Invited": { label: "Invited", className: "bg-amber-100 text-amber-700 border-amber-200" },
  "Inactive": { label: "Inactive", className: "bg-gray-100 text-gray-500 border-gray-200" },

  // Priority
  "Critical": { label: "Critical", className: "bg-red-100 text-red-700 border-red-200" },

  // Employee
  "Muslim": { label: "Muslim", className: "bg-green-100 text-green-700 border-green-200" },
  "Non-Muslim": { label: "Non-Muslim", className: "bg-gray-100 text-gray-600 border-gray-200" },
  "Permanent": { label: "Permanent", className: "bg-blue-100 text-blue-700 border-blue-200" },
  "Contract": { label: "Contract", className: "bg-orange-100 text-orange-700 border-orange-200" },
  "Part-time": { label: "Part-time", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-600 border-gray-200",
  };

  return (
    <Badge
      variant="outline"
      className={cn("font-medium text-xs", config.className, className)}
    >
      {config.label}
    </Badge>
  );
}
