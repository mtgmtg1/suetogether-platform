"use client";

// [Flow: Chat Init -> Load Messages -> Handle User Input -> Trigger Auth Modal]
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, FileText, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  sender: "bot" | "user";
  type: "text" | "auth_request" | "doc_request";
  text: string;
  timestamp: Date;
};

export default function IntakeChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      type: "text",
      text: "안녕하세요. SueTogether 대화형 접수봇입니다.",
      timestamp: new Date(),
    },
    {
      id: "2",
      sender: "bot",
      type: "text",
      text: "가습기 살균제 피부질환 집단소송에 참여하기 위해 몇 가지 질문을 드리겠습니다. 피해 사실을 간략히 설명해 주시겠어요?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      type: "text",
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    
    // 2. Mock Bot Reply (Auth Request)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        type: "auth_request",
        text: "답변 감사합니다. 본인 확인 및 전자서명 효력을 위해 본인 인증을 진행해주세요.",
        timestamp: new Date(),
      }]);
    }, 1000);
  };

  const renderMessage = (msg: Message) => {
    if (msg.sender === "bot") {
      return (
        <motion.div 
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-2 max-w-[85%]"
        >
          <div className="bg-white/10 border border-white/5 backdrop-blur-md rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-200">
            {msg.text}
            
            {msg.type === "auth_request" && (
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>KCB/PASS 본인 인증하기</span>
              </Button>
            )}
          </div>
          <span className="text-[10px] text-zinc-500 ml-1">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </motion.div>
      );
    }

    return (
      <motion.div 
        key={msg.id}
        initial={{ opacity: 0, scale: 0.95, originX: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-end gap-1 max-w-[85%] self-end"
      >
        <div className="bg-blue-600/90 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm shadow-lg border border-blue-500/50">
          {msg.text}
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span className="text-[10px] text-zinc-500">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <CheckCircle2 className="w-3 h-3 text-blue-500" />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a]">
      {/* Chat Header */}
      <header className="h-14 flex items-center px-4 border-b border-white/10 bg-black/50 backdrop-blur-xl z-20 shrink-0 sticky top-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">
          <span className="text-white text-xs font-bold">ST</span>
        </div>
        <div className="ml-3">
          <h1 className="text-sm font-semibold text-zinc-100">AI 법률 상담원</h1>
          <p className="text-[10px] text-zinc-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            온라인
          </p>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <AnimatePresence>
          {messages.map(renderMessage)}
        </AnimatePresence>
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black/80 backdrop-blur-xl border-t border-white/10 shrink-0 sticky bottom-0 z-20">
        <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 focus-within:bg-white/10 focus-within:border-white/20 transition-all">
          <button className="p-2 text-zinc-400 hover:text-white transition-colors shrink-0">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-white transition-colors shrink-0 hidden sm:block">
            <FileText className="w-5 h-5" />
          </button>
          
          <textarea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요 (Enter로 전송)"
            className="flex-1 max-h-32 min-h-[40px] bg-transparent resize-none outline-none text-sm text-zinc-200 placeholder:text-zinc-500 py-2.5 px-2"
            rows={1}
          />
          
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-2.5 rounded-xl bg-blue-600 text-white disabled:opacity-50 disabled:bg-zinc-800 transition-colors shrink-0 m-0.5"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Auth Modal Overlay */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-sm bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative Blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">PASS 간편 본인인증</h3>
                <p className="text-sm text-zinc-400 mb-6">
                  안전한 전자서명과 정보 보호를 위해 이용 중인 통신사를 통한 본인인증이 필요합니다.
                </p>
                
                <div className="w-full space-y-3">
                  <Button 
                    variant="outline"
                    className="w-full justify-between bg-white text-black hover:bg-zinc-200 rounded-xl h-12 border-0 font-medium"
                    onClick={() => setIsAuthModalOpen(false)}
                  >
                    <span>PASS로 인증하기</span>
                    <span className="text-xs bg-zinc-100 px-2 py-1 rounded-md text-zinc-600">안전</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full text-zinc-500 hover:text-white"
                    onClick={() => setIsAuthModalOpen(false)}
                  >
                    취소
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
