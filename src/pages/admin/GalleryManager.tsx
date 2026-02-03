import { useState } from "react";
import { useGallery } from "@/hooks/useGallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash2, Plus, Loader2 } from "lucide-react";

const GalleryManager = () => {
    const { images, loading, addImage, deleteImage } = useGallery();
    const [isOpen, setIsOpen] = useState(false);
    const [newUrl, setNewUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [newCaption, setNewCaption] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file && !newUrl) return;

        setIsSubmitting(true);
        // Pass file if exists, otherwise url
        const success = await addImage(file || newUrl, newCaption);
        setIsSubmitting(false);
        if (success) {
            setIsOpen(false);
            setNewUrl("");
            setFile(null);
            setPreviewUrl("");
            setNewCaption("");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Gallery Manager</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" /> Add Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Image</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAdd} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Image</label>
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
                                        required={!newUrl} // Required if no URL entered (though we are hiding URL input now, keeping logic flexible)
                                    />
                                    <div className="text-center text-sm text-muted-foreground">- OR -</div>
                                    <Input
                                        placeholder="https://example.com/image.jpg"
                                        value={newUrl}
                                        onChange={(e) => {
                                            setNewUrl(e.target.value);
                                            setFile(null);
                                            setPreviewUrl(e.target.value);
                                        }}
                                    />
                                </div>
                                {previewUrl && (
                                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Caption</label>
                                <Input
                                    placeholder="Village Event..."
                                    value={newCaption}
                                    onChange={(e) => setNewCaption(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isSubmitting || (!file && !newUrl)}>
                                {isSubmitting ? "Adding..." : "Add Image"}
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <Card key={image.id} className="overflow-hidden group">
                            <div className="relative aspect-video">
                                <img
                                    src={image.url}
                                    alt={image.caption || "Gallery Image"}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => deleteImage(image.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <p className="text-sm font-medium truncate">{image.caption || "No caption"}</p>
                            </CardContent>
                        </Card>
                    ))}
                    {images.length === 0 && (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No images found. Add some to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
