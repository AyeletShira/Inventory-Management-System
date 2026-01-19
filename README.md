# 📦 מערכת ניהול מלאי חכם (Inventory Management System)

👤 אודות
פותח על ידי Ayelet Shira כפרויקט אישי ללמידה עצמית והעמקת הידע בפיתוח Full-Stack.


מערכת Full-Stack מתקדמת לניהול מלאי מוצרים, המאפשרת שליטה מלאה על מאגר הנתונים בזמן אמת. הפרויקט נבנה כחלק מתהליך למידה עצמית של טכנולוגיות פיתוח WEB מודרניות.

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

---

## ✨ תכונות עיקריות
* **ניהול מלאי מלא (CRUD):** הוספה, הצגה, עריכה ומחיקה של מוצרים.
* **ממשק משתמש (UI):** עיצוב מודרני ונקי הכולל חלוניות צפות (Modals) לחוויית משתמש חלקה.
* **ולידציה:** כפתור שמירה חכם המופעל רק לאחר מילוי כל שדות החובה.
* **חיווי מצב מלאי:** הצגת סטטוס "מלאי נמוך" באופן אוטומטי עבור מוצרים בכמות קטנה.
* **אבטחה:** עבודה עם משתני סביבה (.env) להגנה על פרטי בסיס הנתונים.

---

## 🛠️ טכנולוגיות בשימוש

### Frontend
- **Angular 18+**: Standalone Components & Signals.
- **TypeScript**: Strongly Typed code.
- **CSS3**: Custom design with Flexbox & Gradients.

### Backend
- **Node.js & Express**: API Server.
- **MySQL**: Relational Database.
- **Dotenv**: Environment Variables management.

## 🚀 איך מפעילים את הפרויקט?

### 1. הגדרת בסיס הנתונים
הריצו את השאילתה הבאה ב-MySQL Workbench:
CREATE DATABASE StoreDB;
USE StoreDB;
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    price DECIMAL(10, 2),
    stockQuantity INT
);


2. הגדרת השרת (Backend)
היכנסו לתיקיית inventory-server.

הריצו npm install.

צרו קובץ .env עם פרטי ה-DB שלכם (Host, User, Password, Name).

הפעילו: node server.js.

3. הגדרת האתר (Frontend)
היכנסו לתיקיית inventory-web.

הריצו npm install.

הפעילו: ng serve.

היכנסו ל: http://localhost:4200.
