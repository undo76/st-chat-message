import { useRenderData } from "streamlit-component-lib-react-hooks";
import ChatMessage from "@/components/message";
import { classNames } from "@/libs/class-names";
import Image from "next/image";

function StreamlitChatMessage() {
  const { theme, disabled, args } = useRenderData();

  return (
    <div
      className={classNames(
        "pb-2 flex",
        args.isUser ? "flex-row-reverse ml-12" : "flex-row mr-12"
      )}
    >
      <Image
        src={
          !!args.logo
            ? args.logo
            : `https://api.dicebear.com/5.x/${args.avatarStyle}/svg?seed=${args.seed}`
        }
        alt="avatar"
        className={classNames(
          "rounded-md h-8 w-8 shadow bg-gray-200",
          args.isUser ? "ml-4" : "mr-4"
        )}
        width={32}
        height={32}
      />

      <ChatMessage
        content={args.message}
        role={args.isUser ? "user" : "assistant"}
        richContent={args.richContent}
        partial={args.partial}
      />
    </div>
  );
}

export default StreamlitChatMessage;
