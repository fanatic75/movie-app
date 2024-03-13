"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor() {
  const [content, setContent] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <div className="flex bg-base-200 items-center flex-col">
      <div className="w-full flex flex-col">
        <div className="text-3xl font-semibold text-accent">Write a review</div>
        <form>
          <div className="flex flex-col">
            <QuillEditor
              placeholder="Enter your review"
              value={content}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              className="mt-10 w-full bg-black"
            />
            <button className="bg-blue-500 text-white p-2 rounded-md mt-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
