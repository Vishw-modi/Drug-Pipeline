import { createClient } from '@/lib/supabase/server';
import { UpcomingEvent } from '@/types/event';

export async function getEvents(): Promise<UpcomingEvent[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('upcoming_events').select('*').order('created_at', { ascending: false });
  if (error || !data) return [];
  return data;
}
