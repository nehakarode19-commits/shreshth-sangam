import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstitutionCard from "@/components/InstitutionCard";
import { Search, Heart, Users, Building2, TrendingUp, Calendar, Award } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";
import jainHeritage from "@/assets/jain-heritage.jpg";
import hostelRoom from "@/assets/hostel-room.jpg";
import culturalEvent from "@/assets/cultural-event.jpg";
import { NavLink } from "@/components/NavLink";

const Index = () => {
  const impactStats = [
    { label: "Hostels Onboarded", value: "150+", icon: Building2 },
    { label: "Students Helped", value: "12,000+", icon: Users },
    { label: "Donors Supporting", value: "3,500+", icon: Heart },
    { label: "Years of Service", value: "25+", icon: Award },
  ];

  const featuredInstitutions = [
    {
      id: "1",
      name: "Shree Mahavir Jain Hostel",
      location: "Ahmedabad, Gujarat",
      capacity: 250,
      image: jainHeritage,
      verified: true,
      type: "Boys Hostel",
    },
    {
      id: "2",
      name: "Jain Girls Boarding School",
      location: "Mumbai, Maharashtra",
      capacity: 180,
      image: hostelRoom,
      verified: true,
      type: "Girls Hostel",
    },
    {
      id: "3",
      name: "Jain Vidyalaya Hostel",
      location: "Bangalore, Karnataka",
      capacity: 320,
      image: culturalEvent,
      verified: true,
      type: "Co-Ed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
                Strengthening Jain Boarding — Together
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                A trusted platform connecting hostels, trustees, donors and students to preserve values, 
                boost education and enable rural development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink to="/institutions">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Search className="mr-2 h-5 w-5" />
                    Discover Hostels
                  </Button>
                </NavLink>
                <NavLink to="/donors">
                  <Button size="lg" variant="outline" className="bg-teal text-teal-foreground hover:bg-teal/90 border-teal">
                    <Heart className="mr-2 h-5 w-5" />
                    Donate Now
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => (
                <Card key={index} className="text-center card-elevated animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="pt-6">
                    <stat.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                    <div className="text-3xl font-bold mb-2 text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Institutions */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Institutions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our verified network of quality boarding schools and hostels committed to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {featuredInstitutions.map((institution) => (
                <InstitutionCard key={institution.id} {...institution} />
              ))}
            </div>

            <div className="text-center">
              <NavLink to="/institutions">
                <Button size="lg" variant="outline">
                  View All Institutions
                </Button>
              </NavLink>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-teal/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Make Impact</h2>
              <p className="text-lg text-muted-foreground">
                Supporting education through community collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="card-elevated hover-lift text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">For Students</h3>
                  <p className="text-muted-foreground">
                    Find quality boarding schools with verified facilities and trusted environments
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated hover-lift text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-teal" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">For Donors</h3>
                  <p className="text-muted-foreground">
                    Make meaningful contributions with full transparency and impact tracking
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated hover-lift text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-saffron" />
                  </div>
                  <h3 className="font-bold text-xl mb-3">For Trustees</h3>
                  <p className="text-muted-foreground">
                    Access resources, manage operations, and connect with the community
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="bg-gradient-to-r from-primary to-teal text-primary-foreground overflow-hidden">
              <CardContent className="p-12 text-center relative">
                <Calendar className="absolute top-8 right-8 w-32 h-32 opacity-10" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                  Whether you're a student seeking education, a donor wanting to give back, 
                  or a trustee managing an institution — we're here to support you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <NavLink to="/apply">
                    <Button size="lg" variant="secondary" className="min-w-[200px]">
                      Apply Now
                    </Button>
                  </NavLink>
                  <NavLink to="/trustees">
                    <Button size="lg" variant="outline" className="min-w-[200px] border-white text-white hover:bg-white/10">
                      Become a Trustee
                    </Button>
                  </NavLink>
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

export default Index;
