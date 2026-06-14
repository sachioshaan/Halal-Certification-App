"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { tasks, users } from "@/lib/mock-data";

type Task = typeof tasks[0];

const FILTER_OPTIONS = ["All", "Open", "In Progress", "Overdue", "Done"];

export default function TasksPage() {
  const [filter, setFilter] = useState("All");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const today = new Date("2025-02-20");

  const isOverdue = (task: Task) => {
    return (task.status === "Open" || task.status === "In Progress")
      && new Date(task.dueDate) < today;
  };

  const filtered = tasks.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Overdue") return isOverdue(t);
    return t.status === filter;
  });

  const overdueCount = tasks.filter(isOverdue).length;

  const byPriority = {
    High: filtered.filter((t) => t.priority === "High"),
    Medium: filtered.filter((t) => t.priority === "Medium"),
    Low: filtered.filter((t) => t.priority === "Low"),
  };

  const stats = [
    { label: "Open", value: tasks.filter((t) => t.status === "Open").length, color: "text-blue-600" },
    { label: "In Progress", value: tasks.filter((t) => t.status === "In Progress").length, color: "text-amber-600" },
    { label: "Overdue", value: overdueCount, color: "text-red-600" },
    { label: "Done", value: tasks.filter((t) => t.status === "Done").length, color: "text-green-600" },
  ];

  const getUserInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  const PrioritySection = ({ priority, items }: { priority: string; items: Task[] }) => {
    if (!items.length) return null;
    const color = priority === "High" ? "bg-red-500" : priority === "Medium" ? "bg-amber-500" : "bg-blue-400";
    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className={`h-2.5 w-2.5 rounded-full ${color}`} />
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{priority} Priority ({items.length})</h3>
        </div>
        <div className="space-y-2">
          {items.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/30 transition-colors ${isOverdue(task) ? "border-red-200 bg-red-50/30" : "bg-card"}`}
              onClick={() => setSelectedTask(task)}
            >
              <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{task.title}</p>
                  <StatusBadge status={isOverdue(task) ? "Blocked" : task.status} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{task.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs">{task.module}</Badge>
                  <span className={`text-xs ${isOverdue(task) ? "text-red-600 font-medium" : "text-muted-foreground"}`}>
                    Due {task.dueDate}
                  </span>
                </div>
              </div>
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {getUserInitials(task.assignedName)}
                </AvatarFallback>
              </Avatar>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Action centre for all compliance tasks and remediation items"
        action={
          <Button>
            <AlertCircle className="mr-2 h-4 w-4" />
            Create Task
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
              <CardTitle className="text-base">Task List</CardTitle>
              <CardDescription>{filtered.length} tasks</CardDescription>
            </div>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="h-8">
                {FILTER_OPTIONS.map((f) => (
                  <TabsTrigger key={f} value={f} className="text-xs h-7 px-2.5">
                    {f === "Overdue" ? (
                      <span className="flex items-center gap-1">
                        {f}
                        {overdueCount > 0 && (
                          <Badge className="ml-1 h-4 min-w-4 text-[10px] px-1 bg-destructive">{overdueCount}</Badge>
                        )}
                      </span>
                    ) : f}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <PrioritySection priority="High" items={byPriority.High} />
          <PrioritySection priority="Medium" items={byPriority.Medium} />
          <PrioritySection priority="Low" items={byPriority.Low} />
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-30" />
              No tasks in this category
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Detail Sheet */}
      <Sheet open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedTask && (
            <>
              <SheetHeader className="mb-6">
                <SheetTitle>{selectedTask.title}</SheetTitle>
                <SheetDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={selectedTask.status} />
                    <StatusBadge status={selectedTask.priority} />
                  </div>
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">{selectedTask.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ["Module", selectedTask.module],
                    ["Priority", selectedTask.priority],
                    ["Due Date", selectedTask.dueDate],
                    ["Assigned To", selectedTask.assignedName],
                    ["Source", selectedTask.source],
                    ["Created", selectedTask.createdDate],
                  ].map(([label, value]) => (
                    <div key={String(label)}>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">Update Status</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Open", "In Progress", "Done", "Dismissed"].map((s) => (
                      <Button
                        key={s}
                        variant={selectedTask.status === s ? "default" : "outline"}
                        size="sm"
                        className="h-7 text-xs"
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
