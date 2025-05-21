"use client";
import { Separator } from "@radix-ui/react-separator";
import { AppSidebar } from "./app-sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./ui/sidebar";

interface BreadcrumbData {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface SidebarLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbData[];
}

export function SidebarLayout({ children, breadcrumbs }: SidebarLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <BreadcrumbItem
                      className={idx !== breadcrumbs.length - 1 ? "hidden md:block" : ""}
                    >
                      {item.href && !item.isCurrentPage ? (
                        <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {idx < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-5 pt-5 pb-12">
          {/* Content goes here  */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
