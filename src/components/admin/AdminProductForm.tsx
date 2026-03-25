import { useState, useEffect } from "react";
import { useAddProduct, useUpdateProduct, type DbProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

const CATEGORIES = [
  { label: "Art Supplies", sub: "art-supplies" },
  { label: "Writing Instruments", sub: "writing-instruments" },
  { label: "School Stationery", sub: "school-stationery" },
  { label: "Office Supplies", sub: "office-supplies" },
  { label: "Textbooks & Educational", sub: "textbooks" },
  { label: "Exercise Books", sub: "exercise-books" },
  { label: "Novels", sub: "novels" },
  { label: "Office Equipment", sub: "office-equipment" },
];

const emptyForm = {
  name: "",
  price: 0,
  old_price: null as number | null,
  image: "",
  category: "",
  subcategory: "",
  badge: null as string | null,
  description: "",
  in_stock: true,
  rating: 0,
  reviews: 0,
};

interface Props {
  editing: DbProduct | null;
  onClose: () => void;
}

const AdminProductForm = ({ editing, onClose }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        price: editing.price,
        old_price: editing.old_price,
        image: editing.image,
        category: editing.category,
        subcategory: editing.subcategory,
        badge: editing.badge,
        description: editing.description,
        in_stock: editing.in_stock,
        rating: editing.rating,
        reviews: editing.reviews,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editing]);

  const setCategory = (label: string) => {
    const cat = CATEGORIES.find((c) => c.label === label);
    setForm({ ...form, category: label, subcategory: cat?.sub || "" });
  };

  const handleSave = async () => {
    if (!form.name || !form.image) {
      toast.error("Name and image URL are required");
      return;
    }
    try {
      if (editing) {
        await updateProduct.mutateAsync({ id: editing.id, ...form });
        toast.success("Product updated!");
      } else {
        await addProduct.mutateAsync(form);
        toast.success("Product added!");
      }
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const inp = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50";
  const isPending = addProduct.isPending || updateProduct.isPending;

  return (
    <div className="fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-card-hover w-full max-w-lg max-h-[90vh] overflow-auto p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-display font-bold text-lg">
          <i className={`fa-solid ${editing ? "fa-pen-to-square" : "fa-plus"} mr-2 text-accent`} />
          {editing ? "Edit Product" : "Add New Product"}
        </h3>
        <div>
          <label className="text-sm font-medium mb-1 block">Product Name *</label>
          <input className={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. HB Pencils" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Price (KSh) *</label>
            <input type="number" className={inp} value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Old Price</label>
            <input type="number" className={inp} value={form.old_price ?? ""} onChange={(e) => setForm({ ...form, old_price: e.target.value ? +e.target.value : null })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Image URL *</label>
          <input className={inp} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          {form.image && <img src={form.image} alt="" className="mt-2 w-20 h-20 rounded-lg object-contain bg-surface" />}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <select className={inp} value={form.category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select</option>
              {CATEGORIES.map((c) => <option key={c.sub} value={c.label}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Badge</label>
            <input className={inp} value={form.badge ?? ""} onChange={(e) => setForm({ ...form, badge: e.target.value || null })} placeholder="e.g. New Arrival" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Description</label>
          <textarea className={inp + " resize-none"} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="accent-accent" /> In Stock
          </label>
        </div>
        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} disabled={isPending} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
            {isPending && <i className="fa-solid fa-spinner fa-spin mr-2" />}
            {editing ? "Update" : "Add"} Product
          </button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg font-semibold text-sm border border-border hover:bg-muted transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductForm;
