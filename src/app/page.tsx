"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

type ContentType = "greeting" | "schedule" | "map" | "notice";

const contentIcons: Record<ContentType, string> = {
  greeting: "/icons/greeting.png",
  schedule: "/icons/schedule.png",
  map: "/icons/map.png",
  notice: "/icons/notice.png",
};

export default function Home() {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; size: number; type: ContentType }[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentType | null>(null);
  const bubblesRef = useRef(bubbles);

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
    return types[Math.floor(Math.random() * types.length)];
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
          type: getRandomContentType(),
        };
        setBubbles((prev) => [...prev, newBubble]);
        setTimeout(() => {
          setBubbles((prev) => prev.filter((bubble) => bubble.id !== newBubble.id));
        }, 20000);
      }
    };

    const interval = setInterval(createRandomBubble, 500);
    return () => clearInterval(interval);
  }, []);

  const handleBubbleClick = (type: ContentType) => {
    setSelectedContent(type);
  };

  const closeModal = () => {
    setSelectedContent(null);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case "greeting":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">学校長挨拶</h2>
            <p>ここに学校長の挨拶文が入ります。</p>
          </div>
        );
      case "schedule":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">スケジュール</h2>
            <ul className="list-disc pl-4">
              <li>4月1日：入学式</li>
              <li>4月8日：始業式</li>
              <li>4月15日：新入生歓迎会</li>
            </ul>
          </div>
        );
      case "map":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">キャンバスマップ</h2>
            <p>ここにキャンパスマップが表示されます。</p>
          </div>
        );
      case "notice":
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">連絡事項</h2>
            <ul className="list-disc pl-4">
              <li>新入生オリエンテーションについて</li>
              <li>授業開始について</li>
              <li>学生証の受け取りについて</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 relative overflow-hidden">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">学校ポータル</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">ホーム</Nav.Link>
              <Nav.Link href="#about">学校について</Nav.Link>
              <Nav.Link href="#contact">お問い合わせ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-white opacity-70 animate-bubble cursor-pointer hover:opacity-100 transition-opacity flex items-center justify-center"
          onClick={() => handleBubbleClick(bubble.type)}
          style={{
            left: `${bubble.x}px`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
        >
          <div className="relative w-1/2 h-1/2">
            <Image
              src={contentIcons[bubble.type]}
              alt={bubble.type}
              fill
              className="object-contain"
            />
          </div>
        </div>
      ))}

      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">
                {selectedContent === "greeting" && "学校長挨拶"}
                {selectedContent === "schedule" && "スケジュール"}
                {selectedContent === "map" && "キャンバスマップ"}
                {selectedContent === "notice" && "連絡事項"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {renderContent()}
          </div>
        </div>
      )}

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
