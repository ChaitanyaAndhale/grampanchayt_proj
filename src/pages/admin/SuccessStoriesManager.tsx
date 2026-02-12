import React, { useState } from "react";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Edit, Eye, EyeOff, Sparkles, Trophy, Users, Leaf, GraduationCap, Home, Tractor, Heart, Shield, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const iconMap: Record<string, any> = {
    Sparkles, Trophy, Users, Leaf, GraduationCap, Home, Tractor, Heart, Shield
};

const SuccessStoriesManager = () => {
    const { stories, loading, updateStory, toggleActive } = useSuccessStories();
    const [isOpen, setIsOpen] = useState(false);
    const [editingStory, setEditingStory] = useState<any>(null);
    const [titleMr, setTitleMr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [contentMr, setContentMr] = useState("");
    const [contentEn, setContentEn] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEdit = (story: any) => {
        setEditingStory(story);
        setTitleMr(story.title_mr);
        setTitleEn(story.title_en);
        setContentMr(story.content_mr);
        setContentEn(story.content_en);
        setImageUrl(story.image_url || "");
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStory) return;

        setIsSubmitting(true);
        const success = await updateStory(editingStory.id, {
            title_mr: titleMr,
            title_en: titleEn,
            content_mr: contentMr,
            content_en: contentEn,
            image_url: imageUrl || null,
        });

        setIsSubmitting(false);
        if (success) {
            setIsOpen(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setEditingStory(null);
        setTitleMr("");
        setTitleEn("");
        setContentMr("");
        setContentEn("");
        setImageUrl("");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">यशोगाथा व्यवस्थापन</h2>
                    <p className="text-muted-foreground mt-1">
                        Success Stories Management - परिवर्तनाची प्रेरणादायी कहाणी
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story) => {
                        const Icon = story.icon && iconMap[story.icon] ? iconMap[story.icon] : Sparkles;

                        return (
                            <Card key={story.id} className="overflow-hidden">
                                <CardHeader className="pb-3 bg-primary/5">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{story.title_mr}</CardTitle>
                                                <CardDescription className="text-xs mt-1">
                                                    {story.title_en}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 pt-4">
                                    {story.image_url && (
                                        <div className="relative aspect-video rounded-md overflow-hidden border">
                                            <img
                                                src={story.image_url}
                                                alt={story.title_mr}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">मराठी:</p>
                                            <p className="text-sm line-clamp-3">{story.content_mr}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">English:</p>
                                            <p className="text-sm line-clamp-3 text-muted-foreground">{story.content_en}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleEdit(story)}
                                        >
                                            <Edit className="w-4 h-4 mr-1" /> संपादित करा
                                        </Button>
                                        <Button
                                            variant={story.is_active ? "outline" : "secondary"}
                                            size="sm"
                                            onClick={() => toggleActive(story.id, !story.is_active)}
                                        >
                                            {story.is_active ? (
                                                <Eye className="w-4 h-4" />
                                            ) : (
                                                <EyeOff className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetForm();
            }}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            {editingStory?.icon && iconMap[editingStory.icon] &&
                                React.createElement(iconMap[editingStory.icon], { className: "w-5 h-5 text-primary" })
                            }
                            यशोगाथा संपादित करा - Edit Success Story
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <Tabs defaultValue="marathi" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="marathi">मराठी</TabsTrigger>
                                <TabsTrigger value="english">English</TabsTrigger>
                            </TabsList>

                            <TabsContent value="marathi" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title-mr">शीर्षक (Marathi) *</Label>
                                    <Input
                                        id="title-mr"
                                        value={titleMr}
                                        onChange={(e) => setTitleMr(e.target.value)}
                                        required
                                        placeholder="उदा: आपल्या गावाचा परिवर्तन प्रवास"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content-mr">विवरण (Marathi) *</Label>
                                    <Textarea
                                        id="content-mr"
                                        value={contentMr}
                                        onChange={(e) => setContentMr(e.target.value)}
                                        required
                                        rows={6}
                                        placeholder="या विभागाची संपूर्ण माहिती मराठीत लिहा..."
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="english" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title-en">Title (English) *</Label>
                                    <Input
                                        id="title-en"
                                        value={titleEn}
                                        onChange={(e) => setTitleEn(e.target.value)}
                                        required
                                        placeholder="e.g., Village Transformation Journey"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content-en">Description (English) *</Label>
                                    <Textarea
                                        id="content-en"
                                        value={contentEn}
                                        onChange={(e) => setContentEn(e.target.value)}
                                        required
                                        rows={6}
                                        placeholder="Write complete information about this section in English..."
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="space-y-2">
                            <Label htmlFor="image-url" className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                प्रतिमा URL (Image URL) - Optional
                            </Label>
                            <Input
                                id="image-url"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            {imageUrl && (
                                <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting || !titleMr || !titleEn || !contentMr || !contentEn}
                            >
                                {isSubmitting ? "जतन करत आहे..." : "जतन करा - Save"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                रद्द करा
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SuccessStoriesManager;
