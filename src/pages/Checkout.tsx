import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, cartTotal, discount, clearCart } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const discountAmount = cartTotal * discount / 100;
  const shipping = cartTotal > 2000 ? 0 : 150;
  const finalTotal = cartTotal - discountAmount + shipping;

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "Nairobi CBD", notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please fill in required fields");
      return;
    }
    const orderId = `JSE-${Date.now().toString(36).toUpperCase()}`;
    localStorage.setItem("jsedumart_last_order", JSON.stringify({
      id: orderId, items: cart, total: finalTotal, ...form, paymentMethod, date: new Date().toISOString()
    }));
    clearCart();
    navigate(`/order-confirmation?id=${orderId}`);
  };

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="font-display text-3xl font-bold mb-8">
          <i className="fa-solid fa-lock mr-3 text-accent" />Checkout
        </h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-display text-lg font-bold mb-4">
                <i className="fa-solid fa-location-dot mr-2 text-accent" />Delivery Details
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="0712 345 678" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Delivery Area</label>
                  <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm">
                    <option>Nairobi CBD</option>
                    <option>Westlands</option>
                    <option>Eastlands</option>
                    <option>Dagoretti</option>
                    <option>Kasarani</option>
                    <option>Karen</option>
                    <option>Langata</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1 block">Delivery Address</label>
                  <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Building, street, landmark" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium mb-1 block">Order Notes</label>
                  <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2} placeholder="Any special instructions..." className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-card rounded-xl shadow-card p-6">
              <h3 className="font-display text-lg font-bold mb-4">
                <i className="fa-solid fa-credit-card mr-2 text-accent" />Payment Method
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                { id: "mpesa", label: "M-Pesa", icon: "fa-mobile-screen", color: "text-success" },
                { id: "cod", label: "Cash on Delivery", icon: "fa-money-bill-wave", color: "text-warning" },
                { id: "card", label: "Visa / Mastercard", icon: "fa-credit-card", color: "text-accent" }].
                map((m) =>
                <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${paymentMethod === m.id ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"}`}>
                    <i className={`fa-solid ${m.icon} text-xl ${m.color} mb-2`} />
                    <p className="font-display text-sm font-semibold">{m.label}</p>
                  </button>
                )}
              </div>
              {paymentMethod === "mpesa" &&
              <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20">
                  <p className="text-sm font-semibold text-success mb-1"><i className="fa-solid fa-info-circle mr-1" /> M-Pesa Instructions</p>
                  <p className="text-sm text-muted-foreground">​ <span className="font-mono font-bold">123456</span></p>
                  <p className="text-sm text-muted-foreground">Amount: <span className="font-bold">KSh {finalTotal.toLocaleString()}</span></p>
                </div>
              }
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-xl shadow-card p-6 h-fit sticky top-32">
            <h3 className="font-display text-lg font-bold mb-4">
              <i className="fa-solid fa-receipt mr-2 text-accent" />Order Summary
            </h3>
            <div className="space-y-3 mb-4">
              {cart.map((item) =>
              <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">{item.name} ×{item.quantity}</span>
                  <span className="shrink-0">KSh {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              )}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>KSh {cartTotal.toLocaleString()}</span></div>
              {discount > 0 && <div className="flex justify-between text-success"><span>Discount ({discount}%)</span><span>-KSh {discountAmount.toLocaleString()}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `KSh ${shipping}`}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-display font-bold text-lg">
                <span>Total</span><span>KSh {finalTotal.toLocaleString()}</span>
              </div>
            </div>
            <button type="submit" className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
              <i className="fa-solid fa-check" /> Place Order
            </button>
          </div>
        </form>
      </div>
    </Layout>);

};

export default Checkout;