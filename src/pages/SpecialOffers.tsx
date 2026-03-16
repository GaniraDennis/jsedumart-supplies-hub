import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";

const SpecialOffers = () => {
  // Simulate offers with discounted prices
  const offers = products.filter(p => p.badge).map(p => ({ ...p, oldPrice: Math.round(p.price * 1.3) }));

  return (
    <Layout>
      <div className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto text-center">
          <span className="font-handwritten text-warning text-2xl">Don't miss out!</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">
            <i className="fa-solid fa-tags mr-3" />Special Offers
          </h1>
          <p className="text-lg opacity-80">Grab these deals before they're gone!</p>
        </div>
      </div>
      <div className="container mx-auto py-12">
        {/* Coupon Banner */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-10 text-center">
          <p className="font-display text-lg font-bold mb-1">Use code <span className="font-mono bg-accent text-accent-foreground px-3 py-1 rounded-lg">STUDENT10</span> for 10% off</p>
          <p className="text-sm text-muted-foreground">Valid on all stationery items</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {offers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SpecialOffers;
