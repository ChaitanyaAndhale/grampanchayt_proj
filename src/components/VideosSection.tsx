import { useVideos } from "@/hooks/useVideos";
import YouTubeEmbed from "./YouTubeEmbed";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Video } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import VideosBackground from "./VideosBackground";

const VideosSection = () => {
    const { videos, loading } = useVideos();
    const { t } = useLanguage();

    if (loading) {
        return (
            <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        );
    }

    if (videos.length === 0) {
        return null; // Don't show section if no videos
    }

    return (
        <section className="py-16 bg-white relative overflow-hidden">
            <VideosBackground />
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Video className="w-8 h-8 text-accent" />
                        <h2 className="text-3xl md:text-4xl font-bold text-accent">
                            {t.videos.title}
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t.videos.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {videos.map((video) => (
                        <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow border-gray-200">
                            <CardContent className="p-0">
                                <YouTubeEmbed url={video.youtube_url} title={video.title} />
                            </CardContent>
                            <CardHeader>
                                <CardTitle className="text-lg line-clamp-2 text-gray-800">{video.title}</CardTitle>
                                {video.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
                                        {video.description}
                                    </p>
                                )}
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideosSection;
