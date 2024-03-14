"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const EMPTY_STRING = "<p><br></p>";

export default function Editor({
  content,
  setContent,
  error,
  setError,
}: {
  content: { name: string; content: string };
  setContent: ({ name, content }: { name: string; content: string }) => void;
  error: boolean;
  setError: (error: boolean) => void;
}) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false
    }
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
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent: string, ) => {
    if (newContent === EMPTY_STRING) {
      return;
    }
    if (error) {
      setError(false);
    }
    setContent({ name: content.name, content: newContent });
  };

  return (
    <QuillEditor
      placeholder="Enter your review"
      value={content.content}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="mt-10 w-full bg-black"
    />
  );
}
