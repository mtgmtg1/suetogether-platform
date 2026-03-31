// [Flow: Sidebar Render -> Render Nav Links -> Active State Styling]
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Briefcase, 
  MessageSquare, 
  Files, 
  Activity, 
  PieChart, 
  Landmark,
  Settings
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NAV_ITEMS = [
  { name: "대시보드", href: "/dashboard", icon: Activity },
  { name: "사건 관리", href: "/cases", icon: Briefcase },
  { name: "인테이크 관리", href: "/intake", icon: MessageSquare },
  { name: "증거 검증", href: "/evidence", icon: Files },
  { name: "GIS 분석", href: "/analytics", icon: PieChart },
  { name: "합의금 지급", href: "/settlement", icon: Landmark },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur-xl flex flex-col h-screen hidden md:flex shrink-0">
      {/* Brand & Workspace */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-zinc-100 leading-tight tracking-tight">SueTogether</span>
          <span className="text-[10px] text-zinc-500 font-medium">B2B FIRM OS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">
          Workspace
        </div>
        
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative",
                isActive 
                  ? "bg-blue-500/10 text-blue-400" 
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
              )}
            >
              {isActive && (
                <div className="absolute left-0 w-1 h-5 rounded-r-md bg-blue-500" />
              )}
              <Icon className={cn("w-4 h-4", isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 mt-auto border-t border-white/5">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-all w-full"
        >
          <Settings className="w-4 h-4 text-zinc-500" />
          설정 및 멤버
        </Link>
      </div>
    </aside>
  );
}
