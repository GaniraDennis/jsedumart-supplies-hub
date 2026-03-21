import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useDbProducts, useAddProduct, useUpdateProduct, useDeleteProduct, type DbProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

const tabs = [
  { id: "overview", label: "Dashboard", icon: "fa-chart-line" },
  { id: "products", label: "Products", icon: "fa-box" },
  { id: "orders", label: "Orders", icon: "fa-shopping-bag" },
  { id: "customers", label: "Customers", icon: "fa-users" },
  { id: "settings", label: "Settings", icon: "fa-gear" },
];

const emptyProduct = {
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

const CATEGORIES = [
  { label: "Art Supplies", sub: "art-supplies" },
  { label: "Writing Instruments", sub: "writing-instruments" },
  { label: "School Stationery", sub: "school-stationery" },
  { label: "Office Supplies", sub: "office-supplies" },
  { label: "Textbooks & Educational", sub: "textbooks" },
  { label: "Exercise Books", sub: "exercise-books" },
];

const mockOrders = [
  { id: "JSE-ABC123", customer: "John Kamau", total: 1280, status: "Processing", date: "2024-01-15" },
  { id: "JSE-DEF456", customer: "Mary Wanjiku", total: 750, status: "Shipped", date: "2024-01-14" },
  { id: "JSE-GHI789", customer: "Peter Odhiambo", total: 430, status: "Delivered", date: "2024-01-13" },
];

const Admin = () => {
  const { user, profile, isAdmin, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProduct);

  const { data: products = [], isLoading: productsLoading } = useDbProducts();
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-accent" />
      </div>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/login" />;

  const displayName = profile?.display_name || user.email?.split("@")[0] || "Admin";

  const openAdd = () => {
    setForm(emptyProduct);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (p: DbProduct) => {
    setForm({
      name: p.name,
      price: p.price,
      old_price: p.old_price,
      image: p.image,
      category: p.category,
      subcategory: p.subcategory,
      badge: p.badge,
      description: p.description,
      in_stock: p.in_stock,
      rating: p.rating,
      reviews: p.reviews,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.image) {
      toast.error("Name and image URL are required");
      return;
    }
    try {
      if (editingId) {
        await updateProduct.mutateAsync({ id: editingId, ...form });
        toast.success("Product updated!");
      } else {
        await addProduct.mutateAsync(form);
        toast.success("Product added!");
      }
      setShowForm(false);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const setCategory = (label: string) => {
    const cat = CATEGORIES.find((c) => c.label === label);
    setForm({ ...form, category: label, subcategory: cat?.sub || "" });
  };

  const inp = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50";

  return (
    <div className="flex h-screen bg-surface">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-primary text-primary-foreground flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <i className="fa-solid fa-book-open text-accent-foreground" />
          </div>
          {sidebarOpen && <span className="font-display font-bold">JSEdumart Admin</span>}
        </div>
        <nav className="flex-1 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                activeTab === tab.id ? "bg-primary-foreground/10 border-r-2 border-accent" : "hover:bg-primary-foreground/5"
              }`}
            >
              <i className={`fa-solid ${tab.icon} w-5 text-center`} />
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-foreground/10">
          <button onClick={logout} className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100">
            <i className="fa-solid fa-right-from-bracket" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card shadow-sm px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-muted">
              <i className="fa-solid fa-bars" />
            </button>
            <h1 className="font-display text-lg font-bold capitalize">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{displayName}</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold">A</div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Sales", value: "KSh 125,430", icon: "fa-coins", color: "text-success" },
                  { label: "Total Orders", value: "342", icon: "fa-shopping-bag", color: "text-accent" },
                  { label: "Total Customers", value: "1,205", icon: "fa-users", color: "text-warning" },
                  { label: "Total Products", value: products.length.toString(), icon: "fa-box", color: "text-orange" },
                ].map((s) => (
                  <div key={s.label} className="bg-card rounded-xl shadow-card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{s.label}</span>
                      <i className={`fa-solid ${s.icon} ${s.color}`} />
                    </div>
                    <p className="font-display text-2xl font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-card rounded-xl shadow-card p-6">
                <h3 className="font-display font-bold mb-4"><i className="fa-solid fa-clock-rotate-left mr-2 text-accent" />Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border"><th className="text-left py-3 px-2 text-muted-foreground font-medium">Order ID</th><th className="text-left py-3 px-2 text-muted-foreground font-medium">Customer</th><th className="text-left py-3 px-2 text-muted-foreground font-medium">Total</th><th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th><th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th></tr></thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-2 font-mono text-xs">{order.id}</td>
                          <td className="py-3 px-2">{order.customer}</td>
                          <td className="py-3 px-2 font-semibold">KSh {order.total.toLocaleString()}</td>
                          <td className="py-3 px-2"><span className={`px-2 py-1 rounded-lg text-xs font-semibold ${order.status === "Delivered" ? "bg-success/10 text-success" : order.status === "Shipped" ? "bg-accent/10 text-accent" : "bg-warning/10 text-warning"}`}>{order.status}</span></td>
                          <td className="py-3 px-2 text-muted-foreground">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {activeTab === "products" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-muted-foreground">{products.length} products</p>
                <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  <i className="fa-solid fa-plus" /> Add Product
                </button>
              </div>

              {/* Product form modal */}
              {showForm && (
                <div className="fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                  <div className="bg-card rounded-xl shadow-card-hover w-full max-w-lg max-h-[90vh] overflow-auto p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
                    <h3 className="font-display font-bold text-lg">{editingId ? "Edit Product" : "Add New Product"}</h3>
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
                      <button onClick={handleSave} disabled={addProduct.isPending || updateProduct.isPending} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50">
                        {addProduct.isPending || updateProduct.isPending ? <i className="fa-solid fa-spinner fa-spin mr-2" /> : null}
                        {editingId ? "Update" : "Add"} Product
                      </button>
                      <button onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg font-semibold text-sm border border-border hover:bg-muted transition-colors">Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {productsLoading ? (
                <div className="flex justify-center py-12"><i className="fa-solid fa-spinner fa-spin text-2xl text-accent" /></div>
              ) : (
                <div className="bg-card rounded-xl shadow-card overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/50">
                        <th className="text-left py-3 px-4 font-medium">Product</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium">Price</th>
                        <th className="text-left py-3 px-4 font-medium">Stock</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-contain bg-surface" />
                              <span className="font-medium">{p.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{p.category}</td>
                          <td className="py-3 px-4 font-semibold">KSh {p.price}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${p.in_stock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                              {p.in_stock ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted text-accent"><i className="fa-solid fa-pen-to-square" /></button>
                              <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-muted text-destructive"><i className="fa-solid fa-trash" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-display font-bold mb-4">All Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border"><th className="text-left py-3 px-2 font-medium">Order ID</th><th className="text-left py-3 px-2 font-medium">Customer</th><th className="text-left py-3 px-2 font-medium">Total</th><th className="text-left py-3 px-2 font-medium">Status</th></tr></thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50">
                        <td className="py-3 px-2 font-mono text-xs">{order.id}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2 font-semibold">KSh {order.total.toLocaleString()}</td>
                        <td className="py-3 px-2">
                          <select className="px-2 py-1 rounded border border-border text-xs bg-background">
                            <option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {activeTab === "customers" && (
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-display font-bold mb-4">Customer List</h3>
              <div className="space-y-3">
                {["John Kamau", "Mary Wanjiku", "Peter Odhiambo"].map((name, i) => (
                  <div key={name} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">{name[0]}</div>
                      <div>
                        <p className="font-semibold text-sm">{name}</p>
                        <p className="text-xs text-muted-foreground">{name.toLowerCase().replace(" ", ".")}@email.com</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{i + 1} orders</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-6">
              {[
                { title: "Payment Methods", fields: [{ label: "M-Pesa Till Number", value: "123456" }, { label: "Accept Cash on Delivery", value: "Yes" }] },
                { title: "Shipping", fields: [{ label: "Standard Delivery Fee", value: "KSh 150" }, { label: "Free Delivery Threshold", value: "KSh 5,000" }] },
                { title: "Store Info", fields: [{ label: "Currency", value: "KSh (Kenyan Shilling)" }, { label: "Tax Rate", value: "16% VAT" }] },
                { title: "Contact", fields: [{ label: "WhatsApp", value: "0748 332 788" }, { label: "Email", value: "jsbookshop4@gmail.com" }] },
              ].map((section) => (
                <div key={section.title} className="bg-card rounded-xl shadow-card p-6">
                  <h3 className="font-display font-bold mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.fields.map((f) => (
                      <div key={f.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm text-muted-foreground">{f.label}</span>
                        <span className="text-sm font-medium">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
