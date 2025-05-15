"use client";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalDetailsForm } from "./PersonalDetailsForm";
import { AddressDetailsForm } from "./AddressDetailsForm";
import { LanguageSection } from "./LanguageSection";
import { ApplicantProfile, ApplicantAddress, Language, EmergencyContact} from "@/types/profile";
import { EmergencyContactSection } from "./EmergencyContactSection";

export function PersonalInfoCard({ applicant, address, language, emergencycontact }: { applicant: ApplicantProfile, address: ApplicantAddress, language: Language[], emergencycontact: EmergencyContact[] }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-md md:text-xl">Personal Information</p>
      </div>
      <div className="w-full mt-4">
        <Card>
          <CardContent>
            <PersonalDetailsForm applicant={applicant}/>
            <LanguageSection language={language}/>
            <AddressDetailsForm address={address}/>
            <EmergencyContactSection emergencycontact={emergencycontact}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
