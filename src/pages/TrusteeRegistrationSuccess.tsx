import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, Building } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function TrusteeRegistrationSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const trusteeId = searchParams.get('trusteeId');
  const { user } = useAuth();

  useEffect(() => {
    if (!trusteeId && !user) {
      navigate('/auth');
    }
  }, [trusteeId, user, navigate]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card className="border-none shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">
              Trustee Registration Completed
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Your trustee account has been successfully created and is now active
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg text-foreground">What's Next?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Access your personalized trustee dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>View and manage hostels and institutions under your supervision</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Track student applications and funding status</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Access scholarship programs and resources</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/dashboard/trustee')}
                className="flex-1 bg-maroon hover:bg-maroon/90"
                size="lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
              <Button
                onClick={() => navigate('/trustee/institutions')}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Building className="mr-2 h-5 w-5" />
                View Institutions
              </Button>
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Need help getting started?{' '}
                <button
                  onClick={() => navigate('/trustee/help')}
                  className="text-maroon hover:underline font-medium"
                >
                  Visit Help Center
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
