import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

const CATEGORIES = [
  { value: 'signature', label: 'Signature' },
  { value: 'classic', label: 'Classic' },
  { value: 'mocktail', label: 'Mocktail' },
  { value: 'shots', label: 'Shots' },
  { value: 'wine_spirits', label: 'Wine & Spirits' },
];

const ALCOHOL = [
  { value: 'alcoholic', label: 'Alkohol' },
  { value: 'non_alcoholic', label: 'Bez alkohola' },
  { value: 'low_alcohol', label: 'Malo alkohola' },
];

const EMPTY_FORM = {
  name: '',
  category: 'signature',
  description: '',
  ingredients: '',
  price: '',
  image_url: '',
  is_featured: false,
  is_available: true,
  alcohol_content: 'alcoholic',
};

export default function AdminMenu() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterCat, setFilterCat] = useState('all');

  const { data: items = [] } = useQuery({
    queryKey: ['admin-menu'],
    queryFn: () => base44.entities.MenuItem.list(),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.MenuItem.create({ ...data, price: Number(data.price) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-menu'] }); closeForm(); },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.MenuItem.update(id, { ...data, price: Number(data.price) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin-menu'] }); closeForm(); },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.MenuItem.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-menu'] }),
  });

  const openCreate = () => { setEditing(null); setForm(EMPTY_FORM); setShowForm(true); };
  const openEdit = (item) => { setEditing(item); setForm({ ...item, price: String(item.price) }); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY_FORM); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) updateMutation.mutate({ id: editing.id, data: form });
    else createMutation.mutate(form);
  };

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl">Meni — Kokteli</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/85 transition-all"
        >
          <Plus size={16} /> Dodaj koktel
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCat('all')}
          className={`px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase font-semibold transition-all ${filterCat === 'all' ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}
        >
          Sve ({items.length})
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilterCat(cat.value)}
            className={`px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase font-semibold transition-all ${filterCat === cat.value ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'}`}
          >
            {cat.label} ({items.filter(i => i.category === cat.value).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/30 text-left">
              <th className="px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Naziv</th>
              <th className="px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-semibold hidden sm:table-cell">Kategorija</th>
              <th className="px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-semibold">Cena</th>
              <th className="px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-semibold hidden md:table-cell">Status</th>
              <th className="px-4 py-3 text-xs tracking-widest uppercase text-muted-foreground font-semibold text-right">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">Nema koktela. Dodaj novi!</td></tr>
            )}
            {filtered.map((item) => (
              <tr key={item.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-semibold">
                  {item.name}
                  {item.is_featured && <span className="ml-2 text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">★ Featured</span>}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs tracking-wider uppercase text-muted-foreground">
                    {CATEGORIES.find(c => c.value === item.category)?.label || item.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-primary font-bold">{item.price?.toLocaleString()} RSD</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`text-xs px-2 py-1 rounded-full ${item.is_available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {item.is_available ? 'Dostupno' : 'Nedostupno'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => deleteMutation.mutate(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/20 text-muted-foreground hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl">{editing ? 'Izmeni koktel' : 'Dodaj koktel'}</h2>
              <button onClick={closeForm} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Naziv *</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                  placeholder="npr. Tropical Storm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Kategorija</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                  >
                    {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Cena (RSD) *</label>
                  <input
                    required
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                    placeholder="1200"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Opis</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60 resize-none"
                  rows={2}
                  placeholder="Kratki opis koktela..."
                />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Sastojci</label>
                <input
                  value={form.ingredients}
                  onChange={e => setForm({ ...form, ingredients: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                  placeholder="Rum, limeta, šećer, menta"
                />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">URL slike</label>
                <input
                  value={form.image_url}
                  onChange={e => setForm({ ...form, image_url: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-xs tracking-wider uppercase text-muted-foreground block mb-1">Sadržaj alkohola</label>
                <select
                  value={form.alcohol_content}
                  onChange={e => setForm({ ...form, alcohol_content: e.target.value })}
                  className="w-full bg-secondary/50 border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary/60"
                >
                  {ALCOHOL.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.is_featured} onChange={e => setForm({ ...form, is_featured: e.target.checked })} className="accent-primary" />
                  <span className="text-muted-foreground">Featured (istaknuto)</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.is_available} onChange={e => setForm({ ...form, is_available: e.target.checked })} className="accent-primary" />
                  <span className="text-muted-foreground">Dostupno</span>
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm} className="flex-1 px-4 py-2.5 border border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all">
                  Otkaži
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/85 transition-all flex items-center justify-center gap-2">
                  <Check size={15} /> {editing ? 'Sačuvaj' : 'Dodaj'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}