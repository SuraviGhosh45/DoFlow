import React, { useState, useEffect } from "react";
import { Plus, ListFilter, ArrowUpDown, Layers3 } from "lucide-react";

const Menu = () => {
  const [tasks, setTasks] = useState([]);
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [groupBy, setGroupBy] = useState("none");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  useEffect(() => {
    const saved = localStorage.getItem("kanbanTasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("kanbanTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const task = { id: Date.now(), ...newTask, status: "todo" };
    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", priority: "low" });
    setShowForm(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="absolute right-4 top-20 mx-5 sm:mx-10">
      <ul className="flex flex-wrap items-center gap-3 px-2.5 py-1.5 text-gray-700 capitalize">
        <li className="flex items-center gap-1 cursor-pointer">
          <ListFilter size={18} />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="text-sm bg-transparent outline-none border-b border-gray-400"
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </li>

        <li className="flex items-center gap-1 cursor-pointer">
          <ArrowUpDown size={18} />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-sm bg-transparent outline-none border-b border-gray-400"
          >
            <option value="none">Sort</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </li>

        <li className="flex items-center gap-1 cursor-pointer">
          <Layers3 size={18} />
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="text-sm bg-transparent outline-none border-b border-gray-400"
          >
            <option value="none">Group By</option>
            <option value="priority">Priority</option>
          </select>
        </li>

        <li
          className="flex items-center gap-1 cursor-pointer text-gray-700 hover:scale-110 transition-transform"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} />
        </li>
      </ul>

      {showForm && (
        <div className="absolute right-0 mt-2 bg-white shadow-xl p-4 rounded-lg w-72 sm:w-80 border border-gray-200 z-20">
          <form onSubmit={handleAddTask} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="border p-2 rounded text-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <textarea
              placeholder="Description (optional)"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="border p-2 rounded text-sm focus:ring-2 focus:ring-blue-300 outline-none"
            />
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="border p-2 rounded text-sm focus:ring-2 focus:ring-blue-300 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white py-1 rounded text-sm hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Menu;
