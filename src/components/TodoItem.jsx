const PRIORITY_LABEL = { high: "สูง", medium: "กลาง", low: "ต่ำ" };

// Presentational component: อ่าน props อย่างเดียว ไม่แก้ค่าเอง
// ทุกการเปลี่ยนแปลงส่งกลับ Parent ผ่าน callback พร้อม id
export default function TodoItem({
  id,
  title,
  priority,
  dueDate,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) {
  const today = new Date().toISOString().slice(0, 10);
  const overdue = Boolean(dueDate) && !completed && dueDate < today;

  return (
    <li className={`todo ${completed ? "is-done" : ""} priority-${priority}`}>
      <input
        type="checkbox"
        className="todo__check"
        checked={completed}
        onChange={() => onToggle(id)}
        aria-label={`ทำเสร็จแล้ว: ${title}`}
      />
      <div className="todo__body">
        <span className="todo__title">{title}</span>
        <span className="todo__meta">
          <span className={`badge badge--${priority}`}>
            {PRIORITY_LABEL[priority]}
          </span>
          {dueDate && (
            <span className={overdue ? "due due--overdue" : "due"}>
              กำหนด {dueDate}
              {overdue ? " (เลยกำหนด)" : ""}
            </span>
          )}
        </span>
      </div>
      <div className="todo__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => onEdit(id)}
          aria-label={`แก้ไข ${title}`}
        >
          แก้ไข
        </button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => onDelete(id)}
          aria-label={`ลบ ${title}`}
        >
          ลบ
        </button>
      </div>
    </li>
  );
}
