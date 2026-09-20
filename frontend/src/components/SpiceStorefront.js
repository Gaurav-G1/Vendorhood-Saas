const { useState, useEffect, useMemo, useRef } = React;

function SpiceStorefront({ vendor, products, wishlist, toggleWishlist, addToCart, setStorefrontTab, setSelectedProduct }) {
    const [selectedCuisine, setSelectedCuisine] = useState('All');
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    // Filter spices
    const spiceProducts = useMemo(() => {
        return products.filter(p => p.vendorId === vendor.id);
    }, [products, vendor.id]);

    const cuisines = ['All', 'Indian', 'Spicy', 'Desserts', 'Baking', 'Royal'];

    const filteredSpices = useMemo(() => {
        if (selectedCuisine === 'All') return spiceProducts;
        return spiceProducts.filter(p => p.cuisine === selectedCuisine);
    }, [spiceProducts, selectedCuisine]);

    const bestSellers = useMemo(() => {
        return spiceProducts.filter(p => p.isBestSeller);
    }, [spiceProducts]);

    return (
        <div class="bg-[#FAF7F2] text-stone-900 min-h-screen font-sans antialiased">
            
            {/* Hero Section */}
            <section class="relative w-full h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 bg-black/35 z-10"></div>
                <img 
                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1600&auto=format&fit=crop&q=80" 
                    alt="Heirloom spices on a rustic wooden table" 
                    class="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div class="relative max-w-4xl mx-auto px-6 text-center z-20 text-[#FAF7F2]">
                    <span class="text-xs uppercase tracking-widest text-[#E58F65] font-semibold">Single-Origin Spices</span>
                    <h1 class="text-4xl md:text-6xl font-serif mt-4 mb-8 leading-tight font-bold tracking-tight">
                        Pure. Heirloom. Stone-Ground Spices.
                    </h1>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={() => {
                                const el = document.getElementById('spice-shop');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            class="bg-[#5F6F52] hover:bg-[#4E5C43] text-[#FAF7F2] font-semibold text-xs tracking-widest uppercase px-8 py-3.5 border border-[#5F6F52] transition-colors rounded-none"
                        >
                            Explore Single Origin
                        </button>
                        <button 
                            onClick={() => {
                                const el = document.getElementById('best-sellers');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            class="bg-transparent hover:bg-[#FAF7F2]/10 text-[#FAF7F2] font-semibold text-xs tracking-widest uppercase px-8 py-3.5 border border-[#FAF7F2] transition-colors rounded-none"
                        >
                            View Best Sellers
                        </button>
                    </div>
                </div>
            </section>

            {/* Best Sellers Section */}
            <section id="best-sellers" class="max-w-7xl mx-auto px-6 py-20 border-b border-stone-200">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                    <div>
                        <span class="text-xs font-semibold text-[#5F6F52] uppercase tracking-widest">Customer Favorites</span>
                        <h2 class="text-3xl font-serif mt-2 font-bold text-stone-900">Our Best Sellers</h2>
                    </div>
                    <p class="text-stone-500 text-sm max-w-md font-light leading-relaxed">
                        Handpicked, small-batch spices freshly ground to unlock maximum flavor and preserve essential culinary oils.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {bestSellers.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => setSelectedProduct(p)}
                            class="bg-white border border-stone-200 p-5 rounded-none cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                        >
                            <div>
                                <div class="relative overflow-hidden mb-4 bg-[#F5F5F0] p-4 flex items-center justify-center">
                                    <img src={p.imageUrl} alt={p.name} class="w-full h-56 object-cover rounded-none transition-transform duration-500 group-hover:scale-105" />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                                        class="absolute top-3 right-3 h-8 w-8 bg-white text-stone-900 rounded-none flex items-center justify-center border border-stone-200 hover:scale-105 transition-transform"
                                    >
                                        <svg class={`w-4 h-4 ${wishlist.includes(p.id) ? 'text-rose-600 fill-current' : 'text-stone-400'}`} viewBox="0 0 24 24" fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex justify-between items-start gap-2 mb-1">
                                    <h3 class="font-serif font-bold text-base text-stone-900">{p.name}</h3>
                                    <span class="font-mono text-sm font-semibold text-[#D07A3E]">₹{p.price}</span>
                                </div>
                                <div class="text-[10px] uppercase tracking-wider text-stone-400 font-medium mb-3">
                                    {p.origin} • {p.weight}
                                </div>
                                <p class="text-stone-500 text-xs font-light leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                                class="w-full bg-stone-900 hover:bg-[#5F6F52] text-[#FAF7F2] py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none border border-stone-900"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Shop by Cuisine and Full Catalog */}
            <section id="spice-shop" class="max-w-7xl mx-auto px-6 py-20 border-b border-stone-200">
                <div class="text-center mb-12">
                    <span class="text-xs font-semibold text-[#5F6F52] uppercase tracking-widest">Flavors of the World</span>
                    <h2 class="text-3xl font-serif mt-2 font-bold text-stone-900">Shop by Cuisine</h2>
                    
                    {/* Cuisine Tabs */}
                    <div class="flex flex-wrap justify-center gap-2 mt-8">
                        {cuisines.map(c => (
                            <button
                                key={c}
                                onClick={() => setSelectedCuisine(c)}
                                class={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-none transition-colors border ${
                                    selectedCuisine === c 
                                        ? 'bg-[#5F6F52] border-[#5F6F52] text-[#FAF7F2]' 
                                        : 'bg-transparent border-stone-300 text-stone-600 hover:border-[#5F6F52] hover:text-[#5F6F52]'
                                }`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {filteredSpices.map(p => (
                        <div 
                            key={p.id} 
                            onClick={() => setSelectedProduct(p)}
                            class="bg-white border border-stone-200 p-5 rounded-none cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                        >
                            <div>
                                <div class="relative overflow-hidden mb-4 bg-[#F5F5F0] p-4 flex items-center justify-center">
                                    <img src={p.imageUrl} alt={p.name} class="w-full h-56 object-cover rounded-none transition-transform duration-500 group-hover:scale-105" />
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                                        class="absolute top-3 right-3 h-8 w-8 bg-white text-stone-900 rounded-none flex items-center justify-center border border-stone-200 hover:scale-105 transition-transform"
                                    >
                                        <svg class={`w-4 h-4 ${wishlist.includes(p.id) ? 'text-rose-600 fill-current' : 'text-stone-400'}`} viewBox="0 0 24 24" fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="flex justify-between items-start gap-2 mb-1">
                                    <h3 class="font-serif font-bold text-base text-stone-900">{p.name}</h3>
                                    <span class="font-mono text-sm font-semibold text-[#D07A3E]">₹{p.price}</span>
                                </div>
                                <div class="text-[10px] uppercase tracking-wider text-stone-400 font-medium mb-3">
                                    {p.origin} • {p.weight}
                                </div>
                                <p class="text-stone-500 text-xs font-light leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                                class="w-full bg-stone-900 hover:bg-[#5F6F52] text-[#FAF7F2] py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-none border border-stone-900"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recipe Inspiration Section */}
            <section class="bg-[#EDE9E1] py-20 border-b border-stone-200">
                <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div class="relative h-[550px] overflow-hidden border border-stone-300">
                        <img 
                            src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80" 
                            alt="Brewing spiced herbal chai" 
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div class="space-y-6">
                        <span class="text-xs font-semibold text-[#5F6F52] uppercase tracking-widest font-mono">Kitchen Inspiration</span>
                        <h2 class="text-4xl font-serif font-bold text-stone-900">Traditional Spiced Masala Chai</h2>
                        <p class="text-stone-600 text-sm leading-relaxed font-light">
                            Unlock the warming therapeutic notes of true green cardamom, cloves, and premium Ceylon cinnamon in this traditional morning brew.
                        </p>
                        
                        <div class="space-y-3 border-t border-stone-300 pt-6">
                            <h4 class="font-serif font-bold text-lg">Ingredients Needed:</h4>
                            <ul class="text-xs text-stone-700 space-y-2 list-disc pl-5 font-mono">
                                <li>3 Green Cardamom Pods (Green, Idukki Kerala)</li>
                                <li>2 Cloves (Whole, Kanyakumari)</li>
                                <li>1 piece Ceylon Cinnamon Quill (Whole, Kumily Kerala)</li>
                                <li>1 cup fresh Water & 1 cup organic whole Milk</li>
                                <li>2 tsp black tea leaves & 1 tsp organic honey</li>
                            </ul>
                        </div>

                        <div class="pt-4">
                            <button 
                                onClick={() => alert("Chai recipe details printed to console!")}
                                class="bg-[#5F6F52] hover:bg-[#4E5C43] text-[#FAF7F2] font-semibold text-xs tracking-widest uppercase px-6 py-3.5 transition-colors rounded-none"
                            >
                                Read Complete Instructions
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section class="max-w-7xl mx-auto px-6 py-20 border-b border-stone-200">
                <div class="text-center mb-16">
                    <span class="text-xs font-semibold text-[#5F6F52] uppercase tracking-widest">Shared Experiences</span>
                    <h2 class="text-3xl font-serif mt-2 font-bold text-stone-900">Customer Testimonials</h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="bg-white border border-stone-200 p-8 rounded-none flex flex-col justify-between">
                        <p class="text-stone-600 text-sm leading-relaxed font-light italic mb-6">
                            "The Pragati Turmeric is on another level. You can immediately smell the high curcumin content. My golden milk lattes have never tasted this vibrant. Saffron packaging is gorgeous too."
                        </p>
                        <div>
                            <div class="font-serif font-bold text-sm text-stone-900">Priya Patel</div>
                            <div class="text-[10px] text-stone-400 font-mono mt-1">Verified Buyer • Mumbai</div>
                        </div>
                    </div>
                    <div class="bg-white border border-stone-200 p-8 rounded-none flex flex-col justify-between">
                        <p class="text-stone-600 text-sm leading-relaxed font-light italic mb-6">
                            "Finding true, thin-skinned Ceylon cinnamon quills in India is surprisingly difficult. Bharat Bazaar's spices are fresh, fragrant, and ethically sourced. The difference in my baking is immense."
                        </p>
                        <div>
                            <div class="font-serif font-bold text-sm text-stone-900">Aarav Sharma</div>
                            <div class="text-[10px] text-stone-400 font-mono mt-1">Verified Buyer • Delhi</div>
                        </div>
                    </div>
                    <div class="bg-white border border-stone-200 p-8 rounded-none flex flex-col justify-between">
                        <p class="text-stone-600 text-sm leading-relaxed font-light italic mb-6">
                            "Outstanding single-origin cardamom. Extremely fresh pods, packed with sweet aromatic oils. Shipping was fast, and the split settlement ledger was transparent. Merchant updates were constant."
                        </p>
                        <div>
                            <div class="font-serif font-bold text-sm text-stone-900">Rajesh Kumar</div>
                            <div class="text-[10px] text-stone-400 font-mono mt-1">Verified Buyer • Bangalore</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instagram Gallery */}
            <section class="max-w-7xl mx-auto px-6 py-20 border-b border-stone-200">
                <div class="text-center mb-12">
                    <span class="text-xs font-semibold text-[#5F6F52] uppercase tracking-widest">Sourced with Pride</span>
                    <h2 class="text-3xl font-serif mt-2 font-bold text-stone-900">Follow the Journey</h2>
                    <p class="text-stone-500 text-xs mt-2 font-mono">@bharatbazaar.heirloom</p>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="relative overflow-hidden group h-64 border border-stone-200">
                        <img src="https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80" alt="Spice farming" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    </div>
                    <div class="relative overflow-hidden group h-64 border border-stone-200">
                        <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80" alt="Saffron sorting" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    </div>
                    <div class="relative overflow-hidden group h-64 border border-stone-200">
                        <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=80" alt="Baking spices" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    </div>
                    <div class="relative overflow-hidden group h-64 border border-stone-200">
                        <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80" alt="Basmati harvest" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section class="bg-[#F5F2EB] py-20">
                <div class="max-w-2xl mx-auto px-6 text-center">
                    <span class="text-xs font-semibold text-[#5F6F52] uppercase tracking-widest font-mono">Stay Connected</span>
                    <h2 class="text-3xl font-serif font-bold text-stone-900 mt-2 mb-4">Subscribe to Flavor Notes</h2>
                    <p class="text-stone-500 text-xs font-light leading-relaxed mb-8">
                        Get monthly updates on heirloom spice harvests, seasonal recipes, and exclusive access to limited single-origin batches.
                    </p>

                    {subscribed ? (
                        <p class="text-[#5F6F52] text-xs font-mono font-bold">✓ Thank you for subscribing. We will write to you soon!</p>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }} class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input 
                                type="email" 
                                required
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="flex-grow bg-white border border-stone-300 px-4 py-3 text-xs text-stone-900 focus:outline-none focus:border-[#5F6F52] rounded-none font-sans"
                            />
                            <button 
                                type="submit" 
                                class="bg-[#5F6F52] hover:bg-[#4E5C43] text-[#FAF7F2] font-semibold text-xs tracking-widest uppercase px-6 py-3 transition-colors rounded-none border border-[#5F6F52]"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* Detailed Footer */}
            <footer class="bg-stone-900 text-stone-400 py-16 border-t border-stone-850">
                <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs leading-relaxed">
                    <div class="space-y-4">
                        <h4 class="font-serif text-[#FAF7F2] font-bold text-base">{vendor.name}</h4>
                        <p class="font-light">
                            Cost-aligned multi-tenant framework empowering smallholder farming collectives with direct direct-to-consumer digital tools.
                        </p>
                        <p class="font-mono text-[9px] uppercase tracking-widest text-[#E58F65]">
                            Simulated Host: {vendor.subdomain}.vendorhood.com
                        </p>
                    </div>
                    <div>
                        <h5 class="text-[#FAF7F2] font-bold uppercase tracking-wider mb-4 font-mono">Sourcing Directory</h5>
                        <ul class="space-y-2">
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Heirloom Turmeric (Sangli)</a></li>
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Tellicherry Peppercorns (Wayanad)</a></li>
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Grade A Saffron (Pampore)</a></li>
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Ceylon Cinnamon (Kumily)</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="text-[#FAF7F2] font-bold uppercase tracking-wider mb-4 font-mono">Company</h5>
                        <ul class="space-y-2">
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Direct Sourcing Protocol</a></li>
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Farming Collectives</a></li>
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Impact Reports</a></li>
                            <li><a href="#" class="hover:text-[#FAF7F2] transition-colors">Contact Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 class="text-[#FAF7F2] font-bold uppercase tracking-wider mb-4 font-mono">Platform Integration</h5>
                        <ul class="space-y-2 text-stone-500 font-mono">
                            <li>SaaS Discriminator: <code>tenant_id: 'v4'</code></li>
                            <li>Settlement commission: {vendor.commissionRate}% Gross</li>
                            <li>Data Boundary: cent-scoped JPA RLS</li>
                            <li>Fulfillment Model: post-payment dispatch</li>
                        </ul>
                    </div>
                </div>
                <div class="max-w-7xl mx-auto px-6 border-t border-stone-800 mt-12 pt-8 text-center text-[10px] text-stone-500">
                    &copy; 2026 Bharat Bazaar Heirloom. Designed and implemented dynamically under the VendorHood Template-Injection Engine. All Rights Reserved.
                </div>
            </footer>

        </div>
    );
}
