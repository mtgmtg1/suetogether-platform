// [Flow: Component initialized -> Render static UI -> Output layout]

export default function dashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B192E] text-white font-body selection:bg-cyan-400 selection:text-slate-900">
      {/* Generated from Dashboard_stitch.html */}
      
{/*  TopAppBar  */}
<header className="fixed top-0 w-full z-50 bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm shadow-slate-900/5 flex justify-between items-center px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden">
<img alt="User Profile" className="w-full h-full object-cover" data-alt="Professional headshot of a lawyer in a dark suit against a neutral architectural background, soft cinematic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0zf9C5Alkh5blk88wO8SJp86bmsCjBVyqoJjXRN1BMOLkJg2-oHoW5HYeV45Qy5cEKDIMxkSitDC0pnRB5RVUK6cO1W4-iOqA4Rq7_jgcGk8IsDC0Q0XqAT6WoPyjlKEa8wUaKIbCEBYRevD2JDDf0p5yCnHN_-WDPFvgOB9xfyvhicDOlu_y51_ZiF6Hfa6dhzSYdo34ycsCxSnixM2f01ONPeI4K2_CQEKHLhSiKFpxY0DZg2hmC-qe17xoafwaYxIH6ukmvPk"/>
</div>
<span className="text-xl font-black tracking-widest text-slate-900 dark:text-white font-headline">SueTogether</span>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-semibold text-sm transition-all hover:bg-surface-variant">
<span className="material-symbols-outlined text-[18px]" data-icon="settings">settings</span>
                System Settings
            </button>
</div>
</header>
<main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
{/*  Hero Section: Progress Ring & Greeting  */}
<section className="mb-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
<div className="lg:col-span-7">
<h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-primary-container mb-4">
                    Case Progress: <span className="text-secondary">Accelerated</span>
</h1>
<p className="text-lg text-on-primary-container max-w-xl leading-relaxed">
                    The AI analysis of 'Johnson vs. TechCorp' is reaching maturity. 78% of liability hurdles have been cleared. Ready for settlement calculation?
                </p>
<div className="mt-8 flex flex-wrap gap-4">
<button className="liquid-neon-btn px-8 py-4 rounded-3xl text-white font-bold tracking-wide flex items-center gap-3 shadow-xl shadow-secondary/20 active:scale-95 transition-all">
<span className="material-symbols-outlined" data-icon="calculate" style={{ fontVariationSettings: '"FILL" 1' }}>calculate</span>
                        Calculate Settlement
                    </button>
<button className="px-8 py-4 rounded-3xl bg-surface-container-highest text-primary-container font-bold transition-all hover:bg-surface-variant active:scale-95">
                        Review Discovery
                    </button>
</div>
</div>
{/*  Progress Ring Component  */}
<div className="lg:col-span-5 flex justify-center lg:justify-end">
<div className="relative w-64 h-64 flex items-center justify-center bg-surface-container-lowest rounded-full shadow-[0_24px_48px_-12px_rgba(11,25,46,0.08)]">
{/*  SVG Progress Ring  */}
<svg className="w-56 h-56 transform -rotate-90">
<circle className="text-surface-container-high" cx="112" cy="112" fill="transparent" r="100" stroke="currentColor" strokeWidth="12"></circle>
<circle className="text-secondary" cx="112" cy="112" fill="transparent" r="100" stroke="currentColor" strokeDasharray="628" strokeDashoffset="138" strokeWidth="12" style={{ filter: "drop-shadow(0 0 8px rgba(0, 104, 117, 0.4))" }}></circle>
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-5xl font-black font-headline text-primary-container tracking-tighter">78%</span>
<span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container">Resolution</span>
</div>
</div>
</div>
</section>
{/*  Bento Grid & Activity Feed  */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
{/*  Left & Center: Bento Stats  */}
<div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
{/*  Total Costs  */}
<div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-56 group hover:bg-white transition-all">
<div>
<div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="account_balance_wallet" style={{ fontVariationSettings: '"FILL" 1' }}>account_balance_wallet</span>
</div>
<h3 className="text-on-surface-variant font-semibold font-headline mb-1">Total Costs</h3>
<p className="text-4xl font-bold font-headline text-primary-container">$12,500</p>
</div>
<div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
<span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
                        2.4% vs last month
                    </div>
</div>
{/*  Days Remaining  */}
<div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-56 group hover:bg-white transition-all">
<div>
<div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined" data-icon="event_upcoming" style={{ fontVariationSettings: '"FILL" 1' }}>event_upcoming</span>
</div>
<h3 className="text-on-surface-variant font-semibold font-headline mb-1">Days Remaining</h3>
<p className="text-4xl font-bold font-headline text-primary-container">12 <span className="text-lg font-medium text-on-primary-container">Days</span></p>
</div>
<div className="text-[10px] font-bold uppercase tracking-widest text-on-primary-container">Next Milestone: Mediation</div>
</div>
{/*  AI Analysis Completion (Wide Bento)  */}
<div className="md:col-span-2 glass-card p-8 rounded-3xl overflow-hidden relative group hover:bg-white transition-all">
<div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
<div>
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold uppercase tracking-widest mb-4">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                                Live AI Processing
                            </div>
<h3 className="text-2xl font-bold font-headline text-primary-container mb-2">Analysis Completion</h3>
<p className="text-on-primary-container max-w-sm mb-6">Discovery documents are being vectorized and compared against 14,000 local precedents.</p>
<div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[94%] rounded-full shadow-[0_0_12px_rgba(0,104,117,0.3)]"></div>
</div>
<div className="flex justify-between mt-2 text-xs font-bold text-on-primary-container">
<span>94% Scanned</span>
<span>120 Documents total</span>
</div>
</div>
<div className="hidden md:block opacity-20 group-hover:opacity-40 transition-opacity">
<span className="material-symbols-outlined text-[120px] text-secondary" data-icon="analytics">analytics</span>
</div>
</div>
</div>
</div>
{/*  Right side: Recent Activity Feed  */}
<div className="lg:col-span-1 bg-surface-container-low rounded-3xl p-8">
<div className="flex items-center justify-between mb-8">
<h2 className="text-xl font-bold font-headline text-primary-container">Activity</h2>
<span className="material-symbols-outlined text-on-primary-container cursor-pointer hover:text-primary transition-colors" data-icon="more_horiz">more_horiz</span>
</div>
<div className="space-y-3">
{/*  Activity Item 1  */}
<div className="flex gap-4 p-4 rounded-2xl hover:bg-surface-container-lowest transition-all cursor-pointer group">
<div className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[20px]" data-icon="upload_file">upload_file</span>
</div>
<div>
<p className="text-sm font-semibold text-primary-container">Deposition_V2.pdf uploaded</p>
<p className="text-xs text-on-primary-container mt-1">4 minutes ago • Sarah Miller</p>
</div>
</div>
{/*  Activity Item 2  */}
<div className="flex gap-4 p-4 rounded-2xl hover:bg-surface-container-lowest transition-all cursor-pointer group">
<div className="shrink-0 w-10 h-10 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[20px]" data-icon="auto_awesome" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
</div>
<div>
<p className="text-sm font-semibold text-primary-container">AI Precedent Match Found</p>
<p className="text-xs text-on-primary-container mt-1">2 hours ago • System</p>
</div>
</div>
{/*  Activity Item 3  */}
<div className="flex gap-4 p-4 rounded-2xl hover:bg-surface-container-lowest transition-all cursor-pointer group">
<div className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[20px]" data-icon="task_alt">task_alt</span>
</div>
<div>
<p className="text-sm font-semibold text-primary-container">Conflict Check Verified</p>
<p className="text-xs text-on-primary-container mt-1">Yesterday • Compliance AI</p>
</div>
</div>
{/*  Activity Item 4  */}
<div className="flex gap-4 p-4 rounded-2xl hover:bg-surface-container-lowest transition-all cursor-pointer group">
<div className="shrink-0 w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[20px]" data-icon="warning">warning</span>
</div>
<div>
<p className="text-sm font-semibold text-primary-container">Expired Document Alert</p>
<p className="text-xs text-on-primary-container mt-1">Jan 24 • Legal Team</p>
</div>
</div>
</div>
<button className="w-full mt-8 py-3 text-sm font-bold text-on-primary-container hover:text-primary transition-colors">
                    View Full Audit Trail
                </button>
</div>
</div>
</main>
{/*  Floating Action Button  */}
<button className="fixed bottom-24 right-6 md:bottom-32 md:right-10 w-16 h-16 rounded-full liquid-neon-btn text-white shadow-[0_12px_24px_-8px_rgba(0,227,253,0.5)] z-[60] flex items-center justify-center transition-all hover:scale-110 active:scale-90 group">
<span className="material-symbols-outlined text-[32px]" data-icon="add">add</span>
<span className="absolute right-full mr-4 px-4 py-2 bg-primary-container text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">New Intake</span>
</button>
{/*  BottomNavBar  */}
<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_-12px_40px_-15px_rgba(14,28,49,0.1)] rounded-t-3xl">
{/*  Home (Active)  */}
<a className="flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 rounded-2xl px-5 py-2 transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="home_app_logo" style={{ fontVariationSettings: '"FILL" 1' }}>home_app_logo</span>
<span className="font-inter text-xs font-semibold tracking-wide uppercase mt-1">Home</span>
</a>
{/*  Cases  */}
<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-cyan-500 transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="folder_open">folder_open</span>
<span className="font-inter text-xs font-semibold tracking-wide uppercase mt-1">Cases</span>
</a>
{/*  Analytics  */}
<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-cyan-500 transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-inter text-xs font-semibold tracking-wide uppercase mt-1">Analytics</span>
</a>
{/*  Messages  */}
<a className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-cyan-500 transition-all active:scale-90 duration-200" href="#">
<div className="relative">
<span className="material-symbols-outlined" data-icon="chat_bubble">chat_bubble</span>
<span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full"></span>
</div>
<span className="font-inter text-xs font-semibold tracking-wide uppercase mt-1">Messages</span>
</a>
</nav>

    </div>
  );
}
