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
import { z } from "zod";

// Validation schemas
const baseAuthSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Base signup schema without refinement (so it can be extended)
const baseSignUpFields = {
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, "Invalid phone number"),
  confirmPassword: z.string(),
};

const signUpSchema = baseAuthSchema.extend(baseSignUpFields).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

const trusteeSignUpSchema = baseAuthSchema.extend({
  ...baseSignUpFields,
  institutionName: z.string().trim().min(2, "Institution name required").max(200, "Name too long"),
  designation: z.string().trim().min(2, "Designation required").max(100, "Designation too long"),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

const donorSignUpSchema = baseAuthSchema.extend({
  ...baseSignUpFields,
  country: z.string().optional(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

// Auth form component extracted outside to avoid hoisting issues
const AuthFormComponent = ({ 
  isSignUp, 
  loading, 
  portalType, 
  portalTitle,
  onSubmit,
  onToggleMode
}: {
  isSignUp: boolean;
  loading: boolean;
  portalType: string;
  portalTitle: string;
  onSubmit: (email: string, password: string, fullName: string, phone: string, institutionName?: string, designation?: string, country?: string) => void;
  onToggleMode: () => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [designation, setDesignation] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate based on portal type and mode
      if (isSignUp) {
        let schema: z.ZodSchema = signUpSchema;
        if (portalType === 'trustee') {
          schema = trusteeSignUpSchema;
        } else if (portalType === 'donor') {
          schema = donorSignUpSchema;
        }
        
        const formData = {
          email,
          password,
          confirmPassword,
          fullName,
          phone,
          ...(portalType === 'trustee' && { institutionName, designation }),
          ...(portalType === 'donor' && { country }),
        };
        
        schema.parse(formData);
      } else {
        baseAuthSchema.parse({ email, password });
      }
      
      onSubmit(email, password, fullName, phone, institutionName, designation, country);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.issues[0];
        toast.error(firstError.message);
      } else {
        toast.error('Validation failed');
      }
    }
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
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          {/* Trustee-specific fields */}
          {portalType === 'trustee' && (
            <>
              <div>
                <Label htmlFor="institutionName">Institution / Hostel Name *</Label>
                <Input
                  id="institutionName"
                  type="text"
                  placeholder="Enter institution or hostel name"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation / Role *</Label>
                <Input
                  id="designation"
                  type="text"
                  placeholder="e.g., Managing Trustee, Board Member"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          
          {/* Donor-specific fields */}
          {portalType === 'donor' && (
            <div>
              <Label htmlFor="country">Country (Optional)</Label>
              <Input
                id="country"
                type="text"
                placeholder="e.g., India, USA"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          )}
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
      
      {isSignUp && (
        <div>
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Please wait...' : isSignUp ? `Create ${portalTitle} Account` : `Sign In to ${portalTitle}`}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={onToggleMode}
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

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const portalType = searchParams.get('portal') || 'student';
  const mode = searchParams.get('mode') || 'signin';
  const [isSignUp, setIsSignUp] = useState(mode === 'signup');

  // Redirect if already logged in to appropriate dashboard
  useEffect(() => {
    const redirectLoggedInUser = async () => {
      if (user && !authLoading) {
        // Fetch user role
        const { data: roleData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        const role = roleData?.role;
        
        // Redirect based on role
        switch (role) {
          case 'student':
          case 'parent':
            navigate('/dashboard/student');
            break;
          case 'hostel_admin':
            navigate('/dashboard/hostel-admin');
            break;
          case 'institution_admin':
            navigate('/institution-admin/dashboard');
            break;
          case 'donor':
            navigate('/dashboard/donor');
            break;
          case 'trustee':
            navigate('/dashboard/trustee');
            break;
          case 'super_admin':
            navigate('/super-admin/dashboard');
            break;
          default:
            navigate('/');
        }
      }
    };
    
    redirectLoggedInUser();
  }, [user, authLoading, navigate]);

  // Redirect to registration forms for new users
  useEffect(() => {
    if (mode === 'signup') {
      if (portalType === 'student') {
        navigate('/student/register');
      } else if (portalType === 'hostel') {
        navigate('/hostel/register');
      } else if (portalType === 'institution') {
        // Institution admins can sign up directly through the auth form
        return;
      }
    }
  }, [mode, portalType, navigate]);

  const getPortalInfo = () => {
    switch (portalType) {
      case 'student':
        return { icon: GraduationCap, title: 'Student Portal', role: 'student' };
      case 'hostel':
        return { icon: Building2, title: 'Hostel Portal', role: 'hostel_admin' };
      case 'institution':
        return { icon: Building2, title: 'Institution Admin Portal', role: 'institution_admin' };
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
    phone: string,
    institutionName?: string,
    designation?: string,
    country?: string
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
          let trusteeId = null;
          
          // Create additional records for trustee or donor
          if (portalType === 'trustee' && institutionName && designation) {
            const { data: trusteeData, error: trusteeError } = await supabase
              .from('trustees')
              .insert({
                user_id: data.user.id,
                name: fullName,
                email: email,
                phone: phone,
                designation: `${designation} - ${institutionName}`,
              })
              .select()
              .single();

            if (trusteeError) {
              if (import.meta.env.DEV) {
                console.error('Error creating trustee record:', trusteeError);
              }
              toast.error('Account created but profile setup incomplete. Please contact support.');
            } else if (trusteeData) {
              trusteeId = trusteeData.id;
            }
          } else if (portalType === 'donor') {
            const { error: donorError } = await supabase
              .from('donors')
              .insert({
                user_id: data.user.id,
                name: fullName,
                email: email,
                phone: phone,
                total_donated: 0,
                impact_level: 'bronze',
              });

            if (donorError) {
              if (import.meta.env.DEV) {
                console.error('Error creating donor record:', donorError);
              }
              toast.error('Account created but profile setup incomplete. Please contact support.');
            }
          }

          toast.success('Account created successfully! Redirecting...');
          
          // Navigate to appropriate dashboard
          setTimeout(() => {
            switch (portalInfo.role) {
              case 'trustee':
                navigate(`/trustee/registration-success${trusteeId ? `?trusteeId=${trusteeId}` : ''}`);
                break;
              case 'donor':
                navigate('/dashboard/donor');
                break;
              case 'institution_admin':
                navigate('/institution-admin/dashboard');
                break;
              default:
                navigate('/');
            }
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
              navigate('/institution-admin/dashboard');
              break;
            case 'donor':
              navigate('/dashboard/donor');
              break;
            case 'trustee':
              navigate('/dashboard/trustee');
              break;
            case 'super_admin':
              navigate('/super-admin/dashboard');
              break;
            default:
              navigate('/');
          }
        }
      }
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error('Auth error:', error);
      }
      
      let errorMessage = 'An error occurred during authentication';
      
      if (error?.message) {
        // Sanitize error messages to avoid exposing sensitive information
        if (error.message.includes('already registered')) {
          errorMessage = 'This email is already registered';
        } else if (error.message.includes('Invalid login')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('Email')) {
          errorMessage = 'Please check your email address';
        } else if (error.message.includes('Password')) {
          errorMessage = 'Please check your password';
        } else {
          errorMessage = 'Authentication failed. Please try again';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
    navigate(`/auth?portal=${portalType}&mode=${!isSignUp ? 'signup' : 'signin'}`);
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
      
      <main className="flex-1 bg-gradient-to-br from-background via-muted/30 to-background py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <NavLink to="/portal-selection" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Portal Selection
            </NavLink>
            <div className="flex justify-center mb-4">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg`}>
                <PortalIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {portalInfo.title}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? 'Create your account to get started' : 'Welcome back! Sign in to continue'}
            </p>
          </div>

          <Card className="shadow-xl border-2">
            <CardHeader>
              <CardTitle className="text-xl">{isSignUp ? 'Create Account' : 'Sign In'}</CardTitle>
              <CardDescription>
                {isSignUp ? 'Fill in your details to create your account' : 'Enter your credentials to access your dashboard'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthFormComponent
                isSignUp={isSignUp}
                loading={loading}
                portalType={portalType}
                portalTitle={portalInfo.title}
                onSubmit={handleAuth}
                onToggleMode={handleToggleMode}
              />
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-primary hover:underline font-medium">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
