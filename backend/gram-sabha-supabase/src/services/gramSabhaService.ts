import { supabase } from '../lib/supabaseClient';
import { GramSabhaRecord } from '../types/gramSabha';

// Function to fetch all Gram Sabha records
export const fetchGramSabhaRecords = async () => {
  const { data, error } = await supabase
    .from<GramSabhaRecord>('gram_sabha_meetings')
    .select('*')
    .order('year', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

// Function to create a new Gram Sabha record
export const createGramSabhaRecord = async (record: GramSabhaRecord) => {
  const { data, error } = await supabase
    .from<GramSabhaRecord>('gram_sabha_meetings')
    .insert([record]);

  if (error) throw new Error(error.message);
  return data;
};

// Function to update an existing Gram Sabha record
export const updateGramSabhaRecord = async (id: number, updates: Partial<GramSabhaRecord>) => {
  const { data, error } = await supabase
    .from<GramSabhaRecord>('gram_sabha_meetings')
    .update(updates)
    .eq('id', id);

  if (error) throw new Error(error.message);
  return data;
};

// Function to delete a Gram Sabha record
export const deleteGramSabhaRecord = async (id: number) => {
  const { data, error } = await supabase
    .from<GramSabhaRecord>('gram_sabha_meetings')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
  return data;
};