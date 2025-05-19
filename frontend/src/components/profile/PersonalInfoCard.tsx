"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { ApplicantAddress, ApplicantProfile, EmergencyContact, Language } from "@/types/profile";
import { PersonalInfoHeader } from "./PersonalInfoHeader";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { LanguageSection } from "./LanguageSection";
import { EmergencyContactSection } from "./EmergencyContactSection";
import { AddressDetailsForm } from "./AddressDetailsForm";

export function PersonalInfoCard({
  applicant,
  language,
  emergencycontact,
  address,
}: {
  applicant: ApplicantProfile;
  language: Language[];
  emergencycontact: EmergencyContact[];
  address: ApplicantAddress;
}) {
  return (
    <div className="mt-6">
      <div className="w-full mt-4">
        <Card>
          <CardContent>
            <PersonalInfoHeader biography={applicant.biography ?? null} />
            <Separator />
            <PersonalDetailsForm applicant={applicant} />
            <Separator />
            <LanguageSection language={language} />
            <Separator />
            <EmergencyContactSection emergencycontact={emergencycontact} />
            <Separator />
            <AddressDetailsForm address={address} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
