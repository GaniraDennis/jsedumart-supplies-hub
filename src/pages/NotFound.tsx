import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const NotFound = () => (
  <Layout>
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center">
        <div className="text-8xl font-display font-bold text-accent/20 mb-4">404</div>
        <h1 className="font-display text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">Oops! This page seems to have gone missing from our bookshelf.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
            <i className="fa-solid fa-house" /> Go Home
          </Link>
          <Link to="/shop" className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-xl font-display font-bold hover:bg-muted transition-all">
            <i className="fa-solid fa-store" /> Visit Shop
          </Link>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFound;
