# Smart Todo List

แอปจัดการงานที่ต้องทำ (Todo List) สร้างด้วย React + Vite ใช้สำหรับ Enterprise IT Camp Lab 3A

## ฟีเจอร์

- เพิ่ม แก้ไข ลบ และทำเครื่องหมายงานที่เสร็จแล้ว
- กำหนดความสำคัญ (high / medium / low) และวันครบกำหนด
- ค้นหางานตามชื่อ
- กรองตามสถานะ (ทั้งหมด / ยังไม่เสร็จ / เสร็จแล้ว) และตามความสำคัญ
- เก็บข้อมูลใน localStorage ของเบราว์เซอร์ พร้อมตรวจรูปแบบข้อมูลก่อนใช้งาน

## เทคโนโลยี

- [React](https://react.dev/) 18
- [Vite](https://vitejs.dev/) 5

## เริ่มต้นใช้งาน

ต้องติดตั้ง [Node.js](https://nodejs.org/) ก่อน

```bash
# ติดตั้ง dependencies
npm install

# รันโหมดพัฒนา
npm run dev

# build สำหรับ production
npm run build

# ดูผล build
npm run preview
```

## โครงสร้างโปรเจกต์

```
.
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx                 # จุดเริ่มต้นของแอป
    ├── App.jsx                  # คอมโพเนนต์หลัก (state, ค้นหา, กรอง)
    ├── styles.css
    ├── components/
    │   ├── TodoForm.jsx         # ฟอร์มเพิ่ม/แก้ไขงาน
    │   └── TodoItem.jsx         # แสดงงานแต่ละรายการ
    └── hooks/
        └── useLocalStorage.js   # hook เก็บ state ลง localStorage
```
