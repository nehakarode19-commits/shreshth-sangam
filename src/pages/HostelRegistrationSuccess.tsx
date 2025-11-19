import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Building2, MapPin, Phone, Mail, Users, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HostelRegistrationSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hostelData, setHostelData] = useState<any>(null);
  const hostelId = searchParams.get('hostelId');

  useEffect(() => {
    const fetchHostelData = async () => {
      if (hostelId) {
        const { data } = await supabase
          .from('hostels')
          .select('*')
          .eq('id', hostelId)
          .single();
        
        if (data) {
          setHostelData(data);
        }
      }
    };

    fetchHostelData();
  }, [hostelId]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-maroon mb-2">
              Hostel Registration Completed!
            </h1>
            <p className="text-muted-foreground">
              Your hostel has been successfully registered and is pending approval.
            </p>
          </div>

          {/* Hostel Details Card */}
          {hostelData && (
            <Card className="mb-6 border-2 border-maroon/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-maroon mb-6">Hostel Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Hostel Name</p>
                        <p className="font-medium">{hostelData.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{hostelData.city}, {hostelData.state}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{hostelData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{hostelData.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Capacity Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Capacity</p>
                        <p className="font-medium">{hostelData.total_capacity} Students</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Home className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Number of Rooms</p>
                        <p className="font-medium">{hostelData.number_of_rooms} Rooms</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="font-medium capitalize">{hostelData.hostel_type}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                            Pending Approval
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                {hostelData.facilities && hostelData.facilities.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Facilities Available</p>
                    <div className="flex flex-wrap gap-2">
                      {hostelData.facilities.map((facility: string) => (
                        <span
                          key={facility}
                          className="px-3 py-1 bg-maroon/10 text-maroon rounded-full text-sm"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">What's Next?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-maroon font-bold">1.</span>
                  <span>Our team will review your registration within 2-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-maroon font-bold">2.</span>
                  <span>You'll receive a confirmation email once approved</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-maroon font-bold">3.</span>
                  <span>You can access your dashboard to manage your hostel profile</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/dashboard/hostel-admin')}
              className="bg-maroon hover:bg-maroon/90 text-white px-8"
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-maroon text-maroon hover:bg-maroon/10"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
