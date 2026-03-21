import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { categories } from "@/data/products";
import { useProducts } from "@/hooks/useProducts";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const { data: products = [] } = useProducts();

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.subcategory === selectedCategory);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case "price-low": return [...result].sort((a, b) => a.price - b.price);
      case "price-high": return [...result].sort((a, b) => b.price - a.price);
      case "rating": return [...result].sort((a, b) => b.rating - a.rating);
      case "name": return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default: return result;
    }
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <Layout>
      <div className="bg-surface py-6 border-b border-border">
        <div className="container mx-auto">
          <h1 className="font-display text-3xl font-bold">
            <i className="fa-solid fa-store mr-3 text-accent" />Shop All Products
          </h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} products available
          </p>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-card rounded-xl shadow-card p-5 sticky top-32">
              <h3 className="font-display text-sm font-semibold mb-3">
                <i className="fa-solid fa-filter mr-2 text-accent" />Categories
              </h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === "all" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  >
                    <i className={`fa-solid ${cat.icon} mr-2 w-4`} />{cat.name}
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <h3 className="font-display text-sm font-semibold mb-3">
                  <i className="fa-solid fa-sliders mr-2 text-accent" />Price Range
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0] || ""}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1] || ""}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-background"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} results
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-lg border border-border text-sm bg-card"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <i className="fa-solid fa-box-open text-4xl text-muted-foreground mb-4" />
                <p className="text-lg font-display font-semibold">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
