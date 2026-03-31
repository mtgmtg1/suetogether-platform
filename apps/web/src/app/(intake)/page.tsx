// [Flow: Component initialized -> Render static UI -> Output layout]

export default function intakePage() {
  return (
    <div className="min-h-screen bg-[#0B192E] text-white font-body selection:bg-cyan-400 selection:text-slate-900">
      {/* Generated from Intake_RAG_stitch.html */}
      
{/*  TopAppBar  */}
<header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0B192E]/60 backdrop-blur-xl dark:bg-[#0B192E]/60 shadow-[0_24px_48px_-12px_rgba(11,25,46,0.08)]">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-cyan-400 text-2xl">gavel</span>
<h1 className="text-xl font-black text-white tracking-tight font-headline">SueTogether</h1>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-400/30">
<img alt="User avatar" className="w-full h-full object-cover" data-alt="High-end professional portrait of a legal executive with sharp lighting and deep navy background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMvKP1Ck_dWgLRFeFCM2mXnvAKOgV34XRpeXTwdcwBJWx4VMQlHaoqs6vf8ALhKMRzatERzzVIS3sT7bm9Lo3-9e0D2fw-UBXR45em7ohws6WSQ9yVB4in9tISbDpbbVA9uV2DzukgugqfGUAMm6fZd3HAs0ty3BN8i8Vj_O3Gbiqad1rS9dJegaCTS1rZsGrf-_QUD2SBgQJ4yPzZIlgsPVkxnzjvT3_rg_wx58WyFZWJ1OuZbaigCfPxWwZ1KJOTF-fkjq8DkKA"/>
</div>
</header>
{/*  Main Content Canvas  */}
<main className="pt-24 pb-32 px-4 space-y-8 max-w-md mx-auto">
{/*  Intake Conversational Stepper  */}
<section className="space-y-4">
<div className="flex justify-between items-end px-2">
<span className="text-cyan-400 font-bold font-headline text-sm tracking-widest uppercase">Step 2 of 5</span>
<span className="text-slate-400 text-xs font-label">INTAKE PROGRESS</span>
</div>
<div className="glass-card rounded-[1.5rem] p-6 shadow-[0_24px_48px_-12px_rgba(11,25,46,0.2)] space-y-6">
<h2 className="text-2xl font-extrabold font-headline leading-tight text-white">Tell us about the incident...</h2>
<p className="text-slate-300 text-sm leading-relaxed">
                    Provide a detailed account of the events. Our AI will analyze the sequence to identify key legal triggers.
                </p>
<div className="space-y-4">
<div className="bg-white/5 rounded-xl p-4 focus-within:ring-2 focus-within:ring-cyan-400/50 transition-all">
<label className="block text-[10px] font-label text-cyan-400 uppercase tracking-widest mb-1">Incident Description</label>
<textarea className="w-full bg-transparent border-none p-0 text-white placeholder-slate-500 focus:ring-0 text-sm resize-none" placeholder="Type your narrative here..." rows={4}></textarea>
</div>
<button className="w-full py-4 bg-gradient-to-br from-[#006875] to-[#00daf3] rounded-xl font-headline font-bold text-white shadow-[0_0_20px_rgba(0,227,253,0.2)] active:scale-95 transition-transform">
                        Continue Analysis
                    </button>
</div>
</div>
</section>
{/*  AI Insight Panel (Intelligence)  */}
<section className="grid grid-cols-2 gap-4">
{/*  Settlement Probability Ring  */}
<div className="glass-card rounded-[1.5rem] p-5 flex flex-col items-center justify-center space-y-3">
<div className="relative w-20 h-20">
<svg className="w-full h-full" viewBox="0 0 36 36">
<path className="text-white/10 stroke-current" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
<path className="text-cyan-400 stroke-current neon-glow" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="78, 100" strokeLinecap="round" strokeWidth="3"></path>
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="text-lg font-black font-headline">78%</span>
</div>
</div>
<span className="text-[10px] font-label text-slate-400 text-center uppercase tracking-tighter">Settlement Probability</span>
</div>
{/*  Relevant Precedents  */}
<div className="glass-card rounded-[1.5rem] p-5 space-y-2">
<div className="flex items-center gap-2 text-cyan-400">
<span className="material-symbols-outlined text-sm">history_edu</span>
<span className="text-[10px] font-bold font-label uppercase tracking-widest">Precedents</span>
</div>
<div className="space-y-1">
<div className="text-[11px] font-semibold text-white truncate">Doe v. TechCorp (2022)</div>
<div className="text-[11px] font-semibold text-white truncate">Smith Case #442</div>
<div className="text-[10px] text-cyan-400 font-medium">+14 More</div>
</div>
</div>
</section>
{/*  Hybrid AI Chat Feed  */}
<section className="space-y-4">
<div className="flex items-center gap-2 px-2">
<span className="material-symbols-outlined text-cyan-400" style={{ fontVariationSettings: '"FILL" 1' }}>psychology</span>
<h3 className="font-headline font-bold text-sm">AI Legal Assistant</h3>
</div>
<div className="space-y-4">
{/*  AI Message  */}
<div className="flex gap-3 max-w-[90%]">
<div className="w-8 h-8 rounded-lg bg-cyan-400/20 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-cyan-400 text-lg">smart_toy</span>
</div>
<div className="glass-card p-4 rounded-2xl rounded-tl-none">
<p className="text-sm leading-relaxed text-slate-200">Based on your input, I've identified a strong argument for "Breach of Fiduciary Duty." Would you like me to draft a preliminary summary?</p>
</div>
</div>
{/*  User Message  */}
<div className="flex gap-3 max-w-[90%] ml-auto flex-row-reverse">
<div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-white text-lg">person</span>
</div>
<div className="bg-cyan-400/10 p-4 rounded-2xl rounded-tr-none border-r-2 border-cyan-400/30">
<p className="text-sm leading-relaxed text-cyan-50">Yes, please focus on the timeline from October 14th.</p>
</div>
</div>
</div>
</section>
</main>
{/*  Smart Input Bar  */}
<div className="fixed bottom-24 left-0 w-full px-4 z-40">
<div className="glass-card rounded-full p-2 flex items-center gap-3 shadow-[0_24px_48px_-12px_rgba(0,227,253,0.15)] ring-1 ring-cyan-400/20">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-colors">
<span className="material-symbols-outlined">attach_file</span>
</button>
<input className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-white placeholder-slate-500 font-body" placeholder="Ask AI about your case..." type="text"/>
<button className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006875] to-[#00daf3] flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>gavel</span>
</button>
</div>
</div>
{/*  BottomNavBar  */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-[#0B192E]/80 backdrop-blur-2xl dark:bg-[#0B192E]/80 rounded-t-[1.5rem] shadow-[0_-12px_32px_rgba(11,25,46,0.15)]">
<a className="flex flex-col items-center justify-center text-slate-400 px-4 py-2 hover:text-cyan-200 transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] font-semibold tracking-tighter uppercase font-label mt-1">Home</span>
</a>
{/*  Active Tab: Intake  */}
<a className="flex flex-col items-center justify-center bg-gradient-to-br from-[#006875] to-[#00daf3] text-white rounded-2xl px-6 py-2 shadow-[0_0_15px_rgba(0,227,253,0.3)] scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>assignment_ind</span>
<span className="text-[10px] font-semibold tracking-tighter uppercase font-label mt-1">Intake</span>
</a>
<a className="flex flex-col items-center justify-center text-slate-400 px-4 py-2 hover:text-cyan-200 transition-all" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="text-[10px] font-semibold tracking-tighter uppercase font-label mt-1">Intelligence</span>
</a>
<a className="flex flex-col items-center justify-center text-slate-400 px-4 py-2 hover:text-cyan-200 transition-all" href="#">
<span className="material-symbols-outlined">description</span>
<span className="text-[10px] font-semibold tracking-tighter uppercase font-label mt-1">Documents</span>
</a>
</nav>

    </div>
  );
}
