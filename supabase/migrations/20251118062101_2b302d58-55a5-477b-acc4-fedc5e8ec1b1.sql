-- Create hostels table
CREATE TABLE IF NOT EXISTS public.hostels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('hostel', 'gurukul', 'boarding_school')),
  year_established INTEGER,
  total_capacity INTEGER NOT NULL,
  occupied_count INTEGER DEFAULT 0,
  number_of_rooms INTEGER,
  room_types TEXT[],
  facilities TEXT[],
  hostel_type TEXT CHECK (hostel_type IN ('boys', 'girls', 'co-ed')),
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  funding_type TEXT,
  funding_needed DECIMAL(12,2),
  monthly_operational_cost DECIMAL(12,2),
  govt_support BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create institutions table
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  trustee_name TEXT,
  trustee_contact TEXT,
  total_students INTEGER DEFAULT 0,
  staff_count INTEGER DEFAULT 0,
  departments TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trustees table
CREATE TABLE IF NOT EXISTS public.trustees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  designation TEXT,
  hostel_id UUID REFERENCES public.hostels(id),
  institution_id UUID REFERENCES public.institutions(id),
  compliance_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  gender TEXT,
  dob DATE,
  mobile TEXT,
  alt_mobile TEXT,
  email TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  state TEXT,
  district TEXT,
  city TEXT,
  pincode TEXT,
  guardian_name TEXT,
  guardian_contact TEXT,
  relationship TEXT,
  current_class TEXT,
  medium TEXT,
  last_school TEXT,
  marks_percentage DECIMAL(5,2),
  current_institution TEXT,
  school_type TEXT,
  board TEXT,
  preferred_cities TEXT[],
  religion_community TEXT,
  language_preference TEXT,
  dietary_preference TEXT,
  willing_to_relocate BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'graduated')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) NOT NULL,
  hostel_id UUID REFERENCES public.hostels(id),
  institution_id UUID REFERENCES public.institutions(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'interview_scheduled')),
  applied_date TIMESTAMPTZ DEFAULT NOW(),
  interview_date TIMESTAMPTZ,
  coordinator_name TEXT,
  coordinator_contact TEXT,
  admin_comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donors table
CREATE TABLE IF NOT EXISTS public.donors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  pan TEXT,
  total_donated DECIMAL(12,2) DEFAULT 0,
  impact_level TEXT DEFAULT 'bronze' CHECK (impact_level IN ('bronze', 'silver', 'gold', 'platinum')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id UUID REFERENCES public.donors(id) NOT NULL,
  hostel_id UUID REFERENCES public.hostels(id),
  institution_id UUID REFERENCES public.institutions(id),
  amount DECIMAL(12,2) NOT NULL,
  purpose TEXT,
  payment_method TEXT,
  transaction_id TEXT,
  receipt_url TEXT,
  donation_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create scholarships table
CREATE TABLE IF NOT EXISTS public.scholarships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(12,2),
  eligibility_criteria TEXT,
  application_deadline DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'expired')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE,
  days INTEGER DEFAULT 1,
  address TEXT,
  city TEXT,
  state TEXT,
  category TEXT,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  category TEXT,
  publish_date DATE DEFAULT CURRENT_DATE,
  author_id UUID REFERENCES auth.users(id),
  thumbnail_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create podcasts table
CREATE TABLE IF NOT EXISTS public.podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT,
  media_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create media_gallery table
CREATE TABLE IF NOT EXISTS public.media_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  tags TEXT[],
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create press_coverage table
CREATE TABLE IF NOT EXISTS public.press_coverage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT,
  link TEXT,
  publish_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tickets table for CRM
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number TEXT UNIQUE,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT,
  submitted_by UUID REFERENCES auth.users(id),
  assigned_to UUID REFERENCES auth.users(id),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  category TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'closed')),
  admin_reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.hostels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trustees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.press_coverage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create updated_at triggers for all tables
CREATE TRIGGER set_updated_at_hostels BEFORE UPDATE ON public.hostels FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_institutions BEFORE UPDATE ON public.institutions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_trustees BEFORE UPDATE ON public.trustees FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_students BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_applications BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_donors BEFORE UPDATE ON public.donors FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_scholarships BEFORE UPDATE ON public.scholarships FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_events BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_blogs BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_podcasts BEFORE UPDATE ON public.podcasts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_tickets BEFORE UPDATE ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_updated_at_contact_submissions BEFORE UPDATE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to auto-generate ticket numbers
CREATE OR REPLACE FUNCTION public.generate_ticket_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.ticket_number IS NULL THEN
    NEW.ticket_number := 'TKT-' || LPAD((FLOOR(RANDOM() * 999999) + 1)::TEXT, 6, '0');
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_ticket_number BEFORE INSERT ON public.tickets FOR EACH ROW EXECUTE FUNCTION public.generate_ticket_number();