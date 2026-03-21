import { useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: products = [] } = useProducts();
  const results = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="font-display text-3xl font-bold mb-2">
          <i className="fa-solid fa-magnifying-glass mr-3 text-accent" />Search Results
        </h1>
        <p className="text-muted-foreground mb-8">
          {results.length} results for "<span className="text-foreground font-medium">{query}</span>"
        </p>
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <i className="fa-solid fa-face-frown text-5xl text-muted-foreground mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">Try a different search term</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display font-bold">
              <i className="fa-solid fa-store" /> Browse All Products
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
