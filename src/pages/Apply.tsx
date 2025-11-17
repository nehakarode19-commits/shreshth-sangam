import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ArrowLeft, ArrowRight, Upload } from "lucide-react";

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Student Details" },
    { number: 2, title: "Guardian Details" },
    { number: 3, title: "Institution Preference" },
    { number: 4, title: "Review & Submit" },
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-primary/5 to-teal/5 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Apply for Admission</h1>
            <p className="text-lg text-muted-foreground">
              Complete the form below to start your journey with us
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <Progress value={progress} className="mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div 
                    className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold
                      ${currentStep >= step.number 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'}`}
                  >
                    {currentStep > step.number ? <CheckCircle2 className="w-5 h-5" /> : step.number}
                  </div>
                  <p className="text-xs font-medium">{step.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Step {currentStep}: {steps[currentStep - 1].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {/* Step 1: Student Details */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Enter first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Enter last name" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <Input id="dob" type="date" required />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="student@example.com" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>

                    <div>
                      <Label htmlFor="address">Current Address *</Label>
                      <Textarea id="address" placeholder="Enter complete address" rows={3} required />
                    </div>
                  </div>
                )}

                {/* Step 2: Guardian Details */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guardianName">Guardian Name *</Label>
                        <Input id="guardianName" placeholder="Full name" required />
                      </div>
                      <div>
                        <Label htmlFor="relationship">Relationship *</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="father">Father</SelectItem>
                            <SelectItem value="mother">Mother</SelectItem>
                            <SelectItem value="guardian">Legal Guardian</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="guardianEmail">Email *</Label>
                        <Input id="guardianEmail" type="email" placeholder="guardian@example.com" required />
                      </div>
                      <div>
                        <Label htmlFor="guardianPhone">Phone Number *</Label>
                        <Input id="guardianPhone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" placeholder="Guardian's occupation" />
                    </div>

                    <div>
                      <Label htmlFor="annualIncome">Annual Income Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="below3">Below ₹3 lakhs</SelectItem>
                          <SelectItem value="3to5">₹3-5 lakhs</SelectItem>
                          <SelectItem value="5to10">₹5-10 lakhs</SelectItem>
                          <SelectItem value="above10">Above ₹10 lakhs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Institution Preference */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <Label htmlFor="preference1">First Preference *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select institution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Shree Mahavir Jain Hostel</SelectItem>
                          <SelectItem value="2">Jain Girls Boarding School</SelectItem>
                          <SelectItem value="3">Jain Vidyalaya Hostel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="preference2">Second Preference</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select institution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Shree Mahavir Jain Hostel</SelectItem>
                          <SelectItem value="2">Jain Girls Boarding School</SelectItem>
                          <SelectItem value="3">Jain Vidyalaya Hostel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="currentEducation">Current Education Level *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6th Standard</SelectItem>
                          <SelectItem value="7">7th Standard</SelectItem>
                          <SelectItem value="8">8th Standard</SelectItem>
                          <SelectItem value="9">9th Standard</SelectItem>
                          <SelectItem value="10">10th Standard</SelectItem>
                          <SelectItem value="11">11th Standard</SelectItem>
                          <SelectItem value="12">12th Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="documents">Upload Documents</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Birth certificate, previous mark sheets, ID proof
                        </p>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="scholarship">Scholarship Required?</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea 
                        id="additionalInfo" 
                        placeholder="Any special requirements or information we should know"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="bg-muted/50 rounded-lg p-6">
                      <h3 className="font-bold mb-4">Application Summary</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Student Name:</span>
                          <span className="font-medium">To be filled</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Guardian:</span>
                          <span className="font-medium">To be filled</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">First Preference:</span>
                          <span className="font-medium">To be filled</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Education Level:</span>
                          <span className="font-medium">To be filled</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>Important:</strong> By submitting this application, you confirm that all information 
                        provided is accurate. The institution will review your application and contact you within 5-7 business days.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button type="submit" className="bg-success hover:bg-success/90">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="mt-6 card-elevated">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center">
                Need help? Contact our admissions team at{" "}
                <a href="mailto:admissions@jainboarding.org" className="text-primary hover:underline">
                  admissions@jainboarding.org
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
