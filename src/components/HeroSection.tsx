"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
          近大高専 オープンキャンパス
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          総合システム工学科で夢を持つ力、かなえる力を育む
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition duration-300">
          始める
        </button>
      </div>
    </section>
  );
} 