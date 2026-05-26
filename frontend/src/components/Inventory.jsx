import React, { useState } from 'react';

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
    <div className="w-full min-h-screen flex flex-col items-center pt-32 pb-20 z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight">Maker Inventory 📦</h2>
        <p className="text-sm text-white/60">Keep track of the recyclable materials you have in stock.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Add Item Form */}
        <div className="glass p-8 rounded-2xl border border-neoBorder h-fit md:col-span-1">
          <h3 className="font-bold text-xl mb-6">Add Material</h3>
          <form onSubmit={handleAddItem} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/60">Material Name</label>
              <input 
                type="text" 
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="e.g. Toilet Paper Rolls"
                className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-3 rounded-lg text-sm outline-none focus:border-neoBlue"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-white/60">Quantity</label>
              <input 
                type="number" 
                min="1"
                value={newItemQty}
                onChange={(e) => setNewItemQty(e.target.value)}
                className="bg-[rgba(20,9,30,0.5)] border border-neoBorder p-3 rounded-lg text-sm outline-none focus:border-neoBlue"
                required
              />
            </div>
            <button type="submit" className="w-full py-3 mt-2 bg-button-gradient border border-neoAccent/40 hover:bg-white/5 font-semibold rounded-lg text-sm transition">
              Add to Stock
            </button>
          </form>
        </div>

        {/* Inventory List */}
        <div className="md:col-span-2 glass p-8 rounded-2xl border border-neoBorder">
          <h3 className="font-bold text-xl mb-6 flex items-center justify-between">
            Current Stock
            <span className="text-xs font-normal text-white/40 bg-white/5 px-3 py-1 rounded-full">{inventory.length} Unique Items</span>
          </h3>
          
          {inventory.length === 0 ? (
            <div className="py-12 text-center text-white/40 border border-dashed border-white/10 rounded-xl">
              Your inventory is empty. Add some recyclables!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {inventory.map(item => (
                <div key={item.id} className="bg-[rgba(20,9,30,0.4)] p-4 rounded-xl border border-neoBorder flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                      <span className="text-neoBlue font-bold">{item.quantity}</span>
                    </div>
                    <span className="font-medium text-white/90">{item.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/30 text-red-400 border border-red-500/20 transition ml-2"
                      title="Delete Item"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Inventory;
