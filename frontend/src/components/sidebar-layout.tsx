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

export function SidebarLayout({ children }: { children: React.ReactNode }) {
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-5">
          {/* Content goes here  */}
          <div className="flex flex-col gap-1 px-1">
            <h1 className="text-xl font-semibold">
              Hello, Sayde Marie P. Elegino
            </h1>
            <p className="text-sm text-muted-foreground">
              Ready to find your next opportunity? Explore jobs or check your application updates.
            </p>
          </div>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
