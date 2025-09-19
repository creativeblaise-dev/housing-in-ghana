// utils/richTextRenderer.tsx
import React from "react";
import { JSONContent } from "@tiptap/react";

export function renderNode(node: JSONContent, index: number): React.ReactNode {
  // Handle plain text with marks
  if (node.type === "text" && node.text) {
    let element: React.ReactNode = node.text;

    if (node.marks) {
      node.marks.forEach((mark) => {
        if (mark.type === "bold")
          element = <strong key={index}>{element}</strong>;
        if (mark.type === "italic") element = <em key={index}>{element}</em>;
        if (mark.type === "underline") element = <u key={index}>{element}</u>;
        if (mark.type === "link" && mark.href)
          element = (
            <a
              key={index}
              href={mark.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {element}
            </a>
          );
      });
    }

    return element;
  }

  // Paragraphs
  if (node.type === "paragraph") {
    return (
      <p key={index}>{node.content?.map((child, i) => renderNode(child, i))}</p>
    );
  }

  // Headings (default h2, can be extended for h1-h6 if attrs.level exists)
  if (node.type === "heading") {
    return (
      <h2 key={index}>
        {node.content?.map((child, i) => renderNode(child, i))}
      </h2>
    );
  }

  // FIXED: TipTap uses camelCase - bulletList instead of bullet_list
  if (node.type === "bulletList") {
    return (
      <ul key={index} className="list-disc list-inside mb-4 ml-6 space-y-2">
        {node.content?.map((child, i) => renderNode(child, i))}
      </ul>
    );
  }

  // FIXED: TipTap uses camelCase - orderedList instead of ordered_list
  if (node.type === "orderedList") {
    return (
      <ol key={index} className="list-decimal list-inside mb-4 ml-6 space-y-2">
        {node.content?.map((child, i) => renderNode(child, i))}
      </ol>
    );
  }

  // FIXED: TipTap uses camelCase - listItem instead of list_item
  if (node.type === "listItem") {
    return (
      <li key={index} className="mb-1">
        {node.content?.map((child, i) => renderNode(child, i))}
      </li>
    );
  }

  // Blockquotes
  if (node.type === "blockquote") {
    return (
      <blockquote
        key={index}
        className="border-l-4 border-gray-300 pl-4 my-6 italic text-gray-600"
      >
        {node.content?.map((child, i) => renderNode(child, i))}
      </blockquote>
    );
  }

  // Code blocks
  if (node.type === "codeBlock") {
    const code = node.content?.[0]?.text || "";
    return (
      <pre
        key={index}
        className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"
      >
        <code>{code}</code>
      </pre>
    );
  }

  // Inline code
  if (node.type === "code") {
    return (
      <code
        key={index}
        className="bg-gray-100 px-2 py-1 rounded text-sm font-mono"
      >
        {node.content?.map((child, i) => renderNode(child, i))}
      </code>
    );
  }

  // Horizontal rule
  if (node.type === "horizontalRule") {
    return <hr key={index} className="my-8 border-gray-300" />;
  }

  // Images
  if (node.type === "image") {
    const src = node.attrs?.src;
    const alt = node.attrs?.alt || "";

    // Don't render image if no src is provided
    if (!src) {
      console.warn("Image node missing src attribute:", node);
      return null;
    }

    return (
      <img
        key={index}
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg my-4"
      />
    );
  }

  // Task lists (if you're using them)
  if (node.type === "taskList") {
    return (
      <ul key={index} className="list-none mb-4 space-y-2">
        {node.content?.map((child, i) => renderNode(child, i))}
      </ul>
    );
  }

  if (node.type === "taskItem") {
    const checked = node.attrs?.checked || false;
    return (
      <li key={index} className="flex items-start">
        <input
          type="checkbox"
          checked={checked}
          disabled
          className="mr-2 mt-1"
        />
        <div className="flex-1">
          {node.content?.map((child, i) => renderNode(child, i))}
        </div>
      </li>
    );
  }

  // Fallback for unknown nodes
  console.warn(`Unknown node type: ${node.type}`, node);
  return null;
}

export function RichTextRenderer({ content }: { content: JSONContent[] }) {
  return <>{content.map((node, i) => renderNode(node, i))}</>;
}
