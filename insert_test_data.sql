-- Insert a test announcement to verify the system works
insert into public.announcements (
    title, 
    description, 
    event_date, 
    event_time, 
    location, 
    type, 
    is_active
) values (
    'Test Announcement', 
    'This is a test event to verify the system is working.', 
    CURRENT_DATE, 
    '10:00 AM', 
    'Gram Panchayat Office', 
    'general', 
    true
);
