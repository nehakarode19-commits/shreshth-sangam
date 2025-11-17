import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  FileText, 
  TrendingUp, 
  Shield,
  CheckCircle2,
  Upload,
  BarChart3
} from "lucide-react";

const Trustees = () => {
  const benefits = [
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with trustees from 150+ institutions across India",
    },
    {
      icon: FileText,
      title: "Resource Sharing",
      description: "Access shared resources, best practices, and templates",
    },
    {
      icon: TrendingUp,
      title: "Growth Support",
      description: "Get guidance on expansion, fundraising, and operations",
    },
    {
      icon: Shield,
      title: "Compliance Help",
      description: "Stay updated on regulations and compliance requirements",
    },
  ];

  const onboardingSteps = [
    { step: 1, title: "Submit Application", description: "Fill the onboarding form with institution details" },
    { step: 2, title: "Document Verification", description: "Upload required certificates and proof of registration" },
    { step: 3, title: "Review Process", description: "Our team reviews your application within 5-7 days" },
    { step: 4, title: "Approval & Access", description: "Get approved and access the trustee dashboard" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal to-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Building2 className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">For Trustees</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90 mb-8">
              Join our network of boarding school and hostel administrators. Share resources, 
              access funding, and collaborate for better student outcomes.
            </p>
            <div className="flex justify-center gap-8">
              <div>
                <div className="text-3xl font-bold">150+</div>
                <div className="text-sm opacity-80">Partner Institutions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">₹5Cr+</div>
                <div className="text-sm opacity-80">Distributed to Hostels</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1,200+</div>
                <div className="text-sm opacity-80">Resources Shared</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Join the Federation?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Benefits and advantages of being part of our network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="card-elevated hover-lift text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding Process */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple Onboarding Process</h2>
              <p className="text-muted-foreground">
                Get started in four easy steps
              </p>
            </div>

            <div className="space-y-6">
              {onboardingSteps.map((item, index) => (
                <Card key={index} className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      {index < onboardingSteps.length - 1 && (
                        <div className="hidden md:block">
                          <div className="w-px h-12 bg-border" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Onboarding Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl">Trustee Registration Form</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Fill in the details to register your institution with the Jain Boarding Federation
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {/* Institution Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Institution Details</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="institutionName">Institution Name *</Label>
                        <Input id="institutionName" placeholder="Full name of your institution" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="type">Type *</Label>
                          <select
                            id="type"
                            className="w-full mt-2 px-3 py-2 border rounded-md bg-background"
                            required
                          >
                            <option value="">Select type</option>
                            <option value="boys">Boys Hostel</option>
                            <option value="girls">Girls Hostel</option>
                            <option value="coed">Co-Ed</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="capacity">Total Capacity *</Label>
                          <Input id="capacity" type="number" placeholder="Number of students" required />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="address">Complete Address *</Label>
                        <Textarea id="address" placeholder="Street, City, State, PIN" rows={3} required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="established">Year Established *</Label>
                          <Input id="established" type="number" placeholder="YYYY" required />
                        </div>
                        <div>
                          <Label htmlFor="registration">Registration Number *</Label>
                          <Input id="registration" placeholder="Official registration no." required />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trustee Details */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Trustee Details</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="trusteeName">Full Name *</Label>
                          <Input id="trusteeName" placeholder="Your name" required />
                        </div>
                        <div>
                          <Label htmlFor="designation">Designation *</Label>
                          <Input id="designation" placeholder="e.g., Managing Trustee" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="trusteeEmail">Email *</Label>
                          <Input id="trusteeEmail" type="email" placeholder="your@email.com" required />
                        </div>
                        <div>
                          <Label htmlFor="trusteePhone">Phone Number *</Label>
                          <Input id="trusteePhone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Upload */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Required Documents</h3>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Upload Registration Certificate
                        </p>
                        <p className="text-xs text-muted-foreground">PDF or image (max 5MB)</p>
                      </div>
                      
                      <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-1">
                          Upload Trustee ID Proof
                        </p>
                        <p className="text-xs text-muted-foreground">Aadhaar, PAN, or Passport</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea 
                      id="additionalInfo" 
                      placeholder="Tell us about your institution's unique features, achievements, or requirements"
                      rows={4}
                    />
                  </div>

                  {/* Terms */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="terms" className="mt-1" required />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I confirm that all information provided is accurate and I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">Terms & Conditions</a> of the Jain Boarding Federation.
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3">
                    <Button type="button" variant="outline" className="flex-1">
                      Save as Draft
                    </Button>
                    <Button type="submit" className="flex-1 bg-teal hover:bg-teal/90">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card className="mt-6 card-elevated">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground text-center">
                  Questions about the onboarding process? Contact{" "}
                  <a href="mailto:trustees@jainboarding.org" className="text-primary hover:underline">
                    trustees@jainboarding.org
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-teal/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h2 className="text-3xl font-bold mb-4">What You'll Get Access To</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Once approved, access a comprehensive dashboard to manage your institution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-bold mb-2">Student Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Track enrollments, manage applications, and communicate with students
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 mb-3 text-success" />
                  <h3 className="font-bold mb-2">Fundraising Tools</h3>
                  <p className="text-sm text-muted-foreground">
                    Create campaigns, track donations, and connect with donors
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-6">
                  <FileText className="w-8 h-8 mb-3 text-saffron" />
                  <h3 className="font-bold mb-2">Resource Library</h3>
                  <p className="text-sm text-muted-foreground">
                    Access templates, guides, and share resources with other trustees
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Trustees;
