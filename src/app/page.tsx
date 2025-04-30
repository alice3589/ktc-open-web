"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number }[]>([]);
  const bubblesRef = useRef(bubbles);

  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  const isOverlapping = (x: number, size: number) => {
    return bubblesRef.current.some(bubble => {
      const distance = Math.abs(x - bubble.x);
      const minDistance = (size + bubble.size) / 2;
      return distance < minDistance;
    });
  };

  useEffect(() => {
    const createRandomBubble = () => {
      let attempts = 0;
      let newX: number;
      let newSize: number;
      
      do {
        newX = Math.random() * window.innerWidth;
        newSize = Math.random() * 100 + 150;
        attempts++;
      } while (isOverlapping(newX, newSize) && attempts < 10);

      if (attempts < 10) {
        const newBubble = {
          id: Date.now(),
          x: newX,
          size: newSize,
        };
        setBubbles((prev) => [...prev, newBubble]);
        setTimeout(() => {
          setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
        }, 20000);
      }
    };

    const interval = setInterval(createRandomBubble, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 relative overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-white opacity-70 animate-bubble"
          style={{
            left: `${bubble.x}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
        />
      ))}
      <style jsx global>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) scale(1);
          }
          100% {
            transform: translateY(calc(-100vh - 100%)) scale(1.2);
          }
        }
        .animate-bubble {
          animation: bubble 15s ease-out forwards; /* アニメーション時間を15秒に変更 */
        }
      `}</style>
    </div>
  );
}
