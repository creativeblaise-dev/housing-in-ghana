import React from "react";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type PerformanceDataTypes = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  remarks?: string;
};

const performanceData: PerformanceDataTypes[] = [
  {
    title: "Total Website Visits",
    value: "1,250.00",
    change: "+12.5%",
    trend: "up",
    remarks: "Good growth in traffic",
  },
  {
    title: "Subscribers",
    value: "1,234",
    change: "-20%",
    trend: "down",
    remarks: "Needs improvement in retention",
  },
  {
    title: "Active Accounts",
    value: "45,678",
    change: "+12.5%",
    trend: "up",
    remarks: "Strong user retention",
  },
  {
    title: "Magazine Downloads",
    value: "4.5%",
    change: "+4.5%",
    trend: "up",
    remarks: "Consistent growth in downloads",
  },
];

const AdminDashboardStats = () => {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs px-4 lg:px-0 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {performanceData.map((data, index) => {
        const { title, value, change, trend, remarks } = data;
        return (
          <Card className="@container/card" key={index}>
            <CardHeader>
              <CardDescription>{title}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {value}
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  {trend === "down" ? (
                    <IconTrendingDown className="size-4 text-red-500" />
                  ) : (
                    <IconTrendingUp className="size-4" />
                  )}
                  {change}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending {trend} this month{" "}
                {trend === "down" ? (
                  <IconTrendingDown className="size-4 text-red-500" />
                ) : (
                  <IconTrendingUp className="size-4" />
                )}
              </div>
              <div className="text-muted-foreground">{remarks}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminDashboardStats;
