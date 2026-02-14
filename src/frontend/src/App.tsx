import { useRef } from 'react';
import { ValentineLayout } from '@/components/valentine/ValentineLayout';
import { HeroSection } from '@/components/valentine/HeroSection';
import { LoveLetterSection } from '@/components/valentine/LoveLetterSection';
import { MemoriesSection } from '@/components/valentine/MemoriesSection';
import { ReasonsSection } from '@/components/valentine/ReasonsSection';
import { FooterSection } from '@/components/valentine/FooterSection';
import { EditPanel } from '@/components/valentine/EditPanel';
import { useLocalStorageState } from '@/hooks/useLocalStorageState';
import { useMemoryImages } from '@/hooks/useMemoryImages';
import { defaultContent } from '@/valentine/contentDefaults';
import { ValentineContent } from '@/valentine/types';

function App() {
  const [content, setContent] = useLocalStorageState<ValentineContent>(
    'valentine-content',
    defaultContent
  );

  const { images, setImage, resetImage, isCustom } = useMemoryImages();

  const letterRef = useRef<HTMLElement>(null);

  const scrollToLetter = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <ValentineLayout>
      <HeroSection 
        headline={content.heroHeadline}
        onScrollToLetter={scrollToLetter}
      />
      
      <LoveLetterSection
        ref={letterRef}
        recipientName={content.recipientName}
        senderName={content.senderName}
        letterBody={content.loveLetterBody}
      />
      
      <MemoriesSection images={images} captions={content.memoryCaptions} />
      
      <ReasonsSection reasons={content.reasons} />
      
      <FooterSection senderName={content.senderName} />
      
      <EditPanel 
        content={content} 
        onUpdate={setContent}
        memoryImages={images}
        onImageChange={setImage}
        onImageReset={resetImage}
        isCustomImage={isCustom}
      />
    </ValentineLayout>
  );
}

export default App;
