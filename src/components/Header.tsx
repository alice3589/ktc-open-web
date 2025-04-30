"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            近大高専
          </Link>

          {/* デスクトップメニュー */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              ホーム
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              校長挨拶
            </Link>
            <Link href="/schedule" className="text-gray-700 hover:text-blue-600 transition">
              本日のスケジュール
            </Link>
            <Link href="/notice" className="text-gray-700 hover:text-blue-600 transition">
              連絡事項
            </Link>
          </nav>

          {/* モバイルメニューボタン */}
          <button
            className="md:hidden p-2 relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-full h-0.5 bg-gray-700 transform transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* モバイルメニュー */}
        <div
          className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{ top: "4rem" }}
        >
          <nav className="h-full flex flex-col justify-center items-center space-y-8">
            <Link
              href="/"
              className="text-2xl text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link
              href="/about"
              className="text-2xl text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              校長挨拶
            </Link>
            <Link
              href="/schedule"
              className="text-2xl text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              本日のスケジュール
            </Link>
            <Link
              href="/notice"
              className="text-2xl text-gray-700 hover:text-blue-600 transition transform hover:scale-110"
              onClick={() => setIsMenuOpen(false)}
            >
              連絡事項
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 