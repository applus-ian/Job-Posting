"use client";
import { SidebarLayout } from "@/components/sidebar-layout";
import { shortlistedColumn } from "@/components/tables/shortlisted-applicants/ShortlistedColumns";
import { ShortlistedTable } from "@/components/tables/shortlisted-applicants/ShortlistedTable";
import { useState } from "react";
import { useSavedApplicantQuery } from "@/hooks/query/useSavedApplicantQuery";
import { SkeletonApplication } from "@/components/skeletons/SkeletonApplication";
import { SavedApplicant } from "@/types/savedapplicant";
import { SavedApplicantConfirmModal } from "@/components/savedapplicant/SavedApplicantConfirmModal";
import { useRouter } from "next/navigation";

export default function ShortlistedApplicantPage() {
  const [savedApplicant, setSavedApplicant] = useState<SavedApplicant | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  // modal actions
  const handleAction = (actionKey: string, savedapplicant: SavedApplicant) => {
    setSavedApplicant(savedapplicant);
    if (actionKey === "unsave") {
      setOpenModal(true);
    } else if (actionKey == "viewApplicant") {
      router.push(`/hr/applications/${savedapplicant.applicant_id}/applicant`);
    } else if (actionKey == "viewApplication") {
      const application = savedapplicant.job_posting?.applications?.find(
        (app) => app.applicant_id === savedapplicant.applicant_id
      );
      router.push(
        `/hr/applications/${savedapplicant.applicant_id}/applicant/${application?.id}/view-application`
      );
    }
  };

  const { data, isLoading } = useSavedApplicantQuery();
  const { columns } = shortlistedColumn({ handleAction });

  return (
    <SidebarLayout breadcrumbs={[{ label: "Shortlisted Applicants", isCurrentPage: true }]}>
      {isLoading || !data ? (
        <SkeletonApplication />
      ) : (
        <>
          <div className="mb-2">
            <p className="text-2xl font-medium">Shortlisted Applicants</p>
          </div>
          <ShortlistedTable columns={columns} data={data.savedapplicants} />

          {/* modals  */}
          {savedApplicant && (
            <SavedApplicantConfirmModal
              savedapplicant={savedApplicant}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          )}
        </>
      )}
    </SidebarLayout>
  );
}
