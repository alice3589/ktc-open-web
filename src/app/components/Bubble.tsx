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
      width: `${size}px`,
      height: `${size}px`,
    }}
  >
    <div className="relative w-1/2 h-1/2">
      <Image
        src={contentIcons[type]}
        alt={type}
        fill
        className="object-contain"
      />
    </div>
  </div>
); 