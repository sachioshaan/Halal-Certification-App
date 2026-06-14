import { cn } from "@/lib/utils";

interface ReadinessScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 80) return { text: "text-green-600", stroke: "#16a34a", bg: "bg-green-50" };
  if (score >= 50) return { text: "text-amber-600", stroke: "#d97706", bg: "bg-amber-50" };
  return { text: "text-red-600", stroke: "#dc2626", bg: "bg-red-50" };
}

export function ReadinessScore({ score, size = "md", showLabel = true, className }: ReadinessScoreProps) {
  const colors = getScoreColor(score);
  const sizes = {
    sm: { container: "w-12 h-12", text: "text-xs font-bold", r: 18, cx: 24, cy: 24, sw: 4 },
    md: { container: "w-20 h-20", text: "text-base font-bold", r: 32, cx: 40, cy: 40, sw: 5 },
    lg: { container: "w-32 h-32", text: "text-2xl font-bold", r: 54, cx: 64, cy: 64, sw: 7 },
  };

  const s = sizes[size];
  const circumference = 2 * Math.PI * s.r;
  const offset = circumference - (score / 100) * circumference;
  const svgSize = size === "sm" ? 48 : size === "md" ? 80 : 128;

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className={cn("relative", s.container)}>
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={s.sw}
          />
          <circle
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={s.sw}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(s.text, colors.text)}>{score}%</span>
        </div>
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground">Readiness</span>
      )}
    </div>
  );
}

interface ReadinessIndicatorProps {
  readiness: "pass" | "warning" | "fail";
  className?: string;
}

export function ReadinessIndicator({ readiness, className }: ReadinessIndicatorProps) {
  const config = {
    pass: { color: "bg-green-500", label: "Good" },
    warning: { color: "bg-amber-500", label: "Warning" },
    fail: { color: "bg-red-500", label: "Issues" },
  };
  const c = config[readiness];
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("w-2 h-2 rounded-full", c.color)} />
      <span className="text-xs text-muted-foreground">{c.label}</span>
    </span>
  );
}
