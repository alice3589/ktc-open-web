"use client";

import Header from "@/components/Header";

export default function About() {
  return (
    <main>
      <Header />
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">校長挨拶</h1>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed">
              近畿大学工業高等専門学校のホームページをご覧いただき、ありがとうございます。
              本校は、実践的な技術者を育成することを目的として設立されました。
              学生一人ひとりの可能性を最大限に引き出し、社会で活躍できる人材を育成してまいります。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 