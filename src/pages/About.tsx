import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, TrendingUp, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Jain Boarding Federation</h1>
              <p className="text-xl text-muted-foreground">
                Connecting trustees, students, parents, and donors to strengthen Jain boarding education across India.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To build a network of modern, value-based boarding institutions that empower rural children 
                    with quality education, holistic growth, and equal opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">Our Mission</h2>
                  </div>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Deliver unified, high-quality education guided by professional management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Prepare students for competitive exams and national-level opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Strengthen rural communities by reducing migration and nurturing cultural values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Enable trustees and donors to create sustainable, meaningful impact</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="card-elevated">
                  <CardContent className="pt-6 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Connect Communities</h3>
                    <p className="text-muted-foreground">
                      We bring together students, parents, trustees, and donors in a unified platform.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="pt-6 text-center">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Facilitate Support</h3>
                    <p className="text-muted-foreground">
                      We make it easy for donors to support institutions and students in need.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="pt-6 text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Empower Growth</h3>
                    <p className="text-muted-foreground">
                      We provide resources and opportunities for students to achieve their full potential.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Over 25 years, we've built a network of 150+ boarding institutions, helping more than 
                12,000 students access quality education while preserving Jain values and strengthening 
                rural communities across India.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Hostels Onboarded</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">12,000+</div>
                  <div className="text-sm text-muted-foreground">Students Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">3,500+</div>
                  <div className="text-sm text-muted-foreground">Donors Supporting</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">25+</div>
                  <div className="text-sm text-muted-foreground">Years of Service</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
