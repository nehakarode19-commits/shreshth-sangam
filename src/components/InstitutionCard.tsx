import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MapPin, Users, CheckCircle2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";

interface InstitutionCardProps {
  id: string;
  name: string;
  location: string;
  capacity: number;
  image: string;
  verified: boolean;
  type: string;
}

const InstitutionCard = ({ id, name, location, capacity, image, verified, type }: InstitutionCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift card-elevated group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {verified && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-1" />
            <span>Capacity: {capacity}</span>
          </div>
          <Badge variant="secondary">{type}</Badge>
        </div>
      </CardContent>

      <CardFooter className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1">
          Contact
        </Button>
        <NavLink to={`/institutions/${id}`} className="flex-1">
          <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
            View Details
          </Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
};

export default InstitutionCard;
