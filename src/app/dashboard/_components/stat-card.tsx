import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
 title: string;
 value: string;
 change?: string;
 changeType?: "positive" | "negative" | "neutral";
 icon: LucideIcon;
 iconColor?: string;
}

export function StatCard({
 title,
 value,
 change,
 changeType,
 icon: Icon,
 iconColor,
}: StatCardProps) {
 return (
  <div className="bg-card rounded-xl p-6 shadow-sm border border-border transition-all duration-200 hover:shadow-md">
   <div className="flex items-start justify-between">
    <div>
     <p className="text-sm font-medium text-muted-foreground">{title}</p>
     <p className="text-2xl font-semibold mt-1">{value}</p>
     {change && (
      <p
       className={cn("text-sm mt-2 font-medium", {
        "text-success": changeType === "positive",
        "text-destructive": changeType === "negative",
        "text-muted-foreground": changeType === "neutral",
       })}
      >
       {change}
      </p>
     )}
    </div>
    <div className={cn("p-3 rounded-xl", iconColor)}>
     <Icon className="w-6 h-6" />
    </div>
   </div>
  </div>
 );
}
