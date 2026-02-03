import { supabase } from '../lib/supabaseClient';

export interface Meeting {
  id?: string;
  year: number;
  meeting_number: number;
  meeting_date: string; // ISO date
  agenda: string;
  present_count: number;
  absent_count: number;
  created_at?: string;
  updated_at?: string;
}

export const fetchAllMeetings = async (): Promise<Meeting[]> => {
  const { data, error } = await supabase
    .from<Meeting>('gram_sabha_meetings')
    .select('*')
    .order('year', { ascending: false })
    .order('meeting_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
};

export const fetchMeetingsByYear = async (year: number): Promise<Meeting[]> => {
  const { data, error } = await supabase
    .from<Meeting>('gram_sabha_meetings')
    .select('*')
    .eq('year', year)
    .order('meeting_date', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
};

export const createMeeting = async (meeting: Meeting): Promise<Meeting> => {
  const { data, error } = await supabase.from<Meeting>('gram_sabha_meetings').insert([meeting]).select().single();
  if (error) throw new Error(error.message);
  return data as Meeting;
};

export const updateMeeting = async (id: string, updates: Partial<Meeting>): Promise<Meeting> => {
  const { data, error } = await supabase
    .from<Meeting>('gram_sabha_meetings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Meeting;
};

export const deleteMeeting = async (id: string): Promise<void> => {
  const { error } = await supabase.from('gram_sabha_meetings').delete().eq('id', id);
  if (error) throw new Error(error.message);
};
