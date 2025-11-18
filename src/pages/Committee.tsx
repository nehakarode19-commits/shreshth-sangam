import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import trustee1 from "@/assets/committee/trustee-1.jpg";
import trustee2 from "@/assets/committee/trustee-2.jpg";
import trustee3 from "@/assets/committee/trustee-3.jpg";
import trustee4 from "@/assets/committee/trustee-4.jpg";
import trustee5 from "@/assets/committee/trustee-5.jpg";
import trustee6 from "@/assets/committee/trustee-6.jpg";

const Committee = () => {
  const boardMembers = [
    {
      title: "Trustee 1",
      position: "President",
      image: trustee1
    },
    {
      title: "Trustee 2",
      position: "Vice President",
      image: trustee2
    },
    {
      title: "Trustee 3",
      position: "General Secretary",
      image: trustee3
    },
    {
      title: "Trustee 4",
      position: "Treasurer",
      image: trustee4
    },
    {
      title: "Trustee 5",
      position: "Executive Member",
      image: trustee5
    },
    {
      title: "Trustee 6",
      position: "Executive Member",
      image: trustee6
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
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={`${member.title} - ${member.position}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 to-transparent" />
                    </div>
                    
                    {/* Info Section */}
                    <div className="p-6 bg-card text-center">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-maroon transition-colors">
                        {member.title}
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
