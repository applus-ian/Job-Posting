import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ArrowRight } from "lucide-react";

// Simulated user data (replace with real backend data)
const user = {
  name: "Sayde Marie P. Elegino",
  avatar: "https://github.com/shadcn.png",
  isProfileComplete: false,
};

export function DashboardMessage() {
  return (
    <Card className="px-5 py-5 shadow-sm bg-orange-500">
      <CardContent className="p-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Left: Avatar and user info */}
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 hidden sm:flex rounded-full">
            <AvatarImage
              src={user.avatar}
              alt={user.name}
              className="rounded-full object-cover"
            />
            <AvatarFallback>{user.name.split(" ")[0][0]}{user.name.split(" ")[1]?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h6 className="text-lg font-semibold text-gray-100">{user.name}</h6>
            {!user.isProfileComplete && (
              <>
                <p className="text-sm text-gray-100">Your profile editing is not completed.</p>
                <p className="text-sm text-gray-100">
                  Complete your profile editing & build your custom Resume
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right: Edit Button */}
        <div className="ml-auto">
          <Button variant="outline" className="text-orange-500 hover:text-orange-600">
            Edit Profile
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}