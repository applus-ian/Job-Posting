"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, User } from "lucide-react";
import { ApplicantProfile, Document } from "@/types/profile";
import { getApplicantInfoFeedback } from "@/utils/checkApplicantProfileCompletion";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export function DashboardMessage({
  applicant,
  documents,
}: {
  applicant: ApplicantProfile;
  documents: Document[];
}) {
  const { data: session } = useSession();
  const { errors, suggestions } = getApplicantInfoFeedback({ applicant, documents });

  if (errors.length === 0 && suggestions.length === 0) {
    return null;
  }

  return (
    <Card className="px-5 py-5 shadow-sm bg-orange-500">
      <CardContent className="p-0 flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10 rounded-lg">
              <AvatarImage src={session?.user.profile} alt={session?.user.name} />
              <AvatarFallback className="bg-muted">
                <User className="rounded-lg text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <h6 className="text-lg font-semibold text-gray-100">{session?.user.name}</h6>
          </div>

          <Link href="/profile" passHref>
            <Button variant="outline" className="text-orange-500 hover:text-orange-600">
              Edit Profile
              <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="flex justify-between items-start gap-4">
          {errors.length > 0 && (
            <div className="flex flex-col">
              <p className="text-sm text-gray-100">Your profile is incomplete:</p>
              <ul className="list-disc list-inside text-sm text-gray-100">
                {errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          {suggestions.length > 0 && (
            <div className="flex flex-col ">
              <p className="text-sm mt-2 text-gray-100">Suggestions to improve your profile:</p>
              <ul className="list-disc list-inside text-sm text-gray-100">
                {suggestions.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
