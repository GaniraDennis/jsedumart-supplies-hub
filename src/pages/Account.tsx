import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "@/context/StoreContext";

const Account = () => {
  const { user, profile, logout, isLoading } = useAuth();
  const { cart, wishlist } = useStore();

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-accent" />
        </div>
      </Layout>
    );
  }

  if (!user) return <Navigate to="/login" />;

  const displayName = profile?.display_name || user.email?.split("@")[0] || "User";
  const orders = JSON.parse(localStorage.getItem("jsedumart_last_order") || "null");

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="font-display text-3xl font-bold mb-8">
          <i className="fa-solid fa-user mr-3 text-accent" />My Account
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl shadow-card p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <i className="fa-solid fa-user text-accent text-3xl" />
            </div>
            <h3 className="font-display font-bold text-lg">{displayName}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <button onClick={logout} className="mt-4 text-sm text-discount hover:underline">
              <i className="fa-solid fa-right-from-bracket mr-1" /> Sign Out
            </button>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: "fa-bag-shopping", label: "Cart Items", value: cart.length, to: "/cart" },
                { icon: "fa-heart", label: "Wishlist", value: wishlist.length, to: "/wishlist" },
                { icon: "fa-box", label: "Orders", value: orders ? 1 : 0, to: "/track-order" },
              ].map((s) => (
                <Link key={s.label} to={s.to} className="bg-card rounded-xl shadow-card p-5 hover:shadow-card-hover transition-all">
                  <i className={`fa-solid ${s.icon} text-accent text-xl mb-2`} />
                  <p className="font-display text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </Link>
              ))}
            </div>

            {orders && (
              <div className="bg-card rounded-xl shadow-card p-6">
                <h3 className="font-display font-bold mb-3"><i className="fa-solid fa-clock-rotate-left mr-2 text-accent" />Recent Order</h3>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface">
                  <div>
                    <p className="font-mono text-sm font-semibold">{orders.id}</p>
                    <p className="text-xs text-muted-foreground">{new Date(orders.date).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 rounded-lg bg-warning/20 text-warning text-xs font-semibold">Processing</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
