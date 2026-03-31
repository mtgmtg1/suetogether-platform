// [Flow: Component initialized -> Render static UI -> Output layout]

export default function AnalyticsPage() {
  return (
    <div className="w-full text-white font-body selection:bg-cyan-400 selection:text-slate-900">
      {/* Generated from Analytics_stitch.html */}
      
<div className="pb-32 max-w-7xl mx-auto space-y-10">
{/*  Dashboard Header Hero  */}
<section className="flex flex-col md:flex-row justify-between items-end gap-6">
<div>
<p className="font-label text-secondary uppercase tracking-[0.2em] font-semibold text-xs mb-2">Legal Intelligence Terminal</p>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary-container tracking-tight">Portfolio Performance</h2>
</div>
<div className="flex gap-4">
<button className="px-6 py-3 rounded-xl bg-surface-container-highest text-on-primary-container font-semibold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-lg">download</span>
                    Export Report
                </button>
<button className="px-6 py-3 rounded-xl bg-gradient-to-br from-secondary to-secondary-fixed-dim text-white font-semibold flex items-center gap-2 shadow-lg shadow-secondary/20 hover:scale-[0.98] transition-transform">
<span className="material-symbols-outlined text-lg">add</span>
                    New Analysis
                </button>
</div>
</section>
{/*  Main Analytics Bento Grid  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
{/*  Settlement Trends Chart (Large Module)  */}
<div className="md:col-span-8 bg-[#0B192E] rounded-[2rem] p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[480px]">
<div className="relative z-10">
<div className="flex justify-between items-start">
<div>
<h3 className="font-headline text-2xl font-bold text-white mb-1">Expected Settlement Analytics</h3>
<p className="text-slate-400 text-sm">Value trends based on Liability Confidence 2.0</p>
</div>
<div className="flex gap-2">
<span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold text-[#00e3fd] uppercase tracking-wider">Live Sync</span>
</div>
</div>
<div className="mt-12 flex items-baseline gap-4">
<span className="text-5xl font-extrabold text-[#00e3fd] tracking-tighter">$1,482,000</span>
<span className="text-secondary-fixed-dim font-bold flex items-center gap-1 text-sm bg-secondary/20 px-2 py-0.5 rounded-lg">
<span className="material-symbols-outlined text-xs">trending_up</span>
                            +12.4%
                        </span>
</div>
</div>
{/*  Decorative Chart Placeholder with Tonal Glows  */}
<div className="absolute bottom-0 left-0 w-full h-1/2 flex items-end">
<div className="w-full h-full bg-gradient-to-t from-secondary/10 to-transparent"></div>
<svg className="absolute bottom-0 w-full h-48 overflow-visible" viewBox="0 0 800 200">
<defs>
<linearGradient id="chartLine" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stopColor="#00e3fd"></stop>
<stop offset="100%" stopColor="#006875" stopOpacity="0"></stop>
</linearGradient>
<filter id="glow">
<feGaussianBlur result="coloredBlur" stdDeviation="4"></feGaussianBlur>
<feMerge>
<feMergeNode in="coloredBlur"></feMergeNode>
<feMergeNode in="SourceGraphic"></feMergeNode>
</feMerge>
</filter>
</defs>
<path d="M0 160 Q 100 140 200 160 T 400 80 T 600 120 T 800 40 L 800 200 L 0 200 Z" fill="url(#chartLine)" fill-opacity="0.2"></path>
<path d="M0 160 Q 100 140 200 160 T 400 80 T 600 120 T 800 40" fill="none" filter="url(#glow)" stroke="#00e3fd" strokeWidth="4"></path>
</svg>
</div>
</div>
{/*  Success Probability Gauge  */}
<div className="md:col-span-4 bg-surface-container-low rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
<h3 className="font-headline text-lg font-bold text-on-surface-variant mb-8">Case Success Probability</h3>
<div className="relative flex items-center justify-center w-56 h-56">
{/*  Progress Ring  */}
<svg className="w-full h-full -rotate-90">
<circle className="text-surface-container-high" cx="112" cy="112" fill="transparent" r="90" stroke="currentColor" strokeWidth="12"></circle>
<circle className="text-secondary progress-ring-glow" cx="112" cy="112" fill="transparent" r="90" stroke="currentColor" strokeDasharray="565" strokeDashoffset="85" strokeWidth="12"></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-5xl font-black text-primary-container font-headline">85%</span>
<span className="text-xs font-bold text-secondary uppercase tracking-widest mt-1">Highly Probable</span>
</div>
</div>
<div className="mt-10 grid grid-cols-2 gap-4 w-full">
<div className="bg-surface-container-lowest p-4 rounded-2xl">
<span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Precedent</span>
<span className="text-lg font-bold text-primary-container">92%</span>
</div>
<div className="bg-surface-container-lowest p-4 rounded-2xl">
<span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Defense Strength</span>
<span className="text-lg font-bold text-primary-container text-error">Low</span>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
{/*  Settlement Calculator (Glassmorphism)  */}
<div className="md:col-span-7 relative rounded-[2rem] overflow-hidden min-h-[400px]">
<img alt="Legal Setting" className="absolute inset-0 w-full h-full object-cover" data-alt="architectural interior of a modern law firm with glass walls reflecting city lights and minimalist furniture at dusk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHBg_sz87i6mdhZxPX9x8r9FhdJFz8FMo570hIzgqUSi-M5fsbPqEdJ8BIe5goQLQxYaMZCE0OUNStUhmDSdhDvn1Wqnktm6ADla1S9e1jURvxeE848dsL-5vSRWLcZM9OYBsWJ9_1WQQu7teDl3fWZTxexxQ41gcg2gKGLgbLUkZf2r8ooZgXnw5rCCOj-r39IWPW2-aQV84E-e054pQQex5nJdOTLhi_0_ItJnnGChmj5VLO-0spL34qDTMVR186ZEsG22yF-no"/>
<div className="absolute inset-0 glass-panel p-10 flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-[#00e3fd]">calculate</span>
<h3 className="font-headline text-2xl font-bold text-white">Settlement Calculator</h3>
</div>
<div className="space-y-8 max-w-md">
<div className="space-y-4">
<div className="flex justify-between items-center">
<label className="text-slate-300 font-medium text-sm">Liability Confidence</label>
<span className="text-[#00e3fd] font-bold">78%</span>
</div>
<input max="100" min="0" type="range" defaultValue="78"/>
</div>
<div className="space-y-4">
<div className="flex justify-between items-center">
<label className="text-slate-300 font-medium text-sm">Estimated Damages</label>
<span className="text-[#00e3fd] font-bold">$2.5M</span>
</div>
<input max="1000" min="0" type="range" defaultValue="250"/>
</div>
</div>
</div>
<div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
<div>
<span className="text-slate-400 text-xs uppercase font-bold tracking-[0.1em]">Calculated Value</span>
<div className="text-5xl font-black text-[#00e3fd] tracking-tighter">$1,950,000</div>
</div>
<button className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all group">
<span className="material-symbols-outlined text-white group-active:scale-90 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</div>
{/*  Recent Activity Widget  */}
<div className="md:col-span-5 bg-surface-container-low rounded-[2rem] p-8 flex flex-col shadow-sm">
<div className="flex justify-between items-center mb-8">
<h3 className="font-headline text-lg font-bold text-primary-container">Key Activity</h3>
<button className="text-secondary font-bold text-xs uppercase tracking-wider">View All</button>
</div>
<div className="space-y-4">
{/*  Activity Item  */}
<div className="bg-surface-container-lowest p-5 rounded-2xl flex gap-4 hover:translate-x-1 transition-transform cursor-pointer">
<div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-secondary-container">gavel</span>
</div>
<div>
<h4 className="font-bold text-primary-container text-sm">Offer Received: Case #8821</h4>
<p className="text-on-surface-variant text-xs mt-1">Defense counsel submitted a $450k settlement offer for review.</p>
<span className="text-[10px] font-medium text-slate-400 mt-2 block">2 HOURS AGO</span>
</div>
</div>
{/*  Activity Item  */}
<div className="bg-surface-container-lowest p-5 rounded-2xl flex gap-4 hover:translate-x-1 transition-transform cursor-pointer">
<div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-surface-variant">description</span>
</div>
<div>
<h4 className="font-bold text-primary-container text-sm">Liability Matrix Updated</h4>
<p className="text-on-surface-variant text-xs mt-1">New medical expert testimony increased confidence by 12%.</p>
<span className="text-[10px] font-medium text-slate-400 mt-2 block">YESTERDAY</span>
</div>
</div>
{/*  Activity Item  */}
<div className="bg-surface-container-lowest p-5 rounded-2xl flex gap-4 hover:translate-x-1 transition-transform cursor-pointer">
<div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-error-container">warning</span>
</div>
<div>
<h4 className="font-bold text-primary-container text-sm">Deadline Approaching</h4>
<p className="text-on-surface-variant text-xs mt-1">Discovery window closes in 48 hours for Johnson v. Acme Corp.</p>
<span className="text-[10px] font-medium text-slate-400 mt-2 block">2 DAYS AGO</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
  );
}
