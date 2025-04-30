"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bubble } from './components/Bubble';
import { Modal } from './components/Modal';
import { CustomNavbar } from './components/CustomNavbar';
import { ContentType } from './components/types';

export default function Home() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number; type: ContentType }[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
  const bubblesRef = useRef(bubbles);
  const lastTypeRef = useRef<ContentType | null>(null);
  const isGeneratingRef = useRef(false);

  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  const isOverlapping = (x: number, size: number) => {
    return bubblesRef.current.some(bubble => {
      const distance = Math.abs(x - bubble.x);
      const minDistance = (size + bubble.size) / 2.5;
      return distance < minDistance;
    });
  };

  const getRandomContentType = (): ContentType => {
    const types: ContentType[] = ["greeting", "schedule", "map", "notice"];
    const availableTypes = types.filter(type => type !== lastTypeRef.current);
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    lastTypeRef.current = randomType;
    return randomType;
  };

  const createBubble = useCallback(() => {
    if (isGeneratingRef.current) return false;

    isGeneratingRef.current = true;
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
        type: getRandomContentType(),
      };
      setBubbles((prev) => [...prev, newBubble]);
      setTimeout(() => {
        setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
      }, 20000);
      return true;
    }
    return false;
  }, [isOverlapping, getRandomContentType]);

  useEffect(() => {
    // 初期状態で1つのシャボン玉を生成
    createBubble();

    const interval = setInterval(() => {
      createBubble();
      // 生成フラグをリセット
      setTimeout(() => {
        isGeneratingRef.current = false;
      }, 1000);
    }, 1000); // 1秒ごとに生成を試みる

    return () => clearInterval(interval);
  }, [createBubble]);

  const handleBubbleClick = (type: ContentType) => {
    setSelectedContent(type);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  return (
    <div className="min-h-screen bg-blue-100 relative overflow-hidden">
      <CustomNavbar onSelect={handleBubbleClick} />

      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          x={bubble.x}
          size={bubble.size}
          type={bubble.type}
          onClick={handleBubbleClick}
        />
      ))}

      <Modal
        selectedContent={selectedContent}
        onClose={closeModal}
      />

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
          animation: bubble 15s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
