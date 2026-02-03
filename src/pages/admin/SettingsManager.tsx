import { useState, useEffect } from "react";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const SettingsManager = () => {
    const { settings, loading, updateSetting, uploadImage } = useSettings();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (settings) {
            setFormData(settings);
        }
    }, [settings]);

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async (key: string) => {
        setIsSubmitting(true);
        await updateSetting(key, formData[key]);
        setIsSubmitting(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Village Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Population</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.population || ""}
                                    onChange={(e) => handleChange("population", e.target.value)}
                                />
                                <Button onClick={() => handleSave("population")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Established Year</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.established_year || ""}
                                    onChange={(e) => handleChange("established_year", e.target.value)}
                                />
                                <Button onClick={() => handleSave("established_year")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Area (Acres)</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.area || ""}
                                    onChange={(e) => handleChange("area", e.target.value)}
                                />
                                <Button onClick={() => handleSave("area")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>



                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Phone Number</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.contact_phone || ""}
                                    onChange={(e) => handleChange("contact_phone", e.target.value)}
                                />
                                <Button onClick={() => handleSave("contact_phone")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.contact_email || ""}
                                    onChange={(e) => handleChange("contact_email", e.target.value)}
                                />
                                <Button onClick={() => handleSave("contact_email")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Address</label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.contact_address || ""}
                                    onChange={(e) => handleChange("contact_address", e.target.value)}
                                />
                                <Button onClick={() => handleSave("contact_address")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Page Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Our Heritage Description</label>
                            <div className="flex flex-col gap-2">
                                <textarea
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.heritage_desc || ""}
                                    onChange={(e) => handleChange("heritage_desc", e.target.value)}
                                />
                                <Button className="w-fit" onClick={() => handleSave("heritage_desc")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Community Life Description</label>
                            <div className="flex flex-col gap-2">
                                <textarea
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.community_desc || ""}
                                    onChange={(e) => handleChange("community_desc", e.target.value)}
                                />
                                <Button className="w-fit" onClick={() => handleSave("community_desc")} disabled={isSubmitting}>Save</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div >
        </div >
    );
};

export default SettingsManager;
