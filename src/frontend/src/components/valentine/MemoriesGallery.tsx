import { useState } from 'react';
import { MemoryLightbox } from './MemoryLightbox';

interface MemoriesGalleryProps {
  images: string[];
  captions: string[];
}

export function MemoriesGallery({ images, captions }: MemoriesGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption?: string } | null>(null);

  const openLightbox = (src: string, caption?: string) => {
    setSelectedImage({ src, caption });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  // Normalize to exactly 6 tiles: slice if too many, pad if too few
  const normalizedImages = images.slice(0, 6);
  while (normalizedImages.length < 6) {
    normalizedImages.push('/assets/generated/memory-01.dim_1200x800.png');
  }

  const normalizedCaptions = captions.slice(0, 6);
  while (normalizedCaptions.length < 6) {
    normalizedCaptions.push('');
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {normalizedImages.map((src, index) => {
          const caption = normalizedCaptions[index] || '';
          
          return (
            <div 
              key={index} 
              className="group relative cursor-pointer polaroid-frame"
              onClick={() => openLightbox(src, caption)}
            >
              <div className="polaroid-inner">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={src}
                    alt={caption || `Memory ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      if (target.src !== '/assets/generated/memory-01.dim_1200x800.png') {
                        target.src = '/assets/generated/memory-01.dim_1200x800.png';
                      }
                    }}
                  />
                </div>
                {caption && (
                  <div className="polaroid-caption">
                    <p className="text-foreground/80 text-sm font-medium text-center line-clamp-2">
                      {caption}
                    </p>
                  </div>
                )}
              </div>
              <div className="polaroid-shine" />
            </div>
          );
        })}
      </div>

      {selectedImage && (
        <MemoryLightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          imageSrc={selectedImage.src}
          caption={selectedImage.caption}
        />
      )}
    </>
  );
}
