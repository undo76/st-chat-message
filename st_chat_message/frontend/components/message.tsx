import React from "react";
import { classNames } from "@/libs/class-names";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark as style } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you;
import ReactMarkdown from "react-markdown";
import CodeSection from "@/components/code-section";

interface MessageProps {
  role?: "system" | "user" | "assistant";
  content?: string;
  error?: string;
  partial?: boolean;
  nTokens?: number;
  richContent?: boolean;
}

function Message({
  role = "assistant",
  content = "",
  richContent = true,
  error,
  partial = false,
  nTokens,
}: MessageProps): JSX.Element {
  return (
    <div
      className={classNames(
        "rounded rounded-xl py-3 px-4 text-sm break-words overflow-x-auto shadow shadow relative border  ",
        role === "user"
          ? "bg-orange-100 border-orange-200"
          : role === "assistant"
          ? "bg-green-50 border-green-200"
          : "bg-blue-50 border-blue-200",
        partial && "shadow shadow-md"
      )}
    >
      {nTokens ? (
        <div className="absolute bottom-1 right-1 p-1 text-xs opacity-50 bg-gray-200 rounded font-mono">
          {nTokens}
        </div>
      ) : null}
      <div>
        {!richContent ? (
          <div className="whitespace-pre-wrap prose prose-sm">{content}</div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            linkTarget='_blank'
            skipHtml={false}
            remarkRehypeOptions={{
              allowDangerousHtml: true,
              passThrough: ["html"],
              // passThrough: ["img"],
            }}
            className="prose prose-sm max-w-none"
            // disallowedElements={["p"]}
            unwrapDisallowed={true}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline ? (
                  match && match[1] === "mermaid" ? (
                    // <div className="not-prose">
                    <CodeSection code={String(children).replace(/\n$/, "")}>
                      <div className="flex flex-row justify-around">
                        <code className="mermaid text-sm flex-1">
                          {String(children).replace(/\n$/, "")}
                        </code>
                      </div>
                    </CodeSection>
                  ) : (
                    <CodeSection code={String(children).replace(/\n$/, "")}>
                      <SyntaxHighlighter
                        {...props}
                        codeTagProps={{ className: "text-xs" }}
                        style={style}
                        language={match?.[1] || "text"}
                        // PreTag="div"
                        showInlineLineNumbers={true}
                        wrapLines={true}
                        wrapLongLines={true}
                        showLineNumbers={false}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </CodeSection>
                  )
                ) : (
                  // Inline code
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
              pre({ children }) {
                return (
                  <div className="not-prose">
                    <pre className="text-xs">{children}</pre>
                  </div>
                );
              },
              p({ children, ...props }) {
                return <p {...props}>{children}</p>;
              },
            }}
          >
            {content + (partial ? " ▌" : "")}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default Message;
