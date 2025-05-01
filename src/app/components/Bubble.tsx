import Image from "next/image";
import { ContentType, contentIcons } from './types';

interface BubbleProps {
  x: number;
  y: number;
  size: number;
  type: ContentType;
  onClick: (type: ContentType) => void;
}

export const Bubble = ({ x, y, size, type, onClick }: BubbleProps) => (
  <div
    className="absolute rounded-full bg-white opacity-70 animate-bubble cursor-pointer hover:opacity-100 transition-opacity flex items-center justify-center"
    onClick={() => onClick(type)}
    style={{
      left: `${x}px`,
      top: `${y}px`,
      width: `min(${size}px, 80vw)`,
      height: `min(${size}px, 80vw)`,
      maxWidth: '300px',
      maxHeight: '300px',
    }}
  >
    <div className="relative w-1/2 h-1/2">
      <Image
        src={contentIcons[type]}
        alt={type}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 40vw, 150px"
      />
    </div>
  </div>
); 