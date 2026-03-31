// [Flow: Topbar Render -> Search Input -> Breadcrumbs -> Profile Menu]
import { Search, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-20">
      {/* Mobile Menu & Search */}
      <div className="flex items-center flex-1 gap-4">
        <Button variant="ghost" size="icon" className="md:hidden text-zinc-400">
          <Menu className="w-5 h-5" />
        </Button>
        <div className="relative max-w-md w-full hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-400 transition-colors" />
          <input 
            type="text" 
            placeholder="사건번호, 원고 명, 또는 키워드로 검색" 
            className="w-full h-9 bg-white/5 border border-white/10 rounded-full pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Notifications & Profile */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white relative rounded-full h-9 w-9">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        </Button>
        
        <div className="h-6 w-px bg-white/10 mx-2" />
        
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="" alt="Admin user" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-[10px] text-white font-medium">SHIN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start hidden sm:flex">
            <span className="text-xs font-medium text-zinc-200 leading-tight">관리자</span>
            <span className="text-[10px] text-zinc-500 leading-tight">신앤킴 법무법인</span>
          </div>
        </button>
      </div>
    </header>
  );
}
