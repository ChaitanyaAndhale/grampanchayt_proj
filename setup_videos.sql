-- Create videos table for YouTube video links
CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    youtube_url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access for active videos
CREATE POLICY "Allow public read access to active videos"
    ON public.videos
    FOR SELECT
    USING (is_active = true);

-- Allow authenticated users (admins) full access
CREATE POLICY "Allow authenticated users full access to videos"
    ON public.videos
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_videos_display_order ON public.videos(display_order);
CREATE INDEX IF NOT EXISTS idx_videos_is_active ON public.videos(is_active);

-- Insert sample data (optional)
INSERT INTO public.videos (youtube_url, title, description, display_order) VALUES
('https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Welcome to Our Village', 'Introduction to our beautiful village and its heritage', 1),
('https://www.youtube.com/watch?v=9bZkp7q19f0', 'Village Development Projects', 'Overview of ongoing development initiatives', 2)
ON CONFLICT DO NOTHING;
