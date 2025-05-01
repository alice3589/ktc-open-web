"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bubble } from './components/Bubble';
import { Modal } from './components/Modal';
import { CustomNavbar } from './components/CustomNavbar';
import { ContentType } from './components/types';

export default function Home() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number; type: ContentType }[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
  const bubblesRef = useRef(bubbles);
  const lastTypeRef = useRef<ContentType | null>(null);
  const lastGenerationTimeRef = useRef<number>(Date.now());
  const minGenerationInterval = 1000; // 最小生成間隔（ミリ秒）

  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

  const getRandomContentType = (): ContentType => {
    const types: ContentType[] = ["greeting", "schedule", "map", "notice"];
    const availableTypes = types.filter(type => type !== lastTypeRef.current);
    const randomType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    lastTypeRef.current = randomType;
    return randomType;
  };

  const createBubble = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastGenerationTimeRef.current < minGenerationInterval) {
      return; // 最小生成間隔を下回る場合は生成しない
    }

    lastGenerationTimeRef.current = currentTime;
    // 画面のどこからでも生成（画面全体からランダムに位置を決定）
    const newX = Math.random() * window.innerWidth;
    const newY = Math.random() * window.innerHeight;
    const newSize = Math.random() * 100 + 150;

    const newBubble = {
      id: currentTime,
      x: newX,
      y: newY,
      size: newSize,
      type: getRandomContentType(),
    };
    setBubbles((prev) => [...prev, newBubble]);
    setTimeout(() => {
      setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
    }, 20000);
  }, [getRandomContentType]);

  useEffect(() => {
    // 初期状態で1つのシャボン玉を生成
    createBubble();

    const interval = setInterval(createBubble, 3000); // 3秒ごとに生成を試みる

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
          y={bubble.y}
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
