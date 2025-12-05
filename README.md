# CodeView – Interactive Code Reader & File Loader

CodeView is a lightweight, developer-friendly web application that allows users to upload code files, automatically detect their programming language, and view or edit the contents inside a smooth, scrollable editor. It is designed to mimic a mini-VS Code environment inside the browser.

# Features
🔹 Upload & Read Code Files

Supports .js, .ts, .py, .cpp, .c, .java, .go, and more

Extracts file content using the FileReader API

Automatically detects the programming language

🔹 Editable Code Viewer

Fully scrollable editor

Smooth typing experience

Large file support

Monospace formatting optimized for code

🔹 Language Selection

Auto-detect from file

Manual override via dropdown

🔹 Clean & Responsive Layout

Left panel: file input + language picker

Right panel: live code editing

Designed for readability and productivity

# Tech Stack
Layer	Technology
Frontend	React + Vite
Styling	CSS
Code Editing	react-simple-code-editor + PrismJS
File Handling	FileReader API
# Project Structure
CodeView/
│── src/
│    ├── App.jsx
│    ├── components/
│    │     ├── CodeEditor.jsx
│    │     └── FileInput.jsx
│    ├── styles.css
│── public/
│── package.json
└── README.md

# How It Works
1️⃣ File Upload

User uploads any code file → content is read and placed inside the editor.

2️⃣ Language Auto-Detection

The extension is mapped to a language:

{
  js: "javascript",
  ts: "typescript",
  py: "python",
  cpp: "cpp",
  c: "c",
  java: "java",
  go: "go"
}

3️⃣ Scrollable Editor

The code viewer grows with the content but stays scrollable, preventing overflow issues.

# Run Locally

Anyone can clone and run the project:

git clone https://github.com/your-username/codeview.git
cd codeview
npm install
npm run dev




Download/export edited file

Auto-save feature

Light & dark theme options
