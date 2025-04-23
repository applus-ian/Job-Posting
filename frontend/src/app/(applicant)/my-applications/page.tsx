"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MyApplicationPage() {
  return (
    <SidebarLayout>
      <div className="flex flex-col gap-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>My Application</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
