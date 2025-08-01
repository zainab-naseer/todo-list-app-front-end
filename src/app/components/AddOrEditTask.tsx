'use client';

import React, { useEffect, useState } from 'react';

import type { LucideIcon } from 'lucide-react';

type TaskPayload = {
  title: string;
  color: string;
};

type AddOrEditTaskProps = {
  selectedTask: {
    id: number,
    title: string,
    color: string
  },
  callback: (payload: TaskPayload) => void,
  setShowPage: (val: boolean) => void,
  buttonText: string,
  ButtonIcon: LucideIcon
};

const COLORS = [
  "#F43F3F",
  "#F59E1B",
  "#F7D038",
  "#4ADE80",
  "#38BDF8",
  "#6366F1",
  "#A78BFA",
  "#F472B6",
  "#A78B6F"
];

export default function AddOrEditTask({
  selectedTask,
  callback,
  setShowPage,
  buttonText,
  ButtonIcon
}: AddOrEditTaskProps) {
  const [title, setTitle] = useState(() => buttonText === "Edit Task" ? selectedTask.title : "");
  const [color, setColor] = useState(() => buttonText === "Edit Task" ? selectedTask.color : COLORS[0]);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center mt-8">
      <button
        className="self-start text-2xl text-gray-300 hover:text-white mb-6"
        onClick={() => setShowPage(false)}
        aria-label="Back"
        type="button"
      >
        &#8592;
      </button>
      <label className="block text-sm font-semibold mb-1 mt-4 w-full" htmlFor="task-title">Title</label>
      <input
        id="task-title"
        type="text"
        placeholder="Ex. Brush you teeth"
        className="w-full p-3 rounded bg-[#23262F] border border-[#333] text-white mb-4 focus:outline-none focus:border-blue-500 placeholder-gray-500"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label className="block text-sm font-semibold mb-1 w-full" htmlFor="color-picker">Color</label>
      <div className="flex gap-4 mb-6 w-full" id="color-picker">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${color === c ? "border-white scale-110" : "border-transparent"}`}
            style={{ background: c }}
            onClick={() => setColor(c)}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>
      <button
        className="w-full bg-[#2380B6] hover:bg-[#1C6A99] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-base transition-colors"
        onClick={() => callback({
          title,
          color
        })}
        type="button"
      >
        {title === '' ? (
          <>
            {buttonText} <ButtonIcon />
          </>) : (
          <> Save <span className="text-lg">✓</span> </>
        )}
      </button>
    </div>
  );
}
