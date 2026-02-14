import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

export interface Video {
    id: string;
    youtube_url: string;
    title: string;
    description?: string;
    display_order: number;
    is_active: boolean;
    created_at: string;
}

export const useVideos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('videos')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (error) {
                console.error('❌ Error fetching videos:', error);
                if (error.message?.includes('relation "videos" does not exist')) {
                    console.error('🔴 Videos table does not exist! Run setup_videos.sql in Supabase.');
                }
                throw error;
            }
            setVideos(data || []);
        } catch (error) {
            console.error('Error fetching videos:', error);
            // Don't show error toast on initial load if table doesn't exist
        } finally {
            setLoading(false);
        }
    };

    const addVideo = async (youtube_url: string, title: string, description?: string) => {
        try {
            const { data, error } = await supabase
                .from('videos')
                .insert([{ youtube_url, title, description, display_order: videos.length }])
                .select();

            if (error) {
                console.error('❌ Supabase error:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                throw error;
            }

            toast.success('Video added successfully');
            fetchVideos();
            return true;
        } catch (error: any) {
            console.error('❌ Error adding video:', error);

            // Provide specific error messages based on error type
            if (error.code === '42P01' || error.message?.includes('relation "videos" does not exist')) {
                toast.error('Videos table not found! Please run setup_videos.sql in Supabase SQL Editor.');
                console.error('🔴 SOLUTION: Go to Supabase Dashboard → SQL Editor → Run setup_videos.sql');
            } else if (error.code === '42501') {
                toast.error('Permission denied. Please make sure you are logged in as admin.');
            } else if (error.message?.includes('JWT')) {
                toast.error('Authentication error. Please log out and log in again.');
            } else if (error.message) {
                toast.error(`Failed to add video: ${error.message}`);
            } else {
                toast.error('Failed to add video. Check browser console for details.');
            }
            return false;
        }
    };

    const updateVideo = async (id: string, updates: Partial<Video>) => {
        try {
            const { error } = await supabase
                .from('videos')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            toast.success('Video updated successfully');
            fetchVideos();
            return true;
        } catch (error: any) {
            console.error('Error updating video:', error);
            if (error.message) {
                toast.error(`Failed to update video: ${error.message}`);
            } else {
                toast.error('Failed to update video');
            }
            return false;
        }
    };

    const deleteVideo = async (id: string) => {
        try {
            const { error } = await supabase
                .from('videos')
                .delete()
                .eq('id', id);

            if (error) throw error;
            toast.success('Video deleted successfully');
            fetchVideos();
            return true;
        } catch (error: any) {
            console.error('Error deleting video:', error);
            if (error.message) {
                toast.error(`Failed to delete video: ${error.message}`);
            } else {
                toast.error('Failed to delete video');
            }
            return false;
        }
    };

    const toggleActive = async (id: string, is_active: boolean) => {
        return updateVideo(id, { is_active });
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return {
        videos,
        loading,
        addVideo,
        updateVideo,
        deleteVideo,
        toggleActive,
        refetch: fetchVideos,
    };
};
