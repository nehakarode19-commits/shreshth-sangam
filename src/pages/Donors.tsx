import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Building2, 
  Trophy, 
  TrendingUp,
  CheckCircle2 
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Donors = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const presetAmounts = [500, 1000, 2000, 5000];

  const donationCategories = [
    {
      icon: BookOpen,
      title: "Education Support",
      description: "Fund books, supplies, and learning materials",
      raised: "₹8,50,000",
      goal: "₹10,00,000",
    },
    {
      icon: Building2,
      title: "Infrastructure",
      description: "Build and maintain hostel facilities",
      raised: "₹15,00,000",
      goal: "₹25,00,000",
    },
    {
      icon: Users,
      title: "Scholarship Fund",
      description: "Support students from underprivileged backgrounds",
      raised: "₹6,00,000",
      goal: "₹15,00,000",
    },
  ];

  const impactStories = [
    {
      name: "Rajesh Kumar",
      role: "Student",
      story: "Thanks to donor support, I could complete my education and now I'm studying engineering.",
      image: "👨‍🎓",
    },
    {
      name: "Priya Jain",
      role: "Parent",
      story: "The scholarship helped my daughter get quality education in a safe environment.",
      image: "👩",
    },
    {
      name: "Suresh Patel",
      role: "Trustee",
      story: "Donor contributions helped us upgrade our library and computer lab.",
      image: "👨‍💼",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal to-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Heart className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference Today</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8 opacity-90">
              Your donation helps provide quality education and safe living environments 
              for students in Jain boarding schools across India.
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">3,500+</div>
                <div className="text-sm opacity-80">Active Donors</div>
              </div>
              <div>
                <div className="text-3xl font-bold">₹2.5Cr+</div>
                <div className="text-sm opacity-80">Funds Raised</div>
              </div>
              <div>
                <div className="text-3xl font-bold">12,000+</div>
                <div className="text-sm opacity-80">Students Helped</div>
              </div>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl">Contribute Now</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="onetime" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="onetime">One-Time</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>

                  <TabsContent value="onetime" className="space-y-6">
                    <div>
                      <Label className="mb-3 block">Select Amount</Label>
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        {presetAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={donationAmount === amount.toString() ? "default" : "outline"}
                            onClick={() => setDonationAmount(amount.toString())}
                            className="h-12"
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                      <Label htmlFor="customAmount">Or enter custom amount</Label>
                      <Input
                        id="customAmount"
                        type="number"
                        placeholder="Enter amount"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cause">Choose Cause (Optional)</Label>
                      <select
                        id="cause"
                        className="w-full mt-2 px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="">General Fund</option>
                        <option value="education">Education Support</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="scholarship">Scholarship Fund</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="donorName">Full Name *</Label>
                        <Input id="donorName" placeholder="Your name" required />
                      </div>
                      <div>
                        <Label htmlFor="donorEmail">Email *</Label>
                        <Input id="donorEmail" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4 text-sm">
                      <p className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        100% of your donation goes directly to the cause
                      </p>
                      <p className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Tax exemption certificate will be provided
                      </p>
                      <p className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Secure payment gateway
                      </p>
                    </div>

                    <Button 
                      className="w-full bg-teal hover:bg-teal/90" 
                      size="lg"
                      disabled={!donationAmount}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Donate ₹{donationAmount || "0"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="monthly" className="space-y-6">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
                      <p className="font-semibold mb-2">Become a Monthly Supporter</p>
                      <p className="text-sm text-muted-foreground">
                        Make a lasting impact with recurring monthly donations. Cancel anytime.
                      </p>
                    </div>

                    <div>
                      <Label className="mb-3 block">Monthly Amount</Label>
                      <div className="grid grid-cols-4 gap-3">
                        {[300, 500, 1000, 2000].map((amount) => (
                          <Button
                            key={amount}
                            variant={donationAmount === amount.toString() ? "default" : "outline"}
                            onClick={() => setDonationAmount(amount.toString())}
                            className="h-12"
                          >
                            ₹{amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="donorNameMonthly">Full Name *</Label>
                        <Input id="donorNameMonthly" placeholder="Your name" required />
                      </div>
                      <div>
                        <Label htmlFor="donorEmailMonthly">Email *</Label>
                        <Input id="donorEmailMonthly" type="email" placeholder="your@email.com" required />
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-teal hover:bg-teal/90" 
                      size="lg"
                      disabled={!donationAmount}
                    >
                      Start Monthly Donation of ₹{donationAmount || "0"}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Donation Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Where Your Money Goes</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose a specific cause or contribute to our general fund
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {donationCategories.map((category, index) => (
                <Card key={index} className="card-elevated hover-lift">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <category.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Raised:</span>
                        <span className="font-semibold">{category.raised}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-teal h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(parseInt(category.raised.replace(/[₹,]/g, '')) / parseInt(category.goal.replace(/[₹,]/g, ''))) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Goal: {category.goal}</span>
                        <span>{Math.round((parseInt(category.raised.replace(/[₹,]/g, '')) / parseInt(category.goal.replace(/[₹,]/g, ''))) * 100)}%</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      Donate to This Cause
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-saffron" />
              <h2 className="text-3xl font-bold mb-4">Impact Stories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how your contributions are changing lives
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {impactStories.map((story, index) => (
                <Card key={index} className="card-elevated">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{story.image}</div>
                    <h3 className="font-bold text-lg mb-1">{story.name}</h3>
                    <Badge variant="secondary" className="mb-4">{story.role}</Badge>
                    <p className="text-sm text-muted-foreground italic">"{story.story}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Donor Benefits */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-teal/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <Card className="card-elevated">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Donor Recognition & Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Tax Benefits</h4>
                      <p className="text-sm text-muted-foreground">
                        80G tax exemption certificates for all donations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Impact Reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Regular updates on how your donation is making a difference
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Donor Dashboard</h4>
                      <p className="text-sm text-muted-foreground">
                        Track your contributions and impact in one place
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Recognition Wall</h4>
                      <p className="text-sm text-muted-foreground">
                        Major donors recognized on our website and institutions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donors;
