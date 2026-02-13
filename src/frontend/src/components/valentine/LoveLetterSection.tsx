import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoveLetterSectionProps {
  recipientName: string;
  senderName: string;
  letterBody: string;
}

export const LoveLetterSection = forwardRef<HTMLElement, LoveLetterSectionProps>(
  ({ recipientName, senderName, letterBody }, ref) => {
    return (
      <section ref={ref} className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-romantic border-2 border-primary/20 bg-card/80 backdrop-blur">
            <CardHeader className="text-center space-y-2 pb-6">
              <CardTitle className="text-3xl md:text-4xl font-serif">
                To {recipientName}
              </CardTitle>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                  {letterBody}
                </p>
              </div>
              <div className="text-right pt-4">
                <p className="text-xl font-serif italic text-primary">
                  {senderName}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }
);

LoveLetterSection.displayName = 'LoveLetterSection';
