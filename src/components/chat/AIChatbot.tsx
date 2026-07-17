'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface AIChatbotProps {
  entityType: 'drug' | 'company';
  entityName: string;
  contextPayload: any;
}

const DRUG_SUGGESTIONS = [
  "Summarize this drug",
  "What indications is this drug being studied for?",
  "Explain the mechanism of action",
  "What clinical trials are currently associated with this drug?",
  "What upcoming catalysts should I know?",
  "Who are the key competitors?",
] as const;

const COMPANY_SUGGESTIONS = [
  "Summarize this company",
  "What drugs are in its pipeline?",
  "Which therapeutic areas does it focus on?",
  "What upcoming catalysts are expected?",
  "Which drug appears to be the most advanced?",
] as const;

export function AIChatbot({ entityType, entityName, contextPayload }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    api: '/api/chat',
    body: { entityType, contextPayload },
  });

  const isBusy = status === 'submitted' || status === 'streaming';
  const suggestions = entityType === 'drug' ? DRUG_SUGGESTIONS : COMPANY_SUGGESTIONS;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Unified send handler
  const send = useCallback((text: string) => {
    if (!text.trim() || isBusy) return;
    sendMessage({ text });
    setInput('');
  }, [isBusy, sendMessage]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-[var(--color-brand-primary)] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50 flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[80vh] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-[var(--color-brand-primary)] text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Context Pill */}
          <div className="bg-[var(--color-brand-primary)]/10 px-4 py-2 border-b border-[var(--color-brand-primary)]/20 flex items-center gap-2 text-xs text-[var(--color-brand-primary)]">
            <Sparkles size={12} className="animate-pulse" />
            <span>Currently analyzing <span className="font-semibold">{entityName}</span></span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-bg)]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in duration-500 text-[var(--color-muted)]">
                <div className="w-16 h-16 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] rounded-full flex items-center justify-center mb-2">
                  <Bot size={32} />
                </div>
                <p className="text-xs px-4 text-[var(--color-text)]">
                  I can answer questions based on the {entityName} data shown on this page.
                </p>
                
                <div className="w-full space-y-2 mt-4 text-left">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => send(suggestion)}
                      className="w-full text-left p-2.5 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/5 transition-all text-[var(--color-text)] shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[var(--color-brand-primary)]/80 text-white rounded-br-none' 
                      : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 opacity-70">
                    {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {msg.role === 'user' ? 'You' : 'AI Analyst'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {msg.parts?.map((part: any, i: number) => 
                      part.type === 'text' ? <span key={i}>{part.text}</span> : null
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isBusy && (
              <div className="flex justify-start">
                <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-bl-none px-4 py-3 text-xs shadow-sm">
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-2 h-2 bg-[var(--color-brand-primary)]/70 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[var(--color-brand-primary)]/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-[var(--color-brand-primary)]/70 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={onSubmit} className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask about ${entityName}...`}
              className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/50 text-[var(--color-text)] shadow-inner"
              disabled={isBusy}
            />
            <button 
              type="submit" 
              disabled={isBusy || !input.trim()}
              className="bg-[var(--color-brand-primary)] text-white p-2 rounded-full w-9 h-9 flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-colors shrink-0 shadow-sm"
            >
              <Send size={16} className={input.trim() && !isBusy ? "translate-x-0.5" : ""} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
