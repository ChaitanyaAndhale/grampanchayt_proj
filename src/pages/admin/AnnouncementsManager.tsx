import React, { useState } from "react";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Edit, Eye, EyeOff, Calendar, MapPin, Plus, Trash2, Clock, Megaphone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AnnouncementsManager = () => {
    const { announcements, loading, addAnnouncement, updateAnnouncement, deleteAnnouncement, toggleActive } = useAnnouncements();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [location, setLocation] = useState("");
    const [type, setType] = useState("general");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = () => {
        resetForm();
        setEditingId(null);
        setIsOpen(true);
    };

    const handleEdit = (announcement: any) => {
        setEditingId(announcement.id);
        setTitle(announcement.title);
        setDescription(announcement.description || "");
        setEventDate(announcement.event_date);
        setEventTime(announcement.event_time || "");
        setLocation(announcement.location || "");
        setType(announcement.type || "general");
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const data = {
                title,
                description,
                event_date: eventDate,
                event_time: eventTime,
                location,
                type,
                is_active: true,
            };

            let success;
            if (editingId) {
                success = await updateAnnouncement(editingId, data);
            } else {
                success = await addAnnouncement(data);
            }

            if (success) {
                setIsOpen(false);
                resetForm();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this announcement?')) {
            await deleteAnnouncement(id);
        }
    };

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setEventDate("");
        setEventTime("");
        setLocation("");
        setType("general");
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Announcements</h2>
                    <p className="text-muted-foreground mt-1">
                        Manage upcoming events and public announcements
                    </p>
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Announcement
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {announcements.map((item) => (
                        <Card key={item.id} className={`overflow-hidden border-l-4 ${item.is_active ? 'border-l-green-500' : 'border-l-gray-300'}`}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                                        {item.type}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600 border-blue-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(item);
                                            }}
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-600 border-red-200"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(item.id);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardTitle className="text-lg mt-2 line-clamp-2">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(item.event_date)}</span>
                                    {item.event_time && (
                                        <>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <Clock className="w-4 h-4 ml-1" />
                                            <span>{item.event_time}</span>
                                        </>
                                    )}
                                </div>
                                {item.location && (
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span className="line-clamp-1">{item.location}</span>
                                    </div>
                                )}
                                <p className="text-muted-foreground line-clamp-2 mt-2">
                                    {item.description}
                                </p>

                                <div className="pt-2 flex justify-between items-center border-t mt-2">
                                    <span className={`text-xs font-medium ${item.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                                        {item.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-7 text-xs"
                                        onClick={() => toggleActive(item.id, !item.is_active)}
                                    >
                                        {item.is_active ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                                        {item.is_active ? 'Hide' : 'Show'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {announcements.length === 0 && (
                        <div className="col-span-full text-center py-10 bg-gray-50 rounded-lg border border-dashed">
                            <Megaphone className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No announcements found</p>
                            <p className="text-xs text-gray-400 mt-1">Create one to get started</p>
                        </div>
                    )}
                </div>
            )}

            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetForm();
            }}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit Announcement' : 'New Announcement'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                placeholder="Event Title"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date *</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Venue details"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select value={type} onValueChange={setType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="general">General</SelectItem>
                                    <SelectItem value="gram_sabha">Gram Sabha</SelectItem>
                                    <SelectItem value="festival">Festival/Program</SelectItem>
                                    <SelectItem value="scheme">Govt Scheme</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea
                                id="desc"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                placeholder="Details about the event..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Announcement"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AnnouncementsManager;
