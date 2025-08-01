'use client';

import { Check, Pencil, Trash } from 'lucide-react';
import React, { useState } from 'react';

import ConfirmDialog from './ConfirmDialog';

type Task = {
  id: number;
  title: string;
  color: string;
  completed?: boolean;
};

type TaskCardProps = {
  task: Task;
  completed: boolean;
  setCompleted: (val: boolean) => void;
  myId: number,
  setMyId: (id: number) => void;
  setSelectedTask: (task: object) => void;
  onToggleComplete?: (id: string) => void;
  onDelete?: (id: string) => void;
  taskId: number,
  handleDeleteTask: () => Promise<void>;
  setShowEditPage: boolean
  editTask: (updateObj: object) => void;
};

export default function TaskCard({
  task,
  taskId,
  myId,
  setMyId,
  setSelectedTask,
  showConfirmDialog,
  setShowConfirmDialog,
  setShowEditPage,
  handleDeleteTask,
  editTask
}: TaskCardProps) {

  const [completed, setCompleted] = useState(task.completed);

  const handleToggle = () => {
    setCompleted(!completed);
    editTask({ id: task.id, completed: !task.completed });
  };

  const handleClick = (task: {
    id: number
  }) => {
    setMyId(task.id);
    setSelectedTask(task);
    setShowEditPage(true);
  };

  const handleDelete = () => {
    setMyId(task.id);
    setShowConfirmDialog(true);
  }

  return (
    <>
      <div
        key={taskId}
        className={`w-full bg-[#23262F] rounded-lg p-4 mb-4 flex items-center justify-between shadow-md transition-all ${completed ? '' : ''
          }`}
      >

        <div className="flex items-center gap-4">
          <button onClick={handleToggle} className="focus:outline-none">
            {completed ? (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: task.color }}
              >
                <Check size={16} color="white" />
              </div>
            ) : (
              <div
                className="w-6 h-6 rounded-full border-2"
                style={{ borderColor: task.color }}
              ></div>
            )}
          </button>

          <span
            className={`text-lg font-medium ${completed ? 'line-through text-gray-400' : ''
              }`}
          >
            {task.title}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trash size={15} onClick={() => handleDelete(task.id)} />
          <Pencil size={15} onClick={() => handleClick(task)}
          />
        </div>
      </div>
      {showConfirmDialog && myId === task.id && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${task.title}"?`}
          onConfirm={() => handleDeleteTask()}
          onCancel={() => setShowConfirmDialog(false)}
        />
      )}
    </>
  );
}


