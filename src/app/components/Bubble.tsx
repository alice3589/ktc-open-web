import Image from "next/image";
import { ContentType, contentIcons } from './types';

interface BubbleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  type: ContentType;
  onClick: (type: ContentType) => void;
}

const borderColors = ['border-red-300', 'border-yellow-300', 'border-green-300', 'border-blue-300'];

export const Bubble = ({ id, x, y, size, type, onClick }: BubbleProps) => {
  const colorIndex = id % borderColors.length;
  const borderColor = borderColors[colorIndex];
  
  return (
    <div
      className={`absolute rounded-full bg-white opacity-70 animate-bubble cursor-pointer hover:opacity-100 transition-opacity flex items-center justify-center border-4 ${borderColor}`}
      onClick={() => onClick(type)}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `min(${size}px, 90vw)`,
        height: `min(${size}px, 90vw)`,
        maxWidth: '400px',
        maxHeight: '400px',
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
}; 