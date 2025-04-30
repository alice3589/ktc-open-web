"use client";

import Header from "@/components/Header";

export default function Schedule() {
  return (
    <main>
      <Header />
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">本日のスケジュール</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold">1限目 (8:50-10:20)</h3>
                <p className="text-gray-600">数学</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold">2限目 (10:30-12:00)</h3>
                <p className="text-gray-600">物理</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold">昼休み (12:00-13:00)</h3>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold">3限目 (13:00-14:30)</h3>
                <p className="text-gray-600">英語</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">4限目 (14:40-16:10)</h3>
                <p className="text-gray-600">プログラミング</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 