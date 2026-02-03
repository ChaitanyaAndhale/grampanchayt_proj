import { useState } from "react";
import { useGramSabha, PublicMeeting } from "@/hooks/useGramSabha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Loader2, Pencil } from "lucide-react";

const GramSabhaManager = () => {
    const { data: meetings, loading, addMeeting, updateMeeting, deleteMeeting } = useGramSabha();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<PublicMeeting>>({
        year: new Date().getFullYear(),
        meeting_number: 1,
        meeting_date: new Date().toISOString().split('T')[0],
        agenda: "",
        present_count: 0,
        absent_count: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpen = (meeting?: PublicMeeting) => {
        if (meeting) {
            setIsEditing(true);
            setCurrentId(meeting.id);
            setFormData({
                year: meeting.year,
                meeting_number: meeting.meeting_number,
                meeting_date: meeting.meeting_date.split('T')[0],
                agenda: meeting.agenda,
                present_count: meeting.present_count,
                absent_count: meeting.absent_count,
            });
        } else {
            setIsEditing(false);
            setCurrentId(null);
            setFormData({
                year: new Date().getFullYear(),
                meeting_number: 1,
                meeting_date: new Date().toISOString().split('T')[0],
                agenda: "",
                present_count: 0,
                absent_count: 0,
            });
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        let success = false;
        if (isEditing && currentId) {
            success = await updateMeeting(currentId, formData);
        } else {
            success = await addMeeting(formData as Omit<PublicMeeting, "id">);
        }

        setIsSubmitting(false);
        if (success) {
            setIsOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Gram Sabha Records</h2>
                <Button onClick={() => handleOpen()} className="gap-2">
                    <Plus className="w-4 h-4" /> Add Record
                </Button>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Record" : "Add New Record"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Year</label>
                                <Input
                                    type="number"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meeting Number</label>
                                <Input
                                    type="number"
                                    value={formData.meeting_number}
                                    onChange={(e) => setFormData({ ...formData, meeting_number: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <Input
                                type="date"
                                value={formData.meeting_date}
                                onChange={(e) => setFormData({ ...formData, meeting_date: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Agenda / Remarks</label>
                            <Textarea
                                value={formData.agenda}
                                onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Present Count</label>
                                <Input
                                    type="number"
                                    value={formData.present_count}
                                    onChange={(e) => setFormData({ ...formData, present_count: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Absent Count</label>
                                <Input
                                    type="number"
                                    value={formData.absent_count}
                                    onChange={(e) => setFormData({ ...formData, absent_count: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Saving..." : "Save Record"}
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
                                <TableHead>Date</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Agenda</TableHead>
                                <TableHead>Present</TableHead>
                                <TableHead>Absent</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {meetings.map((meeting) => (
                                <TableRow key={meeting.id}>
                                    <TableCell>{new Date(meeting.meeting_date).toLocaleDateString()}</TableCell>
                                    <TableCell>{meeting.year}</TableCell>
                                    <TableCell className="max-w-xs truncate">{meeting.agenda}</TableCell>
                                    <TableCell>{meeting.present_count}</TableCell>
                                    <TableCell>{meeting.absent_count}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleOpen(meeting)}>
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => deleteMeeting(meeting.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {meetings.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        No records found.
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

export default GramSabhaManager;
