import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

const heroLines = [
  "Books, Novels & Office Equipment — All in One Place",
  "Affordable Stationery & Supplies in Nairobi",
  "Fast Delivery • Trusted Quality • Unbeatable Prices",
];

const Index = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const { data: products = [] } = useProducts();
  const featured = products.filter((p) => p.badge).slice(0, 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % heroLines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-accent/40 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-warning/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
        </div>
        {/* Floating icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["fa-pencil", "fa-book", "fa-graduation-cap", "fa-palette", "fa-calculator", "fa-ruler"].map((icon, i) => (
            <motion.div
              key={icon}
              className="absolute text-primary-foreground/10 text-3xl"
              style={{ top: `${15 + i * 14}%`, left: `${5 + i * 16}%` }}
              animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <i className={`fa-solid ${icon}`} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto relative z-10 text-center py-20 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-warning/20 text-warning px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-warning/30">
              <i className="fa-solid fa-sparkles mr-2" />Back to School 2026 ✏️
            </span>
          </motion.div>

          <div className="h-28 md:h-24 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentLine}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-5xl mx-auto leading-tight text-balance drop-shadow-lg"
              >
                {heroLines[currentLine]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Quality books, novels, stationery & office equipment delivered across Nairobi at unbeatable prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-display font-bold text-lg hover:-translate-y-1 hover:shadow-xl transition-all shadow-lg"
            >
              <i className="fa-solid fa-bag-shopping" /> Shop Now
            </Link>
            <Link
              to="/shop?category=textbooks"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-xl font-display font-bold text-lg border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all backdrop-blur-sm"
            >
              <i className="fa-solid fa-book" /> Browse Novels & Books
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 mt-12 text-primary-foreground/60 text-sm"
          >
            {[
              { icon: "fa-truck-fast", text: "Free delivery over KSh 5,000" },
              { icon: "fa-shield-halved", text: "Genuine products" },
              { icon: "fa-mobile-screen", text: "M-Pesa accepted" },
            ].map((b) => (
              <span key={b.text} className="flex items-center gap-2">
                <i className={`fa-solid ${b.icon}`} /> {b.text}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "fa-truck-fast", title: "Fast Delivery", desc: "Nairobi CBD & beyond" },
              { icon: "fa-shield-halved", title: "Trusted Quality", desc: "Genuine products" },
              { icon: "fa-tag", title: "Best Prices", desc: "Student-friendly" },
              { icon: "fa-mobile-screen", title: "M-Pesa", desc: "Easy payments" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${f.icon} text-accent`} />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="handwritten text-xl">Browse by category</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Shop Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/shop?category=${cat.id}`} className="block p-6 rounded-xl bg-card shadow-card hover:shadow-card-hover text-center transition-all duration-300 hover:-translate-y-1 group paper-texture">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                    <i className={`fa-solid ${cat.icon} text-accent text-xl`} />
                  </div>
                  <p className="font-display text-sm font-semibold">{cat.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.count} items</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-spiral" />

      {/* Featured Products */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="handwritten text-xl">Handpicked for you</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Featured Products</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-accent font-medium hover:underline">
              View All <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-accent font-medium">
              View All Products <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <span className="handwritten text-warning text-2xl">Limited Time Offer</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">Get 20% Off Your First Order</h2>
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">
            Use coupon code <span className="font-mono bg-primary-foreground/10 px-3 py-1 rounded-lg font-bold">WELCOME20</span> at checkout
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-display font-bold text-lg hover:-translate-y-0.5 transition-all"
          >
            <i className="fa-solid fa-bag-shopping" /> Equip Your Studies
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
