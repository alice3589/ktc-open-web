import Image from "next/image";

type ContentType = "greeting" | "schedule" | "map" | "notice";

const contentIcons: Record<ContentType, string> = {
  greeting: "/icons/greeting.png",
  schedule: "/icons/schedule.png",
  map: "/icons/map.png",
  notice: "/icons/notice.png",
};

interface BubbleProps {
  id: number;
  x: number;
  size: number;
  type: ContentType;
  onClick: (type: ContentType) => void;
}

export const Bubble = ({ id, x, size, type, onClick }: BubbleProps) => (
  <div
    className="absolute bottom-0 rounded-full bg-white opacity-70 animate-bubble cursor-pointer hover:opacity-100 transition-opacity flex items-center justify-center"
    onClick={() => onClick(type)}
    style={{
      left: `${x}px`,
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