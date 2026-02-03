import { useState } from "react";
import { useMembers, Member } from "@/hooks/useMembers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Loader2, Pencil } from "lucide-react";

const MembersManager = () => {
    const { members, loading, addMember, updateMember, deleteMember } = useMembers();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Member>>({
        name: "",
        designation: "",
        contact: "",
        email: "",
        photo_url: "",
        role: "member",
    });
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = (member?: Member) => {
        if (member) {
            setIsEditing(true);
            setCurrentId(member.id);
            setFormData({
                name: member.name,
                designation: member.designation,
                contact: member.contact,
                email: member.email,
                photo_url: member.photo_url,
                role: member.role,
            });
            setPreviewUrl(member.photo_url || "");
            setFile(null);
        } else {
            setIsEditing(false);
            setCurrentId(null);
            setFormData({
                name: "",
                designation: "",
                contact: "",
                email: "",
                photo_url: "",
                role: "member",
            });
            setPreviewUrl("");
            setFile(null);
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const dataToSubmit = {
            ...formData,
            photoFile: file || undefined
        };

        let success = false;
        if (isEditing && currentId) {
            success = await updateMember(currentId, dataToSubmit);
        } else {
            success = await addMember(dataToSubmit as any);
        }

        setIsSubmitting(false);
        if (success) {
            setIsOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Members Manager</h2>
                <Button onClick={() => handleOpen()} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Member
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Member" : "Add New Member"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Designation</label>
                                <Input
                                    value={formData.designation}
                                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value: Member["role"]) => setFormData({ ...formData, role: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sarpanch">Sarpanch</SelectItem>
                                        <SelectItem value="upsarpanch">Upsarpanch</SelectItem>
                                        <SelectItem value="member">Member</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Contact</label>
                                <Input
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Photo</label>
                            <div className="flex flex-col gap-4">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setFile(file);
                                            // Create preview URL
                                            const url = URL.createObjectURL(file);
                                            setPreviewUrl(url);
                                        }
                                    }}
                                />
                                <div className="text-center text-sm text-muted-foreground">- OR -</div>
                                <Input
                                    value={formData.photo_url}
                                    onChange={(e) => {
                                        setFormData({ ...formData, photo_url: e.target.value });
                                        setFile(null);
                                        setPreviewUrl(e.target.value);
                                    }}
                                    placeholder="https://example.com/photo.jpg"
                                />
                            </div>
                            {previewUrl && (
                                <div className="mt-2 relative w-24 h-24 rounded-full overflow-hidden border mx-auto">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Member"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map((member) => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium">{member.name}</TableCell>
                                    <TableCell>{member.designation}</TableCell>
                                    <TableCell className="capitalize">{member.role}</TableCell>
                                    <TableCell>{member.contact}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(member)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => deleteMember(member.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {members.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                        No members found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MembersManager;
