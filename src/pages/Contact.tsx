import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/254748332788";
const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61586640189614";

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
              { icon: "fa-location-dot", title: "Visit Us", text: "JS Edumart Books & Stationery\nNairobi CBD, Kenya" },
              { icon: "fa-brands fa-whatsapp", title: "WhatsApp", text: "0748 332 788", href: WHATSAPP_URL },
              { icon: "fa-envelope", title: "Email Us", text: "jsbookshop4@gmail.com", href: "mailto:jsbookshop4@gmail.com" },
              { icon: "fa-clock", title: "Working Hours", text: "Mon-Fri: 8AM - 7PM\nSat: 9AM - 5PM" },
            ].map((c) => (
              <div key={c.title} className="bg-card rounded-xl shadow-card p-5">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <i className={`${c.icon.startsWith("fa-brands") ? "" : "fa-solid "}${c.icon} text-accent`} />
                </div>
                <h3 className="font-display font-semibold mb-1">{c.title}</h3>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">{c.text}</a>
                ) : (
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{c.text}</p>
                )}
              </div>
            ))}

            {/* Social links */}
            <div className="bg-card rounded-xl shadow-card p-5">
              <h3 className="font-display font-semibold mb-3">Follow Us</h3>
              <div className="flex gap-3">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f text-accent" />
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors" aria-label="WhatsApp">
                  <i className="fa-brands fa-whatsapp text-accent" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            {/* Google Maps */}
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8176073905!2d36.8219!3d-1.2864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMTEuMCJTIDM2wrA0OScxOC44IkU!5e0!3m2!1sen!2ske!4v1"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="JS Edumart Location"
                className="w-full"
              />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-sm">JS Edumart Books & Stationery</p>
                  <p className="text-xs text-muted-foreground">Nairobi CBD, Kenya</p>
                </div>
                <a
                  href="https://share.google/80n1IuQZLwGgYx8bK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <i className="fa-solid fa-directions" /> Get Directions
                </a>
              </div>
            </div>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-card p-8 space-y-4">
              <h3 className="font-display font-bold text-lg mb-2">Send us a Message</h3>
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
              <div className="flex gap-3">
                <button type="submit" className="bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
                  <i className="fa-solid fa-paper-plane mr-2" /> Send Message
                </button>
                <a
                  href={`${WHATSAPP_URL}?text=${encodeURIComponent("Hello JSEdumart! I have an inquiry.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-success text-white px-6 py-3.5 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md flex items-center gap-2"
                >
                  <i className="fa-brands fa-whatsapp" /> WhatsApp Us
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
