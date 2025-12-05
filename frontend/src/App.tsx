import { useState, useEffect } from "react";
import "./App.css";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import ClipLoader from "react-spinners/ClipLoader";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios"

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-typescript";
import LoadingSkeleton from "./Loading";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}

// Add more lines to test scrolling
function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

// More test content
const testArray = [1, 2, 3, 4, 5];
const doubled = testArray.map(x => x * 2);
console.log(doubled);

// Additional lines for scrolling demo
for (let i = 0; i < 10; i++) {
  console.log("Line " + i);
}`);

  const [review, setReview] = useState("");
  const [lan, setLan] = useState("javascript");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  function detectLanguage(fileName: string): string {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const map: Record<string, string> = {
      js: "javascript",
      jsx: "javascript",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      c: "c",
      cpp: "cpp",
      cc: "cpp",
      go: "go",
    };
    return map[ext || ""] || "javascript";
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const detectedLan = detectLanguage(file.name);
    setLan(detectedLan);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCode(reader.result);
      }
    };
    reader.readAsText(file);
  };

   async function reviewCode() {
     try {
       const serverUrl = import.meta.env.VITE_SERVER_URL;
       if (!serverUrl) {
         throw new Error("no server url");
       }
       setLoad(true);
       const response = await axios.post(`${serverUrl}/ai/get-review`, {
         code,
       });
       setReview(response.data);
       setLoad(false);
     } catch (error) {
       setLoad(false);
       console.log(error);
     }
   }

  return (
    <main>
      <div className="left">
        <h1 className="codeText">Code</h1>

        <div className="selLan">
          Select language:
          <select value={lan} onChange={(e) => setLan(e.target.value)}>
            <option value="javascript">javascript</option>
            <option value="python">python</option>
            <option value="cpp">c++</option>
            <option value="c">C</option>
            <option value="java">java</option>
            <option value="typescript">typescript</option>
            <option value="go">go</option>
          </select>
        </div>

        <div className="uploadFile">
          <label htmlFor="fileUpload" className="uploadBtn">
            📁 Upload File
          </label>
          <input
            id="fileUpload"
            type="file"
            onChange={handleFile}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cc,.go"
          />
        </div>

        <div className="code-editor-wrapper">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              Prism.highlight(
                code,
                Prism.languages[lan] || Prism.languages.javascript,
                lan
              )
            }
            padding={10}
            className="code-editor"
          />
        </div>

        <div onClick={reviewCode} className="review">
          {load ? <ClipLoader size={16} color="#ffffff" /> : "Review"}
        </div>
      </div>

      <div className="right">
        <h1 className="rightText">Review</h1>
        {load ? (
          <LoadingSkeleton/>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        )}
      </div>
    </main>
  );
}

export default App;
