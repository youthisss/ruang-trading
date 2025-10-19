'use client'

import { useAdminModal } from '@/app/(admin)/admin/context/AdminModalContext'
import CreateSubmissionModal from '@/app/(admin)/admin/dashboard/CreateSubmissionModal'

export default function AdminModalManager() {
  const { modalType, modalProps } = useAdminModal()

  if (!modalType) {
    return null
  }
  switch (modalType) {
    case 'createSubmission':
      return <CreateSubmissionModal />
      
    case 'editSubmission':
      console.log("Data untuk diedit:", modalProps.submission)
      return null;

    default:
      return null
  }
}