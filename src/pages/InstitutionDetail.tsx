import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Users, Mail, Phone, CheckCircle2, Building2, Utensils, Wifi, Book, Heart } from "lucide-react";
import jainHeritage from "@/assets/jain-heritage.jpg";
import hostelRoom from "@/assets/hostel-room.jpg";
import culturalEvent from "@/assets/cultural-event.jpg";
import { NavLink } from "@/components/NavLink";

const InstitutionDetail = () => {
  const { id } = useParams();
  
  // Mock data - in real app, fetch based on id
  const institution = {
    name: "Shree Mahavir Jain Hostel",
    location: "Ahmedabad, Gujarat",
    capacity: 250,
    currentOccupancy: 180,
    type: "Boys Hostel",
    verified: true,
    trustee: "Shri Pravin Kumar Jain",
    established: "1998",
    email: "mahavir.hostel@example.com",
    phone: "+91 79 XXXX XXXX",
    description: "A premier boarding facility for boys following Jain values and traditions. We provide a nurturing environment that balances academic excellence with cultural and spiritual growth.",
    facilities: [
      { icon: Building2, name: "Modern Infrastructure" },
      { icon: Utensils, name: "Vegetarian Kitchen" },
      { icon: Wifi, name: "High-Speed Internet" },
      { icon: Book, name: "Well-stocked Library" },
    ],
    images: [jainHeritage, hostelRoom, culturalEvent],
    needs: [
      { title: "Library Books", amount: "₹50,000", raised: "₹30,000" },
      { title: "Sports Equipment", amount: "₹35,000", raised: "₹15,000" },
      { title: "Computer Lab Upgrade", amount: "₹1,00,000", raised: "₹45,000" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <img 
            src={institution.images[0]} 
            alt={institution.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="card-elevated mb-8">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{institution.name}</h1>
                        {institution.verified && (
                          <Badge className="bg-success text-success-foreground">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {institution.location}
                      </div>
                      <Badge variant="secondary" className="mb-4">{institution.type}</Badge>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">{institution.description}</p>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="facilities">Facilities</TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Established</p>
                          <p className="font-semibold">{institution.established}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                          <p className="font-semibold">{institution.capacity} students</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Current Occupancy</p>
                          <p className="font-semibold">{institution.currentOccupancy} students</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Trustee</p>
                          <p className="font-semibold">{institution.trustee}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="facilities" className="mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        {institution.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
                            <facility.icon className="w-6 h-6 text-primary" />
                            <span className="font-medium">{facility.name}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="gallery" className="mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        {institution.images.map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Support Needs */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Current Needs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {institution.needs.map((need, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{need.title}</h4>
                        <Badge variant="outline">{need.amount}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Raised: {need.raised}</span>
                          <span>{Math.round((parseInt(need.raised.replace(/[₹,]/g, '')) / parseInt(need.amount.replace(/[₹,]/g, ''))) * 100)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ 
                              width: `${(parseInt(need.raised.replace(/[₹,]/g, '')) / parseInt(need.amount.replace(/[₹,]/g, ''))) * 100}%` 
                            }}
                          />
                        </div>
                        <Button size="sm" className="w-full mt-2 bg-teal hover:bg-teal/90">
                          <Heart className="w-4 h-4 mr-2" />
                          Sponsor This Need
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="card-elevated sticky top-24">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <a href={`mailto:${institution.email}`} className="text-sm hover:text-primary transition-colors">
                      {institution.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <a href={`tel:${institution.phone}`} className="text-sm hover:text-primary transition-colors">
                      {institution.phone}
                    </a>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <NavLink to="/apply" className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Apply for Admission
                      </Button>
                    </NavLink>
                    <Button variant="outline" className="w-full">
                      Send Inquiry
                    </Button>
                    <NavLink to="/donors" className="block">
                      <Button variant="outline" className="w-full bg-teal/10 text-teal hover:bg-teal/20 border-teal/30">
                        <Heart className="w-4 h-4 mr-2" />
                        Support Institution
                      </Button>
                    </NavLink>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Available Beds</span>
                    <span className="font-semibold">{institution.capacity - institution.currentOccupancy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Occupancy Rate</span>
                    <Badge variant="secondary">
                      {Math.round((institution.currentOccupancy / institution.capacity) * 100)}%
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstitutionDetail;
