import { MemoriesGallery } from './MemoriesGallery';

interface MemoriesSectionProps {
  images: string[];
  captions: string[];
}

export function MemoriesSection({ images, captions }: MemoriesSectionProps) {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            Our Beautiful Memories
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 text-lg">
            Moments we've shared, treasures I'll keep forever
          </p>
        </div>
        <MemoriesGallery images={images} captions={captions} />
      </div>
    </section>
  );
}
