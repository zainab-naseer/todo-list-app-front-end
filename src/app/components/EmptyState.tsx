import React from "react";

type EmptyStateProps = {
  completed?: boolean;
};

export default function EmptyState({ completed }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400">
      <span className="text-4xl mb-4">🗒️</span>
      <p className="font-semibold text-lg mb-2">
        {completed
          ? "You haven't completed any tasks yet."
          : "You don't have any tasks registered yet."}
      </p>
      <p className="text-sm">Create tasks and organize your to-do items.</p>
    </div>
  );
} 