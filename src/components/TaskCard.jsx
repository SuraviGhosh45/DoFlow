import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";

const priorityColors = {
  low: "bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800",
};

const TaskCard = ({ task, onDelete, onMove }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleUpdateTask = (e) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem("kanbanTasks")) || [];
    const updatedTasks = storedTasks.map((t) =>
      t.id === task.id ? editedTask : t
    );
    localStorage.setItem("kanbanTasks", JSON.stringify(updatedTasks));
    setShowEditForm(false);
    window.dispatchEvent(new Event("storage"));
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowMenu(false);
  };

  // Dragging logic
  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="relative bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing w-64 mx-auto my-2"
    >
      <div
        className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded capitalize ${priorityColors[task.priority]}`}
      >
        {task.priority}
      </div>

      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
        aria-label="Options"
      >
        <EllipsisVertical size={18} />
      </button>

      {showMenu && (
        <div className="absolute top-7 right-2 bg-white border border-gray-200 rounded shadow-lg text-sm z-10 w-28">
          <button
            onClick={() => {
              setShowEditForm(true);
              setShowMenu(false);
            }}
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
          >
            ✏️ Update
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 text-left text-red-600 hover:bg-gray-100"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <h3 className="mt-6 text-sm font-semibold text-gray-800 line-clamp-2">
        {task.title}
      </h3>
      {task.description && (
        <p className="mt-1 text-xs text-gray-500 line-clamp-3">
          {task.description}
        </p>
      )}

      <div className="flex justify-between mt-2">
        {task.status !== "todo" && (
          <button
            onClick={() =>
              onMove(task.id, task.status === "done" ? "progress" : "todo")
            }
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ←
          </button>
        )}
        {task.status !== "done" && (
          <button
            onClick={() =>
              onMove(task.id, task.status === "todo" ? "progress" : "done")
            }
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            →
          </button>
        )}
      </div>

      {showEditForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-5 rounded-lg w-80 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-2 text-center">
              Update Task
            </h3>
            <form onSubmit={handleUpdateTask} className="flex flex-col gap-2">
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                placeholder="Task title"
                className="border p-2 rounded text-sm"
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    description: e.target.value,
                  })
                }
                placeholder="Task description"
                className="border p-2 rounded text-sm"
              />
              <select
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
                className="border p-2 rounded text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="flex justify-between mt-2">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
