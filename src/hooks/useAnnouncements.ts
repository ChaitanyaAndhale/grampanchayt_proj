import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export interface Announcement {
    id: string;
    title: string;
    description: string;
    event_date: string;
    event_time?: string;
    location?: string;
    type?: string;
    is_active: boolean;
    created_at?: string;
}

export const useAnnouncements = () => {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("announcements")
                .select("*")
                .order("event_date", { ascending: true });

            if (error) {
                throw error;
            }

            setAnnouncements(data || []);
        } catch (error) {
            console.error("Error fetching announcements:", error);
            toast.error("Failed to load announcements");
        } finally {
            setLoading(false);
        }
    };

    const addAnnouncement = async (announcement: Omit<Announcement, "id" | "created_at">) => {
        try {
            const { data, error } = await supabase
                .from("announcements")
                .insert([announcement])
                .select()
                .single();

            if (error) throw error;

            setAnnouncements((prev) => [...prev, data]);
            toast.success("Announcement added successfully");
            return true;
        } catch (error) {
            console.error("Error adding announcement:", error);
            toast.error("Failed to add announcement");
            return false;
        }
    };

    const updateAnnouncement = async (id: string, updates: Partial<Announcement>) => {
        try {
            const { data, error } = await supabase
                .from("announcements")
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) throw error;

            setAnnouncements((prev) =>
                prev.map((item) => (item.id === id ? data : item))
            );
            toast.success("Announcement updated successfully");
            return true;
        } catch (error) {
            console.error("Error updating announcement:", error);
            toast.error("Failed to update announcement");
            return false;
        }
    };

    const deleteAnnouncement = async (id: string) => {
        try {
            const { error } = await supabase
                .from("announcements")
                .delete()
                .eq("id", id);

            if (error) throw error;

            setAnnouncements((prev) => prev.filter((item) => item.id !== id));
            toast.success("Announcement deleted successfully");
            return true;
        } catch (error) {
            console.error("Error deleting announcement:", error);
            toast.error("Failed to delete announcement");
            return false;
        }
    };

    const toggleActive = async (id: string, isActive: boolean) => {
        return await updateAnnouncement(id, { is_active: isActive });
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return {
        announcements,
        loading,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        toggleActive,
        refreshAnnouncements: fetchAnnouncements,
    };
};
