import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  headline: string;
  onScrollToLetter: () => void;
}

export function HeroSection({ headline, onScrollToLetter }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Decorative hearts */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-20 animate-float">
        <img 
          src="/assets/generated/heart-doodles.dim_1024x1024.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute bottom-32 left-10 w-24 h-24 opacity-15 animate-float" style={{ animationDelay: '1s' }}>
        <img 
          src="/assets/generated/heart-doodles.dim_1024x1024.png" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
          <Heart className="w-12 h-12 text-primary fill-primary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-balance leading-tight">
          {headline}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A special message crafted with love, just for you
        </p>
        
        <Button 
          size="lg" 
          onClick={onScrollToLetter}
          className="text-lg px-8 py-6 rounded-full shadow-romantic hover:shadow-xl transition-all duration-300"
        >
          Read My Letter
          <Heart className="ml-2 w-5 h-5 fill-current" />
        </Button>
      </div>
    </section>
  );
}
