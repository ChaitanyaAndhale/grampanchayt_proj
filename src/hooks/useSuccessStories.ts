import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface SuccessStory {
    id: string;
    section_key: string;
    title_mr: string;
    title_en: string;
    content_mr: string;
    content_en: string;
    icon?: string;
    display_order: number;
    is_active: boolean;
    image_url?: string;
    created_at: string;
    updated_at: string;
}

export const useSuccessStories = () => {
    const [stories, setStories] = useState<SuccessStory[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('success_stories')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (error) {
                console.error('❌ Error fetching success stories:', error);
                throw error;
            }
            setStories(data || []);
        } catch (error) {
            console.error('Error fetching success stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStory = async (id: string, updates: Partial<SuccessStory>) => {
        try {
            console.log('📝 Updating success story:', { id, updates });

            const { error } = await supabase
                .from('success_stories')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) {
                console.error('❌ Supabase error:', error);
                throw error;
            }

            console.log('✅ Story updated successfully');
            toast.success('यश कहाणी अपडेट झाली');
            fetchStories();
            return true;
        } catch (error: any) {
            console.error('❌ Error updating story:', error);

            if (error.code === '42P01' || error.message?.includes('relation "success_stories" does not exist')) {
                toast.error('सारणी आढळली नाही! कृपया setup_success_stories.sql चालवा.');
            } else if (error.message) {
                toast.error(`अपडेट अयशस्वी: ${error.message}`);
            } else {
                toast.error('अपडेट करण्यात अयशस्वी');
            }
            return false;
        }
    };

    const toggleActive = async (id: string, is_active: boolean) => {
        return updateStory(id, { is_active });
    };

    useEffect(() => {
        fetchStories();
    }, []);

    return {
        stories,
        loading,
        updateStory,
        toggleActive,
        refetch: fetchStories,
    };
};
