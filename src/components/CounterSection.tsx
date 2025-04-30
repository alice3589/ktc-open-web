"use client";

import { useState } from "react";

export default function CounterSection() {
  const [count, setCount] = useState(0);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">カウンター</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg inline-block">
          <h3 className="text-4xl font-bold mb-4">{count}</h3>
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
} 