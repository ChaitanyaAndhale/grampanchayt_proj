import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { GramSabhaRecord } from "@/types/gramSabha";

const useGramSabha = () => {
  const [records, setRecords] = useState<GramSabhaRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gram_sabha")
      .select("*")
      .order("year", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setRecords(data);
    }
    setLoading(false);
  };

  const updateRecord = async (record: GramSabhaRecord) => {
    const { error } = await supabase
      .from("gram_sabha")
      .update(record)
      .eq("id", record.id);

    if (error) {
      setError(error.message);
    } else {
      fetchRecords(); // Refresh records after update
    }
  };

  const createRecord = async (newRecord: Omit<GramSabhaRecord, "id">) => {
    const { error } = await supabase
      .from("gram_sabha")
      .insert(newRecord);

    if (error) {
      setError(error.message);
    } else {
      fetchRecords(); // Refresh records after creation
    }
  };

  const deleteRecord = async (id: number) => {
    const { error } = await supabase
      .from("gram_sabha")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      fetchRecords(); // Refresh records after deletion
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return {
    records,
    loading,
    error,
    updateRecord,
    createRecord,
    deleteRecord,
  };
};

export default useGramSabha;