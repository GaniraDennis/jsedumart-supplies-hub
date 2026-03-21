import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: products = [] } = useProducts();
  const product = products.find((p) => String(p.id) === id);
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <i className="fa-solid fa-circle-exclamation text-5xl text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Product Not Found</h1>
          <Link to="/shop" className="text-accent hover:underline">Back to Shop</Link>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.subcategory === product.subcategory && p.id !== product.id).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent"><i className="fa-solid fa-house" /></Link>
          <i className="fa-solid fa-chevron-right text-xs" />
          <Link to="/shop" className="hover:text-accent">Shop</Link>
          <i className="fa-solid fa-chevron-right text-xs" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-surface rounded-xl p-8 shadow-card">
            {product.badge && (
              <span className="inline-block px-3 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-semibold mb-4">
                {product.badge}
              </span>
            )}
            <img src={product.image} alt={product.name} className="w-full max-h-96 object-contain" />
          </div>

          <div>
            <p className="text-sm text-accent font-medium mb-1">{product.category}</p>
            <h1 className="font-display text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fa-${i < Math.floor(product.rating) ? "solid" : "regular"} fa-star text-warning`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
            <p className="font-display text-4xl font-bold text-foreground mb-6">
              KSh {product.price.toLocaleString()}
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-muted transition-colors">
                  <i className="fa-solid fa-minus text-sm" />
                </button>
                <span className="px-4 py-3 font-semibold min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-muted transition-colors">
                  <i className="fa-solid fa-plus text-sm" />
                </button>
              </div>
              <span className={`text-sm font-medium ${product.inStock ? "text-success" : "text-discount"}`}>
                <i className={`fa-solid ${product.inStock ? "fa-circle-check" : "fa-circle-xmark"} mr-1`} />
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { for (let i = 0; i < qty; i++) addToCart(product); }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md"
              >
                <i className="fa-solid fa-bag-shopping" /> Add to School Bag
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-display font-bold border transition-all ${
                  isInWishlist(product.id)
                    ? "bg-discount/10 border-discount text-discount"
                    : "border-border hover:bg-muted"
                }`}
              >
                <i className={`fa-${isInWishlist(product.id) ? "solid" : "regular"} fa-heart`} />
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: "fa-truck-fast", text: "Delivery in Nairobi" },
                { icon: "fa-shield-halved", text: "Quality Guaranteed" },
                { icon: "fa-rotate-left", text: "Easy Returns" },
                { icon: "fa-mobile-screen", text: "M-Pesa Accepted" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <i className={`fa-solid ${f.icon} text-accent`} />{f.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
