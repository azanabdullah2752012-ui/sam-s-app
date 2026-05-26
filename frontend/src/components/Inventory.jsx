import React, { useState } from 'react';
import Scroll3DWrapper from './Scroll3DWrapper';

const Inventory = ({ inventory, setInventory }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState(1);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const existing = inventory.find(i => i.name.toLowerCase() === newItemName.toLowerCase());
    if (existing) {
      // Update quantity
      setInventory(inventory.map(item => 
        item.id === existing.id 
          ? { ...item, quantity: item.quantity + parseInt(newItemQty) } 
          : item
      ));
    } else {
      // Add new item
      setInventory([...inventory, {
        id: Date.now(),
        name: newItemName,
        quantity: parseInt(newItemQty)
      }]);
    }
    
    setNewItemName('');
    setNewItemQty(1);
  };

  const updateQuantity = (id, delta) => {
    setInventory(inventory.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0)); // Auto-remove if 0
  };

  const removeItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-32 z-10 relative overflow-hidden">
      <Scroll3DWrapper className="text-center mb-16 max-w-4xl px-4">
        <h2 className="text-5xl font-bold mb-6 tracking-tight">Digital Stockroom 📦</h2>
        <p className="text-lg text-white/60 leading-relaxed">
          Maintain absolute control over your physical resources. Log your gathered recyclables, track their quantities in real-time, and deploy them strategically into your DIY projects. Your inventory is automatically saved and synchronized to your local vault.
        </p>
      </Scroll3DWrapper>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* Add Item Form */}
        <Scroll3DWrapper className="md:col-span-1 h-fit">
          <div className="glass p-10 rounded-3xl border border-neoBorder hover-lift relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-neoAccent/10 rounded-br-full group-hover:bg-neoAccent/20 transition-colors blur-xl pointer-events-none"></div>
            <h3 className="font-bold text-2xl mb-8 relative z-10">Intake Logistics</h3>
            <form onSubmit={handleAddItem} className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Material Designation</label>
                <input 
                  type="text" 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Toilet Paper Rolls"
                  className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-xl text-sm outline-none input-glow"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Quantity to Log</label>
                <input 
                  type="number" 
                  min="1"
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(e.target.value)}
                  className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-4 rounded-xl text-sm outline-none input-glow"
                  required
                />
              </div>
              <button type="submit" className="w-full py-4 mt-4 bg-button-gradient border border-neoAccent/40 font-bold rounded-xl text-sm btn-spring flex justify-center items-center gap-2">
                <span className="text-lg">➕</span> Add to Stockroom
              </button>
            </form>
          </div>
        </Scroll3DWrapper>

        {/* Inventory List */}
        <Scroll3DWrapper className="md:col-span-2">
          <div className="glass p-10 rounded-3xl border border-neoBorder hover-lift relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-neoBlue/5 rounded-bl-full group-hover:bg-neoBlue/10 transition-colors blur-2xl pointer-events-none"></div>
            
            <h3 className="font-bold text-2xl mb-8 flex items-center justify-between relative z-10">
              Active Stock Reserves
              <span className="text-xs font-mono text-neoBlue bg-neoBlue/10 border border-neoBlue/20 px-4 py-2 rounded-full">{inventory.length} Unique Items</span>
            </h3>
            
            {inventory.length === 0 ? (
              <div className="py-20 text-center text-white/40 border border-dashed border-white/10 rounded-2xl relative z-10">
                Your stockroom is empty. Deploy intake logistics to begin.
              </div>
            ) : (
              <div className="flex flex-col gap-4 relative z-10">
                {inventory.map(item => (
                  <div key={item.id} className="bg-[rgba(20,9,30,0.4)] p-5 rounded-2xl border border-neoBorder flex items-center justify-between transition-colors hover:bg-[rgba(20,9,30,0.6)]">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                        <span className="text-neoBlue font-bold text-lg">{item.quantity}</span>
                      </div>
                      <span className="font-bold text-white text-lg tracking-wide">{item.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition btn-spring text-lg"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition btn-spring text-lg"
                      >
                        +
                      </button>
                      <div className="w-px h-8 bg-white/10 mx-2"></div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/20 transition btn-spring"
                        title="Delete Item"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Scroll3DWrapper>

      </div>
    </div>
  );
};

export default Inventory;
