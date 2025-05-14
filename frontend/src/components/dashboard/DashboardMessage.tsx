import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";

export function DashboardMessage() {
  const { data: session } = useSession();

  return (
    <Card className="px-5 py-5 shadow-sm bg-orange-500">
      <CardContent className="p-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left: Avatar and user info */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 hidden sm:flex rounded-full">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="rounded-full object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-lg font-semibold text-gray-100">{session?.user.name}</h6>
            <p className="text-sm text-gray-100">Your profile is incompleted.</p>
            <p className="text-sm text-gray-100">
              Please complete your personal information or upload your resume or cover letter to
              proceed.
            </p>
          </div>
        </div>

        {/* Right: Edit Button */}
        <div className="ml-auto">
          <Button variant="outline" 
            className="text-orange-500 hover:text-orange-600
                      dark:bg-white dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-50">
            Edit Profile
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
