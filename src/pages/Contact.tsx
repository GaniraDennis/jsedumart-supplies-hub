import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Layout>
      <div className="bg-surface py-16">
        <div className="container mx-auto text-center">
          <span className="handwritten text-2xl">Get in touch</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">Contact Us</h1>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            {[
              { icon: "fa-location-dot", title: "Visit Us", text: "Moi Avenue, Nairobi CBD\nKenya" },
              { icon: "fa-phone", title: "Call Us", text: "+254 712 345 678\n+254 733 456 789" },
              { icon: "fa-envelope", title: "Email Us", text: "hello@jsedumart.co.ke\nsupport@jsedumart.co.ke" },
              { icon: "fa-clock", title: "Working Hours", text: "Mon-Fri: 8AM - 7PM\nSat: 9AM - 5PM" },
            ].map((c) => (
              <div key={c.title} className="bg-card rounded-xl shadow-card p-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <i className={`fa-solid ${c.icon} text-accent`} />
                </div>
                <h3 className="font-display font-semibold mb-1">{c.title}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{c.text}</p>
              </div>
            ))}
          </div>
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Message</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
              </div>
              <button type="submit" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
                <i className="fa-solid fa-paper-plane mr-2" /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
