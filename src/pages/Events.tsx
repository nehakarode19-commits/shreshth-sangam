import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Trophy, Music } from "lucide-react";
import culturalEvent from "@/assets/cultural-event.jpg";
import jainHeritage from "@/assets/jain-heritage.jpg";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Inter-Hostel Sports Competition",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Shree Mahavir Jain Hostel, Ahmedabad",
      category: "Sports",
      participants: "250+",
      image: jainHeritage,
      description: "Annual sports meet bringing together students from all hostels for friendly competition.",
    },
    {
      id: 2,
      title: "Cultural Festival - Jain Heritage Day",
      date: "March 22, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Multiple Venues",
      category: "Cultural",
      participants: "500+",
      image: culturalEvent,
      description: "Celebrate Jain culture with traditional performances, art exhibitions, and workshops.",
    },
    {
      id: 3,
      title: "Educational Seminar on Values",
      date: "March 28, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Online & On-Campus",
      category: "Educational",
      participants: "300+",
      image: jainHeritage,
      description: "Learn about Jain philosophy and its application in modern education and life.",
    },
    {
      id: 4,
      title: "Trustee Annual Conference",
      date: "April 5, 2024",
      time: "11:00 AM - 4:00 PM",
      location: "Federation Headquarters, Mumbai",
      category: "Conference",
      participants: "150+",
      image: jainHeritage,
      description: "Annual gathering of trustees to discuss governance, best practices, and future planning.",
    },
  ];

  const pastEvents = [
    {
      title: "Scholarship Award Ceremony 2023",
      date: "January 20, 2024",
      participants: "200+",
      highlights: "100 scholarships awarded",
    },
    {
      title: "Winter Educational Camp",
      date: "December 15, 2023",
      participants: "350+",
      highlights: "Leadership workshops & skill development",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Sports: "bg-success/10 text-success",
      Cultural: "bg-saffron/10 text-saffron",
      Educational: "bg-primary/10 text-primary",
      Conference: "bg-teal/10 text-teal",
    };
    return colors[category] || "bg-muted";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-teal text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Competitions</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Join us for educational seminars, cultural celebrations, sports competitions, and community gatherings
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Mark your calendar and join us for these exciting events
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="card-elevated hover-lift overflow-hidden">
                  <div className="relative h-48">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-3 right-3 ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants} Expected
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-primary hover:bg-primary/90">
                        Register Now
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Event Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Event Categories</h2>
              <p className="text-muted-foreground">
                Explore different types of events we organize
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="card-elevated hover-lift text-center">
                <CardContent className="p-6">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-success" />
                  <h3 className="font-bold mb-2">Sports</h3>
                  <p className="text-sm text-muted-foreground">
                    Competitions and tournaments
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated hover-lift text-center">
                <CardContent className="p-6">
                  <Music className="w-12 h-12 mx-auto mb-4 text-saffron" />
                  <h3 className="font-bold mb-2">Cultural</h3>
                  <p className="text-sm text-muted-foreground">
                    Festivals and celebrations
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated hover-lift text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold mb-2">Educational</h3>
                  <p className="text-sm text-muted-foreground">
                    Seminars and workshops
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated hover-lift text-center">
                <CardContent className="p-6">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-teal" />
                  <h3 className="font-bold mb-2">Conferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional gatherings
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Past Events</h2>
              <p className="text-muted-foreground">
                Highlights from our recent events
              </p>
            </div>

            <div className="space-y-4">
              {pastEvents.map((event, index) => (
                <Card key={index} className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-1" />
                            {event.participants}
                          </span>
                          <Badge variant="secondary">{event.highlights}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4 md:mt-0">
                        View Photos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/5 to-teal/5">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <Card className="card-elevated">
              <CardContent className="p-12">
                <Calendar className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter to receive event updates, registration reminders, and exclusive content
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border rounded-md bg-background"
                  />
                  <Button className="bg-primary hover:bg-primary/90">
                    Subscribe
                  </Button>
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

export default Events;
