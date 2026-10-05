import { useMemo, useState } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoItem from "./components/TodoItem.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

const PRIORITIES = ["high", "medium", "low"];

// ตรวจรูปแบบข้อมูลจาก localStorage ก่อนใช้ (กันข้อมูลเสีย/ถูกแก้มือ)
const isValidTodos = (v) =>
  Array.isArray(v) &&
  v.every(
    (t) =>
      t &&
      typeof t.id === "string" &&
      typeof t.title === "string" &&
      PRIORITIES.includes(t.priority) &&
      typeof t.dueDate === "string" &&
      typeof t.completed === "boolean"
  );

const newId = () =>
  crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function App() {
  const [todos, setTodos] = useLocalStorage("smart-todos", [], isValidTodos);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all"); // all | active | done
  const [priority, setPriority] = useState("all");

  const editing = todos.find((t) => t.id === editingId) ?? null;

  // ทุก handler สร้าง array/object ใหม่ (immutable) ไม่ mutate state เดิม
  const addOrSave = (data) => {
    if (editingId) {
      setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, ...data } : t))
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [{ id: newId(), completed: false, ...data }, ...prev]);
    }
  };
  const toggle = (id) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const remove = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (id === editingId) setEditingId(null);
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return todos.filter(
      (t) =>
        (!q || t.title.toLowerCase().includes(q)) &&
        (status === "all" || (status === "done") === t.completed) &&
        (priority === "all" || t.priority === priority)
    );
  }, [todos, query, status, priority]);

  const doneCount = todos.filter((t) => t.completed).length;

  return (
    <main className="app">
      <header>
        <h1>Smart Todo List</h1>
        <p className="summary">
          เสร็จแล้ว {doneCount} / {todos.length} งาน
        </p>
      </header>

      <TodoForm
        editing={editing}
        onSubmit={addOrSave}
        onCancel={() => setEditingId(null)}
      />

      <section className="filters" aria-label="ค้นหาและกรอง">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหางาน..."
          aria-label="ค้นหางาน"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="กรองตามสถานะ"
        >
          <option value="all">ทุกสถานะ</option>
          <option value="active">ยังไม่เสร็จ</option>
          <option value="done">เสร็จแล้ว</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="กรองตามความสำคัญ"
        >
          <option value="all">ทุกระดับ</option>
          <option value="high">สูง</option>
          <option value="medium">กลาง</option>
          <option value="low">ต่ำ</option>
        </select>
      </section>

      {visible.length === 0 ? (
        <p className="empty">
          {todos.length === 0
            ? "ยังไม่มีงาน เพิ่มงานแรกได้เลย"
            : "ไม่พบงานที่ตรงเงื่อนไข"}
        </p>
      ) : (
        <ul className="list">
          {visible.map((t) => (
            <TodoItem
              key={t.id}
              id={t.id}
              title={t.title}
              priority={t.priority}
              dueDate={t.dueDate}
              completed={t.completed}
              onToggle={toggle}
              onDelete={remove}
              onEdit={setEditingId}
            />
          ))}
        </ul>
      )}
    </main>
  );
}
