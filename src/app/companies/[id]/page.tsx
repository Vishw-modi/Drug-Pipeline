import { getCompanyDeepDive } from '@/services/companies.service';
import { notFound } from 'next/navigation';
import { CompanyProfileDashboard } from '@/components/companies/CompanyProfileDashboard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Company Profile | DRUGSCAPE',
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyProfilePage({ params }: PageProps) {
  const { id } = await params;
  const company = await getCompanyDeepDive(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--color-bg)]">
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
            <Link href="/companies" className="hover:text-[var(--color-brand-primary)] flex items-center gap-1 transition-colors">
              <ArrowLeft size={14} />
              Back to Companies
            </Link>
          </div>
          
          <CompanyProfileDashboard company={company} />
        </div>
      </div>
    </div>
  );
}
