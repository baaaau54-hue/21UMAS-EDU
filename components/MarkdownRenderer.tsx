import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-blue max-w-none text-right" dir="rtl">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-2 space-y-1" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2 space-y-1" {...props} />,
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-sky-400 mt-4 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold text-sky-300 mt-3 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-sky-200 mt-2 mb-1" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-400 hover:text-blue-300 underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-r-4 border-sky-500 pr-4 my-2 italic text-gray-400 bg-gray-800/30 py-2 rounded-l" {...props} />,
          code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <div className="bg-gray-900 rounded-md p-3 my-2 overflow-x-auto border border-gray-700 font-mono text-sm" dir="ltr">
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            ) : (
              <code className="bg-gray-800 text-sky-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};