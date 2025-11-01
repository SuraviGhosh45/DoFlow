import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const Section = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("kanbanTasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const syncTasks = () => {
      const updated = localStorage.getItem("kanbanTasks");
      if (updated) setTasks(JSON.parse(updated));
    };
    window.addEventListener("storage", syncTasks);
    const interval = setInterval(syncTasks, 500);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", syncTasks);
    };
  }, []);

  const handleDeleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    localStorage.setItem("kanbanTasks", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleMoveTask = (id, newStatus) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
    localStorage.setItem("kanbanTasks", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const handleDrop = (e, newStatus) => {
    const id = e.dataTransfer.getData("taskId");
    handleMoveTask(Number(id), newStatus);
  };

  const allowDrop = (e) => e.preventDefault();

  const todoTasks = tasks.filter((t) => t.status === "todo");
  const progressTasks = tasks.filter((t) => t.status === "progress");
  const doneTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="flex justify-center gap-5 mt-14">
      <div
        className="section h-[80vh] w-[25vw] bg-neutral-50 rounded-xl p-4 overflow-y-auto"
        onDrop={(e) => handleDrop(e, "todo")}
        onDragOver={allowDrop}
      >
        <h4 className="font-bold mb-3 text-center text-lg">To-Do</h4>
        {todoTasks.length > 0 ? (
          todoTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onMove={handleMoveTask}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center mt-4">
            No tasks yet. Drag or click ➕ to add one.
          </p>
        )}
      </div>

      <div
        className="section h-[80vh] w-[25vw] bg-neutral-50 rounded-xl p-4 overflow-y-auto"
        onDrop={(e) => handleDrop(e, "progress")}
        onDragOver={allowDrop}
      >
        <h4 className="font-bold mb-3 text-center text-lg">In Progress</h4>
        {progressTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
          />
        ))}
      </div>

      <div
        className="section h-[80vh] w-[25vw] bg-neutral-50 rounded-xl p-4 overflow-y-auto"
        onDrop={(e) => handleDrop(e, "done")}
        onDragOver={allowDrop}
      >
        <h4 className="font-bold mb-3 text-center text-lg">Done</h4>
        {doneTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onMove={handleMoveTask}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
