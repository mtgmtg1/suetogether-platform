// [Flow: Dashboard Layout -> Topbar + Sidebar -> Main Content Area]
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#0A0A0A] text-zinc-50 min-h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        
        {/* Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute top-0 left-[20%] w-[60%] h-[300px] bg-blue-500/5 blur-[120px] rounded-full z-0" />
          
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
