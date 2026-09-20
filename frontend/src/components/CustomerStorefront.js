const { useState, useEffect, useMemo, useRef } = React;

        function CustomerStorefront({ vendor, products, addOrder, simulatedHost, orders, updateOrderStatus, updateProduct }) {
            const [cart, setCart] = useState([]);
            const [showCart, setShowCart] = useState(false);
            const [showCheckoutModal, setShowCheckoutModal] = useState(false);
            const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });
            const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

            // Customer POV state hooks
            const [storefrontTab, setStorefrontTab] = useState('catalog'); // 'catalog' | 'portal'
            const [searchQuery, setSearchQuery] = useState('');
            const [selectedCategory, setSelectedCategory] = useState('All');
            const [selectedProduct, setSelectedProduct] = useState(null); // Product details modal
            const [portalNameInput, setPortalNameInput] = useState('');
            const [portalSearched, setPortalSearched] = useState(false);
            const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });

            // Wishlist state (persists per store in localstorage)
            const [wishlist, setWishlist] = useState(() => {
                const local = localStorage.getItem(`vendorhood_wishlist_${vendor.id}`);
                return local ? JSON.parse(local) : [];
            });
            const [wishlistOnly, setWishlistOnly] = useState(false);

            // Coupon state hooks
            const [couponInput, setCouponInput] = useState('');
            const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'WELCOME10', discountPercent: 10 }
            const [couponError, setCouponError] = useState('');

            // Customer Login state hooks
            const [loggedInCustomer, setLoggedInCustomer] = useState(() => {
                const local = localStorage.getItem('vendorhood_logged_in_customer');
                return local ? JSON.parse(local) : null;
            });
            const [showLoginModal, setShowLoginModal] = useState(false);
            const [loginForm, setLoginForm] = useState({ name: '', email: '' });

            // Sync wishlist to localStorage whenever it changes
            useEffect(() => {
                localStorage.setItem(`vendorhood_wishlist_${vendor.id}`, JSON.stringify(wishlist));
            }, [wishlist, vendor.id]);

            // Auto-fill form and history if customer logged in
            useEffect(() => {
                if (loggedInCustomer) {
                    setCheckoutForm({ name: loggedInCustomer.name, email: loggedInCustomer.email });
                    setPortalNameInput(loggedInCustomer.name);
                    setPortalSearched(true);
                } else {
                    setCheckoutForm({ name: '', email: '' });
                    setPortalNameInput('');
                    setPortalSearched(false);
                }
            }, [loggedInCustomer]);

            // Fetch the layout configuration based on the vendor's selected templateId
            const activeTemplate = useMemo(() => {
                if (!vendor) return STOREFRONT_TEMPLATES[1];
                return STOREFRONT_TEMPLATES[vendor.templateId] || STOREFRONT_TEMPLATES[1];
            }, [vendor]);

            const BRAND_CONTEXTS = {
                'v1': {
                    badge: "HIGH PERFORMANCE AUDIO & WEARABLES",
                    title: "Engineered for Sound. Designed for Life.",
                    desc: "We build high-fidelity peripherals designed to optimize your daily focus. Explore active noise cancellation, mechanical tactile key layouts, and biometric telemetry trackers.",
                    about: "Founded by engineers obsessed with audio fidelity and ergonomic tactile response, TechPulse designs and manufactures studio-grade peripherals for high-performance workspaces."
                },
                'v2': {
                    badge: "100% PURE SOIL-TO-SKIN WELLNESS",
                    title: "Therapeutic Essentials for Rest & Restoration.",
                    desc: "Pure, single-origin essential oils and botanicals extracted in small batches. Sourced sustainably from domestic heritage farms in India.",
                    about: "Flora & Herb Co. was born from a desire to bring pure, unadulterated botanical essences into modern wellness rituals, working directly with organic growers in the Western Ghats."
                },
                'v3': {
                    badge: "LIMITED ATHLETIC WEAR & SNEAKERS",
                    title: "Movement Unconstrained.",
                    desc: "Technical runners and heavyweight cotton loungewear engineered with premium stitching, performance carbon fiber plating, and quick-dry comfort.",
                    about: "StreetKicks is an independent athletic label crafting technical footwear and structured apparel designed to bridge the gap between daily mileage and architectural design."
                },
                'v4': {
                    badge: "HERITAGE SPICES & GRAINS",
                    title: "Aged Basmati & Stone-Ground Spices.",
                    desc: "Aromatic spice blends and premium long-grain grains harvested at the foothills of the Himalayas. Pure, handpicked, and stone-ground to preserve essential oils.",
                    about: "Bharat Bazaar works with smallholder farming co-operatives across India to bring pristine, heritage grains and traditionally stone-ground spices directly to your table."
                },
                'v5': {
                    badge: "AUTHENTIC BANARASI WEAVES",
                    title: "Heritage Weaving Traditions.",
                    desc: "Handloom silk sarees and cotton ethnic sets crafted by master weavers in Jaipur. Embellished with pure zari work and heritage embroidery.",
                    about: "Jaipur Silks preserves generational handloom weaving traditions, cataloging bespoke sarees and Kurtas woven with premium mulberry silks and authentic gold thread zari."
                }
            };

            const brand = useMemo(() => {
                return BRAND_CONTEXTS[vendor.id] || {
                    badge: "PREMIUM PRODUCTS",
                    title: `Welcome to ${vendor.name}`,
                    desc: "Explore our curated catalog of premium handcrafted items.",
                    about: `${vendor.name} is dedicated to bringing you high-quality products sourced responsibly.`
                };
            }, [vendor]);

            const renderRatingStars = (rating) => {
                const filledCount = Math.round(rating);
                return (
                    <div class="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const isFilled = i < filledCount;
                            return (
                                <svg key={i} class={`w-3.5 h-3.5 ${isFilled ? 'text-amber-500 fill-current' : 'text-stone-300 dark:text-stone-800 fill-current'}`} viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            );
                        })}
                    </div>
                );
            };

            // Helper resolvers
            const getProductCategory = (p) => {
                if (p.category) return p.category;
                if (p.vendorId === 'v1') return p.name.includes('Watch') ? 'Wearables' : p.name.includes('Buds') ? 'Audio' : 'Peripherals';
                if (p.vendorId === 'v2') return p.name.includes('Oil') ? 'Oils' : p.name.includes('Spray') ? 'Sprays' : 'Balms';
                if (p.vendorId === 'v3') return p.name.includes('Runner') ? 'Footwear' : p.name.includes('Hoodie') ? 'Apparel' : 'Accessories';
                if (p.vendorId === 'v4') return p.name.includes('Rice') ? 'Grains' : 'Spices';
                if (p.vendorId === 'v5') return p.name.includes('Saree') ? 'Sarees' : 'Kurtas';
                return 'General';
            };

            const getProductRating = (p) => {
                if (p.rating) return p.rating;
                const value = (4.0 + (p.price % 10) / 10).toFixed(1);
                return parseFloat(value);
            };

            const getProductReviews = (p) => {
                if (p.reviews && p.reviews.length > 0) return p.reviews;
                return [
                    { author: 'Aarav Sharma', rating: 5, comment: 'Phenomenal quality, highly recommend this store!' },
                    { author: 'Priya Patel', rating: 4, comment: 'Very authentic and works exactly as described.' }
                ];
            };

            // Filter products of this specific vendor
            const vendorProducts = useMemo(() => {
                return products.filter(p => vendor && p.vendorId === vendor.id);
            }, [products, vendor]);

            // Get categories dynamically
            const categories = useMemo(() => {
                const cats = new Set(vendorProducts.map(p => getProductCategory(p)));
                return ['All', ...Array.from(cats)];
            }, [vendorProducts]);

            // Filter products based on search query, category, and wishlist
            const filteredProducts = useMemo(() => {
                return vendorProducts.filter(p => {
                    const category = getProductCategory(p);
                    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
                    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesWishlist = !wishlistOnly || wishlist.includes(p.id);
                    return matchesCategory && matchesSearch && matchesWishlist;
                });
            }, [vendorProducts, selectedCategory, searchQuery, wishlistOnly, wishlist]);

            // Filter orders for the Customer Portal view
            const customerOrders = useMemo(() => {
                if (!portalSearched || !portalNameInput) return [];
                return orders.filter(o => 
                    o.vendorId === vendor.id && 
                    o.customerName.toLowerCase().trim() === portalNameInput.toLowerCase().trim()
                );
            }, [orders, vendor, portalNameInput, portalSearched]);

            const addToCart = (product) => {
                setCart(prev => {
                    const existing = prev.find(item => item.id === product.id);
                    if (existing) {
                        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
                    }
                    return [...prev, { ...product, qty: 1 }];
                });
            };

            const toggleWishlist = (productId) => {
                setWishlist(prev => {
                    if (prev.includes(productId)) {
                        return prev.filter(id => id !== productId);
                    }
                    return [...prev, productId];
                });
            };

            const removeFromCart = (id) => {
                setCart(prev => prev.filter(item => item.id !== id));
            };

            const updateQty = (id, newQty) => {
                if (newQty <= 0) {
                    removeFromCart(id);
                    return;
                }
                setCart(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
            };

            const cartTotal = useMemo(() => {
                return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            }, [cart]);

            const discountAmount = useMemo(() => {
                if (!appliedCoupon) return 0;
                return parseFloat((cartTotal * (appliedCoupon.discountPercent / 100)).toFixed(2));
            }, [cartTotal, appliedCoupon]);

            const finalTotal = useMemo(() => {
                return parseFloat((cartTotal - discountAmount).toFixed(2));
            }, [cartTotal, discountAmount]);

            const handleApplyCoupon = () => {
                const code = couponInput.trim().toUpperCase();
                const coupons = {
                    'WELCOME10': 10,
                    'IND20': 20,
                    'FESTIVE30': 30
                };
                if (coupons[code]) {
                    setAppliedCoupon({ code, discountPercent: coupons[code] });
                    setCouponError('');
                    setCouponInput('');
                } else {
                    setCouponError('Invalid coupon. Use: WELCOME10, IND20, or FESTIVE30');
                    setAppliedCoupon(null);
                }
            };

            const handleRemoveCoupon = () => {
                setAppliedCoupon(null);
            };

            const handleCheckout = (e) => {
                e.preventDefault();
                if (!checkoutForm.name || cart.length === 0) return;

                const amount = finalTotal;
                const commissionRate = vendor.commissionRate;
                const platformCommission = parseFloat((amount * (commissionRate / 100)).toFixed(2));
                const vendorShare = parseFloat((amount - platformCommission).toFixed(2));

                const orderData = {
                    vendorId: vendor.id,
                    customerName: checkoutForm.name,
                    totalAmount: amount,
                    platformCommission,
                    vendorShare,
                    status: 'Pending', // Initial state on checkout
                    couponApplied: appliedCoupon ? appliedCoupon.code : null,
                    discountAmount: discountAmount
                };

                addOrder(orderData);
                setPlacedOrderDetails(orderData);
                setShowCheckoutModal(true);
                // Clear cart & coupon
                setCart([]);
                setAppliedCoupon(null);
                setShowCart(false);
            };

            const handleAddReview = (e, product) => {
                e.preventDefault();
                if (!reviewForm.name || !reviewForm.comment) return;
                const newReview = {
                    author: reviewForm.name,
                    rating: parseInt(reviewForm.rating),
                    comment: reviewForm.comment
                };
                const updatedProduct = {
                    ...product,
                    reviews: [...getProductReviews(product), newReview]
                };
                updateProduct(updatedProduct);
                // Update currently focused product state to display review immediately
                setSelectedProduct(updatedProduct);
                setReviewForm({ name: '', rating: 5, comment: '' });
            };

            if (!vendor) {
                return (
                    <div class="max-w-md mx-auto px-6 py-20 text-center animate-fade-in bg-slate-900 border border-slate-800 rounded-2xl mt-12">
                        <Icon name="globe" className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                        <h3 class="text-xl font-bold text-white mb-2">Tenant DNS Error</h3>
                        <p class="text-slate-400 text-sm mb-6 leading-relaxed">
                            No storefront registered under simulated domain <span class="text-rose-400 font-mono">{simulatedHost}</span>.
                        </p>
                        <p class="text-xs text-slate-500 font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
                            SQL Scoping query returned NULL: No matching record found in domain_alias or subdomains registry.
                        </p>
                    </div>
                );
            }

            return (
                <div class={`${activeTemplate.bg} flex flex-col font-sans transition-all duration-300`}>
                    
                    {/* Storefront Header */}
                    <header class={activeTemplate.header}>
                        <div class="max-w-7xl mx-auto flex justify-between items-center px-4 w-full">
                            <div class="flex items-center gap-3">
                                <img src={vendor.logoUrl} class="w-8 h-8 rounded-lg object-cover" />
                                <span class="font-extrabold tracking-tight font-outfit text-lg">{vendor.name}</span>
                            </div>
                            
                            {/* Navigation Links */}
                            <nav class="hidden md:flex items-center gap-6 text-sm font-semibold opacity-70">
                                <button 
                                    onClick={() => setStorefrontTab('catalog')} 
                                    class={`hover:opacity-100 transition-opacity pb-1 ${storefrontTab === 'catalog' ? 'border-b-2 border-current opacity-100' : ''}`}
                                >
                                    Shop Catalog
                                </button>
                                <button 
                                    onClick={() => setStorefrontTab('portal')} 
                                    class={`hover:opacity-100 transition-opacity pb-1 ${storefrontTab === 'portal' ? 'border-b-2 border-current opacity-100' : ''}`}
                                >
                                    My Portal & Track Orders
                                </button>
                            </nav>

                            {/* Profile Login & Cart button group */}
                            <div class="flex items-center gap-3">
                                <button 
                                    onClick={() => setShowLoginModal(true)}
                                    class={`p-2 rounded-xl border transition-colors flex items-center gap-1.5 ${
                                        loggedInCustomer 
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                                            : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
                                    }`}
                                    title={loggedInCustomer ? `Logged in as ${loggedInCustomer.name}` : 'Login'}
                                >
                                    <Icon name="users" className="w-5 h-5" />
                                    {loggedInCustomer && (
                                        <span class="text-xs font-semibold font-sans hidden sm:inline truncate max-w-[80px]">
                                            {loggedInCustomer.name.split(' ')[0]}
                                        </span>
                                    )}
                                </button>

                                <button 
                                    onClick={() => setShowCart(true)}
                                    class="relative p-2 bg-slate-900 text-white rounded-xl border border-slate-800 hover:bg-slate-800 transition-colors"
                                >
                                    <Icon name="cart" className="w-5 h-5" />
                                    {cart.length > 0 && (
                                        <span class="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-slate-950 animate-bounce">
                                            {cart.reduce((sum, item) => sum + item.qty, 0)}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* --- CATALOG VIEW --- */}
                    {storefrontTab === 'catalog' && (
                        vendor.id === 'v4' ? (
                            <SpiceStorefront 
                                vendor={vendor} 
                                products={products} 
                                wishlist={wishlist} 
                                toggleWishlist={toggleWishlist} 
                                addToCart={addToCart} 
                                setStorefrontTab={setStorefrontTab} 
                                setSelectedProduct={setSelectedProduct} 
                            />
                        ) : vendor.id === 'v3' ? (
                            <SneakerStorefront 
                                vendor={vendor} 
                                products={products} 
                                wishlist={wishlist} 
                                toggleWishlist={toggleWishlist} 
                                addToCart={addToCart} 
                                setStorefrontTab={setStorefrontTab} 
                                setSelectedProduct={setSelectedProduct} 
                                loggedInCustomer={loggedInCustomer} 
                                setShowLoginModal={setShowLoginModal} 
                                setShowCart={setShowCart} 
                                cart={cart}
                            />
                        ) : (
                            <div class="max-w-7xl mx-auto px-6 py-12 w-full animate-fade-in">
                                 {/* Storefront Hero Section */}
                                 <div class="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                                     <span class={activeTemplate.badge}>{brand.badge}</span>
                                     <h2 class="text-3xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4 font-outfit">{brand.title}</h2>
                                     <p class="opacity-75 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans">
                                         {brand.desc}
                                     </p>
                                 </div>

                                 {/* Search and Category Filters Panel */}
                                 <div class="bg-slate-900/5 border border-current/10 p-5 rounded-none mb-12 flex flex-col md:flex-row items-center justify-between gap-4 font-sans">
                                     <div class="relative w-full md:max-w-md">
                                         <input 
                                             type="text"
                                             placeholder="Search products in this store..."
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                             class="w-full bg-transparent border-b border-current/25 rounded-none px-2 py-2 text-xs placeholder-current/40 focus:outline-none focus:border-current font-sans text-current"
                                         />
                                     </div>
                                     
                                     <div class="flex flex-wrap gap-2 justify-end w-full md:w-auto">
                                         <button
                                             onClick={() => { setWishlistOnly(prev => !prev); setSelectedCategory('All'); }}
                                             class={`px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 rounded-none border ${
                                                 wishlistOnly 
                                                     ? 'bg-rose-700 border-rose-800 text-white' 
                                                     : 'bg-transparent border-current/20 text-current/70 hover:text-current hover:border-current'
                                             }`}
                                         >
                                             <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                                 <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                             </svg>
                                             Wishlist ({wishlist.length})
                                         </button>
                                         {categories.map(cat => (
                                             <button
                                                 key={cat}
                                                 onClick={() => { setSelectedCategory(cat); setWishlistOnly(false); }}
                                                 class={`px-3 py-1.5 text-xs font-semibold transition-all rounded-none border ${
                                                     !wishlistOnly && selectedCategory === cat 
                                                         ? 'bg-current text-white border-current invert' 
                                                         : 'bg-transparent border-current/20 text-current/70 hover:text-current hover:border-current'
                                                 }`}
                                             >
                                                 {cat}
                                             </button>
                                         ))}
                                     </div>
                                 </div>

                                 {/* Products Display Grid */}
                                 <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                                     {filteredProducts.map(p => (
                                         <div 
                                             key={p.id} 
                                             onClick={() => setSelectedProduct(p)}
                                             class={`${activeTemplate.card} cursor-pointer flex flex-col justify-between`}
                                         >
                                             <div>
                                                 <div class="relative overflow-hidden rounded-none mb-4 group">
                                                     <img src={p.imageUrl} class="w-full h-72 object-cover rounded-none transition-transform duration-300 group-hover:scale-102" />
                                                     <span class="absolute top-3 left-3 bg-zinc-950 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5">
                                                         {getProductCategory(p)}
                                                     </span>

                                                     {/* Floating Heart Button */}
                                                     <button 
                                                         onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                                                         class="absolute top-3 right-3 h-8 w-8 bg-white/95 text-stone-900 rounded-full flex items-center justify-center border border-stone-200 hover:scale-105 transition-transform"
                                                     >
                                                         {wishlist.includes(p.id) ? (
                                                             <svg class="w-4 h-4 text-rose-600 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                 <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                             </svg>
                                                         ) : (
                                                             <svg class="w-4 h-4 text-stone-400 hover:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                             </svg>
                                                         )}
                                                     </button>
                                                 </div>
                                                 
                                                 <div class="flex justify-between items-start gap-2 mb-2">
                                                     <h3 class="font-bold text-base leading-tight font-outfit text-current">{p.name}</h3>
                                                     <span class="font-mono font-bold text-sm text-current">
                                                         ₹{p.price.toFixed(2)}
                                                     </span>
                                                 </div>
                                                 
                                                 <div class="flex items-center gap-1.5 mb-3 text-xs">
                                                     {renderRatingStars(getProductRating(p))}
                                                     <span class="text-current/60 font-sans ml-1">({getProductReviews(p).length} reviews)</span>
                                                 </div>
                                                 
                                                 <p class="opacity-70 text-xs leading-relaxed line-clamp-2 mb-6 font-sans">{p.description}</p>
                                             </div>
                                             
                                             <div class="flex items-center justify-between gap-4 mt-auto font-sans">
                                                 <div class="text-[10px] font-mono opacity-55">
                                                     Stock: {p.stock > 0 ? `${p.stock} units` : 'Out of stock'}
                                                 </div>
                                                 <button 
                                                     disabled={p.stock <= 0}
                                                     onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                                                     class={activeTemplate.btn}
                                                 >
                                                     {p.stock > 0 ? 'Add To Cart' : 'Sold Out'}
                                                 </button>
                                             </div>
                                         </div>
                                     ))}

                                     {filteredProducts.length === 0 && (
                                         <div class="col-span-full py-16 text-center opacity-60 border border-dashed border-current/25 rounded-none font-sans">
                                             <p>No products match your search, category, or wishlist filter.</p>
                                         </div>
                                     )}
                                 </div>

                                 {/* About the Brand / Trust Section */}
                                 <div class="mt-24 border-t border-current/15 pt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-sm leading-relaxed text-current/80">
                                     <div>
                                         <h4 class="font-bold text-xs uppercase tracking-widest mb-3">Our Heritage</h4>
                                         <p class="font-sans font-light">{brand.about}</p>
                                     </div>
                                     <div>
                                         <h4 class="font-bold text-xs uppercase tracking-widest mb-3">Commitment to Quality</h4>
                                         <p class="font-sans font-light">We stand behind every item in our catalog. Each product is subject to rigorous testing, direct quality inspection, and ethical labor standards to ensure standard-setting execution.</p>
                                     </div>
                                 </div>
                             </div>
                        )
                    )}

                    {/* --- CUSTOMER PORTAL / ORDER TRACKING TAB --- */}
                    {storefrontTab === 'portal' && (
                        <div class="max-w-4xl mx-auto px-6 py-12 w-full animate-fade-in text-current">
                            <div class="border border-current/10 p-8 rounded-none bg-transparent">
                                <h3 class="text-2xl font-bold font-outfit mb-2">Customer Order Tracking</h3>
                                <p class="opacity-70 text-sm mb-6 font-sans">Enter your billing name to review transactions, settle commissions, and track dispatch status.</p>
                                
                                <div class="flex flex-col sm:flex-row gap-3 mb-8">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Aarav Sharma"
                                        value={portalNameInput}
                                        onChange={(e) => { setPortalNameInput(e.target.value); setPortalSearched(false); }}
                                        class="flex-grow bg-transparent border-b border-current/25 rounded-none px-2 py-3 text-sm text-current placeholder-current/40 focus:outline-none focus:border-current font-sans"
                                    />
                                    <button 
                                        onClick={() => setPortalSearched(true)}
                                        class="bg-current text-white invert font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-none hover:opacity-85 transition-opacity"
                                    >
                                        Search Database
                                    </button>
                                </div>

                                {portalSearched && (
                                    <div class="space-y-6">
                                        <h4 class="font-bold font-outfit border-b border-current/10 pb-3">Historical Ledger for "{portalNameInput}"</h4>
                                        
                                        {customerOrders.length > 0 ? (
                                            <div class="space-y-4">
                                                {customerOrders.map(o => (
                                                    <div key={o.id} class="border border-current/10 p-5 rounded-none flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                                        <div class="space-y-2">
                                                            <div class="flex items-center gap-3">
                                                                <span class="text-xs text-indigo-500 font-mono font-semibold">{o.id}</span>
                                                                <span class="text-xs opacity-50 font-mono">{o.date}</span>
                                                            </div>
                                                            <div class="text-sm font-semibold text-current font-sans">
                                                                Total Paid: <span class="font-mono">₹{o.totalAmount.toFixed(2)}</span>
                                                            </div>
                                                            {o.couponApplied && (
                                                                <p class="text-[10px] text-amber-600 font-mono">
                                                                    Coupon Code: {o.couponApplied} (-₹{o.discountAmount.toFixed(2)})
                                                                </p>
                                                            )}
                                                            <p class="text-[10px] opacity-50 leading-relaxed font-sans">
                                                                Transacted via Multi-Tenant Split Ledger (Platform Commission Deducted)
                                                            </p>
                                                        </div>
                                                        
                                                        <div class="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                                                            <span class={`px-3 py-1 rounded-none text-xs font-mono font-bold border ${
                                                                o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                                                                o.status === 'Return Requested' ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : 
                                                                'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                                            }`}>
                                                                {o.status === 'Pending' && (
                                                                    <span class="flex items-center gap-1.5">
                                                                        <span class="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                                                        Processing
                                                                    </span>
                                                                )}
                                                                {o.status === 'Delivered' && (
                                                                    <span class="flex items-center gap-1.5">
                                                                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                                        Delivered
                                                                    </span>
                                                                )}
                                                                {o.status === 'Return Requested' && (
                                                                    <span class="flex items-center gap-1.5">
                                                                        <span class="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                                                                        Return Requested
                                                                    </span>
                                                                )}
                                                            </span>
                                                            
                                                            {o.status === 'Delivered' && (
                                                                <button 
                                                                    onClick={() => {
                                                                        if (confirm('Are you sure you want to request a return for this order?')) {
                                                                            updateOrderStatus(o.id, 'Return Requested');
                                                                        }
                                                                    }}
                                                                    class="bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-none transition-colors font-sans"
                                                                >
                                                                    Request Return
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div class="text-center py-8 text-slate-500 text-sm font-sans">
                                                No transacted orders found under "{portalNameInput}" at this store.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- PRODUCT DETAILS & REVIEWS OVERLAY MODAL --- */}
                    {selectedProduct && (
                        <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in font-sans">
                            <div class="bg-stone-50 border border-stone-200 w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] rounded-none text-stone-900">
                                
                                {/* Modal Image Section */}
                                <div class="w-full md:w-1/2 relative bg-stone-100 flex items-center rounded-none">
                                    <img src={selectedProduct.imageUrl} class="w-full h-full object-cover max-h-[350px] md:max-h-full rounded-none" />
                                    <button 
                                        onClick={() => setSelectedProduct(null)} 
                                        class="absolute top-4 left-4 h-8 w-8 bg-stone-950/85 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-stone-800 text-xl md:hidden font-sans"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Modal content / review input */}
                                <div class="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full">
                                    <div>
                                        <div class="flex justify-between items-start mb-2">
                                            <div>
                                                <span class="text-stone-500 font-mono text-[10px] uppercase tracking-wider">{getProductCategory(selectedProduct)}</span>
                                                <h3 class="text-2xl font-bold text-stone-950 font-outfit mt-1">{selectedProduct.name}</h3>
                                            </div>
                                            <button 
                                                onClick={() => setSelectedProduct(null)} 
                                                class="hidden md:flex text-stone-400 hover:text-stone-950 font-extrabold text-2xl font-sans"
                                            >
                                                &times;
                                            </button>
                                        </div>

                                        <div class="flex items-center gap-2 mb-4">
                                            <span class="text-xl font-mono font-bold text-stone-950">₹{selectedProduct.price.toFixed(2)}</span>
                                            <span class="text-stone-300 font-mono">|</span>
                                            <div class="flex items-center gap-1">
                                                {renderRatingStars(getProductRating(selectedProduct))}
                                                <span class="text-xs text-stone-500 font-sans ml-1">({getProductReviews(selectedProduct).length} Reviews)</span>
                                            </div>
                                        </div>

                                        <p class="text-stone-600 text-xs leading-relaxed mb-6">{selectedProduct.description}</p>

                                        {/* Product specs selector simulation */}
                                        <div class="space-y-3 mb-6">
                                            <div>
                                                <label class="block text-[10px] font-mono text-stone-400 uppercase mb-1">Select Size</label>
                                                <div class="flex gap-2">
                                                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                                        <span key={size} class="px-2.5 py-1 bg-white border border-stone-200 hover:border-stone-950 text-[10px] text-stone-800 font-semibold cursor-pointer rounded-none font-sans">{size}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label class="block text-[10px] font-mono text-stone-400 uppercase mb-1">Select Color</label>
                                                <div class="flex gap-2">
                                                    {['Crimson', 'Gold', 'Teal', 'Navy'].map(color => (
                                                        <span key={color} class="px-2 py-1 bg-white border border-stone-200 hover:border-stone-950 text-[9px] text-stone-600 cursor-pointer rounded-none font-sans">{color}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reviews list */}
                                        <div class="space-y-4 border-t border-stone-200 pt-4 mb-6">
                                            <h4 class="font-bold text-stone-900 text-sm font-outfit uppercase tracking-wider text-[11px]">Reviews & Customer Feedback</h4>
                                            
                                            <div class="space-y-3 max-h-[150px] overflow-y-auto pr-2">
                                                {getProductReviews(selectedProduct).map((rev, idx) => (
                                                    <div key={idx} class="border-b border-stone-150 py-3 text-xs space-y-1">
                                                        <div class="flex justify-between items-center text-stone-500 font-semibold">
                                                            <span class="text-stone-950 font-sans">{rev.author}</span>
                                                            {renderRatingStars(rev.rating)}
                                                        </div>
                                                        <p class="text-stone-600 leading-relaxed font-sans">{rev.comment}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Write a Review form */}
                                        <form onSubmit={(e) => handleAddReview(e, selectedProduct)} class="border border-stone-200 p-4 rounded-none space-y-3 mb-6 bg-white">
                                            <h5 class="text-xs font-bold text-stone-900 font-outfit uppercase tracking-widest text-[10px]">Write a Review</h5>
                                            <div class="grid grid-cols-2 gap-2">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    placeholder="Your Name"
                                                    value={reviewForm.name}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                                                    class="bg-stone-50 border border-stone-200 p-2 text-[11px] text-stone-900 focus:outline-none focus:border-stone-950 font-sans rounded-none"
                                                />
                                                <select
                                                    value={reviewForm.rating}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                                                    class="bg-stone-50 border border-stone-200 p-2 text-[11px] text-stone-900 focus:outline-none focus:border-stone-950 font-sans cursor-pointer rounded-none"
                                                >
                                                    {[5, 4, 3, 2, 1].map(n => (
                                                        <option key={n} value={n}>{n} Stars</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <textarea 
                                                required 
                                                rows="2" 
                                                placeholder="Write your experience..."
                                                value={reviewForm.comment}
                                                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                class="w-full bg-stone-50 border border-stone-200 p-2 text-[11px] text-stone-900 focus:outline-none focus:border-stone-950 resize-none font-sans rounded-none"
                                            />
                                            <button 
                                                type="submit" 
                                                class="w-full bg-stone-950 hover:bg-stone-800 text-white text-[10px] font-bold py-2.5 rounded-none uppercase tracking-widest transition-colors font-sans"
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    </div>

                                    {/* Action button */}
                                    <div class="border-t border-stone-200 pt-4 flex gap-3">
                                        <button 
                                            disabled={selectedProduct.stock <= 0}
                                            onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                            class={`flex-grow py-3 px-4 font-bold text-xs uppercase tracking-widest rounded-none transition-all shadow-none font-sans ${
                                                selectedProduct.stock > 0 
                                                    ? 'bg-stone-950 hover:bg-stone-800 text-white' 
                                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed border border-stone-300'
                                            }`}
                                        >
                                            {selectedProduct.stock > 0 ? 'Add To Cart' : 'Sold Out'}
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
      
                                       {/* --- SHOPPING CART DRAWER --- */}
                    {showCart && (
                        <div class="fixed inset-0 z-50 bg-black/60 flex justify-end backdrop-blur-none animate-fade-in font-sans">
                            <div class="bg-stone-50 text-stone-900 border-l border-stone-200 w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-fade-in">
                                <div>
                                    <div class="px-6 py-5 border-b border-stone-200 bg-white flex justify-between items-center">
                                        <div class="flex items-center gap-2">
                                            <Icon name="cart" className="w-5 h-5 text-stone-950" />
                                            <h4 class="font-bold text-lg font-outfit uppercase tracking-wider text-[13px] text-stone-950">Shopping Bag ({vendor.name})</h4>
                                        </div>
                                        <button onClick={() => setShowCart(false)} class="text-stone-400 hover:text-stone-950 font-extrabold text-2xl">&times;</button>
                                    </div>

                                    {/* Cart list items */}
                                    <div class="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
                                        {cart.map(item => (
                                            <div key={item.id} class="flex items-center justify-between gap-4 bg-white border border-stone-200 p-3 rounded-none">
                                                <img src={item.imageUrl} class="w-12 h-12 rounded-none object-cover border border-stone-150" />
                                                <div class="flex-grow">
                                                    <h5 class="text-xs font-semibold text-stone-950 truncate max-w-[150px]">{item.name}</h5>
                                                    <span class="text-xs text-stone-700 font-mono">₹{item.price.toFixed(2)}</span>
                                                </div>
                                                
                                                {/* Qty selectors */}
                                                <div class="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-none p-1">
                                                    <button onClick={() => updateQty(item.id, item.qty - 1)} class="text-stone-500 hover:text-stone-950 px-1.5 font-bold text-xs">-</button>
                                                    <span class="text-xs font-mono px-1 font-bold text-stone-950">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.id, item.qty + 1)} class="text-stone-500 hover:text-stone-950 px-1.5 font-bold text-xs">+</button>
                                                </div>

                                                <button onClick={() => removeFromCart(item.id)} class="text-stone-400 hover:text-stone-950 p-1.5">
                                                    <Icon name="trash" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}

                                        {cart.length === 0 && (
                                            <div class="py-12 text-center text-stone-400 font-sans">
                                                <p>Your shopping bag is empty.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Order summary footer */}
                                <div class="space-y-4">
                                    {/* Coupon Application Section */}
                                    <div class="px-6 py-4 border-t border-stone-200 bg-white space-y-3">
                                        <label class="block text-[10px] font-mono text-stone-500 uppercase tracking-widest">Have a Promo Code?</label>
                                        <div class="flex gap-2">
                                            <input 
                                                type="text" 
                                                placeholder="e.g. WELCOME10, IND20"
                                                value={couponInput}
                                                onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                                                class="flex-grow bg-stone-50 border border-stone-250 px-3 py-2 text-xs text-stone-900 uppercase font-mono placeholder-stone-400 focus:outline-none focus:border-stone-950 rounded-none"
                                            />
                                            <button 
                                                onClick={handleApplyCoupon}
                                                class="bg-stone-950 hover:bg-stone-850 text-white text-xs font-semibold px-4 py-2 rounded-none transition-colors uppercase font-sans tracking-wider"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && <p class="text-[10px] text-rose-700 font-mono">{couponError}</p>}
                                        {appliedCoupon && (
                                            <div class="flex justify-between items-center bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-none text-xs font-medium">
                                                <span>Discount Applied: {appliedCoupon.code}</span>
                                                <div class="flex items-center gap-2">
                                                    <span>-{appliedCoupon.discountPercent}%</span>
                                                    <button onClick={handleRemoveCoupon} class="text-rose-700 font-bold text-sm hover:text-rose-900">&times;</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div class="p-6 border-t border-stone-200 bg-white">
                                        <div class="space-y-1.5 mb-6 text-xs text-stone-500 font-sans">
                                            <div class="flex justify-between items-center">
                                                <span>Subtotal:</span>
                                                <span class="font-mono text-stone-900">₹{cartTotal.toFixed(2)}</span>
                                            </div>
                                            {appliedCoupon && (
                                                <div class="flex justify-between items-center text-emerald-700 font-mono">
                                                    <span>Discount:</span>
                                                    <span>-₹{discountAmount.toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div class="flex justify-between items-center text-sm font-semibold text-stone-950 pt-2 border-t border-stone-200">
                                                <span>Total:</span>
                                                <span class="font-mono text-xl text-stone-950">₹{finalTotal.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        {cart.length > 0 ? (
                                            <form onSubmit={handleCheckout} class="space-y-3">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    placeholder="Customer Full Name" 
                                                    value={checkoutForm.name} 
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                                                    class="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 font-sans rounded-none"
                                                />
                                                <input 
                                                    type="email" 
                                                    placeholder="Email Address (Optional)" 
                                                    value={checkoutForm.email} 
                                                    onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                                                    class="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 font-sans rounded-none"
                                                />
                                                <button 
                                                    type="submit"
                                                    class="w-full bg-stone-950 hover:bg-stone-850 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-none transition-all flex items-center justify-center gap-2 font-sans"
                                                >
                                                    <Icon name="check" className="w-4 h-4" />
                                                    Checkout (Trigger Split Settlement)
                                                </button>
                                            </form>
                                        ) : (
                                            <button disabled class="w-full bg-stone-200 text-stone-400 font-bold text-xs uppercase tracking-wider py-3 rounded-none cursor-not-allowed font-sans border border-stone-300">
                                                Shopping Bag is Empty
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* --- CHECKOUT SPLIT-TRANSACTION MODAL --- */}
                    {showCheckoutModal && placedOrderDetails && (
                        <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-none animate-fade-in font-sans">
                            <div class="bg-white border border-stone-200 w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in text-stone-900 rounded-none">
                                
                                <div class="px-6 py-5 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                                    <div class="flex items-center gap-2">
                                        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        <h4 class="font-bold text-xs tracking-wider uppercase font-mono text-stone-950">Gateway Callback Success</h4>
                                    </div>
                                    <button onClick={() => setShowCheckoutModal(false)} class="text-stone-400 hover:text-stone-950 font-bold text-lg">&times;</button>
                                </div>

                                <div class="p-6 space-y-6">
                                    <div class="text-center space-y-2">
                                        <div class="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200 mb-4">
                                            <Icon name="check" className="w-6 h-6" />
                                        </div>
                                        <h3 class="text-xl font-bold font-outfit text-stone-950 uppercase tracking-wide">Split Payment Settled</h3>
                                        <p class="text-xs text-stone-500">Ledger balance updated dynamically for multi-tenant database context.</p>
                                    </div>

                                    {/* Detailed breakdown of the split */}
                                    <div class="bg-stone-50 border border-stone-200 p-5 space-y-4 font-mono text-xs text-stone-700">
                                        <div class="flex justify-between items-center">
                                            <span>Tenant Identity:</span>
                                            <span class="text-stone-950 font-bold">{vendor.name} ({vendor.id})</span>
                                        </div>
                                        <div class="flex justify-between items-center">
                                            <span>Billing Customer:</span>
                                            <span class="text-stone-950 font-sans font-semibold">{placedOrderDetails.customerName}</span>
                                        </div>
                                        {placedOrderDetails.couponApplied && (
                                            <div class="flex justify-between items-center text-emerald-700">
                                                <span>Coupon Applied:</span>
                                                <span>{placedOrderDetails.couponApplied} (-₹{placedOrderDetails.discountAmount.toFixed(2)})</span>
                                            </div>
                                        )}
                                        <div class="flex justify-between items-center border-b border-stone-200 pb-3">
                                            <span>Platform Fee Split:</span>
                                            <span class="text-stone-950">{vendor.commissionRate}% Gross Payout</span>
                                        </div>
                                        
                                        {/* Split amount calculation */}
                                        <div class="flex justify-between items-center text-stone-950 border-t border-stone-200 pt-3">
                                            <span>Gross Captured amount:</span>
                                            <span class="font-bold text-sm">₹{placedOrderDetails.totalAmount.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between items-center text-stone-700">
                                            <span>Split A: Platform Commission ({vendor.commissionRate}%):</span>
                                            <span class="font-semibold">+ ₹{placedOrderDetails.platformCommission.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between items-center text-stone-950">
                                            <span>Split B: Vendor Payout:</span>
                                            <span class="font-bold">+ ₹{placedOrderDetails.vendorShare.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div class="bg-stone-50 border border-stone-200 p-4 font-mono text-[10px] leading-relaxed text-stone-600">
                                        <strong>Ledger Sync Webhook:</strong> Payment capture split completed. Dispatched secure callback event webhook to <code>/api/v1/orders/webhook</code>. Tenant statistics updated.
                                    </div>

                                    <button 
                                        onClick={() => setShowCheckoutModal(false)}
                                        class="w-full bg-stone-950 hover:bg-stone-850 text-white font-bold text-xs uppercase tracking-widest py-3 rounded-none transition-colors font-sans"
                                    >
                                        Return to Store
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                       {/* --- CUSTOMER LOGIN MODAL --- */}
                    {showLoginModal && (
                        <div class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-none animate-fade-in font-sans text-stone-900">
                            <div class="bg-white border border-stone-200 w-full max-w-sm overflow-hidden shadow-2xl rounded-none">
                                <div class="px-6 py-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                                    <h4 class="font-bold font-outfit uppercase tracking-widest text-xs text-stone-950">Customer Account Login</h4>
                                    <button onClick={() => setShowLoginModal(false)} class="text-stone-400 hover:text-stone-950 font-bold">&times;</button>
                                </div>

                                <div class="p-6 space-y-4">
                                    {loggedInCustomer ? (
                                        <div class="space-y-4 text-center">
                                            <div class="h-16 w-16 bg-stone-100 text-stone-900 rounded-full flex items-center justify-center border border-stone-200 mx-auto text-lg font-bold font-sans">
                                                {loggedInCustomer.name.split(' ').map(n=>n[0]).join('')}
                                            </div>
                                            <div>
                                                <h5 class="text-stone-950 font-bold text-base font-outfit">{loggedInCustomer.name}</h5>
                                                <p class="text-stone-500 text-xs font-mono">{loggedInCustomer.email}</p>
                                            </div>
                                            <div class="bg-stone-50 border border-stone-200 p-3 rounded-none text-[10px] text-stone-500 font-mono text-left space-y-1">
                                                <p class="font-bold text-stone-700 uppercase tracking-wide">Active Session details:</p>
                                                <p>- Checkout fields automatically pre-filled</p>
                                                <p>- Order history resolved dynamically</p>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    setLoggedInCustomer(null);
                                                    localStorage.removeItem('vendorhood_logged_in_customer');
                                                    setShowLoginModal(false);
                                                }}
                                                class="w-full bg-rose-700 hover:bg-rose-600 text-white font-semibold text-xs py-2.5 rounded-none transition-all uppercase tracking-wider font-sans"
                                            >
                                                Log Out
                                            </button>
                                        </div>
                                    ) : (
                                        <div class="space-y-4">
                                            {/* Prefilled Quick-select profiles */}
                                            <div>
                                                <label class="block text-[10px] font-mono text-stone-400 uppercase mb-2 font-sans tracking-wider">Quick Sign-in (Indian Profiles)</label>
                                                <div class="grid grid-cols-1 gap-2">
                                                    {[
                                                        { name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com' },
                                                        { name: 'Priya Patel', email: 'priya.patel@gmail.com' },
                                                        { name: 'Rajesh Kumar', email: 'rajesh.kumar@gmail.com' }
                                                    ].map(profile => (
                                                        <div 
                                                            key={profile.name}
                                                            onClick={() => {
                                                                setLoggedInCustomer(profile);
                                                                localStorage.setItem('vendorhood_logged_in_customer', JSON.stringify(profile));
                                                                setShowLoginModal(false);
                                                            }}
                                                            class="bg-stone-50 border border-stone-200 p-3 rounded-none hover:border-stone-950 cursor-pointer transition-colors flex items-center justify-between text-xs"
                                                        >
                                                            <div class="text-left font-sans">
                                                                <p class="text-stone-950 font-semibold">{profile.name}</p>
                                                                <p class="text-stone-500 text-[10px] font-mono">{profile.email}</p>
                                                            </div>
                                                            <span class="text-indigo-600 font-mono text-[10px] uppercase font-bold tracking-wide">Select &rarr;</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
 
                                            <div class="border-t border-stone-200 pt-4">
                                                <label class="block text-[10px] font-mono text-stone-400 uppercase mb-2 tracking-wider">Or Custom Sign-in</label>
                                                <form onSubmit={(e) => {
                                                    e.preventDefault();
                                                    if (!loginForm.name) return;
                                                    const newProfile = { name: loginForm.name, email: loginForm.email || `${loginForm.name.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com` };
                                                    setLoggedInCustomer(newProfile);
                                                    localStorage.setItem('vendorhood_logged_in_customer', JSON.stringify(newProfile));
                                                    setShowLoginModal(false);
                                                }} class="space-y-3">
                                                    <input 
                                                        type="text" 
                                                        required
                                                        placeholder="Full Name"
                                                        value={loginForm.name}
                                                        onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                                                        class="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 font-sans rounded-none"
                                                    />
                                                    <input 
                                                        type="email" 
                                                        placeholder="Email Address (Optional)"
                                                        value={loginForm.email}
                                                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                                        class="w-full bg-stone-50 border border-stone-200 px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-stone-950 font-sans rounded-none"
                                                    />
                                                    <button 
                                                        type="submit" 
                                                        class="w-full bg-stone-950 hover:bg-stone-850 text-white font-bold text-xs py-2.5 rounded-none transition-all uppercase tracking-widest font-sans"
                                                    >
                                                        Sign In
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            );
        }
