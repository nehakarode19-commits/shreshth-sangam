import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const step1Schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),
  mobile: z.string().min(10, "Valid mobile number required"),
  altMobile: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function StudentRegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(step1Schema),
  });

  const handleNext = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleFinalSubmit = async (data: any) => {
    const finalData = { ...formData, ...data };
    
    try {
      // Step 1: Create auth account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          data: {
            full_name: `${finalData.firstName} ${finalData.lastName}`,
            phone: finalData.mobile,
            user_type: 'student'
          },
          emailRedirectTo: `${window.location.origin}/dashboard/student`
        }
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          throw new Error("This email is already registered. Please login instead of creating a new account.");
        }
        throw authError;
      }
      if (!authData.user) throw new Error("Failed to create account");

      // Step 2: Create student profile with the new user_id
      const { data: studentData, error: studentError } = await supabase.from('students').insert({
        first_name: finalData.firstName,
        middle_name: finalData.middleName || null,
        last_name: finalData.lastName,
        gender: finalData.gender,
        dob: finalData.dob,
        mobile: finalData.mobile,
        alt_mobile: finalData.altMobile || null,
        email: finalData.email,
        address_line1: finalData.address,
        district: finalData.district,
        state: finalData.state,
        pincode: finalData.pincode,
        guardian_name: finalData.guardianName,
        guardian_contact: finalData.guardianPhone,
        relationship: finalData.relation,
        current_class: finalData.currentClass,
        medium: finalData.medium,
        last_school: finalData.lastSchool,
        marks_percentage: parseFloat(finalData.marks) || null,
        current_institution: finalData.currentInstitution,
        school_type: finalData.schoolType,
        board: finalData.board,
        preferred_cities: finalData.preferredCities?.split(',') || [],
        language_preference: finalData.languagePreference,
        religion_community: finalData.community,
        dietary_preference: finalData.dietary,
        willing_to_relocate: finalData.relocate === 'yes',
        status: 'active',
        user_id: authData.user.id
      })
      .select()
      .single();

      if (studentError) throw studentError;

      // Step 3: Create user role
      await supabase.from('user_roles').insert({
        user_id: authData.user.id,
        role: 'student'
      });

      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully.",
      });

      // Navigate to success page with student details
      navigate(`/student/registration-success?studentId=${studentData.id}`);
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Student Registration - Step {step} of 5</CardTitle>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-maroon' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input {...form.register('firstName')} />
                </div>
                <div>
                  <Label>Middle Name</Label>
                  <Input {...form.register('middleName')} />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input {...form.register('lastName')} />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Gender *</Label>
                  <select {...form.register('gender')} className="w-full border rounded-md p-2">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label>Date of Birth *</Label>
                  <Input type="date" {...form.register('dob')} />
                </div>
              </div>
              <div>
                <Label>Profile Photo</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Mobile Number *</Label>
                  <Input {...form.register('mobile')} />
                </div>
                <div>
                  <Label>Alternate Contact</Label>
                  <Input {...form.register('altMobile')} />
                </div>
              </div>
              <div>
                <Label>Email Address *</Label>
                <Input type="email" {...form.register('email')} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Password *</Label>
                  <Input type="password" {...form.register('password')} placeholder="At least 6 characters" />
                  {form.formState.errors.password && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.password.message as string}</p>
                  )}
                </div>
                <div>
                  <Label>Confirm Password *</Label>
                  <Input type="password" {...form.register('confirmPassword')} placeholder="Re-enter password" />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">{form.formState.errors.confirmPassword.message as string}</p>
                  )}
                </div>
              </div>
              <Button type="submit" className="w-full">Next</Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
              <div>
                <Label>Residential Address *</Label>
                <Textarea {...form.register('address')} />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>District *</Label>
                  <Input {...form.register('district')} />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input {...form.register('state')} />
                </div>
                <div>
                  <Label>Pincode *</Label>
                  <Input {...form.register('pincode')} />
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <h3 className="font-medium mb-4">Local Guardian Details</h3>
                <div>
                  <Label>Guardian Name *</Label>
                  <Input {...form.register('guardianName')} />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label>Guardian Phone *</Label>
                    <Input {...form.register('guardianPhone')} />
                  </div>
                  <div>
                    <Label>Relation *</Label>
                    <Input {...form.register('relation')} />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button type="submit" className="flex-1">Next</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
              <div>
                <Label>Current Education Level / Class *</Label>
                <Input {...form.register('currentClass')} placeholder="e.g., 10th Standard" />
              </div>
              <div>
                <Label>Medium of Education *</Label>
                <Input {...form.register('medium')} placeholder="e.g., English, Hindi, Gujarati" />
              </div>
              <div>
                <Label>Last School Attended *</Label>
                <Input {...form.register('lastSchool')} />
              </div>
              <div>
                <Label>Academic Performance / Marks *</Label>
                <Input type="number" {...form.register('marks')} placeholder="Percentage" />
              </div>
              <div>
                <Label>Ongoing Institution Name</Label>
                <Input {...form.register('currentInstitution')} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Type of School *</Label>
                  <select {...form.register('schoolType')} className="w-full border rounded-md p-2">
                    <option value="">Select</option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                    <option value="trust">Trust</option>
                  </select>
                </div>
                <div>
                  <Label>Board *</Label>
                  <Input {...form.register('board')} placeholder="CBSE, ICSE, State Board" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button type="submit" className="flex-1">Next</Button>
              </div>
            </form>
          )}

          {step === 4 && (
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
              <div>
                <Label>Preferred Hostels</Label>
                <Input {...form.register('preferredHostels')} placeholder="Enter hostel names" />
              </div>
              <div>
                <Label>Language Preference</Label>
                <Input {...form.register('languagePreference')} />
              </div>
              <div>
                <Label>Religious / Community</Label>
                <Input {...form.register('community')} />
              </div>
              <div>
                <Label>Location Preferences</Label>
                <Input {...form.register('preferredCities')} placeholder="City names, comma-separated" />
              </div>
              <div>
                <Label>Willingness to Relocate *</Label>
                <select {...form.register('relocate')} className="w-full border rounded-md p-2">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <Label>Dietary Needs</Label>
                <Input {...form.register('dietary')} placeholder="Jain / Veg / Other" />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button type="submit" className="flex-1">Next</Button>
              </div>
            </form>
          )}

          {step === 5 && (
            <form onSubmit={form.handleSubmit(handleFinalSubmit)} className="space-y-4">
              <div>
                <Label>Aadhar Card</Label>
                <Input type="file" accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <Label>Birth Certificate</Label>
                <Input type="file" accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <Label>Income Certificate</Label>
                <Input type="file" accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <Label>School ID</Label>
                <Input type="file" accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <Label>Passport Photo</Label>
                <Input type="file" accept="image/*" />
              </div>
              <div>
                <Label>Additional Document (Optional)</Label>
                <Input type="file" />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Complete Registration</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
