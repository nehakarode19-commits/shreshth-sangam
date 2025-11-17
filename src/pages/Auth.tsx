import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { GraduationCap, Building2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NavLink } from "@/components/NavLink";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  const handleAuth = async (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    userType: 'student' | 'trustee'
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
              user_type: userType,
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
          toast.success('Signed in successfully!');
          navigate('/');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const StudentAuth = () => {
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

      handleAuth(email, password, fullName, phone, 'student');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div>
              <Label htmlFor="student-name">Full Name *</Label>
              <Input
                id="student-name"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="student-phone">Phone Number</Label>
              <Input
                id="student-phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="student-email">Email *</Label>
          <Input
            id="student-email"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="student-password">Password *</Label>
          <Input
            id="student-password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? 'Please wait...' : isSignUp ? 'Create Student Account' : 'Sign In as Student'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    );
  };

  const InstitutionAuth = () => {
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
        toast.error('Please enter trustee name');
        return;
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }

      handleAuth(email, password, fullName, phone, 'trustee');
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div>
              <Label htmlFor="trustee-name">Trustee Name *</Label>
              <Input
                id="trustee-name"
                type="text"
                placeholder="Enter trustee name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="trustee-phone">Contact Number</Label>
              <Input
                id="trustee-phone"
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="trustee-email">Institution Email *</Label>
          <Input
            id="trustee-email"
            type="email"
            placeholder="trustee@institution.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="trustee-password">Password *</Label>
          <Input
            id="trustee-password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-teal hover:bg-teal/90" disabled={loading}>
          {loading ? 'Please wait...' : isSignUp ? 'Create Institution Account' : 'Sign In as Institution'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Already registered?' : 'Not registered yet?'}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-teal hover:underline font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
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
      
      <main className="flex-1 bg-gradient-to-br from-primary/5 to-teal/5 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-8">
            <NavLink to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </NavLink>
            <h1 className="text-4xl font-bold mb-4">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isSignUp ? 'Join the Jain Boarding Federation community' : 'Welcome back to Jain Boarding Federation'}
            </p>
          </div>

          <Card className="card-elevated max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Choose Account Type</CardTitle>
              <CardDescription>
                Select whether you're a student/parent or institution trustee
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="student" className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Student / Parent
                  </TabsTrigger>
                  <TabsTrigger value="institution" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Institution
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="student">
                  <StudentAuth />
                </TabsContent>

                <TabsContent value="institution">
                  <InstitutionAuth />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By signing {isSignUp ? 'up' : 'in'}, you agree to our{' '}
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
