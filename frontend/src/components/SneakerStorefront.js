const { useState, useEffect, useMemo, useRef } = React;

function SneakerStorefront({ vendor, products, wishlist, toggleWishlist, addToCart, setStorefrontTab, setSelectedProduct, loggedInCustomer, setShowLoginModal, setShowCart }) {
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // Filter products
    const kicksProducts = useMemo(() => {
        return products.filter(p => p.vendorId === vendor.id);
    }, [products, vendor.id]);

    const trendingSneakers = useMemo(() => {
        return kicksProducts.filter(p => p.isTrending);
    }, [kicksProducts]);

    const limitedDrops = useMemo(() => {
        return kicksProducts.filter(p => p.isLimited);
    }, [kicksProducts]);

    const streetwearPicks = useMemo(() => {
        return kicksProducts.filter(p => p.isStreetwear);
    }, [kicksProducts]);

    return (
        <div class="bg-white text-zinc-900 min-h-screen font-sans antialiased">
            
            {/* Mega-menu style Navigation Header */}
            <div class="border-b-4 border-zinc-950 py-4 px-6 text-center text-xs uppercase font-extrabold tracking-widest bg-[#FFDE00] text-zinc-950 font-mono shadow-[0_4px_0_0_rgba(0,0,0,1)] z-10 relative">
                ⚡ STREETKICKS AUTHENTIC SELECTION • FAST TRACK SHIPMENT SECURED ⚡
            </div>

            {/* Custom Editorial Hero */}
            <section class="relative w-full h-[85vh] min-h-[600px] overflow-hidden flex items-center bg-zinc-100 border-b-4 border-zinc-950">
                <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1600&auto=format&fit=crop&q=80" 
                    alt="Cinematic Jordan Retro" 
                    class="absolute inset-0 w-full h-full object-cover object-right md:object-center"
                />
                
                <div class="relative max-w-7xl mx-auto px-8 w-full z-20 text-white text-left space-y-6">
                    <span class="inline-block text-xs font-black uppercase tracking-widest text-zinc-950 bg-[#FFDE00] px-4 py-1.5 border-2 border-zinc-950 rotate-[-2deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Now Live</span>
                    <h1 class="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none max-w-2xl text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                        SNEAKERS FOR THE CULTURE.
                    </h1>
                    <p class="text-xs md:text-sm font-medium tracking-wide max-w-sm text-zinc-300">
                        Iconic silhouettes. Premium leather. Stitched heritage. Curated for collectors and daily runners alike.
                    </p>
                    <div class="flex gap-4 pt-2">
                        <button 
                            onClick={() => {
                                const el = document.getElementById('trending-sneakers');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            class="bg-[#E50914] hover:bg-[#FFDE00] hover:text-zinc-950 text-white hover:border-zinc-950 text-xs font-extrabold tracking-widest uppercase px-8 py-4 transition-all rounded-none border-2 border-zinc-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Shop Footwear
                        </button>
                        <button 
                            onClick={() => {
                                const el = document.getElementById('streetwear-picks');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            class="bg-transparent hover:bg-white text-white hover:text-zinc-950 text-xs font-bold tracking-widest uppercase px-8 py-4 border-2 border-white transition-all rounded-none"
                        >
                            Shop Apparel
                        </button>
                    </div>
                </div>
            </section>

            {/* Popular Brands Quick Filter Grid */}
            <section class="max-w-7xl mx-auto px-6 py-12 border-b-2 border-zinc-950">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {['Jordan Retro', 'Nike Sportswear', 'Adidas Originals', 'Nike ACG Trail'].map(brand => (
                        <div key={brand} class="border-2 border-zinc-950 bg-white py-6 hover:bg-[#FFDE00] cursor-pointer transition-all duration-200 uppercase tracking-widest text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]">
                            {brand} &rarr;
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Sneakers Section - Asymmetric Magazine Grid */}
            <section id="trending-sneakers" class="max-w-7xl mx-auto px-6 py-20 border-b-2 border-zinc-950">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div>
                        <span class="inline-block text-[10px] font-black text-zinc-950 bg-[#FFDE00] px-2.5 py-1 border border-zinc-950 uppercase tracking-widest rotate-[-1deg]">Selected Footwear</span>
                        <h2 class="text-4xl font-black uppercase tracking-tight mt-3">Trending Sneakers</h2>
                    </div>
                    <p class="text-zinc-500 text-xs font-medium max-w-sm leading-relaxed">
                        The highest velocity silhouettes in the community. Stitched overlays, responsive cushioning, and timeless heritage.
                    </p>
                </div>

                {/* Asymmetric layout grid */}
                <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    
                    {/* Highlighted item occupying double grid width */}
                    {trendingSneakers.length > 0 && (
                        <div 
                            onClick={() => setSelectedProduct(trendingSneakers[0])}
                            class="md:col-span-8 bg-white border-4 border-zinc-950 p-8 rounded-none cursor-pointer hover:border-zinc-950 transition-all duration-300 flex flex-col md:flex-row justify-between gap-8 group shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(255,222,0,1)]"
                            onMouseEnter={() => setHoveredProductId(trendingSneakers[0].id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div class="flex-grow flex flex-col justify-between max-w-md">
                                <div class="space-y-4">
                                    <span class="inline-block text-[10px] font-black text-zinc-900 bg-[#FFDE00] border-2 border-zinc-950 px-3 py-1 uppercase tracking-wider rotate-[-1deg] self-start w-fit">Grail Drop</span>
                                    <h3 class="text-3xl font-black uppercase tracking-tight text-zinc-900">{trendingSneakers[0].name}</h3>
                                    <p class="text-zinc-500 text-xs font-medium leading-relaxed">{trendingSneakers[0].description}</p>
                                    
                                    {/* Size preview */}
                                    <div class="space-y-2 pt-2">
                                        <div class="text-[9px] uppercase tracking-widest text-zinc-400 font-bold font-mono">Available Sizes (UK)</div>
                                        <div class="flex flex-wrap gap-1.5">
                                            {trendingSneakers[0].sizePreview.map(sz => (
                                                <span key={sz} class="bg-white border-2 border-zinc-950 hover:bg-[#FFDE00] text-[10px] px-2.5 py-1 font-mono transition-colors font-bold">{sz}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div class="pt-6">
                                    <div class="font-mono text-xl font-black mb-3">₹{trendingSneakers[0].price}</div>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); addToCart(trendingSneakers[0]); }}
                                        class="bg-zinc-950 hover:bg-[#FFDE00] hover:text-zinc-950 text-white py-3 text-xs font-black tracking-widest uppercase transition-colors rounded-none border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                            
                            <div class="relative overflow-hidden w-full md:w-[450px] h-[350px] bg-white flex items-center justify-center border-2 border-zinc-950">
                                <img 
                                    src={hoveredProductId === trendingSneakers[0].id && trendingSneakers[0].hoverImageUrl ? trendingSneakers[0].hoverImageUrl : trendingSneakers[0].imageUrl} 
                                    alt={trendingSneakers[0].name} 
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                />
                                <button 
                                    onClick={(e) => { e.stopPropagation(); toggleWishlist(trendingSneakers[0].id); }}
                                    class="absolute top-4 right-4 h-9 w-9 bg-white text-zinc-900 rounded-full flex items-center justify-center border-2 border-zinc-950 hover:scale-105 transition-transform"
                                >
                                    <svg class={`w-4.5 h-4.5 ${wishlist.includes(trendingSneakers[0].id) ? 'text-rose-600 fill-current' : 'text-zinc-400'}`} viewBox="0 0 24 24" fill={wishlist.includes(trendingSneakers[0].id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Standard items in grid */}
                    {trendingSneakers.slice(1).map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => setSelectedProduct(p)}
                            class="md:col-span-4 bg-white border-4 border-zinc-950 p-6 rounded-none cursor-pointer transition-all duration-300 flex flex-col justify-between group shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[9px_9px_0px_0px_rgba(255,222,0,1)]"
                            onMouseEnter={() => setHoveredProductId(p.id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div>
                                <div class="relative overflow-hidden mb-4 bg-white h-60 flex items-center justify-center border-2 border-zinc-950">
                                    <img 
                                        src={hoveredProductId === p.id && p.hoverImageUrl ? p.hoverImageUrl : p.imageUrl} 
                                        alt={p.name} 
                                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                    />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                                        class="absolute top-3 right-3 h-8 w-8 bg-white text-zinc-900 rounded-full flex items-center justify-center border border-zinc-200 hover:scale-105 transition-transform"
                                    >
                                        <svg class={`w-4.5 h-4.5 ${wishlist.includes(p.id) ? 'text-rose-600 fill-current' : 'text-zinc-400'}`} viewBox="0 0 24 24" fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex justify-between items-start gap-2 mb-1">
                                    <h3 class="font-black uppercase tracking-tight text-sm text-zinc-900">{p.name}</h3>
                                    <span class="font-mono text-xs font-black text-zinc-600">₹{p.price}</span>
                                </div>
                                
                                <div class="space-y-1.5 pt-2 mb-4">
                                    <div class="flex flex-wrap gap-1">
                                        {p.sizePreview.map(sz => (
                                            <span key={sz} class="bg-white border-2 border-zinc-950 text-[8px] px-1.5 py-0.5 font-mono font-semibold">{sz}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                                class="w-full bg-zinc-950 hover:bg-[#FFDE00] hover:text-zinc-950 text-white py-2.5 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-none border-2 border-zinc-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                                Add to Bag
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Limited Drops Section */}
            <section class="bg-zinc-50 py-20 border-b border-zinc-200">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="text-center mb-16">
                        <span class="text-xs font-bold text-[#E50914] uppercase tracking-widest">Restricted Allocations</span>
                        <h2 class="text-4xl font-black uppercase tracking-tight mt-1">Limited Drops</h2>
                        <p class="text-zinc-500 text-xs mt-2">Allocated stock updates dynamically on transactional checkout.</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {limitedDrops.map(p => (
                            <div 
                                key={p.id} 
                                onClick={() => setSelectedProduct(p)}
                                class="bg-white border border-zinc-200 p-6 rounded-none cursor-pointer hover:border-zinc-950 transition-all duration-300 flex flex-col justify-between group shadow-sm"
                                onMouseEnter={() => setHoveredProductId(p.id)}
                                onMouseLeave={() => setHoveredProductId(null)}
                            >
                                <div class="space-y-4">
                                    <div class="relative overflow-hidden bg-zinc-50 h-64 flex items-center justify-center border border-zinc-100">
                                        <img 
                                            src={hoveredProductId === p.id && p.hoverImageUrl ? p.hoverImageUrl : p.imageUrl} 
                                            alt={p.name} 
                                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                        />
                                        <span class="absolute top-3 left-3 bg-[#E50914] text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5">
                                            Only {p.stock} Pairs Left
                                        </span>
                                    </div>
                                    <div class="flex justify-between items-start gap-2">
                                        <h3 class="font-black uppercase tracking-tight text-base text-zinc-900">{p.name}</h3>
                                        <span class="font-mono text-sm font-black text-[#E50914]">₹{p.price}</span>
                                    </div>
                                    <p class="text-zinc-500 text-xs font-medium leading-relaxed line-clamp-2">{p.description}</p>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                                    class="w-full bg-zinc-950 hover:bg-[#E50914] text-white py-3 mt-6 text-xs font-bold tracking-widest uppercase transition-colors rounded-none"
                                >
                                    Secure Pair
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Streetwear Picks Section */}
            <section id="streetwear-picks" class="max-w-7xl mx-auto px-6 py-20 border-b border-zinc-200">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div>
                        <span class="text-xs font-bold text-zinc-900 uppercase tracking-widest">Heavyweight Basics</span>
                        <h2 class="text-4xl font-black uppercase tracking-tight mt-1">Streetwear Picks</h2>
                    </div>
                    <p class="text-zinc-500 text-xs font-medium max-w-sm leading-relaxed">
                        Curated apparel cut from premium cotton weights, featuring minimal logos, double-needle stitching, and custom dye treatments.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {streetwearPicks.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => setSelectedProduct(p)}
                            class="bg-zinc-50 border border-zinc-150 p-6 rounded-none cursor-pointer hover:border-zinc-950 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 group shadow-sm"
                            onMouseEnter={() => setHoveredProductId(p.id)}
                            onMouseLeave={() => setHoveredProductId(null)}
                        >
                            <div class="space-y-4 max-w-xs">
                                <span class="text-[9px] font-bold uppercase tracking-widest text-zinc-500">Premium Fit</span>
                                <h3 class="text-2xl font-black uppercase tracking-tight text-zinc-900">{p.name}</h3>
                                <p class="text-zinc-500 text-xs font-medium leading-relaxed line-clamp-3">{p.description}</p>
                                <div class="font-mono text-base font-bold text-zinc-700">₹{p.price}</div>
                                
                                <button 
                                    onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                                    class="bg-zinc-950 hover:bg-[#E50914] text-white text-xs font-bold tracking-widest uppercase px-6 py-2.5 transition-colors rounded-none"
                                >
                                    Add to Bag
                                </button>
                            </div>
                            
                            <div class="relative overflow-hidden w-full md:w-64 h-64 bg-white border border-zinc-150">
                                <img 
                                    src={hoveredProductId === p.id && p.hoverImageUrl ? p.hoverImageUrl : p.imageUrl} 
                                    alt={p.name} 
                                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section class="bg-zinc-950 text-white py-20">
                <div class="max-w-2xl mx-auto px-6 text-center space-y-6">
                    <span class="text-xs font-bold uppercase tracking-widest text-[#E50914] font-mono">Join the Roster</span>
                    <h2 class="text-4xl font-black uppercase tracking-tight">Access Early Drops</h2>
                    <p class="text-zinc-400 text-xs font-medium max-w-sm mx-auto leading-relaxed">
                        Sign up to receive sms notifications on limited restocks, Kith collection pre-releases, and seasonal store alerts.
                    </p>

                    {subscribed ? (
                        <p class="text-[#E50914] text-xs font-mono font-bold">✓ Verified registration. Welcome to the roster.</p>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input 
                                type="email" 
                                required
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="flex-grow bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914] rounded-none font-sans"
                            />
                            <button 
                                type="submit" 
                                class="bg-[#E50914] hover:bg-[#c90812] text-white font-bold text-xs tracking-widest uppercase px-6 py-3 transition-colors rounded-none border border-[#E50914]"
                            >
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Detailed Editorial Footer */}
            <footer class="bg-white text-zinc-500 py-16 border-t border-zinc-200 text-xs">
                <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 leading-relaxed">
                    <div class="space-y-4">
                        <h4 class="font-black text-base text-zinc-900 uppercase tracking-tight">{vendor.name}</h4>
                        <p class="font-medium text-zinc-400">
                            Independent athletic label and multi-tenant SaaS storefront crafting technical performance runners and structured heavyweight apparel.
                        </p>
                        <p class="font-mono text-[9px] uppercase tracking-widest text-zinc-400">
                            Domain: kicks.vendorhood.com
                        </p>
                    </div>
                    <div>
                        <h5 class="text-zinc-900 font-bold uppercase tracking-wider mb-4 font-mono">Collections</h5>
                        <ul class="space-y-2 font-medium">
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Jordan Retro High</a></li>
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Nike Dunk Lows</a></li>
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Yeezy Boost 350</a></li>
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Fleece Loungewear</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="text-zinc-900 font-bold uppercase tracking-wider mb-4 font-mono">Roster Information</h5>
                        <ul class="space-y-2 font-medium">
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Limited Drop Schedule</a></li>
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Return Policy (SaaS Gateway)</a></li>
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Ledger Dispatches</a></li>
                            <li><a href="#" class="hover:text-zinc-900 transition-colors">Platform Inquiries</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="text-zinc-900 font-bold uppercase tracking-wider mb-4 font-mono">SaaS Spec Context</h5>
                        <ul class="space-y-2 text-zinc-400 font-mono text-[10px]">
                            <li>Database Key: <code>tenant_id: 'v3'</code></li>
                            <li>Monetization: {vendor.commissionRate}% Gross Settlement</li>
                            <li>Context Binding: domain_alias headers</li>
                            <li>Gateway Split: Platform vs net merchant ledger</li>
                        </ul>
                    </div>
                </div>
                <div class="max-w-7xl mx-auto px-6 border-t border-zinc-200 mt-12 pt-8 text-center text-[10px] text-zinc-400">
                    &copy; 2026 StreetKicks Co. Powered dynamically by the VendorHood Layout Blueprint Engine. All rights reserved.
                </div>
            </footer>

        </div>
    );
}
