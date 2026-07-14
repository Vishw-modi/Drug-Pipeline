import { getCompaniesWithStats } from '@/services/companies.service';
import { CompaniesDirectory } from '@/components/companies/CompaniesDirectory';

export const metadata = {
  title: 'Companies Directory | DRUGSCAPE',
  description: 'Explore pharmaceutical companies and their drug portfolios',
};

export default async function CompaniesPage() {
  const companies = await getCompaniesWithStats();

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--color-bg)]">
      <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-main)] mb-1">Companies Directory</h1>
              <p className="text-[var(--color-muted)] text-sm">
                Browse pharmaceutical sponsors and analyze their drug portfolios
              </p>
            </div>
          </div>

          <CompaniesDirectory initialCompanies={companies} />
        </div>
      </div>
    </div>
  );
}
