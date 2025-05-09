import { ContentType, contentIcons } from './types';

interface BubbleProps {
  id: number;
  x: number;
  y: number;
  size: number;
  type: ContentType;
  onClick: (type: ContentType) => void;
}

const borderGradients = [
  'linear-gradient(to right, #fca5a5, #f9a8d4, #fca5a5)',
  'linear-gradient(to right, #fde047, #fdba74, #fde047)',
  'linear-gradient(to right, #86efac, #5eead4, #86efac)',
  'linear-gradient(to right, #93c5fd, #818cf8, #93c5fd)'
];

export const Bubble = ({ id, x, y, size, type, onClick }: BubbleProps) => {
  const gradientIndex = id % borderGradients.length;
  const borderGradient = borderGradients[gradientIndex];
  
  return (
    <div
      className="absolute rounded-full animate-bubble cursor-pointer hover:opacity-100 transition-opacity flex items-center justify-center"
      onClick={() => onClick(type)}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `min(${size}px, 90vw)`,
        height: `min(${size}px, 90vw)`,
        maxWidth: '400px',
        maxHeight: '400px',
        padding: '4px',
        
        background: borderGradient,
      }}
    >
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
        <div className={`relative ${type === 'greeting' ? 'w-10/10 h-10/10' : 'w-1/2 h-1/2'}`}>
          <img
            src={contentIcons[type]}
            alt={type}
            className="object-contain"
            // sizes="(max-width: 768px) 40vw, 150px"
          />
        </div>
      </div>
    </div>
  );
}; 