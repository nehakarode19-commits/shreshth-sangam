import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const steps = [
  "Type of Institution",
  "Initial Review",
  "Trustee Details",
  "Hostel Details",
  "Financial Requirements",
  "Documents Upload"
];

export default function AddInstitution() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    hostelName: '',
    city: '',
    state: '',
    contactPerson: '',
    email: '',
    mobile: '',
    website: '',
    trusteeName: '',
    trusteeContact: '',
    trusteeEmail: '',
    designation: '',
    numTrustees: '',
    otherTrustees: '',
    capacity: '',
    rooms: '',
    roomTypes: '',
    facilities: '',
    hostelType: '',
    yearEstablished: '',
    address: '',
    fundingFor: '',
    amount: '',
    monthlyExpenses: '',
    govtAid: '',
    supportReceived: '',
    comments: ''
  });

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Institution added successfully!');
    navigate('/super-admin/institutions');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/super-admin/institutions')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Institution</h1>
          <p className="text-muted-foreground">Step {currentStep} of 6: {steps[currentStep - 1]}</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                index + 1 <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'border-muted bg-background'
              }`}>
                {index + 1 < currentStep ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span className="text-xs mt-2 text-center">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-2 ${index + 1 < currentStep ? 'bg-primary' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Type of Institution</Label>
                <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hostel">Hostel</SelectItem>
                    <SelectItem value="gurukul">Gurukul</SelectItem>
                    <SelectItem value="boarding">Boarding School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hostelName">Hostel Name</Label>
                <Input id="hostelName" value={formData.hostelName} onChange={(e) => updateFormData('hostelName', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={formData.state} onChange={(e) => updateFormData('state', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="contactPerson">Contact Person Name</Label>
                <Input id="contactPerson" value={formData.contactPerson} onChange={(e) => updateFormData('contactPerson', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="mobile">Contact Mobile</Label>
                <Input id="mobile" value={formData.mobile} onChange={(e) => updateFormData('mobile', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" value={formData.website} onChange={(e) => updateFormData('website', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="trusteeName">Trustee Name</Label>
                <Input id="trusteeName" value={formData.trusteeName} onChange={(e) => updateFormData('trusteeName', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="trusteeContact">Trustee Contact Number</Label>
                <Input id="trusteeContact" value={formData.trusteeContact} onChange={(e) => updateFormData('trusteeContact', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="trusteeEmail">Trustee Email</Label>
                <Input id="trusteeEmail" type="email" value={formData.trusteeEmail} onChange={(e) => updateFormData('trusteeEmail', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="designation">Designation / Role</Label>
                <Input id="designation" value={formData.designation} onChange={(e) => updateFormData('designation', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="numTrustees">Number of Trustees</Label>
                <Input id="numTrustees" type="number" value={formData.numTrustees} onChange={(e) => updateFormData('numTrustees', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="otherTrustees">Names of Other Trustees</Label>
                <Textarea id="otherTrustees" value={formData.otherTrustees} onChange={(e) => updateFormData('otherTrustees', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Total Student Capacity</Label>
                <Input id="capacity" type="number" value={formData.capacity} onChange={(e) => updateFormData('capacity', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Input id="rooms" type="number" value={formData.rooms} onChange={(e) => updateFormData('rooms', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="roomTypes">Room Types</Label>
                <Input id="roomTypes" value={formData.roomTypes} onChange={(e) => updateFormData('roomTypes', e.target.value)} placeholder="Single, Double, Dormitory" />
              </div>
              <div>
                <Label htmlFor="facilities">Facilities Available</Label>
                <Input id="facilities" value={formData.facilities} onChange={(e) => updateFormData('facilities', e.target.value)} placeholder="WiFi, Library, Sports" />
              </div>
              <div>
                <Label htmlFor="hostelType">Hostel Type</Label>
                <Select value={formData.hostelType} onValueChange={(value) => updateFormData('hostelType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boys">Boys</SelectItem>
                    <SelectItem value="girls">Girls</SelectItem>
                    <SelectItem value="coed">Co-ed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearEstablished">Year Established</Label>
                <Input id="yearEstablished" type="number" value={formData.yearEstablished} onChange={(e) => updateFormData('yearEstablished', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Hostel Address</Label>
                <Textarea id="address" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fundingFor">Funding Required For</Label>
                <Input id="fundingFor" value={formData.fundingFor} onChange={(e) => updateFormData('fundingFor', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="amount">Approximate Amount Needed</Label>
                <Input id="amount" type="number" value={formData.amount} onChange={(e) => updateFormData('amount', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="monthlyExpenses">Monthly Operational Expenses</Label>
                <Input id="monthlyExpenses" type="number" value={formData.monthlyExpenses} onChange={(e) => updateFormData('monthlyExpenses', e.target.value)} />
              </div>
              <div>
                <Label htmlFor="govtAid">Government Aid Received</Label>
                <Select value={formData.govtAid} onValueChange={(value) => updateFormData('govtAid', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="supportReceived">Support Already Received</Label>
                <Textarea id="supportReceived" value={formData.supportReceived} onChange={(e) => updateFormData('supportReceived', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="hostelPhotos">Hostel Photos</Label>
                <Input id="hostelPhotos" type="file" multiple accept="image/*" />
              </div>
              <div>
                <Label htmlFor="regCert">Registration Certificate</Label>
                <Input id="regCert" type="file" accept="application/pdf" />
              </div>
              <div>
                <Label htmlFor="trusteeId">Trustee ID Proof</Label>
                <Input id="trusteeId" type="file" accept="application/pdf" />
              </div>
              <div>
                <Label htmlFor="financialReport">Past Financial Report</Label>
                <Input id="financialReport" type="file" accept="application/pdf" />
              </div>
              <div>
                <Label htmlFor="comments">Comments / Additional Notes</Label>
                <Textarea id="comments" value={formData.comments} onChange={(e) => updateFormData('comments', e.target.value)} rows={4} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        {currentStep < 6 ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="h-4 w-4 mr-2" />
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
