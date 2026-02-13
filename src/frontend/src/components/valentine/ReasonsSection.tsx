import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface ReasonsSectionProps {
  reasons: string[];
}

export function ReasonsSection({ reasons }: ReasonsSectionProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Reasons I Love You
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <Card 
              key={index}
              className="group hover:shadow-romantic transition-all duration-300 border-2 border-primary/10 hover:border-primary/30 bg-card/80 backdrop-blur"
            >
              <CardContent className="p-6 flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Heart className="w-5 h-5 text-primary fill-primary" />
                </div>
                <p className="text-lg leading-relaxed pt-1">
                  {reason}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
