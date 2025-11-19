-- Fix infinite recursion in students RLS by moving cross-table logic into a SECURITY DEFINER function

create or replace function public.hostel_admin_can_view_student(_student_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.applications a
    join public.hostels h on a.hostel_id = h.id
    where a.student_id = _student_id
      and h.admin_id = auth.uid()
  );
$$;

-- Replace the existing policy that referenced applications directly,
-- which together with applications' policies caused recursive evaluation

drop policy if exists "Hostel admins can view applicant students" on public.students;

create policy "Hostel admins can view applicant students"
  on public.students
  for select
  using (public.hostel_admin_can_view_student(id));