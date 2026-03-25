import { type DbProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { toast } from "sonner";

interface Props {
  products: DbProduct[];
  onEdit: (p: DbProduct) => void;
}

const AdminProductTable = ({ products, onEdit }: Props) => {
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const toggleStock = async (p: DbProduct) => {
    try {
      await updateProduct.mutateAsync({ id: p.id, in_stock: !p.in_stock });
      toast.success(`${p.name} marked as ${p.in_stock ? "out of stock" : "in stock"}`);
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-left py-3 px-4 font-medium">Product</th>
            <th className="text-left py-3 px-4 font-medium">Category</th>
            <th className="text-left py-3 px-4 font-medium">Price</th>
            <th className="text-left py-3 px-4 font-medium">Stock</th>
            <th className="text-left py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-border/50 hover:bg-muted/50">
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-contain bg-surface" />
                  <span className="font-medium">{p.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-muted-foreground">{p.category}</td>
              <td className="py-3 px-4 font-semibold">KSh {p.price.toLocaleString()}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => toggleStock(p)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    p.in_stock ? "bg-success/10 text-success hover:bg-success/20" : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                  }`}
                >
                  {p.in_stock ? "In Stock" : "Out of Stock"}
                </button>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button onClick={() => onEdit(p)} className="p-1.5 rounded hover:bg-muted text-accent" title="Edit">
                    <i className="fa-solid fa-pen-to-square" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-muted text-destructive" title="Delete">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductTable;
