import { ReactNode } from 'react';

interface ValentineLayoutProps {
  children: ReactNode;
}

export function ValentineLayout({ children }: ValentineLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background texture */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/valentine-bg-texture.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Gradient overlay */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-background via-background/95 to-accent/10" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
