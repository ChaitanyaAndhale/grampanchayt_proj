import React, { useState } from "react";
import { useAwards } from "@/hooks/useAwards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Loader2, Edit, Eye, EyeOff, Trophy, Award, Medal, Star, Calendar, MapPin, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";

const iconMap: Record<string, any> = {
    Trophy, Award, Medal, Star
};

const AwardsManager = () => {
    const { awards, loading, addAward, updateAward, deleteAward, toggleActive } = useAwards();
    const [isOpen, setIsOpen] = useState(false);
    const [editingAward, setEditingAward] = useState<any>(null);

    // Form states
    const [titleMr, setTitleMr] = useState("");
    const [titleEn, setTitleEn] = useState("");
    const [descriptionMr, setDescriptionMr] = useState("");
    const [descriptionEn, setDescriptionEn] = useState("");
    const [year, setYear] = useState("");
    const [awardDate, setAwardDate] = useState("");
    const [organizationMr, setOrganizationMr] = useState("");
    const [organizationEn, setOrganizationEn] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [iconName, setIconName] = useState("Trophy");
    const [displayOrder, setDisplayOrder] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdd = () => {
        resetForm();
        setEditingAward(null);
        setIsOpen(true);
    };

    const handleEdit = (award: any) => {
        setEditingAward(award);
        setTitleMr(award.title_mr);
        setTitleEn(award.title_en);
        setDescriptionMr(award.description_mr);
        setDescriptionEn(award.description_en);
        setYear(award.year || "");
        setAwardDate(award.award_date || "");
        setOrganizationMr(award.organization_mr || "");
        setOrganizationEn(award.organization_en || "");
        setImageUrl(award.image_url || "");
        setIconName(award.icon_name || "Trophy");
        setDisplayOrder(award.display_order || 0);
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let finalImageUrl = imageUrl;

            // Handle file upload if file is selected
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `award_${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('gallery')
                    .upload(filePath, file);

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    toast.error('Failed to upload image');
                    setIsSubmitting(false);
                    return;
                }

                const { data } = supabase.storage
                    .from('gallery')
                    .getPublicUrl(filePath);

                finalImageUrl = data.publicUrl;
            }

            const awardData = {
                title_mr: titleMr,
                title_en: titleEn,
                description_mr: descriptionMr,
                description_en: descriptionEn,
                year,
                award_date: awardDate || null,
                organization_mr: organizationMr,
                organization_en: organizationEn,
                image_url: finalImageUrl || null,
                icon_name: iconName,
                display_order: displayOrder,
                is_active: true,
            };

            let success;
            if (editingAward) {
                success = await updateAward(editingAward.id, awardData);
            } else {
                success = await addAward(awardData as any);
            }

            setIsSubmitting(false);
            if (success) {
                setIsOpen(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error submitting award:', error);
            toast.error('Failed to save award');
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('या पुरस्काराला हटवायचे आहे का? Are you sure you want to delete this award?')) {
            await deleteAward(id);
        }
    };

    const resetForm = () => {
        setTitleMr("");
        setTitleEn("");
        setDescriptionMr("");
        setDescriptionEn("");
        setYear("");
        setAwardDate("");
        setOrganizationMr("");
        setOrganizationEn("");
        setImageUrl("");
        setFile(null);
        setPreviewUrl("");
        setIconName("Trophy");
        setDisplayOrder(0);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">पुरस्कार व्यवस्थापन</h2>
                    <p className="text-muted-foreground mt-1">
                        Awards Management - सन्मान आणि उपलब्धी
                    </p>
                </div>
                <Button onClick={handleAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    नवीन पुरस्कार जोडा
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {awards.map((award) => {
                        const Icon = award.icon_name && iconMap[award.icon_name] ? iconMap[award.icon_name] : Trophy;

                        return (
                            <Card key={award.id} className="overflow-hidden">
                                {award.image_url && (
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={award.image_url}
                                            alt={award.title_mr}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {award.year}
                                        </div>
                                    </div>
                                )}

                                <CardHeader className="pb-3 bg-amber-50/50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-amber-500 text-white p-2 rounded-lg">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg">{award.title_mr}</CardTitle>
                                                <CardDescription className="text-xs mt-1">
                                                    {award.title_en}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 pt-4">
                                    {!award.image_url && award.year && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>{award.year}</span>
                                            {award.award_date && (
                                                <span className="text-xs">• {formatDate(award.award_date)}</span>
                                            )}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">मराठी:</p>
                                            <p className="text-sm line-clamp-2">{award.description_mr}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground mb-1">English:</p>
                                            <p className="text-sm line-clamp-2 text-muted-foreground">{award.description_en}</p>
                                        </div>
                                    </div>

                                    {award.organization_mr && (
                                        <div className="flex items-start gap-2 text-xs text-muted-foreground pt-2 border-t">
                                            <MapPin className="w-3 h-3 mt-0.5" />
                                            <span>{award.organization_mr}</span>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() => handleEdit(award)}
                                        >
                                            <Edit className="w-4 h-4 mr-1" /> संपादित करा
                                        </Button>
                                        <Button
                                            variant={award.is_active ? "outline" : "secondary"}
                                            size="sm"
                                            onClick={() => toggleActive(award.id, !award.is_active)}
                                        >
                                            {award.is_active ? (
                                                <Eye className="w-4 h-4" />
                                            ) : (
                                                <EyeOff className="w-4 h-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDelete(award.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetForm();
            }}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Trophy className="w-5 h-5 text-amber-600" />
                            {editingAward ? 'पुरस्कार संपादित करा - Edit Award' : 'नवीन पुरस्कार जोडा - Add New Award'}
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
                                    <Label htmlFor="title-mr">शीर्षक (Title) *</Label>
                                    <Input
                                        id="title-mr"
                                        value={titleMr}
                                        onChange={(e) => setTitleMr(e.target.value)}
                                        required
                                        placeholder="उदा: सर्वोत्तम ग्रामपंचायत पुरस्कार"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description-mr">विवरण (Description) *</Label>
                                    <Textarea
                                        id="description-mr"
                                        value={descriptionMr}
                                        onChange={(e) => setDescriptionMr(e.target.value)}
                                        required
                                        rows={4}
                                        placeholder="पुरस्काराची संपूर्ण माहिती मराठीत लिहा..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="organization-mr">संस्था (Organization) *</Label>
                                    <Input
                                        id="organization-mr"
                                        value={organizationMr}
                                        onChange={(e) => setOrganizationMr(e.target.value)}
                                        required
                                        placeholder="उदा: महाराष्ट्र शासन - ग्रामविकास विभाग"
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="english" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title-en">Title *</Label>
                                    <Input
                                        id="title-en"
                                        value={titleEn}
                                        onChange={(e) => setTitleEn(e.target.value)}
                                        required
                                        placeholder="e.g., Best Gram Panchayat Award"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description-en">Description *</Label>
                                    <Textarea
                                        id="description-en"
                                        value={descriptionEn}
                                        onChange={(e) => setDescriptionEn(e.target.value)}
                                        required
                                        rows={4}
                                        placeholder="Write complete information about the award in English..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="organization-en">Organization *</Label>
                                    <Input
                                        id="organization-en"
                                        value={organizationEn}
                                        onChange={(e) => setOrganizationEn(e.target.value)}
                                        required
                                        placeholder="e.g., Government of Maharashtra - Rural Development"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div className="space-y-2">
                                <Label htmlFor="year">वर्ष (Year) *</Label>
                                <Input
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                    placeholder="2024"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="award-date">तारीख (Award Date)</Label>
                                <Input
                                    id="award-date"
                                    type="date"
                                    value={awardDate}
                                    onChange={(e) => setAwardDate(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="icon">चिन्ह (Icon)</Label>
                                <Select value={iconName} onValueChange={setIconName}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Trophy">🏆 Trophy</SelectItem>
                                        <SelectItem value="Award">🏅 Award</SelectItem>
                                        <SelectItem value="Medal">🥇 Medal</SelectItem>
                                        <SelectItem value="Star">⭐ Star</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="display-order">क्रम (Display Order)</Label>
                                <Input
                                    id="display-order"
                                    type="number"
                                    value={displayOrder}
                                    onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t">
                            <Label htmlFor="image-file" className="flex items-center gap-2">
                                <ImageIcon className="w-4 h-4" />
                                प्रतिमा अपलोड करा (Upload Image) - Certificate/Photo
                            </Label>
                            <Input
                                id="image-file"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0];
                                    if (selectedFile) {
                                        setFile(selectedFile);
                                        // Create preview URL
                                        const url = URL.createObjectURL(selectedFile);
                                        setPreviewUrl(url);
                                        setImageUrl(""); // Clear URL if file is selected
                                    }
                                }}
                            />
                            <div className="text-center text-sm text-muted-foreground py-2">- किंवा / OR -</div>
                            <Input
                                id="image-url"
                                type="url"
                                value={imageUrl}
                                onChange={(e) => {
                                    setImageUrl(e.target.value);
                                    setFile(null); // Clear file if URL is entered
                                    setPreviewUrl(e.target.value);
                                }}
                                placeholder="https://example.com/award-certificate.jpg"
                            />
                            <p className="text-xs text-muted-foreground">
                                फाईल निवडा किंवा URL पेस्ट करा / Upload a file or paste URL
                            </p>
                            {previewUrl && (
                                <div className="mt-2 relative aspect-video rounded-md overflow-hidden border">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Invalid+Image";
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isSubmitting || !titleMr || !titleEn || !descriptionMr || !descriptionEn || !year}
                            >
                                {isSubmitting ? "जतन करत आहे..." : editingAward ? "अपडेट करा - Update" : "जोडा - Add"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                            >
                                रद्द करा - Cancel
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AwardsManager;
