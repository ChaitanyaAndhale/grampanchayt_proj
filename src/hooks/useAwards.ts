import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export interface Award {
    id: string;
    title_mr: string;
    title_en: string;
    description_mr: string;
    description_en: string;
    year: string;
    award_date?: string;
    organization_mr: string;
    organization_en: string;
    image_url?: string;
    icon_name?: string;
    display_order: number;
    is_active: boolean;
}

export const useAwards = () => {
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAwards = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('awards')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setAwards(data || []);
        } catch (error) {
            console.error('Error fetching awards:', error);
            toast.error('Failed to load awards');
        } finally {
            setLoading(false);
        }
    };

    const addAward = async (award: Omit<Award, 'id'>) => {
        try {
            const { error } = await supabase
                .from('awards')
                .insert([award]);

            if (error) throw error;
            toast.success('पुरस्कार जोडला गेला! Award added successfully');
            fetchAwards();
            return true;
        } catch (error) {
            console.error('Error adding award:', error);
            toast.error('Failed to add award');
            return false;
        }
    };

    const updateAward = async (id: string, updates: Partial<Award>) => {
        try {
            const { error } = await supabase
                .from('awards')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            toast.success('पुरस्कार अपडेट झाला! Award updated successfully');
            fetchAwards();
            return true;
        } catch (error) {
            console.error('Error updating award:', error);
            toast.error('Failed to update award');
            return false;
        }
    };

    const deleteAward = async (id: string) => {
        try {
            const { error } = await supabase
                .from('awards')
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast.success('पुरस्कार हटवला गेला! Award deleted successfully');
            fetchAwards();
            return true;
        } catch (error) {
            console.error('Error deleting award:', error);
            toast.error('Failed to delete award');
            return false;
        }
    };

    const toggleActive = async (id: string, isActive: boolean) => {
        return await updateAward(id, { is_active: isActive });
    };

    useEffect(() => {
        fetchAwards();
    }, []);

    return {
        awards,
        loading,
        addAward,
        updateAward,
        deleteAward,
        toggleActive,
        refetch: fetchAwards,
    };
};
