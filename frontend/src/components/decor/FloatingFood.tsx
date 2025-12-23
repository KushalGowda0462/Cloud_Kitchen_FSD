import Image from 'next/image';

interface FloatingFoodProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FloatingFood({ src, alt, className = '' }: FloatingFoodProps) {
  return (
    <div
      className={`absolute pointer-events-none select-none hidden lg:block z-0 ${className}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain drop-shadow-[0_28px_45px_rgba(0,0,0,0.28)]"
          unoptimized
        />
      </div>
    </div>
  );
}

