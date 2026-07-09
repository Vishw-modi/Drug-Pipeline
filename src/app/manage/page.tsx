import { redirect } from 'next/navigation';

export default function ManageIndex() {
  // Redirect to the first section by default
  redirect('/manage/companies');
}
