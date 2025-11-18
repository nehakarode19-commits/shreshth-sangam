import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, GraduationCap, Building2, Users, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NavLink } from "@/components/NavLink";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const portalType = searchParams.get('portal') || 'student';
  const mode = searchParams.get('mode') || 'signin';
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  // Redirect to registration forms for new users
  useEffect(() => {
    if (mode === 'signup') {
      if (portalType === 'student') {
        navigate('/student/register');
      } else if (portalType === 'hostel') {
        navigate('/hostel/register');
      }
    }
  }, [mode, portalType, navigate]);

  const getPortalInfo = () => {
    switch (portalType) {
      case 'student':
        return { icon: GraduationCap, title: 'Student Portal', role: 'student' };
      case 'hostel':
        return { icon: Building2, title: 'Hostel Portal', role: 'hostel_admin' };
      case 'trustee':
        return { icon: Users, title: 'Trustee Portal', role: 'trustee' };
      case 'donor':
        return { icon: Heart, title: 'Donor Portal', role: 'donor' };
      default:
        return { icon: GraduationCap, title: 'Portal', role: 'student' };
    }
  };

  const portalInfo = getPortalInfo();
  const PortalIcon = portalInfo.icon;

  const handleAuth = async (
    email: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    try {
      setLoading(true);

      if (isSignUp) {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
              user_type: portalInfo.role,
            },
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please sign in instead.');
            setIsSignUp(false);
            return;
          }
          throw error;
        }

        if (data.user) {
          toast.success('Account created successfully! Redirecting...');
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please try again.');
            return;
          }
          throw error;
        }

        if (data.user) {
          // Fetch user role and navigate to appropriate dashboard
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.user.id)
            .single();

          const role = roleData?.role;
          
          toast.success('Signed in successfully!');

          // Navigate based on role
          switch (role) {
            case 'student':
            case 'parent':
              navigate('/dashboard/student');
              break;
            case 'hostel_admin':
              navigate('/dashboard/hostel-admin');
              break;
            case 'institution_admin':
              navigate('/dashboard/institution-admin');
              break;
            case 'donor':
              navigate('/dashboard/donor');
              break;
            case 'trustee':
              navigate('/dashboard/trustee');
              break;
            case 'super_admin':
              navigate('/dashboard/super-admin');
              break;
            default:
              navigate('/');
          }
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Validation
      if (!email || !password) {
        toast.error('Please fill in all required fields');
        return;
      }
      
      if (isSignUp && !fullName) {
        toast.error('Please enter your full name');
        return;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }

      handleAuth(email, password, fullName, phone);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Please wait...' : isSignUp ? `Create ${portalInfo.title} Account` : `Sign In to ${portalInfo.title}`}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              navigate(`/auth?portal=${portalType}&mode=${!isSignUp ? 'signup' : 'signin'}`);
            }}
            className="text-primary hover:underline font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>

        {(portalType === 'student' || portalType === 'hostel') && isSignUp && (
          <p className="text-center text-sm text-muted-foreground">
            Note: New {portalType === 'student' ? 'students' : 'hostels'} should complete the full registration form.
          </p>
        )}
      </form>
    );
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-background to-muted py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <NavLink to="/portal-selection" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Portal Selection
            </NavLink>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <PortalIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {portalInfo.title}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? 'Create your account' : 'Sign in to continue'}
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</CardTitle>
              <CardDescription>
                {isSignUp ? 'Fill in your details to create an account' : 'Enter your credentials to access your dashboard'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthForm />
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
