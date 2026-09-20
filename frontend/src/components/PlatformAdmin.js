const { useState, useEffect, useMemo, useRef } = React;

function PlatformAdmin({ vendors, products, orders, addVendor, updateVendor, deleteVendor, navigateToStore }) {
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    // Form state
    const [vendorForm, setVendorForm] = useState({ id: '', name: '', subdomain: '', customDomain: '', commissionRate: 5, templateId: 1, logoUrl: '' });

    // Stats calculation
    const stats = useMemo(() => {
        const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        const totalComm = orders.reduce((sum, o) => sum + o.platformCommission, 0);
        return {
            vendorsCount: vendors.length,
            productsCount: products.length,
            sales: totalSales.toFixed(2),
            commission: totalComm.toFixed(2)
        };
    }, [vendors, products, orders]);

    const handleOpenAdd = () => {
        setVendorForm({ id: '', name: '', subdomain: '', customDomain: '', commissionRate: 5, templateId: 1, logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=60' });
        setEditMode(false);
        setShowModal(true);
    };

    const handleOpenEdit = (v) => {
        setVendorForm(v);
        setEditMode(true);
        setShowModal(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!vendorForm.name || !vendorForm.subdomain) return;
        
        if (editMode) {
            updateVendor(vendorForm);
        } else {
            addVendor(vendorForm);
        }
        setShowModal(false);
    };

    return (
        <div class="max-w-7xl mx-auto px-8 py-12 animate-fade-in font-sans text-zinc-100 selection:bg-indigo-500 selection:text-white">
            
            {/* Header Section with B2B Whitespace */}
            <div class="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-zinc-800/80 mb-12 gap-6">
                <div class="space-y-1">
                    <h2 class="text-2xl font-bold tracking-tight text-white">Platform Control Console</h2>
                    <p class="text-zinc-500 text-xs font-light">Global configurations for isolated schemas, DNS mapping, and transaction splits.</p>
                </div>
                <button 
                    onClick={handleOpenAdd}
                    class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-lg border border-indigo-600 transition-colors shadow-sm self-start md:self-auto flex items-center gap-2"
                >
                    <Icon name="plus" className="w-3.5 h-3.5" />
                    Onboard Tenant
                </button>
            </div>

            {/* Metrics Grid with Linear styling (no glows, thin borders, lots of space) */}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div class="bg-[#121318] border border-zinc-800 p-6 rounded-xl space-y-3">
                    <span class="block text-[10px] font-mono tracking-widest uppercase text-zinc-400">Total Active Tenants</span>
                    <h3 class="text-3xl font-bold text-white tracking-tight">{stats.vendorsCount}</h3>
                    <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 rounded-full w-2/5"></div>
                    </div>
                    <span class="block text-[9px] font-mono text-zinc-500 uppercase">RLS schema separation active</span>
                </div>

                <div class="bg-[#121318] border border-zinc-800 p-6 rounded-xl space-y-3">
                    <span class="block text-[10px] font-mono tracking-widest uppercase text-zinc-400">Products Cataloged</span>
                    <h3 class="text-3xl font-bold text-white tracking-tight">{stats.productsCount}</h3>
                    <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full bg-indigo-500 rounded-full w-3/5"></div>
                    </div>
                    <span class="block text-[9px] font-mono text-zinc-500 uppercase">Shared repository boundaries</span>
                </div>

                <div class="bg-[#121318] border border-zinc-800 p-6 rounded-xl space-y-3">
                    <span class="block text-[10px] font-mono tracking-widest uppercase text-zinc-400">Transaction Volume</span>
                    <h3 class="text-3xl font-bold text-white tracking-tight">₹{stats.sales}</h3>
                    <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full bg-emerald-500 rounded-full w-1/2"></div>
                    </div>
                    <span class="block text-[9px] font-mono text-emerald-500 uppercase">Ledger dispatches settled</span>
                </div>

                <div class="bg-[#121318] border border-zinc-800 p-6 rounded-xl space-y-3">
                    <span class="block text-[10px] font-mono tracking-widest uppercase text-zinc-400">Platform Commission</span>
                    <h3 class="text-3xl font-bold text-white tracking-tight">₹{stats.commission}</h3>
                    <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full bg-amber-500 rounded-full w-1/4"></div>
                    </div>
                    <span class="block text-[9px] font-mono text-amber-500 uppercase">Weighted Platform fee</span>
                </div>
            </div>

            {/* Registered Tenants List */}
            <div class="bg-[#121318] border border-zinc-800 rounded-xl overflow-hidden shadow-xs">
                <div class="px-6 py-5 border-b border-zinc-800 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <h3 class="font-bold text-sm uppercase tracking-wider text-white">Registered Tenants</h3>
                    <span class="text-[10px] text-zinc-400 bg-zinc-800/80 px-3 py-1.5 rounded font-mono border border-zinc-700/50">
                        COMMISSION SETTLEMENT ENGINE v3.4 ACTIVE
                    </span>
                </div>
                
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-xs text-zinc-300">
                        <thead class="bg-[#181920] text-zinc-400 uppercase tracking-widest font-mono border-b border-zinc-800">
                            <tr>
                                <th class="px-6 py-4 font-semibold">Vendor Info</th>
                                <th class="px-6 py-4 font-semibold">Subdomain Mapping</th>
                                <th class="px-6 py-4 font-semibold">Custom DNS Link</th>
                                <th class="px-6 py-4 font-semibold">Layout Preset</th>
                                <th class="px-6 py-4 font-semibold">Rate</th>
                                <th class="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-zinc-850">
                            {vendors.map(v => (
                                <tr key={v.id} class="hover:bg-zinc-800/20 transition-colors">
                                    <td class="px-6 py-4 font-bold text-white flex items-center gap-3">
                                        <img src={v.logoUrl} class="w-9 h-9 rounded object-cover border border-zinc-800" />
                                        {v.name}
                                    </td>
                                    <td class="px-6 py-4 font-mono text-zinc-400">
                                        {v.subdomain}.vendorhood.com
                                    </td>
                                    <td class="px-6 py-4 font-mono text-zinc-400">
                                        {v.customDomain || <span class="italic text-zinc-600">None</span>}
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] border border-zinc-700 font-mono">
                                            {v.templateId === 3 ? "Sand Editorial" : v.templateId === 4 ? "Swiss Grid" : "Default"}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 font-mono font-bold text-emerald-400">
                                        {v.commissionRate}%
                                    </td>
                                    <td class="px-6 py-4">
                                        <div class="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => navigateToStore(v)}
                                                class="p-2 bg-zinc-800/50 hover:bg-indigo-600 hover:text-white border border-zinc-700/50 rounded transition-colors text-indigo-400"
                                                title="Launch Storefront"
                                            >
                                                <Icon name="external" className="w-3.5 h-3.5" />
                                            </button>
                                            <button 
                                                onClick={() => handleOpenEdit(v)}
                                                class="p-2 bg-zinc-800/50 hover:bg-amber-600 hover:text-white border border-zinc-700/50 rounded transition-colors text-amber-400"
                                                title="Edit Settings"
                                            >
                                                <Icon name="edit" className="w-3.5 h-3.5" />
                                            </button>
                                            <button 
                                                onClick={() => { if (confirm(`Confirm deletion of tenant ${v.name}?`)) deleteVendor(v.id); }}
                                                class="p-2 bg-zinc-800/50 hover:bg-rose-600 hover:text-white border border-zinc-700/50 rounded transition-colors text-rose-400"
                                                title="Delete Tenant"
                                            >
                                                <Icon name="trash" className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* B2B SaaS Form Modal */}
            {showModal && (
                <div class="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
                    <div class="bg-[#121318] border border-zinc-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
                        <div class="px-6 py-4 bg-[#181920] border-b border-zinc-800 flex justify-between items-center">
                            <h4 class="font-bold text-sm uppercase tracking-wider text-white">{editMode ? 'Edit Tenant Properties' : 'Onboard SaaS Tenant'}</h4>
                            <button onClick={() => setShowModal(false)} class="text-zinc-400 hover:text-white text-lg">&times;</button>
                        </div>
                        
                        <form onSubmit={handleSave} class="p-6 space-y-4 text-xs">
                            <div>
                                <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-2">Vendor Name</label>
                                <input 
                                    type="text" 
                                    value={vendorForm.name} 
                                    onChange={(e) => setVendorForm({ ...vendorForm, name: e.target.value })}
                                    required
                                    placeholder="e.g. Vintage Apparel" 
                                    class="w-full bg-[#0D0E12] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                />
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-2">Subdomain Key</label>
                                    <input 
                                        type="text" 
                                        value={vendorForm.subdomain} 
                                        onChange={(e) => setVendorForm({ ...vendorForm, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') })}
                                        required
                                        placeholder="e.g. vintage" 
                                        class="w-full bg-[#0D0E12] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                    />
                                </div>
                                <div>
                                    <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-2">Platform Fee (%)</label>
                                    <input 
                                        type="number" 
                                        min="1" 
                                        max="30" 
                                        step="0.5"
                                        value={vendorForm.commissionRate} 
                                        onChange={(e) => setVendorForm({ ...vendorForm, commissionRate: parseFloat(e.target.value) })}
                                        required
                                        class="w-full bg-[#0D0E12] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-2">Custom Domain Alias</label>
                                <input 
                                    type="text" 
                                    value={vendorForm.customDomain} 
                                    onChange={(e) => setVendorForm({ ...vendorForm, customDomain: e.target.value })}
                                    placeholder="e.g. www.vintagestore.com" 
                                    class="w-full bg-[#0D0E12] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                                />
                            </div>

                            <div>
                                <label class="block text-[10px] font-mono text-zinc-400 uppercase mb-2">Default Layout Blueprint</label>
                                <select 
                                    value={vendorForm.templateId} 
                                    onChange={(e) => setVendorForm({ ...vendorForm, templateId: parseInt(e.target.value) })}
                                    class="w-full bg-[#0D0E12] border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                >
                                    <option value="1">Studio Ivory Serif</option>
                                    <option value="2">Stark Dark Mono</option>
                                    <option value="3">Warm Editorial Sand</option>
                                    <option value="4">Stark Swiss Grid</option>
                                    <option value="5">Heritage Botanical</option>
                                </select>
                            </div>

                            <div class="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                                <button 
                                    type="button" 
                                    onClick={() => setShowModal(false)}
                                    class="px-4 py-2.5 bg-zinc-800 text-zinc-300 font-bold rounded-lg hover:bg-zinc-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    class="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 transition-colors shadow-sm"
                                >
                                    {editMode ? 'Save Specifications' : 'Onboard Tenant'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
