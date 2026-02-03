import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export interface Member {
    id: string;
    name: string;
    designation: string;
    contact: string;
    email: string;
    photo_url: string;
    role: "sarpanch" | "upsarpanch" | "member";
    created_at: string;
}

export const useMembers = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMembers = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("members")
                .select("*")
                .order("created_at", { ascending: true });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error("Error fetching members:", error);
            toast.error("Failed to load members");
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadPhoto = async (file: File) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('members')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
            .from('members')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const addMember = async (member: Omit<Member, "id" | "created_at"> & { photoFile?: File }) => {
        try {
            let photo_url = member.photo_url;

            if (member.photoFile) {
                photo_url = await uploadPhoto(member.photoFile);
            }

            const { photoFile, ...memberData } = member;
            const finalMember = { ...memberData, photo_url };

            const { error } = await supabase.from("members").insert([finalMember]);
            if (error) throw error;
            toast.success("Member added successfully");
            fetchMembers();
            return true;
        } catch (error: any) {
            console.error("Error adding member:", error);
            toast.error(`Failed to add member: ${error.message || "Unknown error"}`);
            return false;
        }
    };

    const updateMember = async (id: string, updates: Partial<Member> & { photoFile?: File }) => {
        try {
            let photo_url = updates.photo_url;

            if (updates.photoFile) {
                photo_url = await uploadPhoto(updates.photoFile);
            }

            const { photoFile, ...updateData } = updates;
            const finalUpdates = { ...updateData };
            if (photo_url) finalUpdates.photo_url = photo_url;

            const { error } = await supabase
                .from("members")
                .update(finalUpdates)
                .eq("id", id);

            if (error) throw error;
            toast.success("Member updated successfully");
            fetchMembers();
            return true;
        } catch (error: any) {
            console.error("Error updating member:", error);
            toast.error(`Failed to update member: ${error.message || "Unknown error"}`);
            return false;
        }
    };

    const deleteMember = async (id: string) => {
        try {
            const { error } = await supabase.from("members").delete().eq("id", id);
            if (error) throw error;
            toast.success("Member deleted successfully");
            fetchMembers();
            return true;
        } catch (error) {
            console.error("Error deleting member:", error);
            toast.error("Failed to delete member");
            return false;
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    return { members, loading, addMember, updateMember, deleteMember, refetch: fetchMembers };
};
