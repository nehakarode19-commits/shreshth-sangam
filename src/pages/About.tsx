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
              <p className="text-xl text-muted-foreground leading-relaxed">
                The Jain Boarding Federation is a unified platform that connects Jain boarding schools, hostels, students, parents, trustees, and donors across India. Our mission is to provide every Jain child with access to quality education, strong values, and a supportive living environment through well-managed boarding institutions.
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

        {/* What We Offer */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="card-elevated">
                  <CardContent className="pt-6">
                    <Users className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Centralized Directory of Hostels</h3>
                    <p className="text-muted-foreground">
                      Comprehensive listings of Jain boarding schools and hostels across India, making it easy to find the right institution for your child.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="pt-6">
                    <Heart className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Tools for Students and Parents</h3>
                    <p className="text-muted-foreground">
                      Easy application processes, information resources, and support systems to help families make informed decisions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="pt-6">
                    <TrendingUp className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Resources for Trustees</h3>
                    <p className="text-muted-foreground">
                      Management tools, best practices, and collaborative opportunities to enhance the quality of boarding institutions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated">
                  <CardContent className="pt-6">
                    <Award className="w-12 h-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-3">Transparent Donation Opportunities</h3>
                    <p className="text-muted-foreground">
                      Clear pathways for donors to contribute meaningfully, with full transparency on how donations are utilized.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What We Stand For</h2>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="card-elevated text-center">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">Unity</h3>
                    <p className="text-sm text-muted-foreground">
                      Bringing the Jain community together
                    </p>
                  </CardContent>
                </Card>
                <Card className="card-elevated text-center">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">Transparency</h3>
                    <p className="text-sm text-muted-foreground">
                      Clear, honest communication
                    </p>
                  </CardContent>
                </Card>
                <Card className="card-elevated text-center">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">Values</h3>
                    <p className="text-sm text-muted-foreground">
                      Preserving Jain principles
                    </p>
                  </CardContent>
                </Card>
                <Card className="card-elevated text-center">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">Upliftment</h3>
                    <p className="text-sm text-muted-foreground">
                      Empowering the community
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Impact</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Working together to build a stronger future for the Jain community. Over 25 years, we have built a network of 150+ boarding institutions, helping more than 12,000 students access quality education while preserving Jain values and strengthening rural communities across India.
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
