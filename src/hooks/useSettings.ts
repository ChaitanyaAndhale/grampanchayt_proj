import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export interface SiteSetting {
    key: string;
    value: string;
}

export const useSettings = () => {
    const [settings, setSettings] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from("site_settings").select("*");

            if (error) throw error;

            const settingsMap = (data || []).reduce((acc, curr) => {
                acc[curr.key] = curr.value;
                return acc;
            }, {} as Record<string, string>);

            setSettings(settingsMap);
        } catch (error) {
            console.error("Error fetching settings:", error);
            // Don't show toast on initial load failure to avoid annoyance if table is empty
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSetting = async (key: string, value: string) => {
        try {
            const { error } = await supabase
                .from("site_settings")
                .upsert([{ key, value }]);

            if (error) throw error;
            toast.success("Setting updated");
            fetchSettings();
            return true;
        } catch (error: any) {
            console.error("Error updating setting:", error);
            toast.error(`Failed to update setting: ${error.message || error.error_description || "Unknown error"}`);
            return false;
        }
    };

    const uploadImage = async (file: File) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `hero-bg-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('gallery').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error: any) {
            console.error("Error uploading image:", error);
            toast.error(`Failed to upload image: ${error.message || "Unknown error"}`);
            return null;
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return { settings, loading, updateSetting, uploadImage, refetch: fetchSettings };
};
