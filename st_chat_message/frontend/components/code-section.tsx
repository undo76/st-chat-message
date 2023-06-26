import { ReactNode, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  CheckIcon,
  ClipboardIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";

interface CodeSectionProps {
  code: string;
  timeout?: number;
  children: ReactNode;
}

export default function CodeSection({
  code,
  timeout = 1000,
  children,
}: CodeSectionProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, timeout);
  };

  return (
    <div className="relative">
      {children}
      <div className="absolute top-2 right-2">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="text-white bg-gray-600 hover:bg-gray-500 p-1 rounded text-sm opacity-60">
            {copied ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <DocumentDuplicateIcon className="h-4 w-4" />
            )}
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}
