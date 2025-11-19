import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building2, Users, Heart, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PortalSelection = () => {
  const navigate = useNavigate();

  const portals = [
    {
      id: 'student',
      title: 'Student / Parent Portal',
      description: 'Register as a student or parent to apply for institutions and track applications',
      icon: GraduationCap,
      bgColor: 'bg-primary',
    },
    {
      id: 'hostel',
      title: 'Institution Admin Portal',
      description: 'Manage institution operations, applications, and resources',
      icon: Building2,
      bgColor: 'bg-maroon',
    },
    {
      id: 'trustee',
      title: 'Trustee Portal',
      description: 'Oversee institutional management, compliance, and governance',
      icon: Users,
      bgColor: 'bg-saffron',
    },
    {
      id: 'donor',
      title: 'Donor Portal',
      description: 'Support students and institutions through meaningful contributions',
      icon: Heart,
      bgColor: 'bg-success',
    },
    {
      id: 'super-admin',
      title: 'Super Admin Portal',
      description: 'Full system administration, manage all portals, users, and content',
      icon: Shield,
      bgColor: 'bg-destructive',
      isDirect: true,
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portals.map((portal) => {
              const Icon = portal.icon;
              return (
                <Card 
                  key={portal.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50 hover:-translate-y-1"
                >
                  <CardHeader className="space-y-4">
                    <div className={`w-20 h-20 rounded-2xl ${portal.bgColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">{portal.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {portal.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-3">
                    {portal.isDirect ? (
                      <Button
                        onClick={() => navigate('/super-admin/dashboard')}
                        className="w-full shadow-md hover:shadow-lg transition-shadow"
                        size="lg"
                      >
                        Access Portal
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => navigate(`/auth?portal=${portal.id}&mode=signup`)}
                          className="flex-1 shadow-md hover:shadow-lg transition-shadow"
                          size="lg"
                        >
                          Sign Up
                        </Button>
                        <Button
                          onClick={() => navigate(`/auth?portal=${portal.id}&mode=signin`)}
                          variant="outline"
                          className="flex-1 hover:bg-muted transition-colors"
                          size="lg"
                        >
                          Sign In
                        </Button>
                      </>
                    )}
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
