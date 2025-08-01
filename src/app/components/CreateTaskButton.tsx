import React from 'react';

type Props = {
  onClick: () => void;
};

export default function CreateTaskButton({ onClick }: Props) {
  return (
    <button
      className='w-full max-w-xxl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 text-lg transition-colors'
      onClick={onClick}
    >
      <span className='text-xl'>＋</span>
      Create Task
    </button>
  );
} 