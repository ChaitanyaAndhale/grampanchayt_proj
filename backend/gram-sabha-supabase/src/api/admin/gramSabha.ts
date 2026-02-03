import { supabase } from "@/lib/supabaseClient";
import { GramSabhaRecord } from "@/types/gramSabha";

// Function to create a new Gram Sabha record
export const createGramSabhaRecord = async (record: GramSabhaRecord) => {
  const { data, error } = await supabase
    .from("gram_sabha")
    .insert([record]);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Function to update an existing Gram Sabha record
export const updateGramSabhaRecord = async (id: number, updatedRecord: Partial<GramSabhaRecord>) => {
  const { data, error } = await supabase
    .from("gram_sabha")
    .update(updatedRecord)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Function to delete a Gram Sabha record
export const deleteGramSabhaRecord = async (id: number) => {
  const { data, error } = await supabase
    .from("gram_sabha")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Function to fetch all Gram Sabha records for a specific year
export const fetchGramSabhaRecordsByYear = async (year: number) => {
  const { data, error } = await supabase
    .from("gram_sabha")
    .select("*")
    .eq("year", year);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};