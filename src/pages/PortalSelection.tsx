import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Users, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PortalSelection = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'student',
      title: 'Student / Parent Portal',
      description: 'Register as a student or parent to apply for hostels and track applications',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'hostel',
      title: 'Hostel Portal',
      description: 'Manage hostel operations, applications, and resources',
      icon: Building2,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'trustee',
      title: 'Trustee Portal',
      description: 'Oversee institutional management and compliance',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'donor',
      title: 'Donor Portal',
      description: 'Support students and institutions through contributions',
      icon: Heart,
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Select Your Portal
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose the portal that matches your role to continue
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card 
                  key={portal.id}
                  className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${portal.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{portal.title}</CardTitle>
                    <CardDescription className="text-base">
                      {portal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    <Button
                      onClick={() => navigate(`/auth?portal=${portal.id}&mode=signup`)}
                      className="flex-1"
                      size="lg"
                    >
                      Sign Up
                    </Button>
                    <Button
                      onClick={() => navigate(`/auth?portal=${portal.id}&mode=signin`)}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortalSelection;
