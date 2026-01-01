import React, { useState } from 'react';
import { Utensils, Star, Clock, Plus, Minus, Search, Leaf, Coffee, Pizza, Cookie } from 'lucide-react';

export const Canteen: React.FC = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [activeCat, setActiveCat] = useState('Breakfast');

  const menu = [
    { id: '1', name: 'Pure Veg Thali', price: 60, time: '15m', cal: '650', rating: 4.8, cat: 'Lunch', desc: '4 Chapatis, 2 Veggies, Dal, Rice, Salad & Sweet' },
    { id: '2', name: 'Aloo Paratha', price: 35, time: '10m', cal: '320', rating: 4.6, cat: 'Breakfast', desc: '2 Spiced Potato Parathas with Curd and Pickle' },
    { id: '3', name: 'Special Misal Pav', price: 50, time: '8m', cal: '550', rating: 4.7, cat: 'Breakfast', desc: 'Spicy moth bean curry with farsan and 2 pav' },
    { id: '4', name: 'Masala Dosa', price: 45, time: '12m', cal: '380', rating: 4.5, cat: 'Breakfast', desc: 'Crispy rice crepe with potato filling and chutney' },
    { id: '5', name: 'Vada Pav (2pcs)', price: 30, time: '5m', cal: '400', rating: 4.9, cat: 'Snacks', desc: 'Mumbai style spicy potato fritter in bun' },
    { id: '6', name: 'Cold Coffee', price: 25, time: '3m', cal: '180', rating: 4.4, cat: 'Beverages', desc: 'Creamy chilled coffee with chocolate drizzle' }
  ];

  const categories = [
    { name: 'Breakfast', icon: Coffee },
    { name: 'Lunch', icon: Utensils },
    { name: 'Snacks', icon: Cookie },
    { name: 'Beverages', icon: Coffee }
  ];

  const updateCart = (id: string, delta: number) => {
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (Number(prev[id]) || 0) + delta)
    }));
  };

  const calculateTotal = (): number => {
    let total = 0;
    // Safer iteration to avoid type inference issues with Object.entries in some environments
    for (const itemId in cart) {
      if (Object.prototype.hasOwnProperty.call(cart, itemId)) {
        const qty = cart[itemId];
        const item = menu.find(m => m.id === itemId);
        if (item && qty > 0) {
          total += Number(item.price) * Number(qty);
        }
      }
    }
    return total;
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-120px)]">
      {/* Category Navigation (Left Sidebar) */}
      <aside className="lg:w-24 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
        {categories.map(cat => (
          <button
            key={cat.name}
            onClick={() => setActiveCat(cat.name)}
            className={`flex-1 lg:flex-none flex flex-col items-center justify-center p-4 rounded-3xl transition-all ${
              activeCat === cat.name ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            <cat.icon size={24} />
            <span className="text-[8px] font-black uppercase mt-2 tracking-widest">{cat.name}</span>
          </button>
        ))}
      </aside>

      {/* Main Kiosk Area */}
      <div className="flex-1 space-y-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Leaf className="text-emerald-500" /> NEPTI KITCHEN
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Freshly Prepared • Student Approved</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search cravings..."
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold"
            />
          </div>
        </div>

        {/* Featured Special */}
        <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 relative overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Pizza size={250} />
          </div>
          <div className="relative z-10 max-w-md">
            <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-4 inline-block">Chef's Special Today</span>
            <h2 className="text-4xl font-black text-emerald-900 mb-2 uppercase">Paneer Lababdar</h2>
            <p className="text-emerald-700/70 text-sm font-medium mb-6 italic">Rich, creamy tomato gravy with grilled cottage cheese cubes.</p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Add for ₹85</button>
          </div>
        </div>

        {/* Menu List */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-2">{activeCat} Selection</h3>
          {menu.filter(m => m.cat === activeCat).map(item => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] border border-slate-50 flex flex-col md:flex-row items-center gap-6 group hover:shadow-2xl hover:shadow-emerald-50/50 transition-all border-l-8 border-l-emerald-100 hover:border-l-emerald-500">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100">
                <Utensils className="text-emerald-500/40 w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <h4 className="text-lg font-black text-slate-800 uppercase tracking-tight">{item.name}</h4>
                  <div className="flex items-center gap-1 text-amber-500 text-[10px] font-black">
                    <Star size={10} fill="currentColor" /> {item.rating}
                  </div>
                </div>
                <p className="text-slate-400 text-xs font-medium mb-2">{item.desc}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                  <span className="flex items-center gap-1"><Clock size={12}/> {item.time}</span>
                  <span>•</span>
                  <span>{item.cal} CAL</span>
                </div>
              </div>
              <div className="flex items-center gap-6 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 w-full md:w-auto justify-between md:justify-end">
                <span className="text-2xl font-black text-slate-900">₹{item.price}</span>
                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                  <button onClick={() => updateCart(item.id, -1)} className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"><Minus size={14} /></button>
                  <span className="px-4 text-sm font-black text-slate-800">{cart[item.id] || 0}</span>
                  <button onClick={() => updateCart(item.id, 1)} className="p-2 hover:bg-white rounded-lg transition-colors text-emerald-600"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary Panel */}
      <div className="lg:w-80 space-y-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-10">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">My Order</h3>
          <div className="space-y-6 min-h-[200px] mb-8">
            {Object.keys(cart).filter(id => Number(cart[id]) > 0).length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center pt-10">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                  <Utensils size={24} />
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Tray is empty</p>
              </div>
            ) : (
              Object.entries(cart).map(([id, qty]) => {
                const item = menu.find(m => m.id === id);
                if (!item || Number(qty) === 0) return null;
                const itemQty = Number(qty);
                const itemPrice = Number(item.price);
                return (
                  <div key={id} className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-black text-slate-800 uppercase">{item.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">₹{itemPrice} × {itemQty}</p>
                    </div>
                    <span className="text-sm font-black text-slate-900">₹{itemPrice * itemQty}</span>
                  </div>
                );
              })
            )}
          </div>
          
          <div className="border-t border-dashed border-slate-200 pt-6 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
              <span className="text-sm font-black text-slate-800">
                ₹{calculateTotal()}
              </span>
            </div>
            <div className="flex justify-between items-center text-emerald-600">
              <span className="text-[10px] font-black uppercase tracking-widest">Taxes & Fees</span>
              <span className="text-[10px] font-black">Included</span>
            </div>
          </div>

          <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl transition-all uppercase tracking-[0.2em] text-[10px]">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};