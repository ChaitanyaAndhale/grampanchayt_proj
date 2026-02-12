interface YouTubeEmbedProps {
    url: string;
    title?: string;
    className?: string;
}

const YouTubeEmbed = ({ url, title = "Video", className = "" }: YouTubeEmbedProps) => {
    // Extract video ID from various YouTube URL formats
    const getYouTubeId = (url: string): string | null => {
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/,
        ];

        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    };

    const videoId = getYouTubeId(url);

    if (!videoId) {
        return (
            <div className={`aspect-video bg-muted rounded-lg flex items-center justify-center ${className}`}>
                <p className="text-muted-foreground">Invalid YouTube URL</p>
            </div>
        );
    }

    return (
        <div className={`relative aspect-video rounded-lg overflow-hidden shadow-lg ${className}`}>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
};

export default YouTubeEmbed;
