import { useState, useRef, useEffect } from 'react';
import { Send, Hammer } from 'lucide-react';
import { ChatMessage, Message } from './components/ChatMessage';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ScrollArea } from './components/ui/scroll-area';

// Mock conversation data
const initialMessages: Message[] = [
  {
    id: '1',
    type: 'ai',
    content: 'Hi there! 👋 I\'m your Diskarte.ai Career Assistant. I\'m here to help you with resume improvements, interview prep, job search, and career advice. How can I assist you today?',
    quickReplies: ['Improve Resume', 'Practice Interview', 'Find Jobs']
  },
  {
    id: '2',
    type: 'user',
    content: 'I need help with my resume'
  },
  {
    id: '3',
    type: 'ai',
    content: 'Great! I can help you improve your resume. Here are some key areas we can work on:\n\n• Strengthen your professional summary\n• Optimize your work experience descriptions\n• Highlight relevant skills\n• Format for ATS (Applicant Tracking Systems)\n• Tailor it for specific job applications',
    isList: true,
    quickReplies: ['Professional Summary', 'Work Experience', 'Skills Section']
  }
];

export default function App() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'That\'s a great question! I\'d be happy to help you with that. Let me provide some personalized advice based on your needs.',
        quickReplies: ['Tell me more', 'Show examples', 'Next steps']
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: reply
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Perfect! Here are some tips for that:\n\n• Focus on measurable achievements\n• Use action verbs\n• Keep it concise and relevant\n• Tailor to the job description',
        isList: true,
        quickReplies: ['More tips', 'Review my draft', 'What\'s next?']
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Hammer className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-white">Diskarte.ai</h1>
          </div>
          <div className="h-6 w-px bg-white/30 mx-1" />
          <h2 className="text-white/90">Career Assistant Chat</h2>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onQuickReply={handleQuickReply}
              />
            ))}
            {isLoading && <LoadingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-3 items-end">
          <div className="flex-1 bg-muted rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer…"
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={inputValue.trim() === ''}
            className="w-12 h-12 bg-primary hover:bg-primary-dark disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors shadow-md hover:shadow-lg"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
