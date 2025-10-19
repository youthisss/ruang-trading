'use client'

import { createContext, useContext, useState, ReactNode } from 'react';

type Submission = {
  id: string;
  name: string;
  email: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
  whatsapp?: string;
};

interface ModalProps {
  submission?: Submission;
}

interface AdminModalContextType {
  modalType: string | null;
  modalProps: ModalProps;
  openModal: (type: string, props?: ModalProps) => void;
  closeModal: () => void;
}

const AdminModalContext = createContext<AdminModalContextType | undefined>(undefined);

interface AdminModalProviderProps {
  children: ReactNode;
}

export function AdminModalProvider({ children }: AdminModalProviderProps) {
  const [modalType, setModalType] = useState<string | null>(null);
  
  const [modalProps, setModalProps] = useState<ModalProps>({}); 

  const openModal = (type: string, props: ModalProps = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const value = {
    modalType,
    modalProps,
    openModal,
    closeModal
  };

  return (
    <AdminModalContext.Provider value={value}>
      {children}
    </AdminModalContext.Provider>
  );
}

export function useAdminModal() {
  const context = useContext(AdminModalContext);
  if (context === undefined) {
    throw new Error('useAdminModal harus digunakan di dalam AdminModalProvider');
  }
  return context;
}