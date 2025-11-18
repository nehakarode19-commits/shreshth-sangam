import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const Committee = () => {
  const boardMembers = [
    {
      name: "Rajesh Kumar Jain",
      position: "President",
      initials: "RK",
      color: "bg-maroon"
    },
    {
      name: "Priya Mehta",
      position: "Vice President",
      initials: "PM",
      color: "bg-maroon/90"
    },
    {
      name: "Amit Shah",
      position: "General Secretary",
      initials: "AS",
      color: "bg-maroon/80"
    },
    {
      name: "Sunita Agarwal",
      position: "Treasurer",
      initials: "SA",
      color: "bg-maroon/70"
    },
    {
      name: "Vikram Singh",
      position: "Executive Member",
      initials: "VS",
      color: "bg-maroon/60"
    },
    {
      name: "Anjali Patel",
      position: "Executive Member",
      initials: "AP",
      color: "bg-maroon/50"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-maroon text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full">
                  <Users className="h-16 w-16" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Board of Directors
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Meet the dedicated leaders guiding Jain Boarding Federation towards excellence in education and student welfare
              </p>
            </div>
          </div>
        </section>

        {/* Board Members Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {boardMembers.map((member, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer hover:-translate-y-1 overflow-hidden"
                >
                  <CardContent className="p-0">
                    {/* Avatar Section */}
                    <div className="relative h-64 flex items-center justify-center bg-gradient-to-br from-maroon to-maroon/80 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
                      <div className="relative">
                        <div className={`${member.color} w-32 h-32 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-5xl font-bold text-white">
                            {member.initials}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Info Section */}
                    <div className="p-6 bg-card text-center">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-maroon transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-maroon uppercase tracking-wide">
                        {member.position}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Commitment
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Board of Directors is committed to upholding the highest standards of governance, 
                transparency, and service to our students, hostels, and partner institutions. Together, 
                we work tirelessly to ensure every student has access to quality education and safe accommodation.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Committee;
