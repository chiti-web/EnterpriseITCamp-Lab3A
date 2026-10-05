import { useEffect, useRef, useState } from "react";

const EMPTY = { title: "", priority: "medium", dueDate: "" };
const MAX_TITLE = 100;

// editing: todo ที่กำลังแก้ไข (หรือ null = โหมดเพิ่ม)
export default function TodoForm({ editing, onSubmit, onCancel }) {
  const [draft, setDraft] = useState(EMPTY);
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  // เมื่อเลือกแก้ไข ให้คัดลอกค่าจาก props มาเป็น state ของฟอร์ม (ไม่แก้ของเดิม)
  useEffect(() => {
    if (editing) {
      setDraft({
        title: editing.title,
        priority: editing.priority,
        dueDate: editing.dueDate,
      });
      titleRef.current?.focus();
    } else {
      setDraft(EMPTY);
    }
    setError("");
  }, [editing]);

  const update = (field) => (e) =>
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = draft.title.trim();
    if (!title) return setError("กรุณากรอกชื่องาน");
    if (title.length > MAX_TITLE)
      return setError(`ชื่องานต้องไม่เกิน ${MAX_TITLE} ตัวอักษร`);
    onSubmit({ ...draft, title });
    setDraft(EMPTY);
    setError("");
    titleRef.current?.focus();
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === "Escape" && editing && onCancel()}
      noValidate
    >
      <label className="field">
        <span>ชื่องาน</span>
        <input
          ref={titleRef}
          type="text"
          value={draft.title}
          onChange={update("title")}
          placeholder="เช่น ส่งรายงาน"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "form-error" : undefined}
        />
      </label>
      <label className="field">
        <span>ความสำคัญ</span>
        <select value={draft.priority} onChange={update("priority")}>
          <option value="high">สูง</option>
          <option value="medium">กลาง</option>
          <option value="low">ต่ำ</option>
        </select>
      </label>
      <label className="field">
        <span>วันครบกำหนด</span>
        <input type="date" value={draft.dueDate} onChange={update("dueDate")} />
      </label>
      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          {editing ? "บันทึก" : "เพิ่มงาน"}
        </button>
        {editing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            ยกเลิก
          </button>
        )}
      </div>
      {error && (
        <p id="form-error" className="error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
