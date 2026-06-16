"use client";

import { useState } from "react";
import { Sparkles, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Recommendation {
  id: string;
  text: string;
}

interface AiRecommendationsProps {
  recommendations: Recommendation[];
  className?: string;
}

export function AiRecommendations({ recommendations, className }: AiRecommendationsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const visible = recommendations.filter(
    (r) => !dismissed.has(r.id) && !accepted.has(r.id)
  );

  if (visible.length === 0) return null;

  return (
    <Card className={cn("border-primary/20 bg-primary/5", className)}>
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm flex items-center gap-2 text-primary">
          <Sparkles className="h-4 w-4" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {visible.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start justify-between gap-3 rounded-lg bg-background border px-3 py-2.5"
          >
            <p className="text-sm text-foreground leading-snug flex-1">{rec.text}</p>
            <div className="flex items-center gap-1 shrink-0 mt-0.5">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-green-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setAccepted((prev) => new Set(prev).add(rec.id))}
              >
                <Check className="h-3.5 w-3.5 mr-1" />
                Accept
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs text-muted-foreground hover:bg-muted"
                onClick={() => setDismissed((prev) => new Set(prev).add(rec.id))}
              >
                <X className="h-3.5 w-3.5 mr-1" />
                Dismiss
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
