-- =====================================================
-- COMPREHENSIVE RLS POLICIES FOR ALL TABLES
-- Security Fix: Implement proper access control
-- =====================================================

-- ============= STUDENTS TABLE =============
CREATE POLICY "Students can view own data"
ON public.students FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Students can update own data"
ON public.students FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Students can insert own data"
ON public.students FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Hostel admins can view applicant students"
ON public.students FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.applications a
    INNER JOIN public.hostels h ON a.hostel_id = h.id
    WHERE a.student_id = students.id
    AND h.admin_id = auth.uid()
  )
);

CREATE POLICY "Super admins can manage students"
ON public.students FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= HOSTELS TABLE =============
CREATE POLICY "Anyone can view approved hostels"
ON public.hostels FOR SELECT
USING (status = 'approved');

CREATE POLICY "Hostel admins can view own hostel"
ON public.hostels FOR SELECT
USING (auth.uid() = admin_id);

CREATE POLICY "Hostel admins can update own hostel"
ON public.hostels FOR UPDATE
USING (auth.uid() = admin_id);

CREATE POLICY "Hostel admins can insert own hostel"
ON public.hostels FOR INSERT
WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Super admins have full hostel access"
ON public.hostels FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= INSTITUTIONS TABLE =============
CREATE POLICY "Anyone can view approved institutions"
ON public.institutions FOR SELECT
USING (status = 'approved');

CREATE POLICY "Institution admins can view own institution"
ON public.institutions FOR SELECT
USING (auth.uid() = admin_id);

CREATE POLICY "Institution admins can update own institution"
ON public.institutions FOR UPDATE
USING (auth.uid() = admin_id);

CREATE POLICY "Institution admins can insert own institution"
ON public.institutions FOR INSERT
WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Super admins have full institution access"
ON public.institutions FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= DONORS TABLE =============
CREATE POLICY "Donors can view own profile"
ON public.donors FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Donors can update own profile"
ON public.donors FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Donors can insert own profile"
ON public.donors FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Super admins can manage donors"
ON public.donors FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= TRUSTEES TABLE =============
CREATE POLICY "Trustees can view own profile"
ON public.trustees FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Trustees can update own profile"
ON public.trustees FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Trustees can insert own profile"
ON public.trustees FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Super admins can manage trustees"
ON public.trustees FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= APPLICATIONS TABLE =============
CREATE POLICY "Students can view own applications"
ON public.applications FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = applications.student_id
    AND students.user_id = auth.uid()
  )
);

CREATE POLICY "Students can create own applications"
ON public.applications FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.students
    WHERE students.id = applications.student_id
    AND students.user_id = auth.uid()
  )
);

CREATE POLICY "Hostel admins view their applications"
ON public.applications FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.hostels
    WHERE hostels.id = applications.hostel_id
    AND hostels.admin_id = auth.uid()
  )
);

CREATE POLICY "Hostel admins update their applications"
ON public.applications FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.hostels
    WHERE hostels.id = applications.hostel_id
    AND hostels.admin_id = auth.uid()
  )
);

CREATE POLICY "Super admins manage applications"
ON public.applications FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= DONATIONS TABLE =============
CREATE POLICY "Donors can view own donations"
ON public.donations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.donors
    WHERE donors.id = donations.donor_id
    AND donors.user_id = auth.uid()
  )
);

CREATE POLICY "Donors can create own donations"
ON public.donations FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.donors
    WHERE donors.id = donations.donor_id
    AND donors.user_id = auth.uid()
  )
);

CREATE POLICY "Hostel admins view their donations"
ON public.donations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.hostels
    WHERE hostels.id = donations.hostel_id
    AND hostels.admin_id = auth.uid()
  )
);

CREATE POLICY "Super admins manage donations"
ON public.donations FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= PUBLIC CONTENT TABLES =============

-- BLOGS
CREATE POLICY "Anyone can view published blogs"
ON public.blogs FOR SELECT
USING (status = 'published' OR public.has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can manage blogs"
ON public.blogs FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- EVENTS
CREATE POLICY "Anyone can view active events"
ON public.events FOR SELECT
USING (status = 'active' OR public.has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can manage events"
ON public.events FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- MEDIA GALLERY
CREATE POLICY "Anyone can view media"
ON public.media_gallery FOR SELECT
USING (true);

CREATE POLICY "Super admins can manage media"
ON public.media_gallery FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- PODCASTS
CREATE POLICY "Anyone can view podcasts"
ON public.podcasts FOR SELECT
USING (true);

CREATE POLICY "Super admins can manage podcasts"
ON public.podcasts FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- PRESS COVERAGE
CREATE POLICY "Anyone can view press coverage"
ON public.press_coverage FOR SELECT
USING (true);

CREATE POLICY "Super admins can manage press"
ON public.press_coverage FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= SCHOLARSHIPS TABLE =============
CREATE POLICY "Anyone can view active scholarships"
ON public.scholarships FOR SELECT
USING (status = 'active' OR public.has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can manage scholarships"
ON public.scholarships FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= TICKETS TABLE =============
CREATE POLICY "Users can view own tickets"
ON public.tickets FOR SELECT
USING (submitted_by = auth.uid());

CREATE POLICY "Users can create own tickets"
ON public.tickets FOR INSERT
WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "Assigned staff can view assigned tickets"
ON public.tickets FOR SELECT
USING (assigned_to = auth.uid());

CREATE POLICY "Assigned staff can update assigned tickets"
ON public.tickets FOR UPDATE
USING (assigned_to = auth.uid());

CREATE POLICY "Super admins manage all tickets"
ON public.tickets FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));

-- ============= CONTACT SUBMISSIONS TABLE =============
CREATE POLICY "Anyone can create contact submissions"
ON public.contact_submissions FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view own submissions"
ON public.contact_submissions FOR SELECT
USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Super admins manage contact submissions"
ON public.contact_submissions FOR ALL
USING (public.has_role(auth.uid(), 'super_admin'::app_role));