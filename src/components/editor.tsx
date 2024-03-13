"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { NewReview } from "../lib/db";


const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

export default function Editor({
  onSubmit,
  movieId,
}: {
  onSubmit: (({variables:{review}}: {variables:{review:NewReview}})=>void);
  movieId: number;
}) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

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

  const handleEditorChange = (newContent: string) => {
    if (error) {
      setError(false);
    }
    setContent(newContent);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) {
      setError(true);
      return;
    }
    onSubmit({
      variables: {
        review: {
          author: name,
          content,
          movieId,
        },
      },
    });
    setContent("");
    setName("");
  };

  return (
    <div className="flex bg-base-200 items-center flex-col">
      <div className="w-full flex flex-col">
        <div className="text-3xl font-semibold text-accent">Write a review</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required={true}
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            className="p-2 mt-4"
          />
          <div className="flex flex-col">
            <QuillEditor
              placeholder="Enter your review"
              value={content}
              onChange={handleEditorChange}
              modules={quillModules}
              formats={quillFormats}
              className="mt-10 w-full bg-black"
            />
            {error && <p className="text-red-500">Please enter a review</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md mt-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
