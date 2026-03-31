export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-blue-500/30">
      <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col relative h-[100dvh]">
        {children}
      </div>
    </div>
  );
}
