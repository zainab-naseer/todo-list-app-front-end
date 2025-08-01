import React from "react";

type TabsProps = {
  activeTab: "tasks" | "completed";
  totalTasks: number,
  completedTasks: number
};

export default function Tabs({ activeTab, totalTasks, completedTasks }: TabsProps) {
  return (
    <div className="flex w-full max-w-xl justify-between mt-8 border-b border-gray-700">
      <button
        className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === "tasks" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
        disabled
      >
        Tasks <span className="ml-1 text-xs bg-gray-700 rounded-full px-2">{totalTasks}</span>
      </button>
      <button
        className={`flex-1 py-2 text-center font-semibold transition-colors ${activeTab === "completed" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400"}`}
        disabled
      >
        Completed <span className="ml-1 text-xs bg-gray-700 rounded-full px-2">{completedTasks}</span>
      </button>
    </div>
  );
} 