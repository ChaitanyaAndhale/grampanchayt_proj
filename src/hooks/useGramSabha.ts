import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from "sonner";

export interface PublicMeeting {
  id: string;
  year: number;
  meeting_number: number;
  meeting_date: string; // ISO
  agenda: string;
  present_count: number;
  absent_count: number;
  file_url?: string;
}

export const useGramSabha = () => {
  const [data, setData] = useState<PublicMeeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: rows, error } = await supabase
        .from('gram_sabha_meetings')
        .select('id, year, meeting_number, meeting_date, agenda, present_count, absent_count, file_url')
        .order('year', { ascending: false })
        .order('meeting_date', { ascending: false });

      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      setData(rows ?? []);
    } catch (err: unknown) {
      console.error('Failed to fetch meetings:', err);
      setError((err as Error)?.message || 'Failed to fetch meetings');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMeeting = async (meeting: Omit<PublicMeeting, "id">) => {
    try {
      const { error } = await supabase.from("gram_sabha_meetings").insert([meeting]);
      if (error) throw error;
      toast.success("Meeting added successfully");
      fetchAll();
      return true;
    } catch (error: any) {
      console.error("Error adding meeting:", error);
      toast.error(`Failed to add meeting: ${error.message || "Unknown error"}`);
      return false;
    }
  };

  const updateMeeting = async (id: string, updates: Partial<PublicMeeting>) => {
    try {
      const { error } = await supabase
        .from("gram_sabha_meetings")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      toast.success("Meeting updated successfully");
      fetchAll();
      return true;
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Failed to update meeting");
      return false;
    }
  };

  const deleteMeeting = async (id: string) => {
    try {
      const { error } = await supabase
        .from("gram_sabha_meetings")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Meeting deleted successfully");
      fetchAll();
      return true;
    } catch (error) {
      console.error("Error deleting meeting:", error);
      toast.error("Failed to delete meeting");
      return false;
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data, loading, error, refetch: fetchAll, addMeeting, updateMeeting, deleteMeeting } as const;
};

export default useGramSabha;
