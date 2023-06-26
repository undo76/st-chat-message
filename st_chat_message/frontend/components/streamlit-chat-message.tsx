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
        args.isUser ? "flex-row-reverse" : "flex-row"
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
          "border-transparent rounded-lg h-8 w-8",
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
