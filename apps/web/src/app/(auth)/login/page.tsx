// [Flow: Component initialized -> Render static UI -> Output layout]

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#0B192E] text-white font-body selection:bg-cyan-400 selection:text-slate-900">
      {/* Generated from Auth_stitch.html */}
      
{/*  Top Navigation Anchor (Shared Component)  */}
{/*  Suppression logic: Shell is suppressed for Transactional/Auth flows per instructions, 
         but we keep a minimal brand anchor if required by "Digital Jurist OS" feel. 
         However, the instructions mandate suppression for Login/Sign-up. 
         I will include only the branding to maintain "SueTogether" identity without full nav.  */}
<header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#f7f9fb]/60 backdrop-blur-xl">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary-container" data-icon="gavel">gavel</span>
<h1 className="text-xl font-bold tracking-tight text-[#0e1c31] font-headline">SueTogether</h1>
</div>
<div className="hidden md:flex gap-6">
<span className="text-xs font-label uppercase tracking-widest text-on-surface-variant/60">The Digital Jurist OS</span>
</div>
</header>
<main className="flex-grow flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
{/*  Left Side (Top on Mobile): The Form Stage  */}
<section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-surface z-10">
<div className="w-full max-w-md space-y-10">
<div className="space-y-2">
<h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight text-primary-container">
                        Welcome back.
                    </h2>
<p className="text-on-surface-variant font-body">
                        Access your digital legal terminal and case management.
                    </p>
</div>
{/*  Bento-styled Login Card  */}
<div className="space-y-6">
<div className="space-y-4">
<div className="space-y-1">
<label className="text-xs font-label uppercase tracking-widest text-on-surface-variant px-1">Email or Username</label>
<input className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-secondary-container transition-all placeholder:text-outline-variant" placeholder="justice.scales@firm.os" type="text"/>
</div>
<div className="space-y-1">
<div className="flex justify-between items-center px-1">
<label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Password</label>
<a className="text-xs font-label uppercase tracking-widest text-secondary hover:text-secondary-fixed-dim transition-colors" href="#">Forgot?</a>
</div>
<input className="w-full px-5 py-4 rounded-xl bg-surface-container-low border-none focus:ring-2 focus:ring-secondary-container transition-all placeholder:text-outline-variant" placeholder="••••••••" type="password"/>
</div>
</div>
<div className="flex flex-col gap-4">
<button className="liquid-neon-btn text-white font-headline font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 hover:scale-[0.98] transition-all duration-300">
                            Login to Terminal
                        </button>
<button className="bg-surface-container-highest text-on-primary-container font-headline font-bold py-4 rounded-xl hover:bg-surface-container-high transition-all">
                            Request Access
                        </button>
</div>
</div>
{/*  Social Authentication Cluster  */}
<div className="space-y-6">
<div className="relative flex items-center py-4">
<div className="flex-grow border-t border-outline-variant opacity-20"></div>
<span className="flex-shrink mx-4 text-xs font-label uppercase tracking-widest text-outline-variant">Enterprise SSO</span>
<div className="flex-grow border-t border-outline-variant opacity-20"></div>
</div>
<div className="grid grid-cols-2 gap-4">
<button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all">
<img alt="Google" className="w-5 h-5" data-alt="minimalist google logo on white background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR3cYrqJu6eA8B5SXvOB-Opu9J-VhE0g2EZmcTMbegHUcg0R9-h2oNC4IBwjgZNTIpieQMF70kYNV0u0o0n9iSSiC2ALWap7BAbRWER6CItFj5MwcLkyx2nKbgTrhaubcNdH6LPiQi74LRM8V1uA-TfwcCqJTGsWXk-wSVIz0Ore9NEDpQA3ey8KBC-liioahVzjx2_WMlAvxGwfYZy4hsUcTWfWQ4jyj84VxKe3e7DRY3GIf2wZDrnQTahe2SsFOrq66YHn0qSvY"/>
<span className="text-sm font-semibold font-body">Google</span>
</button>
<button className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-primary-container" data-icon="grid_view" style={{ fontVariationSettings: '"FILL" 1' }}>grid_view</span>
<span className="text-sm font-semibold font-body">Microsoft</span>
</button>
</div>
</div>
<p className="text-center text-sm text-on-surface-variant/60 font-body">
                    By logging in, you agree to the <a className="underline hover:text-secondary" href="#">Statutes of Service</a>.
                </p>
</div>
</section>
{/*  Right Side (Bottom on Mobile): Abstract Visual Authority  */}
<section className="w-full md:w-1/2 min-h-[400px] md:min-h-screen relative flex items-center justify-center overflow-hidden legal-gradient-bg">
{/*  Background Abstract Image  */}
<div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
<img className="w-full h-full object-cover" data-alt="abstract architectural close-up of a modern glass and steel building reflecting deep blue and cyan light, clean lines and sharp angles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUxG_GTSzBaFFkMgSIIliIfgfetSXsYeEX1UJ0VeO0TAOzy3jugzSR-azvIxUgWcSewjyEjK4_uwjmb7u-VWz6PDrFKZ8WYlCDPlBJADDeQbmdu6_1ytDyQcQX4OWPGFosr4wmNBTXqcQv7SHUCaEXVe4xCGQP-DABCe5Wgg_C01lCx8XT1z_wFNBTZLGPjC0MCY-Q8334SRf_80QZ8GS08SQnuxW7irIdS1ILohMzPoBaSooS2uvXeOgdUqwv-ra5xsteR7WVVzY"/>
</div>
{/*  Floating Bento Insight (Glassmorphism)  */}
<div className="relative z-10 p-8 md:p-12 w-full max-w-lg">
<div className="glass-effect rounded-2xl p-10 border border-white/10 space-y-8">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full liquid-neon-btn flex items-center justify-center text-white">
<span className="material-symbols-outlined" data-icon="security" style={{ fontVariationSettings: '"FILL" 1' }}>security</span>
</div>
<div>
<h3 className="font-headline font-bold text-primary-container text-xl">Protocol Secured</h3>
<p className="text-xs font-label uppercase tracking-widest text-on-primary-container">Encryption Tier 4</p>
</div>
</div>
<div className="space-y-4">
<div className="flex justify-between items-end">
<span className="text-sm font-body text-primary-container font-medium">Digital Jurist Integrity</span>
<span className="text-2xl font-headline font-extrabold text-secondary">99.9%</span>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full liquid-neon-btn w-[99.9%] rounded-full shadow-[0_0_10px_#00daf3]"></div>
</div>
</div>
<p className="text-primary-container/80 font-body leading-relaxed italic">
                        "The Digital Jurist OS integrates disparate legal data into a single, cohesive command center. Clarity is the ultimate authority."
                    </p>
<div className="flex -space-x-3 pt-2">
<div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200">
<img className="w-full h-full rounded-full object-cover" data-alt="professional headshot of a lawyer in a suit with a neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhFs8HaIn4oPSnXCDzmP6O0mpMgCLCeCQ4AKtwp5Tsp2ZZ66W34nGzFZmdC0ERO3o2dEGBhHogjvgmG44PDQs9pn040_py_xhZAUmtr4nWkvm73FockAHO-225b_wUpRnMBXIwXYbtskAxC5Cob3ehsnTnL8MqiqLU5MK2TLQiv8G_4GbL6Dgg7Heb_CgRV1t_v-qjS5ROwOfYrwoq5r2gzZxCzc84AywGvkgRjLC95jc4uLwgaKfXi61iB1kGjn0SkHAkRb9CNd0"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200">
<img className="w-full h-full rounded-full object-cover" data-alt="professional headshot of a female legal consultant with a bright smile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb_lct0WxY4DhgsKWtnb8RTPVXnOqCugUiWs_RPFYxkyaCK1sQ0-4lcKUrRw20j9cQNNMdWtfk2aEw-whlPYJ5XlR3RL4zKfT493Dgql7sXeKPbo40Iecpu_Q_s9KoDyLMwMFbLz6HepRcBOlSEF_xmVKChjhWNT_qhlYpjMD1GZpzuG1Dp5ToSQlAFLrecJbAJEXIALVYPPtF3sqYfC7h3S1jD1ZcrYR3uPCOx9QusQU-2APiQA1ya-c7Js4vDe--c86uE2wYEFU"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200">
<img className="w-full h-full rounded-full object-cover" data-alt="professional headshot of a senior judge in casual attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiKciYf1RHKw8Jf9vYHCtljwfk7OMFIb_1tvrClYWwaW72BX0rIzhp3VU8j9M45e-2EWvQB9acbHylbIfStRM88sOQKQB73bwEQeokPKLQUw1y4MtcFrql9ceXKEfmGlqd89ybRAFi2r_JCbJ9xDafqbVCnlT3bAhj3hiZlOuVeQ735GpcZZqGZozAzDlRHgOhEdGF7z-Jpd3_MTbA1FmGbZYEiIT4uY6eh_5tKR-B02kMkEN3Qa9Fs-0SD9uE8L3rBPDkBcWScFM"/>
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-primary-container flex items-center justify-center text-[10px] text-white font-bold">
                            +12k
                        </div>
</div>
</div>
</div>
{/*  Atmospheric Glows  */}
<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/20 blur-[120px] rounded-full"></div>
<div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>
</section>
</main>
{/*  Footer (Shared Component)  */}
<footer className="w-full py-8 bg-transparent">
<div className="flex flex-col md:flex-row justify-between items-center px-10 max-w-7xl mx-auto gap-4">
<p className="text-[#0e1c31]/40 dark:text-[#f7f9fb]/40 font-body text-sm leading-[1.4]">
                © 2024 SueTogether. The Digital Jurist OS.
            </p>
<nav className="flex gap-8">
<a className="text-[#0e1c31]/40 dark:text-[#f7f9fb]/40 font-body text-sm hover:text-[#0e1c31] transition-colors" href="#">Terms of Service</a>
<a className="text-[#0e1c31]/40 dark:text-[#f7f9fb]/40 font-body text-sm hover:text-[#0e1c31] transition-colors" href="#">Privacy Policy</a>
<a className="text-[#0e1c31]/40 dark:text-[#f7f9fb]/40 font-body text-sm hover:text-[#0e1c31] transition-colors" href="#">Help Center</a>
</nav>
</div>
</footer>

    </div>
  );
}
