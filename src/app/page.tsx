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
      return;
    }

    lastGenerationTimeRef.current = currentTime;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // 画面の左端から右端まで均等に生成するように修正
    const minX = screenWidth * 0.01; // 画面左端から10%の位置
    const maxX = screenWidth * 0.9; // 画面右端から10%の位置
    const newX = minX + Math.random() * (maxX - minX);
    
    const newY = screenHeight;
    // シャボン玉のサイズを大きくする
    const newSize = Math.min(Math.random() * 150 + 200, screenWidth * 0.4); // 基本サイズを200-350pxに、最大サイズを画面幅の40%に

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
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-blue-100 opacity-70"
        style={{
          backgroundImage: 'url(background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <CustomNavbar onSelect={handleBubbleClick} />

      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          id={bubble.id}
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
          animation: bubble 20s ease-out forwards;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .animate-bubble {
            animation: bubble 16s ease-out forwards;
          }
        }
      `}</style>
    </div>
  );
}