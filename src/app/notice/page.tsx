"use client";

import Header from "@/components/Header";

export default function Notice() {
  return (
    <main>
      <Header />
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">連絡事項</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">定期試験について</h3>
                <p className="text-gray-600">来週から定期試験が始まります。試験時間割は掲示板で確認してください。</p>
                <p className="text-sm text-gray-500 mt-2">2024年3月15日</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold mb-2">卒業式のお知らせ</h3>
                <p className="text-gray-600">卒業式は3月20日に体育館で行われます。詳細は後日配布する案内をご確認ください。</p>
                <p className="text-sm text-gray-500 mt-2">2024年3月10日</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">新入生オリエンテーション</h3>
                <p className="text-gray-600">4月1日に新入生オリエンテーションを行います。新入生は必ず参加してください。</p>
                <p className="text-sm text-gray-500 mt-2">2024年3月5日</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 