const { useState, useEffect, useMemo, useRef } = React;

function WelcomeLanding({ onLaunchConsole }) {
    return (
        <div class="bg-[#F8F9FA] text-[#1A1F2C] min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white">
            
            {/* Top Navigation */}
            <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto rounded-none w-full">
                <div class="flex items-center gap-3">
                    <div class="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center font-black text-white text-base tracking-wider shadow-md shadow-indigo-500/10">
                        VH
                    </div>
                    <span class="font-extrabold tracking-tight text-lg text-zinc-900 font-sans">
                        VendorHood
                    </span>
                </div>
                
                <nav class="hidden md:flex items-center gap-8 text-xs uppercase tracking-wider font-semibold text-zinc-500">
                    <a href="#features" class="hover:text-indigo-600 transition-colors">Products</a>
                    <a href="#architecture" class="hover:text-indigo-600 transition-colors">Solutions</a>
                    <a href="#features" class="hover:text-indigo-600 transition-colors">Pricing</a>
                    <a href="https://github.com" target="_blank" class="hover:text-indigo-600 transition-colors flex items-center gap-1">Enterprise <span class="text-[9px] font-mono opacity-50">&rarr;</span></a>
                </nav>

                <div class="flex items-center gap-4">
                    <button 
                        onClick={onLaunchConsole}
                        class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all"
                    >
                        Start Free Trial
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section class="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="space-y-8 text-left">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 font-sans">
                        <span class="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                        Built for Independent Retailers
                    </span>
                    <h1 class="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-tight tracking-tight">
                        Launch your independent storefront in minutes.
                    </h1>
                    <p class="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg font-light">
                        All your custom storefronts, unified in one powerful ecosystem. VendorHood handles custom domain routing, bespoke brand identity injection, and split-ledger payment settlements automatically—so you can focus on building your brand.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 pt-2">
                        <button 
                            onClick={onLaunchConsole}
                            class="bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-lg shadow-lg hover:translate-y-[-1px] transition-all font-sans"
                        >
                            Start Free Trial
                        </button>
                        <button 
                            onClick={() => alert("Connecting you with our sales team...")}
                            class="bg-transparent hover:bg-zinc-100 text-zinc-800 border border-zinc-300 font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-lg text-center transition-colors font-sans"
                        >
                            Book a Demo
                        </button>
                    </div>
                </div>

                {/* Aesthetic Visual Canvas */}
                <div class="relative bg-zinc-900/5 border border-zinc-200 p-8 rounded-2xl shadow-sm space-y-6">
                    <div class="flex items-center justify-between border-b border-zinc-200 pb-4">
                        <div class="flex items-center gap-2">
                            <span class="h-3 w-3 rounded-full bg-rose-400"></span>
                            <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                            <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
                        </div>
                        <div class="text-[10px] text-zinc-400 font-mono">vendorhood.com/routing_matrix</div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
                            <div class="space-y-1">
                                <p class="text-[10px] font-mono text-zinc-400">DOMAIN RESOLVER</p>
                                <p class="text-xs font-bold font-mono text-indigo-600">bharat.vendorhood.com</p>
                            </div>
                            <span class="text-[9px] font-mono bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 uppercase">CSS Sourcing: Heritage Botanical</span>
                        </div>

                        <div class="bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
                            <div class="space-y-1">
                                <p class="text-[10px] font-mono text-zinc-400">CUSTOM ALIAS</p>
                                <p class="text-xs font-bold font-mono text-emerald-600">www.streetkicks.in</p>
                            </div>
                            <span class="text-[9px] font-mono bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-0.5 uppercase">CSS Sourcing: Swiss Grid</span>
                        </div>

                        <div class="bg-white border border-zinc-200 p-4 rounded-xl flex items-center justify-between shadow-xs">
                            <div class="space-y-1">
                                <p class="text-[10px] font-mono text-zinc-400">PAYMENT SETTLEMENT</p>
                                <div class="flex gap-3 text-[10px]">
                                    <span>Fee: <strong class="font-mono">8%</strong></span>
                                    <span>Payout: <strong class="font-mono">92%</strong></span>
                                </div>
                            </div>
                            <span class="text-[9px] font-mono bg-amber-50 border border-amber-100 text-amber-700 px-2 py-0.5 uppercase">Ledger isolated</span>
                        </div>
                    </div>
                    <div class="text-[11px] text-zinc-400 text-center leading-relaxed">
                        Real-time domain aliasing and visual theme mapping.
                    </div>
                </div>
            </section>

            {/* Core Features Grid */}
            <section id="features" class="bg-white border-t border-b border-zinc-200 py-24">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="max-w-xl text-left mb-16 space-y-3">
                        <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest">Platform Core</span>
                        <h2 class="text-3xl font-extrabold text-zinc-900 tracking-tight">Built for scale, designed for simplicity.</h2>
                        <p class="text-zinc-500 text-xs md:text-sm font-light leading-relaxed">
                            A complete suite of merchant tools to customize storefront presets, monitor order lists, and manage product collections.
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div class="space-y-4">
                            <div class="h-10 w-10 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                                01
                            </div>
                            <h3 class="font-bold text-zinc-900 text-base">Custom Domain Mapping</h3>
                            <p class="text-zinc-500 text-xs leading-relaxed font-light">
                                Connect your own domain or use a free subdomain mapping instantly. Our backend routes queries to isolated databases automatically.
                            </p>
                        </div>
                        <div class="space-y-4">
                            <div class="h-10 w-10 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
                                02
                            </div>
                            <h3 class="font-bold text-zinc-900 text-base">Bespoke Brand Layouts</h3>
                            <p class="text-zinc-500 text-xs leading-relaxed font-light">
                                Select styling layouts engineered to match your aesthetic. From clean editorial sand to neobrutalist yellow shoe grids.
                            </p>
                        </div>
                        <div class="space-y-4">
                            <div class="h-10 w-10 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-bold">
                                03
                            </div>
                            <h3 class="font-bold text-zinc-900 text-base">Direct Payment Split</h3>
                            <p class="text-zinc-500 text-xs leading-relaxed font-light">
                                Process credit card and local checkout transactions seamlessly. Gross sales settle directly to your vendor ledger with platform fees automatically calculated.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Architecture Details */}
            <section id="architecture" class="max-w-7xl mx-auto px-6 py-24">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div class="space-y-6">
                        <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">Platform Integrity</span>
                        <h2 class="text-4xl font-extrabold text-zinc-900 tracking-tight">Secure Multi-Tenant Cloud Architecture</h2>
                        <p class="text-zinc-500 text-sm font-light leading-relaxed">
                            Rather than sharing flat datasets, VendorHood enforces strong structural tenant boundaries. Every merchant operates in an isolated context, with dedicated catalogs, transaction ledgers, and payout logs.
                        </p>
                        
                        <div class="border-l-2 border-indigo-500 pl-4 py-1.5 space-y-2">
                            <p class="text-xs italic text-zinc-600 leading-relaxed font-light">
                                "The multi-tenant architecture was so clean I could run my premium cardamom farm and modern sneaker shop simultaneously without any data overlapping."
                            </p>
                            <span class="text-[10px] uppercase font-bold tracking-wider text-zinc-400 font-mono">Founding Merchant Partner</span>
                        </div>
                    </div>

                    <div class="border border-zinc-200 bg-white p-6 rounded-xl space-y-4 shadow-xs">
                        <h4 class="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2 font-mono">Merchant Lifecycle</h4>
                        <div class="space-y-3 text-[11px] leading-relaxed">
                            <div class="flex items-center gap-3 text-zinc-500">
                                <span class="bg-zinc-100 h-5 w-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] text-zinc-600">1</span>
                                <span>Register your merchant profile and link subdomains or domain aliases.</span>
                            </div>
                            <div class="flex items-center gap-3 text-zinc-500">
                                <span class="bg-zinc-100 h-5 w-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] text-zinc-600">2</span>
                                <span>Upload products, weights, variations, and active pricing.</span>
                            </div>
                            <div class="flex items-center gap-3 text-zinc-500">
                                <span class="bg-zinc-100 h-5 w-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] text-zinc-600">3</span>
                                <span>Select a layout preset to match your brand style (Minimalist, Editorial, Brutalist).</span>
                            </div>
                            <div class="flex items-center gap-3 text-zinc-500">
                                <span class="bg-zinc-100 h-5 w-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] text-zinc-600">4</span>
                                <span>Track customer checkouts and watch net shares settle dynamically.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shopify-like CTA Section */}
            <section class="bg-zinc-900 text-[#F8F9FA] py-24 text-center">
                <div class="max-w-2xl mx-auto px-6 space-y-8">
                    <h2 class="text-4xl font-extrabold uppercase tracking-tight">Ready to grow your brand?</h2>
                    <p class="text-zinc-400 text-xs md:text-sm font-light leading-relaxed max-w-md mx-auto">
                        Join thousands of independent retailers scaling their operations on VendorHood. Start your 14-day free trial today.
                    </p>
                    <button 
                        onClick={onLaunchConsole}
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-lg shadow-lg hover:scale-102 transition-transform"
                    >
                        Start Free Trial
                    </button>
                </div>
            </section>

            {/* Landing Footer */}
            <footer class="bg-white border-t border-zinc-200 py-16 text-zinc-400 text-xs">
                <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div class="flex items-center gap-3">
                        <div class="h-6 w-6 bg-zinc-900 rounded-md flex items-center justify-center font-black text-white text-[11px]">
                            VH
                        </div>
                        <span class="font-extrabold tracking-tight text-zinc-900 text-sm">VendorHood</span>
                    </div>
                    <p class="text-center md:text-right font-light">
                        &copy; 2026 VendorHood Retail SaaS Platforms. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
    );
}
