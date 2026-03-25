import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useDbProducts, type DbProduct } from "@/hooks/useProducts";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminSalesChart from "@/components/admin/AdminSalesChart";
import AdminProductTable from "@/components/admin/AdminProductTable";
import AdminProductForm from "@/components/admin/AdminProductForm";

const tabs = [
  { id: "overview", label: "Dashboard", icon: "fa-chart-line" },
  { id: "products", label: "Products", icon: "fa-box" },
  { id: "orders", label: "Orders", icon: "fa-shopping-bag" },
  { id: "customers", label: "Customers", icon: "fa-users" },
  { id: "settings", label: "Settings", icon: "fa-gear" },
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
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);

  const { data: products = [], isLoading: productsLoading } = useDbProducts();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-muted">
        <i className="fa-solid fa-spinner fa-spin text-3xl text-accent" />
      </div>
    );
  }

  // Not authenticated or not admin → show admin login
  if (!user || !isAdmin) {
    return <AdminLogin />;
  }

  const displayName = profile?.display_name || user.email?.split("@")[0] || "Admin";

  const openAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const openEdit = (p: DbProduct) => {
    setEditingProduct(p);
    setShowForm(true);
  };

  const lowStockCount = products.filter((p) => !p.in_stock).length;

  return (
    <div className="flex h-screen bg-muted">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-16"} bg-primary text-primary-foreground flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center shrink-0">
            <i className="fa-solid fa-shield-halved text-accent-foreground" />
          </div>
          {sidebarOpen && <span className="font-display font-bold text-sm">JSEdumart Admin</span>}
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
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              <i className="fa-solid fa-user-shield text-xs" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Sales", value: "KSh 125,430", icon: "fa-coins", color: "text-success", bg: "bg-success/10" },
                  { label: "Total Orders", value: "342", icon: "fa-shopping-bag", color: "text-accent", bg: "bg-accent/10" },
                  { label: "Total Products", value: products.length.toString(), icon: "fa-box", color: "text-warning", bg: "bg-warning/10" },
                  { label: "Out of Stock", value: lowStockCount.toString(), icon: "fa-triangle-exclamation", color: "text-destructive", bg: "bg-destructive/10" },
                ].map((s) => (
                  <div key={s.label} className="bg-card rounded-xl shadow-card p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{s.label}</span>
                      <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center`}>
                        <i className={`fa-solid ${s.icon} ${s.color}`} />
                      </div>
                    </div>
                    <p className="font-display text-2xl font-bold">{s.value}</p>
                  </div>
                ))}
              </div>

              <AdminSalesChart />

              <div className="bg-card rounded-xl shadow-card p-6">
                <h3 className="font-display font-bold mb-4">
                  <i className="fa-solid fa-clock-rotate-left mr-2 text-accent" />
                  Recent Orders
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Order ID</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Customer</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Total</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                        <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-2 font-mono text-xs">{order.id}</td>
                          <td className="py-3 px-2">{order.customer}</td>
                          <td className="py-3 px-2 font-semibold">KSh {order.total.toLocaleString()}</td>
                          <td className="py-3 px-2">
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              order.status === "Delivered" ? "bg-success/10 text-success"
                              : order.status === "Shipped" ? "bg-accent/10 text-accent"
                              : "bg-warning/10 text-warning"
                            }`}>{order.status}</span>
                          </td>
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
                <p className="text-muted-foreground">
                  {products.length} products · {lowStockCount} out of stock
                </p>
                <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  <i className="fa-solid fa-plus" /> Add Product
                </button>
              </div>

              {showForm && (
                <AdminProductForm
                  editing={editingProduct}
                  onClose={() => setShowForm(false)}
                />
              )}

              {productsLoading ? (
                <div className="flex justify-center py-12">
                  <i className="fa-solid fa-spinner fa-spin text-2xl text-accent" />
                </div>
              ) : (
                <AdminProductTable products={products} onEdit={openEdit} />
              )}
            </div>
          )}

          {/* ── ORDERS ── */}
          {activeTab === "orders" && (
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-display font-bold mb-4">All Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 font-medium">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium">Customer</th>
                      <th className="text-left py-3 px-2 font-medium">Total</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50">
                        <td className="py-3 px-2 font-mono text-xs">{order.id}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2 font-semibold">KSh {order.total.toLocaleString()}</td>
                        <td className="py-3 px-2">
                          <select className="px-2 py-1 rounded border border-border text-xs bg-background">
                            <option>Processing</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
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
                { title: "Payment Methods", icon: "fa-credit-card", fields: [{ label: "M-Pesa Till Number", value: "123456" }, { label: "Accept Cash on Delivery", value: "Yes" }] },
                { title: "Shipping", icon: "fa-truck", fields: [{ label: "Standard Delivery Fee", value: "KSh 150" }, { label: "Free Delivery Threshold", value: "KSh 5,000" }] },
                { title: "Store Info", icon: "fa-store", fields: [{ label: "Currency", value: "KSh (Kenyan Shilling)" }, { label: "Tax Rate", value: "16% VAT" }] },
                { title: "Contact", icon: "fa-phone", fields: [{ label: "WhatsApp", value: "0748 332 788" }, { label: "Email", value: "jsbookshop4@gmail.com" }] },
              ].map((section) => (
                <div key={section.title} className="bg-card rounded-xl shadow-card p-6">
                  <h3 className="font-display font-bold mb-4">
                    <i className={`fa-solid ${section.icon} mr-2 text-accent`} />
                    {section.title}
                  </h3>
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
