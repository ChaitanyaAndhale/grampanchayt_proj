import { useState } from "react";
import { useVideos } from "@/hooks/useVideos";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Loader2, Edit, Eye, EyeOff } from "lucide-react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { Label } from "@/components/ui/label";

const VideosManager = () => {
    const { videos, loading, addVideo, updateVideo, deleteVideo, toggleActive } = useVideos();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!youtubeUrl || !title) return;

        setIsSubmitting(true);
        let success = false;

        if (editingId) {
            success = await updateVideo(editingId, { youtube_url: youtubeUrl, title, description });
        } else {
            success = await addVideo(youtubeUrl, title, description);
        }

        setIsSubmitting(false);
        if (success) {
            resetForm();
        }
    };

    const resetForm = () => {
        setIsOpen(false);
        setEditingId(null);
        setYoutubeUrl("");
        setTitle("");
        setDescription("");
    };

    const handleEdit = (video: any) => {
        setEditingId(video.id);
        setYoutubeUrl(video.youtube_url);
        setTitle(video.title);
        setDescription(video.description || "");
        setIsOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this video?")) {
            await deleteVideo(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Videos Manager</h2>
                <Dialog open={isOpen} onOpenChange={(open) => {
                    setIsOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" /> Add Video
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>{editingId ? "Edit Video" : "Add New Video"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="youtube-url">YouTube URL *</Label>
                                <Input
                                    id="youtube-url"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-muted-foreground">
                                    Paste any YouTube video URL (watch, share link, or shorts)
                                </p>
                            </div>

                            {youtubeUrl && (
                                <div className="space-y-2">
                                    <Label>Preview</Label>
                                    <YouTubeEmbed url={youtubeUrl} title={title || "Preview"} />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="Village Development Update"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of the video..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting || !youtubeUrl || !title}>
                                {isSubmitting ? "Saving..." : editingId ? "Update Video" : "Add Video"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <Card key={video.id} className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <YouTubeEmbed url={video.youtube_url} title={video.title} />

                                {video.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {video.description}
                                    </p>
                                )}

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleEdit(video)}
                                    >
                                        <Edit className="w-4 h-4 mr-1" /> Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => toggleActive(video.id, !video.is_active)}
                                    >
                                        {video.is_active ? (
                                            <Eye className="w-4 h-4" />
                                        ) : (
                                            <EyeOff className="w-4 h-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(video.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {videos.length === 0 && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No videos found. Add some to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default VideosManager;
