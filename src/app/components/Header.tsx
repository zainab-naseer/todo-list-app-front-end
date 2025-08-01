import React from "react";

export default function Header() {
  return (
    <header className="w-full flex flex-col items-center py-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🚀</span>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">Todo App</h1>
      </div>
    </header>
  );
} 