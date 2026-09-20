const { useState, useEffect, useMemo, useRef } = React;

        function VendorPortal({ vendors, products, orders, activeVendorId, setActiveVendorId, addProduct, updateProduct, deleteProduct, updateVendor, navigateToStore, updateOrderStatus }) {
            const [activeTab, setActiveTab] = useState('inventory');
            const [showProdModal, setShowProdModal] = useState(false);
            const [prodEditMode, setProdEditMode] = useState(false);
            const [statusFilter, setStatusFilter] = useState('All');
            
            // Product form state
            const [productForm, setProductForm] = useState({ id: '', vendorId: '', name: '', price: 0, description: '', imageUrl: '', stock: 10 });

            const currentVendor = useMemo(() => {
                return vendors.find(v => v.id === activeVendorId) || vendors[0];
            }, [vendors, activeVendorId]);

            // Filter products of this specific vendor
            const vendorProducts = useMemo(() => {
                return products.filter(p => p.vendorId === activeVendorId);
            }, [products, activeVendorId]);

            // Filter orders for this specific vendor
            const vendorOrders = useMemo(() => {
                return orders.filter(o => o.vendorId === activeVendorId);
            }, [orders, activeVendorId]);

            const filteredOrders = useMemo(() => {
                if (statusFilter === 'All') return vendorOrders;
                return vendorOrders.filter(o => o.status === statusFilter);
            }, [vendorOrders, statusFilter]);

            const statusCounts = useMemo(() => {
                return {
                    pending: vendorOrders.filter(o => o.status === 'Pending').length,
                    delivered: vendorOrders.filter(o => o.status === 'Delivered').length,
                    returned: vendorOrders.filter(o => o.status === 'Return Requested').length
                };
            }, [vendorOrders]);

            // Calculations
            const analytics = useMemo(() => {
                const totalRev = vendorOrders.reduce((sum, o) => sum + o.totalAmount, 0);
                const platformShare = vendorOrders.reduce((sum, o) => sum + o.platformCommission, 0);
                const netRev = totalRev - platformShare;
                return {
                    revenue: totalRev.toFixed(2),
                    netRevenue: netRev.toFixed(2),
                    platformShare: platformShare.toFixed(2),
                    ordersCount: vendorOrders.length
                };
            }, [vendorOrders]);

            const handleOpenAddProduct = () => {
                setProductForm({ id: '', vendorId: activeVendorId, name: '', price: 0, description: '', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60', stock: 10 });
                setProdEditMode(false);
                setShowProdModal(true);
            };

            const handleOpenEditProduct = (p) => {
                setProductForm(p);
                setProdEditMode(true);
                setShowProdModal(true);
            };

            const handleSaveProduct = (e) => {
                e.preventDefault();
                if (!productForm.name || !productForm.price) return;
                
                if (prodEditMode) {
                    updateProduct(productForm);
                } else {
                    addProduct(productForm);
                }
                setShowProdModal(false);
            };

            const handleSelectTemplate = (tempId) => {
                updateVendor({ ...currentVendor, templateId: tempId });
            };

            if (!currentVendor) {
                return (
                    <div class="text-center py-20">
                        <p class="text-slate-400">Please onboarding a vendor in Platform Admin first.</p>
                    </div>
                );
            }

            return (
                <div class="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
                    
                    {/* Header Context Switcher (Fake Login) */}
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-5 flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div class="flex items-center gap-3">
                            <img src={currentVendor.logoUrl} class="w-12 h-12 rounded-2xl object-cover border border-slate-700 shadow-md" />
                            <div>
                                <div class="flex items-center gap-2">
                                    <h2 class="text-2xl font-bold font-outfit text-white">{currentVendor.name} Console</h2>
                                    <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">Active Session</span>
                                </div>
                                <p class="text-xs text-slate-400 mt-0.5 font-mono">
                                    Domain: <span class="text-indigo-400">{currentVendor.subdomain}.vendorhood.com</span> {currentVendor.customDomain && `| Custom: ${currentVendor.customDomain}`}
                                </p>
                            </div>
                        </div>

                        {/* Fake login trigger */}
                        <div class="flex items-center gap-2">
                            <span class="text-xs text-slate-400 font-mono">Switch Account:</span>
                            <select 
                                value={activeVendorId} 
                                onChange={(e) => setActiveVendorId(e.target.value)} 
                                class="bg-slate-950 text-white font-semibold text-sm border border-slate-800 rounded-xl px-4 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
                            >
                                {vendors.map(v => (
                                    <option key={v.id} value={v.id}>{v.name}</option>
                                ))}
                            </select>
                            <button 
                                onClick={() => navigateToStore(currentVendor)}
                                class="bg-slate-800 hover:bg-slate-700 text-white rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors border border-slate-700"
                            >
                                <Icon name="external" className="w-4 h-4" />
                                Visit Storefront
                            </button>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div class="flex border-b border-slate-800 mb-8 font-medium text-sm">
                        <button 
                            onClick={() => setActiveTab('inventory')}
                            class={`pb-4 px-4 border-b-2 flex items-center gap-2 transition-all ${activeTab === 'inventory' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                        >
                            <Icon name="box" className="w-4 h-4" />
                            Inventory (Products CRUD)
                        </button>
                        <button 
                            onClick={() => setActiveTab('styling')}
                            class={`pb-4 px-4 border-b-2 flex items-center gap-2 transition-all ${activeTab === 'styling' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                        >
                            <Icon name="settings" className="w-4 h-4" />
                            Storefront Layout Blueprints
                        </button>
                        <button 
                            onClick={() => setActiveTab('sales')}
                            class={`pb-4 px-4 border-b-2 flex items-center gap-2 transition-all ${activeTab === 'sales' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                        >
                            <Icon name="chart" className="w-4 h-4" />
                            Net Sales & Split Settlement
                        </button>
                    </div>

                    {/* --- TAB CONTENT: INVENTORY --- */}
                    {activeTab === 'inventory' && (
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-xl font-bold font-outfit text-white">Product Catalog</h3>
                                    <p class="text-slate-400 text-xs">Scope-filtered products representing this tenant ID context.</p>
                                </div>
                                <button 
                                    onClick={handleOpenAddProduct}
                                    class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 flex items-center gap-2 transition-all"
                                >
                                    <Icon name="plus" className="w-4 h-4" />
                                    Add Product to Store
                                </button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {vendorProducts.map(p => (
                                    <div key={p.id} class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between">
                                        <div>
                                            <div class="relative">
                                                <img src={p.imageUrl} class="w-full h-48 object-cover" />
                                                <span class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-slate-800">
                                                    ₹{p.price.toFixed(2)}
                                                </span>
                                            </div>
                                            <div class="p-5">
                                                <h4 class="text-lg font-bold text-white mb-2">{p.name}</h4>
                                                <p class="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">{p.description}</p>
                                                <div class="flex items-center gap-1">
                                                    <span class="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Stock level:</span>
                                                    <span class={`font-mono text-xs font-semibold ${p.stock > 20 ? 'text-emerald-400' : 'text-amber-400'}`}>{p.stock} units</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="p-5 pt-0 flex border-t border-slate-800/80 gap-3 mt-4">
                                            <button 
                                                onClick={() => handleOpenEditProduct(p)}
                                                class="flex-grow py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Icon name="edit" className="w-3.5 h-3.5" />
                                                Edit Product
                                            </button>
                                            <button 
                                                onClick={() => { if (confirm(`Remove ${p.name}?`)) deleteProduct(p.id); }}
                                                class="p-2 hover:bg-rose-600/20 text-rose-400 border border-transparent hover:border-rose-900/30 rounded-xl transition-colors"
                                                title="Delete Product"
                                            >
                                                <Icon name="trash" className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {vendorProducts.length === 0 && (
                                    <div class="col-span-full border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center">
                                        <p class="text-slate-500 mb-2">No products added for this vendor storefront yet.</p>
                                        <button onClick={handleOpenAddProduct} class="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">Add your first product &rarr;</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* --- TAB CONTENT: STYLING --- */}
                    {activeTab === 'styling' && (
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-xl font-bold font-outfit text-white">Storefront Layout Blueprint Selection</h3>
                                <p class="text-slate-400 text-xs">Configure the storefront template layout schema. Schema is injected dynamically at run-time.</p>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {Object.values(STOREFRONT_TEMPLATES).map(t => {
                                    const isActive = currentVendor.templateId === t.id;
                                    return (
                                        <div 
                                            key={t.id}
                                            onClick={() => handleSelectTemplate(t.id)}
                                            class={`border rounded-2xl overflow-hidden p-6 cursor-pointer hover:border-indigo-500/50 transition-all flex flex-col justify-between ${isActive ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-600/10' : 'bg-slate-900/50 border-slate-800/80'}`}
                                        >
                                            <div>
                                                <div class="flex justify-between items-center mb-4">
                                                    <h4 class="font-bold text-lg text-white font-outfit">{t.name}</h4>
                                                    {isActive && (
                                                        <span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] font-mono">Active</span>
                                                    )}
                                                </div>
                                                <p class="text-slate-400 text-xs leading-relaxed mb-6">{t.desc}</p>
                                                
                                                {/* Visual style preview tags */}
                                                <div class="flex flex-wrap gap-2 mb-8">
                                                    <span class="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">Font: {t.bg.includes('font-serif') ? 'Serif' : t.bg.includes('font-mono') ? 'Mono' : 'Sans-Serif'}</span>
                                                    <span class="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded">Buttons: {t.btn.includes('rounded-full') ? 'Rounded' : 'Square'}</span>
                                                </div>
                                            </div>
                                            
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleSelectTemplate(t.id); }}
                                                class={`w-full py-2 px-4 rounded-xl text-xs font-semibold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'}`}
                                            >
                                                {isActive ? 'Currently Active' : 'Activate Template Schema'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* --- TAB CONTENT: SALES --- */}
                    {activeTab === 'sales' && (
                        <div class="space-y-6">
                            <div>
                                <h3 class="text-xl font-bold font-outfit text-white">Sales & Split Settlements</h3>
                                <p class="text-slate-400 text-xs">Real-time settlement distributions captured from checkout events.</p>
                            </div>

                            {/* Net income cards */}
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                    <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Total Store Sales</span>
                                    <h3 class="text-3xl font-bold font-outfit text-white mt-3">₹{analytics.revenue}</h3>
                                </div>
                                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                    <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Platform Share ({currentVendor.commissionRate}%)</span>
                                    <h3 class="text-3xl font-bold font-outfit text-rose-400 mt-3">₹{analytics.platformShare}</h3>
                                </div>
                                <div class="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                    <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Net Vendor Revenue</span>
                                    <h3 class="text-3xl font-bold font-outfit text-emerald-400 mt-3">₹{analytics.netRevenue}</h3>
                                </div>
                            </div>

                            {/* Order Status Summary Cards */}
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div class="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Pending Orders</span>
                                        <h4 class="text-2xl font-bold font-outfit text-amber-400 mt-2">{statusCounts.pending}</h4>
                                    </div>
                                    <span class="p-3 bg-amber-500/10 text-amber-400 rounded-xl font-mono text-sm">⏳</span>
                                </div>
                                <div class="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Delivered Orders</span>
                                        <h4 class="text-2xl font-bold font-outfit text-emerald-400 mt-2">{statusCounts.delivered}</h4>
                                    </div>
                                    <span class="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl font-mono text-sm">🚚</span>
                                </div>
                                <div class="bg-slate-900 border border-slate-800/80 p-5 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <span class="text-xs font-mono uppercase tracking-wider text-slate-400">Return Requests</span>
                                        <h4 class="text-2xl font-bold font-outfit text-rose-400 mt-2">{statusCounts.returned}</h4>
                                    </div>
                                    <span class="p-3 bg-rose-500/10 text-rose-400 rounded-xl font-mono text-sm">🔄</span>
                                </div>
                            </div>

                            {/* Filters & Transaction table */}
                            <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                                <div class="px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                                    <h4 class="font-bold text-white">Captured Split Payments & Orders</h4>
                                    
                                    {/* Status Filters */}
                                    <div class="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
                                        {['All', 'Pending', 'Delivered', 'Return Requested'].map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => setStatusFilter(filter)}
                                                class={`px-3 py-1.5 rounded-lg transition-all ${statusFilter === filter ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                                            >
                                                {filter}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div class="overflow-x-auto">
                                    <table class="w-full text-left text-sm text-slate-300">
                                        <thead class="bg-slate-950 text-slate-400 text-xs font-mono">
                                            <tr>
                                                <th class="px-6 py-3">Order ID</th>
                                                <th class="px-6 py-3">Customer</th>
                                                <th class="px-6 py-3">Total Capture</th>
                                                <th class="px-6 py-3">Platform Fee Split</th>
                                                <th class="px-6 py-3">Net Vendor Proceeds</th>
                                                <th class="px-6 py-3">Status</th>
                                                <th class="px-6 py-3">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-slate-800 text-xs font-mono">
                                            {filteredOrders.map(o => (
                                                <tr key={o.id} class="hover:bg-slate-800/30">
                                                    <td class="px-6 py-3 text-slate-500 font-semibold">{o.id}</td>
                                                    <td class="px-6 py-3 text-white font-sans font-medium">{o.customerName}</td>
                                                    <td class="px-6 py-3 font-bold text-white">₹{o.totalAmount.toFixed(2)}</td>
                                                    <td class="px-6 py-3 text-rose-400">₹{o.platformCommission.toFixed(2)}</td>
                                                    <td class="px-6 py-3 text-emerald-400">₹{o.vendorShare.toFixed(2)}</td>
                                                    <td class="px-6 py-3">
                                                        <select
                                                            value={o.status}
                                                            onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                                                            class={`bg-slate-950 border rounded-lg px-2 py-1 text-[11px] font-sans focus:outline-none focus:border-indigo-500 cursor-pointer font-medium ${
                                                                o.status === 'Delivered' ? 'text-emerald-400 border-emerald-800' :
                                                                o.status === 'Return Requested' ? 'text-rose-400 border-rose-800' : 'text-amber-400 border-amber-800'
                                                            }`}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Delivered">Delivered</option>
                                                            <option value="Return Requested">Return Requested</option>
                                                        </select>
                                                    </td>
                                                    <td class="px-6 py-3 text-slate-400">{o.date}</td>
                                                </tr>
                                            ))}
                                            {filteredOrders.length === 0 && (
                                                <tr>
                                                    <td colspan="7" class="px-6 py-8 text-center text-slate-500 font-sans">No orders match this status filter.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Product Create/Edit Modal */}
                    {showProdModal && (
                        <div class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                            <div class="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
                                <div class="px-6 py-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                                    <h4 class="font-bold text-lg font-outfit text-white">{prodEditMode ? 'Modify Product Listing' : 'List New Product'}</h4>
                                    <button onClick={() => setShowProdModal(false)} class="text-slate-400 hover:text-white">&times;</button>
                                </div>
                                
                                <form onSubmit={handleSaveProduct} class="p-6 space-y-4">
                                    <div>
                                        <label class="block text-xs font-mono text-slate-400 uppercase mb-2">Product Name</label>
                                        <input 
                                            type="text" 
                                            value={productForm.name} 
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            required
                                            placeholder="e.g. Vintage Leather Jacket" 
                                            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        />
                                    </div>

                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-xs font-mono text-slate-400 uppercase mb-2">Price (₹)</label>
                                            <input 
                                                type="number" 
                                                step="0.01"
                                                min="0.01"
                                                value={productForm.price} 
                                                onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                                                required
                                                placeholder="99.99" 
                                                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                            />
                                        </div>
                                        <div>
                                            <label class="block text-xs font-mono text-slate-400 uppercase mb-2">Inventory Stock</label>
                                            <input 
                                                type="number" 
                                                min="0"
                                                value={productForm.stock} 
                                                onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) })}
                                                required
                                                class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-xs font-mono text-slate-400 uppercase mb-2">Product Description</label>
                                        <textarea 
                                            value={productForm.description} 
                                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                            rows="3"
                                            placeholder="Provide specifications of the item..." 
                                            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label class="block text-xs font-mono text-slate-400 uppercase mb-2">Image URL</label>
                                        <input 
                                            type="text" 
                                            value={productForm.imageUrl} 
                                            onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                                            placeholder="https://images.unsplash.com/..." 
                                            class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                        />
                                    </div>

                                    <div class="flex justify-end gap-3 pt-4 border-t border-slate-800">
                                        <button 
                                            type="button" 
                                            onClick={() => setShowProdModal(false)}
                                            class="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            class="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
                                        >
                                            {prodEditMode ? 'Modify Item' : 'List Item'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            );
        }

        // --- PUBLIC CUSTOMER STOREFRONT COMPONENT ---
