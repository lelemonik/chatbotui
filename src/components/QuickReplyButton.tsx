interface QuickReplyButtonProps {
  text: string;
  onClick: () => void;
}

export function QuickReplyButton({ text, onClick }: QuickReplyButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-accent hover:bg-accent/5 transition-all duration-200 text-foreground hover:text-accent"
    >
      {text}
    </button>
  );
}
