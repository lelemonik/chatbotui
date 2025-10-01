import { Bot } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-accent/20">
        <Bot className="w-5 h-5 text-accent" />
      </div>

      {/* Typing indicator */}
      <div className="bg-primary rounded-2xl rounded-tl-md px-5 py-4 shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
