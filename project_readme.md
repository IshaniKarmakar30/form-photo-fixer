# Form Photo Fixer (Project 2)

> A client-side, 100% offline web tool to prepare and compress photos and signatures for job and entrance examination forms.

---

## 📌 Overview
Exam and government job portals (like UPSC, SSC, IBPS) often have strict dimension and file size requirements (e.g., within 20 KB or 50 KB). Most third-party online tools compromise image quality or require server uploads. 

**Form Photo Fixer** runs purely inside your browser using HTML5 Canvas and native JavaScript. No data ever leaves your device.

---

## ✨ Features
- **Photo & Signature Modes**: Process portrait photos or cropped signatures easily.
- **Built-in Presets**:
  - **Exam Form A (UPSC)**: 3.5 × 4.5 cm (Max 50 KB)
  - **Exam Form B (SSC)**: 3.5 × 4.5 cm (Max 20 KB)
  - **Exam Form C (IBPS)**: 4.5 × 3.5 cm (Max 50 KB)
- **Custom Presets**: Define custom width, height, and maximum file size (in KB).
- **Face Guide Overlay**: Visual circular guide to help frame your portrait correctly.
- **Iterative Compression**: Adjusts JPEG compression dynamically to produce the highest possible clarity under the specified KB limit.
- **100% Offline**: Works completely without an active internet connection (zero API calls, zero server dependencies).

---

## 📂 Project Structure
```text
form-photo-fixer/
│
├── index.html        # App layout, controls, and canvas container
├── style.css         # Styling, controls layout, and visual face guide
├── app.js            # Image loading, crop logic, and iterative compression engine
├── prompts.md        # Log of prompts used with the AI agent
└── README.md         # Project documentation and official references
```

---

## 🚀 How to Run Locally

1. Clone or download this project directory to your computer.
2. Open `index.html` directly in any modern browser (Google Chrome, Firefox, Edge, etc.):
   - You can simply double-click `index.html`.
   - Alternatively, open it using a local static server like VS Code's **Live Server** extension.
3. Turn off your Wi-Fi or disconnect from the internet to verify that the app works completely offline.

---

## 📋 Done When Checklist (Verification)

- [x] **Preset Rules Match Official Guidelines**: Form specifications match real competitive exams.
- [x] **File Size Verification**: Saved images stay strictly below the required KB limit (verified via operating system file details).
- [x] **Zero Server Dependency**: Tested with large photos directly from mobile storage while Wi-Fi is turned off.
- [x] **Prompt Preservation**: Step-by-step development prompts recorded inside `prompts.md`.

---

## 🔗 Official Examination Notices (References)

The default presets are aligned with rules from the following official recruitment portals:

1. **UPSC Civil Services Examination:**  
   [Official Notice PDF](https://upsc.gov.in/sites/default/files/Notif-CSP-24-engl-140224.pdf)  
   *Specification*: 3.5 × 4.5 cm, 20 KB – 50 KB
2. **SSC Combined Graduate Level (CGL) Examination:**  
   [Official Notice PDF](https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CGLE_2024.pdf)  
   *Specification*: 3.5 × 4.5 cm, Max 20 KB
3. **IBPS CRP Probationary Officers (PO) Examination:**  
   [Official Notice PDF](https://www.ibps.in/wp-content/uploads/Detailed_Advt_CRP_PO_XIV.pdf)  
   *Specification*: 4.5 × 3.5 cm, Max 50 KB