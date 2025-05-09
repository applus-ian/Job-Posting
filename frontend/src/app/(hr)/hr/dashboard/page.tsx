"use client";

import { SidebarLayout } from "@/components/sidebar-layout";
import { Calendar } from "@/components/ui/calendar";
import React, { useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FF6900",
  },
} satisfies ChartConfig;

export default function HrDashboardPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  // Get session data to verify authentication
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);
  
  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }
  
  return (
    <SidebarLayout>
      {/* Display authenticated user */}
      {session?.user && (
        <div className="bg-green-100 p-3 mt-4 rounded-md mb-4">
          <p className="text-green-800">
            Welcome, {session.user.name}! {session.user.email && `(${session.user.email})`}
          </p>
          {session.user.employee && (
            <p className="text-green-700 text-sm mt-1">
              Position: {session.user.employee.job_position || 'Not specified'} | 
              Department: {session.user.employee.department || 'Not specified'}
            </p>
          )}
        </div>
      )}
      
      <div className="mt-6">
        <div className="flex flex-col lg:flex-row w-full gap-6">
          <div className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Area Chart - Linear</CardTitle>
                <CardDescription>Showing total visitors for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" hideLabel />}
                    />
                    <Area
                      dataKey="desktop"
                      type="linear"
                      fill="var(--color-desktop)"
                      fillOpacity={0.4}
                      stroke="var(--color-desktop)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2 leading-none text-muted-foreground">
                      January - June 2024
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="flex flex-col w-auto gap-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full rounded-md border"
            />
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
