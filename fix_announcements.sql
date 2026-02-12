-- 1. Drop existing policies to prevent conflicts
drop policy if exists "Allow public read access" on public.announcements;
drop policy if exists "Allow authenticated users to insert" on public.announcements;
drop policy if exists "Allow authenticated users to update" on public.announcements;
drop policy if exists "Allow authenticated users to delete" on public.announcements;

-- 2. Make sure the table exists (idempotent)
create table if not exists public.announcements (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    event_date date not null,
    event_time text,
    location text,
    type text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Security
alter table public.announcements enable row level security;

-- 4. Re-Apply Policies

-- CRITICAL: Allow EVERYONE (anon + authenticated) to VIEW data
create policy "Allow public read access"
    on public.announcements for select
    using (true);

-- Allow only LOGGED IN users to ADD data
create policy "Allow authenticated users to insert"
    on public.announcements for insert
    with check (auth.role() = 'authenticated');

-- Allow only LOGGED IN users to EDIT data
create policy "Allow authenticated users to update"
    on public.announcements for update
    using (auth.role() = 'authenticated');

-- Allow only LOGGED IN users to DELETE data
create policy "Allow authenticated users to delete"
    on public.announcements for delete
    using (auth.role() = 'authenticated');
