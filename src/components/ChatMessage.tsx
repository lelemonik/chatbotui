import { User, Bot } from 'lucide-react';
import { QuickReplyButton } from './QuickReplyButton';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  quickReplies?: string[];
  isList?: boolean;
}

interface ChatMessageProps {
  message: Message;
  onQuickReply: (reply: string) => void;
}

export function ChatMessage({ message, onQuickReply }: ChatMessageProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-muted' : 'bg-accent/20'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-accent" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col gap-2 max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-muted text-foreground rounded-tr-md' 
            : 'bg-primary text-white rounded-tl-md'
        }`}>
          {message.isList ? (
            <div className="space-y-2">
              {message.content.split('\n').map((line, idx) => {
                if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                  return (
                    <div key={idx} className="flex gap-2">
                      <span>•</span>
                      <span>{line.replace(/^[•-]\s*/, '')}</span>
                    </div>
                  );
                }
                return <p key={idx}>{line}</p>;
              })}
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Quick Reply Buttons */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.quickReplies.map((reply, idx) => (
              <QuickReplyButton 
                key={idx} 
                text={reply} 
                onClick={() => onQuickReply(reply)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
