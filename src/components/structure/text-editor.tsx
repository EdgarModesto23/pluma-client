import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function TextEditor() {
  const [text, setText] = useState("");

  return <ReactQuill theme="snow" value={text} onChange={setText} />;
}

export default TextEditor;
