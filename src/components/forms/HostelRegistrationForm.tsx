import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const step1Schema = z.object({
  hostelName: z.string().min(2, "Hostel name is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "State is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  website: z.string().url().optional().or(z.literal('')),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const facilities = ['Library', 'WiFi', 'RO Water', 'Mess', 'CCTV', 'Study Hall', 'Sports', 'Medical Help'];
const roomTypes = ['Single', 'Double', 'Dormitory'];

export default function HostelRegistrationForm() {
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
      // Step 1: Create or reuse auth account
      let userId: string | null = null;

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: finalData.email,
        password: finalData.password,
        options: {
          data: {
            full_name: finalData.contactPerson,
            phone: finalData.phone,
            user_type: 'hostel_admin',
          },
          emailRedirectTo: `${window.location.origin}/dashboard/hostel-admin`,
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          // Try to sign in with the same credentials instead of failing
          const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
              email: finalData.email,
              password: finalData.password,
            });

          if (signInError || !signInData.user) {
            throw new Error(
              'This email is already registered. Please login instead of creating a new account.'
            );
          }

          userId = signInData.user.id;
        } else {
          throw signUpError;
        }
      } else {
        if (!signUpData.user) throw new Error('Failed to create account');
        userId = signUpData.user.id;
      }

      // Step 2: Create hostel with admin_id
      const totalCapacity = parseInt(finalData.capacity);
      const numberOfRooms = parseInt(finalData.rooms);
      const yearEstablished = parseInt(finalData.yearEstablished);
      const fundingAmount = parseFloat(finalData.fundingAmount);
      const monthlyExpenses = parseFloat(finalData.monthlyExpenses);

      const { data: hostelData, error: hostelError } = await supabase
        .from('hostels')
        .insert({
          name: finalData.hostelName,
          city: finalData.city,
          state: finalData.state,
          email: finalData.email,
          phone: finalData.phone,
          website: finalData.website || null,
          total_capacity: Number.isNaN(totalCapacity) ? 0 : totalCapacity,
          number_of_rooms: Number.isNaN(numberOfRooms) ? null : numberOfRooms,
          room_types: finalData.selectedRoomTypes,
          facilities: finalData.selectedFacilities,
          hostel_type: finalData.hostelType,
          year_established: Number.isNaN(yearEstablished) ? null : yearEstablished,
          address_line1: finalData.address,
          funding_needed: Number.isNaN(fundingAmount) ? 0 : fundingAmount,
          monthly_operational_cost: Number.isNaN(monthlyExpenses) ? 0 : monthlyExpenses,
          govt_support: finalData.govtAid === 'yes',
          type: 'hostel',
          status: 'pending',
          admin_id: userId,
        })
        .select()
        .single();

      if (hostelError) throw hostelError;

      // Step 3: Create user role
      await supabase.from('user_roles').insert({
        user_id: userId,
        role: 'hostel_admin',
      });

      // Step 4: Create trustee
      if (hostelData) {
        await supabase.from('trustees').insert({
          name: finalData.trusteeName,
          phone: finalData.trusteePhone,
          email: finalData.trusteeEmail,
          designation: finalData.trusteeDesignation,
          hostel_id: hostelData.id,
          user_id: userId,
        });
      }

      toast({
        title: "Registration Successful!",
        description: "Your hostel has been registered successfully.",
      });

      // Navigate to success page with hostel details
      navigate(`/hostel/registration-success?hostelId=${hostelData.id}`);
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
          <CardTitle>Hostel Registration - Step {step} of 5</CardTitle>
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
              <div>
                <Label>Hostel Name *</Label>
                <Input {...form.register('hostelName')} />
                {form.formState.errors.hostelName && (
                  <p className="text-sm text-destructive">{String(form.formState.errors.hostelName.message)}</p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>City *</Label>
                  <Input {...form.register('city')} />
                </div>
                <div>
                  <Label>State *</Label>
                  <Input {...form.register('state')} />
                </div>
              </div>
              <div>
                <Label>Contact Person Name *</Label>
                <Input {...form.register('contactPerson')} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Email *</Label>
                  <Input type="email" {...form.register('email')} />
                </div>
                <div>
                  <Label>Contact Mobile *</Label>
                  <Input {...form.register('phone')} />
                </div>
              </div>
              <div>
                <Label>Website (optional)</Label>
                <Input {...form.register('website')} placeholder="https://" />
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
                <Label>Trustee Name *</Label>
                <Input {...form.register('trusteeName')} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Trustee Contact *</Label>
                  <Input {...form.register('trusteePhone')} />
                </div>
                <div>
                  <Label>Trustee Email *</Label>
                  <Input type="email" {...form.register('trusteeEmail')} />
                </div>
              </div>
              <div>
                <Label>Designation / Role *</Label>
                <Input {...form.register('trusteeDesignation')} />
              </div>
              <div>
                <Label>Number of Trustees</Label>
                <Input type="number" {...form.register('trusteeCount')} />
              </div>
              <div>
                <Label>Names of Other Trustees</Label>
                <Textarea {...form.register('otherTrustees')} />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button type="submit" className="flex-1">Next</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={form.handleSubmit(handleNext)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Total Student Capacity *</Label>
                  <Input type="number" {...form.register('capacity')} />
                </div>
                <div>
                  <Label>Number of Rooms *</Label>
                  <Input type="number" {...form.register('rooms')} />
                </div>
              </div>
              <div>
                <Label>Room Types *</Label>
                <div className="space-y-2 mt-2">
                  {roomTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2">
                      <Checkbox {...form.register('selectedRoomTypes')} value={type} />
                      <Label>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Facilities Available</Label>
                <div className="grid md:grid-cols-2 gap-2 mt-2">
                  {facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2">
                      <Checkbox {...form.register('selectedFacilities')} value={facility} />
                      <Label>{facility}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label>Hostel Type *</Label>
                <Input {...form.register('hostelType')} placeholder="Boys / Girls / Co-ed" />
              </div>
              <div>
                <Label>Year Established *</Label>
                <Input type="number" {...form.register('yearEstablished')} />
              </div>
              <div>
                <Label>Hostel Address *</Label>
                <Textarea {...form.register('address')} />
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
                <Label>Funding Required For</Label>
                <Input {...form.register('fundingPurpose')} />
              </div>
              <div>
                <Label>Approximate Amount Needed</Label>
                <Input type="number" {...form.register('fundingAmount')} placeholder="₹" />
              </div>
              <div>
                <Label>Monthly Operational Expenses</Label>
                <Input type="number" {...form.register('monthlyExpenses')} placeholder="₹" />
              </div>
              <div>
                <Label>Government Aid Received</Label>
                <select {...form.register('govtAid')} className="w-full border rounded-md p-2">
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
              <div>
                <Label>Support Already Received</Label>
                <Textarea {...form.register('supportReceived')} />
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
                <Label>Hostel Photos</Label>
                <Input type="file" multiple accept="image/*" />
              </div>
              <div>
                <Label>Registration Certificate</Label>
                <Input type="file" accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <Label>Trustee ID Proof</Label>
                <Input type="file" accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <Label>Past Financial Report</Label>
                <Input type="file" accept=".pdf" />
              </div>
              <div>
                <Label>Comments or Additional Notes</Label>
                <Textarea {...form.register('comments')} />
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button type="submit" className="flex-1">Submit Registration</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
