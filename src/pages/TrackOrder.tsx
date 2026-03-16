import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [tracked, setTracked] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTracked(true);
  };

  const steps = [
    { label: "Order Placed", icon: "fa-check", done: true },
    { label: "Confirmed", icon: "fa-clipboard-check", done: true },
    { label: "Processing", icon: "fa-box", done: true },
    { label: "Out for Delivery", icon: "fa-truck", done: false },
    { label: "Delivered", icon: "fa-house", done: false },
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12">
        <h1 className="font-display text-3xl font-bold mb-8 text-center">
          <i className="fa-solid fa-location-dot mr-3 text-accent" />Track Your Order
        </h1>
        <form onSubmit={handleTrack} className="max-w-md mx-auto mb-12">
          <div className="flex gap-2">
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g., JSE-XXXXX)"
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button type="submit" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </form>
        {tracked && (
          <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-card p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="font-mono text-sm text-muted-foreground">Order ID</p>
                <p className="font-display font-bold text-lg">{orderId || "JSE-DEMO123"}</p>
              </div>
              <span className="px-4 py-1.5 rounded-lg bg-warning/20 text-warning text-sm font-semibold">Processing</span>
            </div>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {steps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4 relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 ${step.done ? "bg-success text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <i className={`fa-solid ${step.icon}`} />
                    </div>
                    <div>
                      <p className={`font-display font-semibold ${step.done ? "" : "text-muted-foreground"}`}>{step.label}</p>
                      <p className="text-xs text-muted-foreground">{step.done ? "Completed" : "Pending"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackOrder;
