'use client';

import React, { useState, useEffect } from "react";

import { Pencil, Plus } from "lucide-react";

import Header from "./components/Header";
import CreateTaskButton from "./components/CreateTaskButton";
import TaskCard from "./components/TaskCard";
import EmptyState from "./components/EmptyState";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from '../lib/api';
import AddOrEditTask from "./components/AddOrEditTask";

type Task = { id: number; title: string; color: string };

type TaskPayload = {
  id?: number,
  title: string;
  color: string;
  completed?: boolean
};

export default function Home() {
  const activeTab: "tasks" | "completed" = "tasks";

  const [showCreatePage, setShowCreatePage] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [myId, setMyId] = useState<number>(0);
  const [selectedTask, setSelectedTask] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  const addTask = async ({
    title,
    color
  }: TaskPayload) => {
    await createTask({
      title,
      color
    });

    setShowCreatePage(false);
  };

  const editTask = async ({
    id = myId,
    title,
    color,
    completed
  }: TaskPayload) => {
    await updateTask(
      id,
      { title, color, completed }
    );

    setShowEditPage(false);

    getAllTasks();
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(Number(myId));
      setShowConfirmDialog(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getAllTasks = () => {
    getTasks().then((response) => {
      setTasks(response.tasks);
      setTotalTasks(response.totalTasks);
      setCompletedTasks(() => response.tasks.filter(task => task.completed === true).length)
    });
  }

  useEffect(() => {
    getAllTasks();
  }, [showCreatePage, showConfirmDialog]);


  return (
    <div className="min-h-screen bg-[#181A20] text-white flex flex-col items-center px-4 py-8">
      <Header />
      {showCreatePage ?
        <AddOrEditTask
          selectedTask={selectedTask}
          callback={addTask}
          setShowPage={setShowCreatePage}
          buttonText="Add Task"
          ButtonIcon={Plus}
        />
        :
        showEditPage ?
          <AddOrEditTask
            selectedTask={selectedTask}
            callback={editTask}
            setShowPage={setShowEditPage}
            buttonText="Edit Task"
            ButtonIcon={Pencil} />
          :
          (
            <div className="w-full max-w-2xl mt-8 flex flex-col items-center">
              <CreateTaskButton onClick={() => setShowCreatePage(true)} />
              <div className="w-full max-w-2xl mx-auto mt-4">
                <div className="flex items-center justify-between">
                  {/* Left: Tasks */}
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-semibold">Tasks</span>
                    {totalTasks ? (
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-[#2d2f3b] rounded-full text-sm">
                        {totalTasks}
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-[#2d2f3b] rounded-full text-sm">
                        0
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-semibold">Completed</span>
                    {completedTasks ? (
                      <div className="inline-flex items-center justify-center 
                        w-6 h-6 text-[10px]
                        sm:w-8 sm:h-8 sm:text-xs
                        md:w-10 md:h-10 md:text-sm
                        bg-[#2d2f3b] rounded-full"
                      >
                        {completedTasks} of {totalTasks}
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-center w-6 h-6 bg-[#2d2f3b] rounded-full text-sm">
                        0
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full mt-6">
                {activeTab === "tasks" && totalTasks === 0 && <EmptyState />}
                {activeTab === "completed" && completedTasks.length === 0 && <EmptyState completed />}
                {activeTab === "tasks" &&
                  tasks.map((task) => {
                    return (
                      <TaskCard
                        key={task.id}
                        task={task}
                        myId={myId}
                        setMyId={setMyId}
                        setSelectedTask={setSelectedTask}
                        showConfirmDialog={showConfirmDialog}
                        setShowConfirmDialog={setShowConfirmDialog}
                        handleDeleteTask={handleDeleteTask}
                        setShowEditPage={setShowEditPage}
                        editTask={editTask}
                      />
                    )
                  }
                  )}
                {activeTab === "completed" && completedTasks.map(task => <TaskCard key={task.id} task={task} completed />)}
              </div>
            </div>
          )}
    </div>
  );
}
