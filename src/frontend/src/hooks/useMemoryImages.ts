import { useState, useEffect } from 'react';

const DEFAULT_IMAGES = [
  '/assets/user-photos/IMG_20260102_194134.jpg',
  '/assets/user-photos/IMG_20260214_032137.jpg',
  '/assets/user-photos/IMG_20250220_045805_370.jpg',
  '/assets/user-photos/IMG_20260214_040600.jpg',
  '/assets/user-photos/IMG_20260214_040639.jpg',
  '/assets/user-photos/IMG_20260214_032137-1.jpg',
];

const STORAGE_KEY = 'valentine-memory-images';
const OLD_PLACEHOLDER = '/assets/generated/memory-06.dim_1200x800.png';

// Normalize asset paths to ensure they work when served from site root
function normalizeAssetPath(path: string): string {
  // Leave data URLs untouched
  if (path.startsWith('data:')) {
    return path;
  }
  // Ensure root-absolute path for static assets
  if (path.startsWith('assets/')) {
    return '/' + path;
  }
  return path;
}

export function useMemoryImages() {
  const [images, setImages] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length === 6) {
          // Migration: replace old placeholder with new real photo
          const migrated = parsed.map((img, idx) => {
            if (idx === 5 && img === OLD_PLACEHOLDER) {
              return DEFAULT_IMAGES[5];
            }
            return normalizeAssetPath(img);
          });
          return migrated;
        }
      }
    } catch (error) {
      console.error('Failed to load memory images from localStorage:', error);
    }
    return DEFAULT_IMAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (error) {
      console.error('Failed to save memory images to localStorage:', error);
    }
  }, [images]);

  const setImage = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setImages(prev => {
        const newImages = [...prev];
        newImages[index] = dataUrl;
        return newImages;
      });
    };
    reader.readAsDataURL(file);
  };

  const resetImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = DEFAULT_IMAGES[index];
      return newImages;
    });
  };

  const resetAll = () => {
    setImages(DEFAULT_IMAGES);
  };

  return {
    images,
    setImage,
    resetImage,
    resetAll,
    isCustom: (index: number) => images[index] !== DEFAULT_IMAGES[index],
  };
}
