import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export interface GalleryImage {
    id: string;
    url: string;
    caption: string | null;
    created_at: string;
}

export const useGallery = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchImages = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("gallery_images")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to load gallery images");
        } finally {
            setLoading(false);
        }
    }, []);

    const addImage = async (fileOrUrl: File | string, caption: string) => {
        try {
            let finalUrl = fileOrUrl;

            if (fileOrUrl instanceof File) {
                const file = fileOrUrl;
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('gallery')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('gallery')
                    .getPublicUrl(filePath);

                finalUrl = data.publicUrl;
            }

            const { error } = await supabase
                .from("gallery_images")
                .insert([{ url: finalUrl, caption }]);

            if (error) throw error;
            toast.success("Image added successfully");
            fetchImages();
            return true;
        } catch (error: any) {
            console.error("Error adding image:", error);
            toast.error(`Failed to add image: ${error.message || "Unknown error"}`);
            return false;
        }
    };

    const deleteImage = async (id: string) => {
        try {
            const { error } = await supabase
                .from("gallery_images")
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("Image deleted successfully");
            fetchImages();
            return true;
        } catch (error) {
            console.error("Error deleting image:", error);
            toast.error("Failed to delete image");
            return false;
        }
    };

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    return { images, loading, addImage, deleteImage, refetch: fetchImages };
};
