import { Heart } from 'lucide-react';

interface FooterSectionProps {
  senderName: string;
}

export function FooterSection({ senderName }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = encodeURIComponent(
    typeof window !== 'undefined' ? window.location.hostname : 'valentine-site'
  );

  return (
    <footer className="py-16 px-4 bg-secondary/20 border-t border-primary/10">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-block p-3 bg-primary/10 rounded-full">
          <Heart className="w-8 h-8 text-primary fill-primary" />
        </div>
        
        <p className="text-2xl md:text-3xl font-serif italic text-primary">
          Forever and always,
        </p>
        <p className="text-xl font-serif">
          {senderName}
        </p>
        
        <div className="pt-8 text-sm text-muted-foreground space-y-2">
          <p>
            Built with <Heart className="inline w-4 h-4 text-primary fill-primary mx-1" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          <p>© {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
