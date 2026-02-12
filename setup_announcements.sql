-- Create announcements table
create table if not exists public.announcements (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text,
    event_date date not null,
    event_time text,
    location text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.announcements enable row level security;

-- Create policies
create policy "Allow public read access"
    on public.announcements for select
    using (true);

create policy "Allow authenticated users to insert"
    on public.announcements for insert
    with check (auth.role() = 'authenticated');

create policy "Allow authenticated users to update"
    on public.announcements for update
    using (auth.role() = 'authenticated');

create policy "Allow authenticated users to delete"
    on public.announcements for delete
    using (auth.role() = 'authenticated');

-- Create storage bucket for announcement images (optional/future proofing)
insert into storage.buckets (id, name, public) 
values ('announcements', 'announcements', true)
on conflict (id) do nothing;

create policy "Announcement Images Public Access"
  on storage.objects for select
  using ( bucket_id = 'announcements' );

create policy "Authenticated users can upload announcement images"
  on storage.objects for insert
  with check ( bucket_id = 'announcements' and auth.role() = 'authenticated' );
