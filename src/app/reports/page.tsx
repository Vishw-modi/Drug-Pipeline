import { getDrugs } from '@/services/drugs.service';
import { ReportsClient } from './ReportsClient';

export const metadata = {
  title: 'Reports - Drugscape',
  description: 'View Prescribing Information reports for approved drugs.',
};

export default async function ReportsPage() {
  // Fetch all drugs
  const drugs = await getDrugs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-brand-navy)] mb-2">Prescribing Information Reports</h1>
          <p className="text-[var(--color-muted)] max-w-2xl">
            Access FDA-approved Prescribing Information (PI) PDFs for approved drugs in our database. Click on a drug to view its document directly.
          </p>
        </div>
      </div>
      
      <ReportsClient initialDrugs={drugs} />
    </div>
  );
}
