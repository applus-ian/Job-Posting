import { ApplicantProfile, EmergencyContact, Language } from "@/types/profile";
import { Card, CardHeader, CardContent } from "../ui/card";
import { capitalizeText } from "@/utils/capitalizeText";

export function ApplicantDetailsCard({
  applicant,
  emergencycontact,
  language,
}: {
  applicant: ApplicantProfile;
  emergencycontact: EmergencyContact[];
  language: Language[];
}) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="text-xl font-semibold">Personal Information</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm">
          <div>
            <p className="text-muted-foreground">First Name</p>
            <p>{applicant.first_name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Name</p>
            <p>{applicant.last_name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Middle Name</p>
            <p>{applicant.middle_name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Suffix</p>
            <p>{applicant.suffix}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Date of Birth</p>
            <p>{applicant.date_of_birth}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sex</p>
            <p>{applicant.sex}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Nationality</p>
            <p>{applicant.nationality}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Phone Number</p>
            <p>{applicant.phone_number}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Email</p>
            <p>{applicant.first_name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Languages</p>
            {language.length > 0 ? (
              language.map((lang, index) => (
                <div key={index} className="mt-1">
                  <p>{capitalizeText(lang.language)}</p>
                  <p className="text-muted-foreground text-xs">
                    {capitalizeText(lang.proficiency_level)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No languages provided.</p>
            )}
          </div>
          <div>
            <p className="text-muted-foreground">Emergency Contact</p>
            {emergencycontact.length > 0 ? (
              emergencycontact.map((contact, index) => (
                <div key={index} className="mt-1">
                  <p>{contact.full_name}</p>
                  <p className="text-muted-foreground text-xs">
                    {contact.relationship} – {contact.phone_number}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No emergency contacts provided.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
