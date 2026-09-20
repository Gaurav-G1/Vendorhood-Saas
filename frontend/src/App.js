const { useState, useEffect, useMemo, useRef } = React;

        // Predefined Front-end Storefront Templates config (The "Layout Blueprints")
        const STOREFRONT_TEMPLATES = {
            1: {
                id: 1,
                name: "Studio Ivory Serif",
                desc: "Soft warm ivory backdrop, elegant serif titles, high letter-spacing uppercase menus. Luxury label feel.",
                bg: "bg-[#FCFAF8] text-stone-950 min-h-screen font-serif",
                header: "bg-[#FCFAF8] border-b border-stone-200 py-6 px-8 sticky top-0 z-10 flex justify-between items-center tracking-wider uppercase text-stone-900",
                card: "bg-white border border-stone-200 p-6 rounded-none hover:border-stone-950 transition-colors duration-300",
                btn: "w-full bg-stone-950 text-stone-50 hover:bg-stone-800 py-3 text-xs tracking-widest uppercase transition-colors duration-200 rounded-none",
                accent: "text-stone-500 font-sans text-xs tracking-wider uppercase",
                badge: "bg-stone-50 text-stone-800 text-[10px] uppercase font-sans tracking-widest px-2.5 py-1 border border-stone-200 rounded-none"
            },
            2: {
                id: 2,
                name: "Stark Dark Mono",
                desc: "Deep obsidian canvas, hairline charcoal borders, stark contrast layout. Restrained elegance.",
                bg: "bg-zinc-950 text-zinc-50 min-h-screen font-sans",
                header: "bg-zinc-900 border-b border-zinc-800/80 py-5 px-8 sticky top-0 z-10 flex justify-between items-center",
                card: "bg-zinc-900/50 border border-zinc-850 p-6 rounded-none hover:border-zinc-700 transition-colors duration-250",
                btn: "w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-200 py-3 rounded-none font-semibold text-xs tracking-widest uppercase transition-all duration-200",
                accent: "text-zinc-400 font-mono text-[10px] uppercase tracking-wider",
                badge: "bg-zinc-900 text-zinc-400 text-[10px] px-2.5 py-1 border border-zinc-800 rounded-none uppercase font-mono tracking-widest"
            },
            3: {
                id: 3,
                name: "Warm Editorial Sand",
                desc: "Soft oat/sand backdrop, deep espresso typography, clean grids, fine micro-borders.",
                bg: "bg-[#f5f2eb] text-[#1c1815] min-h-screen font-sans",
                header: "bg-[#ece7dd] border-b border-[#d8d0c0] py-6 px-8 sticky top-0 z-10 flex justify-between items-center",
                card: "bg-white border border-[#d8d0c0] p-6 rounded-none hover:border-[#1c1815] transition-all duration-300",
                btn: "w-full bg-[#1c1815] text-[#f5f2eb] hover:bg-[#322c26] py-3 rounded-none font-medium text-xs tracking-widest uppercase transition-colors duration-200",
                accent: "text-[#8a7a6e] font-sans text-xs tracking-wide",
                badge: "bg-[#ece7dd] text-[#1c1815] text-[10px] px-3 py-1 border border-[#d8d0c0] rounded-none uppercase tracking-widest"
            },
            4: {
                id: 4,
                name: "Stark Swiss Grid",
                desc: "Architectural grid alignment, heavy contrast typography, stark crimson highlights. Editorial strength.",
                bg: "bg-white text-zinc-950 min-h-screen font-sans",
                header: "bg-white border-b border-zinc-200 py-6 px-8 sticky top-0 z-10 flex justify-between items-center",
                card: "bg-white border-b border-r border-zinc-200 p-6 rounded-none hover:bg-zinc-50 transition-colors duration-150",
                btn: "w-full bg-zinc-950 hover:bg-zinc-800 text-white py-3 rounded-none font-bold text-xs tracking-widest uppercase transition-colors",
                accent: "text-red-600 font-mono text-[10px] uppercase tracking-wider font-semibold",
                badge: "bg-zinc-100 text-zinc-900 text-[10px] px-2.5 py-1 border border-zinc-250 rounded-none uppercase font-mono tracking-wide"
            },
            5: {
                id: 5,
                name: "Heritage Botanical",
                desc: "Olive/cream canvas, refined borders, organic curves. Crafted for luxury cosmetics and spices.",
                bg: "bg-[#FAF8F5] text-[#2B3B30] min-h-screen font-serif",
                header: "bg-[#FAF8F5] border-b border-[#E3DDD4] py-5 px-8 sticky top-0 z-10 flex justify-between items-center",
                card: "bg-white border border-[#E3DDD4] p-6 rounded-md hover:border-[#2B3B30] transition-all duration-300",
                btn: "w-full bg-[#2B3B30] hover:bg-[#3C5243] text-white py-3 rounded-none font-sans font-medium text-xs tracking-widest uppercase transition-colors duration-200",
                accent: "text-[#7A8E81] font-sans font-semibold text-[10px] uppercase tracking-wider",
                badge: "bg-[#EDF2EE] text-[#2B3B30] text-[10px] px-2.5 py-1 rounded-sm border border-[#D5DFD7]"
            }
        };

        // Initial Data to load into LocalStorage if not present
        const INITIAL_VENDORS = [
            { id: 'v1', name: 'TechPulse Core', subdomain: 'techpulse', customDomain: 'www.techpulse.io', templateId: 2, commissionRate: 5, logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60' },
            { id: 'v2', name: 'Flora & Herb Co.', subdomain: 'flora', customDomain: 'www.floraherb.com', templateId: 5, commissionRate: 7.5, logoUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=120&auto=format&fit=crop&q=60' },
            { id: 'v3', name: 'StreetKicks', subdomain: 'kicks', customDomain: 'www.streetkicks.in', templateId: 4, commissionRate: 10, logoUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=120&auto=format&fit=crop&q=60' },
            { id: 'v4', name: 'Bharat Bazaar', subdomain: 'bharat', customDomain: 'www.bharatbazaar.in', templateId: 3, commissionRate: 6, logoUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=120&auto=format&fit=crop&q=60' },
            { id: 'v5', name: 'Jaipur Silks', subdomain: 'jaipur', customDomain: 'www.jaipursilks.com', templateId: 1, commissionRate: 8, logoUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&auto=format&fit=crop&q=60' }
        ];

        const INITIAL_PRODUCTS = [
            // TechPulse products
            { id: 'p1', vendorId: 'v1', name: 'CyberWatch Pro', price: 29999, description: 'A futuristic smartwatch with neural health monitoring and holographic display.', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60', stock: 45 },
            { id: 'p2', vendorId: 'v1', name: 'PulseBuds ANC', price: 14999, description: 'Active noise-canceling wireless earbuds with ultra-low latency and spatial audio.', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', stock: 120 },
            { id: 'p3', vendorId: 'v1', name: 'Nexus Keyboard', price: 18900, description: 'Hot-swappable optical mechanical keyboard with full custom RGB lighting profiles.', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60', stock: 15 },
            
            // Flora & Herb products
            { id: 'p4', vendorId: 'v2', name: 'Organic Lavender Oil', price: 1200, description: '100% pure organic lavender essential oil for relaxation, sleep, and wellness.', imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60', stock: 75 },
            { id: 'p5', vendorId: 'v2', name: 'Eucalyptus Mist Spray', price: 850, description: 'Refreshing aromatherapy mist spray distilled from wild organic eucalyptus leaves.', imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60', stock: 60 },
            { id: 'p6', vendorId: 'v2', name: 'Organic Mint Balm', price: 450, description: 'Soothing mint-infused balm made of organic shea butter and real spearmint extract.', imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60', stock: 110 },
            
            // StreetKicks products
            { id: 'p7', vendorId: 'v3', name: "Air Jordan 1 'Chicago'", price: 18500, description: 'The iconic high-top classic. Full-grain leather, rubber cupsole, encapsulated Air cushioning.', imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60', hoverImageUrl: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=60', stock: 12, rating: 4.9, sizePreview: ['7', '8', '9', '10', '11'], isLimited: true },
            { id: 'p8', vendorId: 'v3', name: "Nike Dunk Low 'Panda'", price: 10500, description: 'Classic two-tone basketball silhouette. Clean black-and-white leather construction.', imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60', hoverImageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&auto=format&fit=crop&q=60', stock: 24, rating: 4.7, sizePreview: ['8', '9', '10'], isTrending: true },
            { id: 'p9', vendorId: 'v3', name: "Yeezy Boost 350 'Carbon'", price: 24500, description: 'Reengineered Primeknit upper, translucent monofilament side stripe, full-length Boost midsole.', imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&auto=format&fit=crop&q=60', hoverImageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=60', stock: 8, rating: 4.8, sizePreview: ['9', '10', '11'], isLimited: true },
            { id: 'p15', vendorId: 'v3', name: "Nike Air Max 90 'OG'", price: 13999, description: 'Stitched leather overlays, classic TPU panels, and visible Max Air cushioning.', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60', hoverImageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&auto=format&fit=crop&q=60', stock: 15, rating: 4.6, sizePreview: ['7', '8', '9', '10'], isTrending: true },
            { id: 'p16', vendorId: 'v3', name: "Kith Garment Dye Hoodie", price: 8200, description: '500 GSM heavyweight cotton fleece. Custom Kith classic logo embroidery at chest.', imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60', hoverImageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=60', stock: 30, rating: 4.9, sizePreview: ['S', 'M', 'L', 'XL'], isStreetwear: true },
            { id: 'p17', vendorId: 'v3', name: "StreetKicks Utility Cargo", price: 5500, description: 'Nylon ripstop cargo pants with water-resistant coating and drawcord adjustable cuffs.', imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60', hoverImageUrl: 'https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=500&auto=format&fit=crop&q=60', stock: 45, rating: 4.5, sizePreview: ['M', 'L', 'XL'], isStreetwear: true },

            // Bharat Bazaar spices products
            { id: 'p10', vendorId: 'v4', name: 'Pragati Turmeric Powder', price: 240, description: 'Bright, zesty heirloom turmeric containing over 5.2% curcumin. Perfect for immunity and lattes.', imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60', stock: 150, rating: 4.9, weight: '75g', origin: 'Sangli, Maharashtra', isBestSeller: true, cuisine: 'Indian' },
            { id: 'p11', vendorId: 'v4', name: 'Tellicherry Black Pepper', price: 380, description: 'Sun-dried vine-ripened black peppercorns with a bold, complex citrus and wood aroma.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60', stock: 80, rating: 4.8, weight: '100g', origin: 'Wayanad, Kerala', isBestSeller: true, cuisine: 'Indian' },
            { id: 'p12', vendorId: 'v4', name: 'Green Cardamom Pods', price: 450, description: 'Hand-harvested jumbo green cardamom pods containing essential aromatic sweet oils.', imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60', stock: 200, rating: 4.7, weight: '50g', origin: 'Idukki, Kerala', isBestSeller: false, cuisine: 'Desserts' },
            { id: 'p18', vendorId: 'v4', name: 'Kashmiri Saffron (Grade A)', price: 1450, description: 'Generations-farmed crimson stigma threads. Sourced directly from local Kashmiri growers.', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60', stock: 25, rating: 5.0, weight: '5g', origin: 'Pampore, Kashmir', isBestSeller: true, cuisine: 'Royal' },
            { id: 'p19', vendorId: 'v4', name: 'Guntur Red Chilli Powder', price: 210, description: 'High-heat, vibrant red chilli powder stone-ground to preserve deep pungent oils.', imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60', stock: 110, rating: 4.6, weight: '120g', origin: 'Guntur, Andhra Pradesh', isBestSeller: false, cuisine: 'Spicy' },
            { id: 'p20', vendorId: 'v4', name: 'Ceylon Cinnamon Quills', price: 390, description: 'Bespoke thin-shaved organic cinnamon quills featuring a sweet, delicate wood spice profile.', imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60', stock: 65, rating: 4.8, weight: '60g', origin: 'Kumily, Kerala', isBestSeller: false, cuisine: 'Baking' },

            // Jaipur Silks products
            { id: 'p13', vendorId: 'v5', name: 'Handcrafted Silk Saree', price: 4500, description: 'Pure Banarasi silk saree with gold zari border and intricate embroidery.', imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60', stock: 12 },
            { id: 'p14', vendorId: 'v5', name: 'Embroidered Kurta Set', price: 1850, description: 'Cotton ethnic kurta set with intricate hand embroidery.', imageUrl: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&auto=format&fit=crop&q=60', stock: 30 }
        ];

        const INITIAL_ORDERS = [
            { id: 'o1', vendorId: 'v1', customerName: 'Aarav Sharma', totalAmount: 44998, platformCommission: 2249.90, vendorShare: 42748.10, date: '2026-07-14', status: 'Delivered' },
            { id: 'o2', vendorId: 'v2', customerName: 'Priya Patel', totalAmount: 2050, platformCommission: 153.75, vendorShare: 1896.25, date: '2026-07-15', status: 'Pending' },
            { id: 'o3', vendorId: 'v3', customerName: 'Rajesh Kumar', totalAmount: 8500, platformCommission: 850.00, vendorShare: 7650.00, date: '2026-07-15', status: 'Return Requested' }
        ];

        // Core App Component
        function App() {
            // State initialization (falls back to INITIAL mock data if backend is offline)
            const [vendors, setVendors] = useState(INITIAL_VENDORS);
            const [products, setProducts] = useState(INITIAL_PRODUCTS);
            const [orders, setOrders] = useState(INITIAL_ORDERS);

            // Navigation State: 'admin' | 'vendor' | 'storefront'
            const [currentView, setCurrentView] = useState('landing');
            
            // Active Vendor Context for the Vendor Portal (Fake Login)
            const [activeVendorId, setActiveVendorId] = useState('v1');

            // Simulated Host Header for Tenant Resolution (used in storefront mode)
            const [simulatedHost, setSimulatedHost] = useState('techpulse.vendorhood.com');

            // Synchronize with Spring Boot Backend
            const refreshData = async () => {
                try {
                    const vRes = await fetch('http://localhost:8080/api/admin/vendors');
                    if (vRes.ok) {
                        const vData = await vRes.json();
                        setVendors(vData);
                    }
                    const pRes = await fetch('http://localhost:8080/api/admin/products');
                    if (pRes.ok) {
                        const pData = await pRes.json();
                        const formatted = pData.map(p => {
                            const vendorId = p.tenantId;
                            if (typeof p.sizePreview === 'string') {
                                return {
                                    ...p,
                                    vendorId,
                                    sizePreview: p.sizePreview.split(',').map(s => s.trim())
                                };
                            }
                            return { ...p, vendorId, sizePreview: p.sizePreview || [] };
                        });
                        setProducts(formatted);
                    }
                    const oRes = await fetch('http://localhost:8080/api/admin/orders');
                    if (oRes.ok) {
                        const oData = await oRes.json();
                        setOrders(oData);
                    }
                } catch (err) {
                    console.error("Backend fetch error: Please ensure your Spring Boot application is running on port 8080.", err);
                }
            };

            // Trigger fetch sync on mount and active vendor switch
            useEffect(() => {
                refreshData();
            }, []);

            useEffect(() => {
                refreshData();
            }, [activeVendorId]);

            // Tenant Resolution Logic (Simulating Host resolve)
            const resolvedTenant = useMemo(() => {
                // Find vendor that matches simulatedHost as subdomain or customDomain
                return vendors.find(v => {
                    const hostClean = simulatedHost.trim().toLowerCase();
                    const subdomainHost = `${v.subdomain}.vendorhood.com`.toLowerCase();
                    const customDomainClean = v.customDomain ? v.customDomain.toLowerCase() : '';
                    
                    return hostClean === subdomainHost || (customDomainClean && hostClean === customDomainClean);
                });
            }, [simulatedHost, vendors]);

            // CRUD Operations
            // 1. Vendor CRUD (Global platform admin)
            const addVendor = async (vendor) => {
                try {
                    const res = await fetch('http://localhost:8080/api/admin/vendors', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(vendor)
                    });
                    if (res.ok) {
                        const newVendor = await res.json();
                        await refreshData();
                        return newVendor;
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            const updateVendor = async (updated) => {
                try {
                    const res = await fetch('http://localhost:8080/api/admin/vendors', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updated)
                    });
                    if (res.ok) {
                        await refreshData();
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            const deleteVendor = async (id) => {
                try {
                    const res = await fetch(`http://localhost:8080/api/admin/vendors/${id}`, {
                        method: 'DELETE'
                    });
                    if (res.ok) {
                        await refreshData();
                        if (activeVendorId === id) {
                            const remaining = vendors.filter(v => v.id !== id);
                            if (remaining.length > 0) setActiveVendorId(remaining[0].id);
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            // 2. Product CRUD (Tenant scoped context)
            const addProduct = async (product) => {
                try {
                    const res = await fetch('http://localhost:8080/api/vendor/products', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-Tenant-ID': activeVendorId
                        },
                        body: JSON.stringify(product)
                    });
                    if (res.ok) {
                        const newProduct = await res.json();
                        await refreshData();
                        return newProduct;
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            const updateProduct = async (updated) => {
                try {
                    const res = await fetch('http://localhost:8080/api/vendor/products', {
                        method: 'PUT',
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-Tenant-ID': activeVendorId
                        },
                        body: JSON.stringify(updated)
                    });
                    if (res.ok) {
                        await refreshData();
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            const deleteProduct = async (id) => {
                try {
                    const res = await fetch(`http://localhost:8080/api/vendor/products/${id}`, {
                        method: 'DELETE',
                        headers: { 'X-Tenant-ID': activeVendorId }
                    });
                    if (res.ok) {
                        await refreshData();
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            // Process new order (splits checkout)
            const addOrder = async (order) => {
                try {
                    const res = await fetch('http://localhost:8080/api/storefront/orders', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'X-Tenant-ID': order.vendorId
                        },
                        body: JSON.stringify(order)
                    });
                    if (res.ok) {
                        await refreshData();
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            // Update order status (Vendor Console feature)
            const updateOrderStatus = async (orderId, newStatus) => {
                try {
                    const res = await fetch(`http://localhost:8080/api/vendor/orders/${orderId}/status?status=${newStatus}`, {
                        method: 'PUT',
                        headers: { 'X-Tenant-ID': activeVendorId }
                    });
                    if (res.ok) {
                        await refreshData();
                    }
                } catch (err) {
                    console.error(err);
                }
            };

            // Switch to storefront and set host simulation easily
            const navigateToStorefront = (vendor) => {
                const host = vendor.customDomain ? vendor.customDomain : `${vendor.subdomain}.vendorhood.com`;
                setSimulatedHost(host);
                setCurrentView('storefront');
            };


            return (
                <div class="min-h-screen bg-slate-950 flex flex-col pb-12">
                    
                    {/* --- SIMULATION CONTROL BAR --- */}
                    {currentView !== 'landing' && (
                    <div class="sticky top-0 z-50 glassmorphism border-b border-[#21232d]/80 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shadow-xl">
                        <div class="flex items-center gap-3">
                            <div class="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center font-black text-white text-lg tracking-wider shadow-lg shadow-indigo-500/20">
                                VH
                            </div>
                            <div>
                                <h1 class="text-base font-extrabold tracking-tight bg-gradient-to-r from-slate-50 to-slate-200 bg-clip-text text-transparent">VendorHood</h1>
                                <p class="text-[10px] text-indigo-400 font-mono tracking-widest uppercase">Multi-Tenant Simulator</p>
                            </div>
                        </div>

                        {/* Navigation Toggles */}
                        <div class="flex bg-slate-900/80 p-1 rounded-xl border border-slate-800/60 font-medium text-xs">
                            <button 
                                onClick={() => setCurrentView('landing')} 
                                class="px-3 py-2 rounded-lg flex items-center gap-1.5 text-slate-400 hover:text-slate-200"
                            >
                                Welcome Home
                            </button>
                            <button 
                                onClick={() => setCurrentView('admin')} 
                                class={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${currentView === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                <Icon name="settings" className="w-3.5 h-3.5" />
                                Platform Admin
                            </button>
                            <button 
                                onClick={() => setCurrentView('vendor')} 
                                class={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${currentView === 'vendor' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                <Icon name="store" className="w-3.5 h-3.5" />
                                Vendor Portal
                            </button>
                            <button 
                                onClick={() => setCurrentView('storefront')} 
                                class={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${currentView === 'storefront' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                            >
                                <Icon name="globe" className="w-3.5 h-3.5" />
                                Customer Storefront
                            </button>
                        </div>

                        {/* Storefront Host simulator dropdown */}
                        {currentView === 'storefront' ? (
                            <div class="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 animate-fade-in">
                                <span class="relative flex h-2 w-2">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span class="text-[10px] text-slate-400 font-mono">Host:</span>
                                <select 
                                    value={simulatedHost} 
                                    onChange={(e) => setSimulatedHost(e.target.value)} 
                                    class="bg-slate-950 text-indigo-300 font-mono text-xs focus:outline-none border-none cursor-pointer rounded"
                                >
                                    {vendors.map(v => (
                                        <optgroup label={v.name} key={v.id}>
                                            <option value={`${v.subdomain}.vendorhood.com`}>{v.subdomain}.vendorhood.com (Subdomain)</option>
                                            {v.customDomain && <option value={v.customDomain}>{v.customDomain} (Custom Domain)</option>}
                                        </optgroup>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div class="text-xs text-slate-400 font-mono bg-slate-900 border border-slate-800/50 rounded-xl px-4 py-2 flex items-center gap-2">
                                <Icon name="check" className="text-emerald-500 w-4 h-4" />
                                Data isolated centrally on shared schema (Spring Boot API: 8080)
                            </div>
                        )}
                    </div>
                    )}

                    {/* --- MAIN PAGE ROUTER & CONTAINER --- */}
                    <main class="flex-grow">
                        {currentView === 'landing' && (
                            <WelcomeLanding 
                                onLaunchConsole={() => setCurrentView('admin')} 
                            />
                        )}

                        {currentView === 'admin' && (
                            <PlatformAdmin 
                                vendors={vendors} 
                                products={products} 
                                orders={orders}
                                addVendor={addVendor} 
                                updateVendor={updateVendor} 
                                deleteVendor={deleteVendor} 
                                navigateToStore={navigateToStorefront}
                            />
                        )}

                        {currentView === 'vendor' && (
                            <VendorPortal 
                                vendors={vendors} 
                                products={products} 
                                orders={orders}
                                activeVendorId={activeVendorId} 
                                setActiveVendorId={setActiveVendorId} 
                                addProduct={addProduct} 
                                updateProduct={updateProduct} 
                                deleteProduct={deleteProduct} 
                                updateVendor={updateVendor}
                                navigateToStore={navigateToStorefront}
                                updateOrderStatus={updateOrderStatus}
                            />
                        )}

                        {currentView === 'storefront' && (
                            <CustomerStorefront 
                                vendor={resolvedTenant} 
                                products={products}
                                addOrder={addOrder}
                                simulatedHost={simulatedHost}
                                orders={orders}
                                updateOrderStatus={updateOrderStatus}
                                updateProduct={updateProduct}
                            />
                        )}
                    </main>

                </div>
            );
        }
