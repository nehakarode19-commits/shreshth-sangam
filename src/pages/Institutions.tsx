import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstitutionCard from "@/components/InstitutionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal } from "lucide-react";
import jainHeritage from "@/assets/jain-heritage.jpg";
import hostelRoom from "@/assets/hostel-room.jpg";
import culturalEvent from "@/assets/cultural-event.jpg";

const Institutions = () => {
  const [showFilters, setShowFilters] = useState(true);

  const institutions = [
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
    {
      id: "4",
      name: "Shree Parshwanath Boarding",
      location: "Rajkot, Gujarat",
      capacity: 200,
      image: jainHeritage,
      verified: true,
      type: "Boys Hostel",
    },
    {
      id: "5",
      name: "Jain Educational Hostel",
      location: "Pune, Maharashtra",
      capacity: 150,
      image: hostelRoom,
      verified: false,
      type: "Girls Hostel",
    },
    {
      id: "6",
      name: "Mahavira Academy Hostel",
      location: "Jaipur, Rajasthan",
      capacity: 280,
      image: culturalEvent,
      verified: true,
      type: "Co-Ed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-teal/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Institutions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse our network of verified Jain boarding schools and hostels
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <Card className="sticky top-24 card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <Button variant="ghost" size="sm">Clear All</Button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <Label className="mb-2">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search by name..." className="pl-10" />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-6">
                    <Label className="mb-2">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gujarat">Gujarat</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="rajasthan">Rajasthan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Type */}
                  <div className="mb-6">
                    <Label className="mb-3">Type</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="boys" />
                        <label htmlFor="boys" className="text-sm cursor-pointer">
                          Boys Hostel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="girls" />
                        <label htmlFor="girls" className="text-sm cursor-pointer">
                          Girls Hostel
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="coed" />
                        <label htmlFor="coed" className="text-sm cursor-pointer">
                          Co-Ed
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="mb-6">
                    <Label className="mb-2">Minimum Capacity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50+</SelectItem>
                        <SelectItem value="100">100+</SelectItem>
                        <SelectItem value="200">200+</SelectItem>
                        <SelectItem value="300">300+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Verified Only */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verified" />
                    <label htmlFor="verified" className="text-sm cursor-pointer">
                      Verified institutions only
                    </label>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{institutions.length} Institutions Found</h2>
                  <p className="text-sm text-muted-foreground">
                    Showing all available boarding schools and hostels
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                      <SelectItem value="capacity">Capacity</SelectItem>
                      <SelectItem value="location">Location</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Institution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {institutions.map((institution) => (
                  <InstitutionCard key={institution.id} {...institution} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Institutions;
