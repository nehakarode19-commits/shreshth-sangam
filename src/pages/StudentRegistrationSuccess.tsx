import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, User, MapPin, Phone, Mail, GraduationCap, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StudentRegistrationSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [studentData, setStudentData] = useState<any>(null);
  const studentId = searchParams.get('studentId');

  useEffect(() => {
    const fetchStudentData = async () => {
      if (studentId) {
        const { data } = await supabase
          .from('students')
          .select('*')
          .eq('id', studentId)
          .single();
        
        if (data) {
          setStudentData(data);
        }
      }
    };

    fetchStudentData();
  }, [studentId]);

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
              Student Registration Completed!
            </h1>
            <p className="text-muted-foreground">
              Your profile has been successfully created and you can now apply to hostels.
            </p>
          </div>

          {/* Student Details Card */}
          {studentData && (
            <Card className="mb-6 border-2 border-maroon/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-maroon mb-6">Student Profile</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">
                          {studentData.first_name} {studentData.middle_name} {studentData.last_name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date of Birth</p>
                        <p className="font-medium">{studentData.dob}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{studentData.city}, {studentData.state}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p className="font-medium">{studentData.mobile}</p>
                      </div>
                    </div>
                  </div>

                  {/* Academic Info */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{studentData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Current Class</p>
                        <p className="font-medium">{studentData.current_class}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Medium</p>
                        <p className="font-medium capitalize">{studentData.medium}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-maroon mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p className="font-medium capitalize">
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                            Active
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferred Cities */}
                {studentData.preferred_cities && studentData.preferred_cities.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Preferred Cities</p>
                    <div className="flex flex-wrap gap-2">
                      {studentData.preferred_cities.map((city: string) => (
                        <span
                          key={city}
                          className="px-3 py-1 bg-maroon/10 text-maroon rounded-full text-sm"
                        >
                          {city}
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
                  <span>Browse available hostels that match your preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-maroon font-bold">2.</span>
                  <span>Submit applications to hostels of your choice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-maroon font-bold">3.</span>
                  <span>Track your applications and schedule interviews from your dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/dashboard/student')}
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
