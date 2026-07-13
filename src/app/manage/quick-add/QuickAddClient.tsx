'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Company } from '@/types/company';
import { QuickAddForm } from '@/components/manage/forms/QuickAddForm';

export function QuickAddClient({ companies }: { companies: Company[] }) {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/manage/drugs');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/manage/drugs');
  };

  return (
    <QuickAddForm 
      companies={companies} 
      mode="create" 
      onSuccess={handleSuccess} 
      onCancel={handleCancel} 
    />
  );
}
