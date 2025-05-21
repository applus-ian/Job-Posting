import { ApplicantProfile, Document } from "@/types/profile";

export const getApplicantInfoFeedback = ({
  applicant,
  documents,
}: {
  applicant: ApplicantProfile;
  documents: Document[];
}): {
  errors: string[];
  suggestions: string[];
} => {
  const errors: string[] = [];
  const suggestions: string[] = [];

  // Required fields
  if (!applicant.phone_number) errors.push("Phone number is required.");
  if (applicant.address_id === null || applicant.address_id === undefined)
    errors.push("Address information is missing.");
  if (!applicant.date_of_birth) errors.push("Date of birth must be provided.");
  if (!applicant.sex) errors.push("Sex must be specified.");

  // Optional suggestions
  const hasResume = documents.some((doc) => doc.type === "resume");
  const hasCoverLetter = documents.some((doc) => doc.type === "coverletter");

  if (!hasResume) suggestions.push("You can upload a resume to complete your application.");
  if (!hasCoverLetter)
    suggestions.push("Consider uploading a cover letter to strengthen your application.");

  return { errors, suggestions };
};
