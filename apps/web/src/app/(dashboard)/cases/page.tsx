// [Flow: Component initialized -> Render static UI -> Output layout]

export default function CasesPage() {
  return (
    <div className="w-full text-white font-body selection:bg-cyan-400 selection:text-slate-900">
      {/* Generated from Cases_stitch.html */}
      
<main className="pb-32 px-5 max-w-7xl mx-auto min-h-screen">
{/*  Header Section  */}
<div className="mb-8">
<h2 className="font-headline text-3xl font-bold tracking-tight text-primary-container mb-2">Legal Portfolio</h2>
<p className="font-body text-on-surface-variant text-sm">Managing 12 active e-Discovery tracks</p>
</div>
{/*  Search & Filter Bento  */}
<div className="mb-8 space-y-4">
<div className="relative group">
<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
<span className="material-symbols-outlined" data-icon="search">search</span>
</div>
<input className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-secondary-container transition-all duration-300" placeholder="Search case files, defendants, or IDs..." type="text"/>
</div>
<div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
<button className="flex-none px-5 py-2.5 rounded-full bg-primary-container text-white text-sm font-medium shadow-lg active:scale-95 transition-all">Active</button>
<button className="flex-none px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest transition-all">Priority</button>
<button className="flex-none px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest transition-all">Awaiting Review</button>
<button className="flex-none px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-surface-container-highest transition-all">Closed</button>
</div>
</div>
{/*  Cases Grid  */}
<div className="space-y-6">
{/*  Case Card 1  */}
<div className="bg-surface-container-lowest rounded-[1.5rem] p-6 shadow-[0_8px_32px_-12px_rgba(11,25,46,0.06)] relative overflow-hidden group hover:shadow-[0_24px_48px_-12px_rgba(11,25,46,0.1)] transition-all duration-500">
<div className="flex justify-between items-start mb-4">
<div className="space-y-1">
<span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">Ref: ST-2024-089</span>
<h3 className="font-headline text-xl font-bold text-primary-container leading-tight">Johnson vs. TechCorp</h3>
</div>
<span className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">Discovery Phase</span>
</div>
<div className="flex flex-col gap-3 mb-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-sm" data-icon="person">person</span>
</div>
<div>
<p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">Plaintiff</p>
<p className="text-sm font-semibold">David Johnson</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-sm" data-icon="corporate_fare">corporate_fare</span>
</div>
<div>
<p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">Defendant</p>
<p className="text-sm font-semibold">TechCorp Solutions Inc.</p>
</div>
</div>
</div>
{/*  Mini Timeline / Progress  */}
<div className="bg-surface-container-low/50 rounded-xl p-4 border-l-4 border-secondary">
<div className="flex justify-between items-center mb-2">
<span className="text-[11px] font-bold text-on-surface-variant uppercase">Recent Update</span>
<span className="text-[11px] text-secondary font-medium italic">2h ago</span>
</div>
<p className="text-sm text-on-surface leading-snug">3 new evidence bundles uploaded to the encrypted vault. Ready for review.</p>
</div>
<div className="mt-6 flex gap-3">
<button className="flex-1 cyan-gradient-btn text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-secondary/20 active:scale-95 transition-all">Review e-Discovery</button>
<button className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-xl text-primary-container hover:bg-surface-container-highest transition-all">
<span className="material-symbols-outlined" data-icon="more_horiz">more_horiz</span>
</button>
</div>
</div>
{/*  Case Card 2  */}
<div className="bg-surface-container-lowest rounded-[1.5rem] p-6 shadow-[0_8px_32px_-12px_rgba(11,25,46,0.06)] relative overflow-hidden group hover:shadow-[0_24px_48px_-12px_rgba(11,25,46,0.1)] transition-all duration-500">
<div className="flex justify-between items-start mb-4">
<div className="space-y-1">
<span className="font-label text-[10px] uppercase tracking-widest text-outline font-bold">Ref: ST-2024-112</span>
<h3 className="font-headline text-xl font-bold text-primary-container leading-tight">Global Logistics vs. Port Authority</h3>
</div>
<span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">Awaiting Review</span>
</div>
<div className="flex flex-col gap-3 mb-6">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-sm" data-icon="apartment">apartment</span>
</div>
<div>
<p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">Plaintiff</p>
<p className="text-sm font-semibold">Global Logistics Ltd.</p>
</div>
</div>
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined text-sm" data-icon="gavel">gavel</span>
</div>
<div>
<p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-tighter">Defendant</p>
<p className="text-sm font-semibold">Municipal Port Authority</p>
</div>
</div>
</div>
<div className="bg-surface-container-low/50 rounded-xl p-4">
<div className="flex justify-between items-center mb-2">
<span className="text-[11px] font-bold text-on-surface-variant uppercase">Upcoming Milestone</span>
<span className="text-[11px] text-error font-medium">Tomorrow</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-lg" data-icon="event">event</span>
<p className="text-sm text-on-surface leading-snug font-medium">Preliminary hearing scheduled for 09:00 AM.</p>
</div>
</div>
<div className="mt-6 flex gap-3">
<button className="flex-1 bg-surface-container-high text-primary-container py-3 rounded-xl font-bold text-sm hover:bg-surface-container-highest active:scale-95 transition-all">Manage Files</button>
<button className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-xl text-primary-container hover:bg-surface-container-highest transition-all">
<span className="material-symbols-outlined" data-icon="share">share</span>
</button>
</div>
</div>
{/*  Case Card 3 (Simplified/Compact)  */}
<div className="bg-surface-container-low rounded-[1.5rem] p-6 relative overflow-hidden group hover:bg-surface-container-high transition-all duration-300">
<div className="flex justify-between items-center">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
</div>
<div>
<h3 className="font-headline text-lg font-bold text-primary-container">AI Intellectual Property Claim</h3>
<p className="text-xs text-on-surface-variant">482 Files Scanned • High Priority</p>
</div>
</div>
<span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
</div>
</div>
</div>
</main>
    </div>
  );
}
