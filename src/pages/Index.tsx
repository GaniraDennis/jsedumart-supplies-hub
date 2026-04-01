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
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background with mesh effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent/70" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px]"
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-warning/15 rounded-full blur-[120px]"
            animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[80px]"
            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Floating icons with better spread */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { icon: "fa-pencil", top: "10%", left: "8%", size: "text-2xl" },
            { icon: "fa-book-open", top: "20%", left: "85%", size: "text-4xl" },
            { icon: "fa-graduation-cap", top: "70%", left: "12%", size: "text-3xl" },
            { icon: "fa-palette", top: "15%", left: "45%", size: "text-2xl" },
            { icon: "fa-calculator", top: "75%", left: "80%", size: "text-3xl" },
            { icon: "fa-print", top: "50%", left: "5%", size: "text-2xl" },
            { icon: "fa-pen-nib", top: "60%", left: "90%", size: "text-2xl" },
            { icon: "fa-book", top: "40%", left: "92%", size: "text-3xl" },
          ].map((item, i) => (
            <motion.div
              key={item.icon}
              className={`absolute text-primary-foreground/[0.07] ${item.size}`}
              style={{ top: item.top, left: item.left }}
              animate={{ y: [0, -30, 0], x: [0, 10, -10, 0], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            >
              <i className={`fa-solid ${item.icon}`} />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto relative z-10 text-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2 bg-warning/20 text-warning px-5 py-2 rounded-full text-sm font-semibold mb-8 backdrop-blur-md border border-warning/30 shadow-lg shadow-warning/10">
              <motion.i
                className="fa-solid fa-sparkles"
                animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Back to School 2026 ✏️
            </span>
          </motion.div>

          <div className="h-32 md:h-28 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentLine}
                initial={{ opacity: 0, y: 50, filter: "blur(8px)", scale: 0.9 }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, y: -50, filter: "blur(8px)", scale: 0.9 }}
                transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground max-w-5xl mx-auto leading-tight text-balance"
                style={{ textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
              >
                {heroLines[currentLine]}
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Line indicator dots */}
          <div className="flex justify-center gap-2 mb-8">
            {heroLines.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentLine(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === currentLine ? "bg-accent w-8" : "bg-primary-foreground/30 w-3 hover:bg-primary-foreground/50"}`}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Quality books, novels, stationery & office equipment delivered across Nairobi at unbeatable prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-xl font-display font-bold text-lg hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 shadow-lg"
            >
              <i className="fa-solid fa-bag-shopping group-hover:scale-110 transition-transform" /> Shop Now
            </Link>
            <Link
              to="/shop?category=textbooks"
              className="group inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-8 py-4 rounded-xl font-display font-bold text-lg border border-primary-foreground/20 hover:bg-primary-foreground/20 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              <i className="fa-solid fa-book group-hover:scale-110 transition-transform" /> Browse Novels & Books
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-14 text-primary-foreground/60 text-sm"
          >
            {[
              { icon: "fa-truck-fast", text: "Free delivery over KSh 5,000" },
              { icon: "fa-shield-halved", text: "Genuine products" },
              { icon: "fa-mobile-screen", text: "M-Pesa accepted" },
            ].map((b, i) => (
              <motion.span
                key={b.text}
                className="flex items-center gap-2 backdrop-blur-sm bg-primary-foreground/5 px-4 py-2 rounded-full border border-primary-foreground/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
              >
                <i className={`fa-solid ${b.icon} text-accent`} /> {b.text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "fa-truck-fast", title: "Fast Delivery", desc: "Kabiria & all Nairobi" },
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
            <i className="fa-solid fa-bag-shopping" /> Shop Now
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
