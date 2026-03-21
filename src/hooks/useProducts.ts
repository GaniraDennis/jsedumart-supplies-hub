import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

export interface DbProduct {
  id: string;
  name: string;
  price: number;
  old_price: number | null;
  image: string;
  category: string;
  subcategory: string;
  badge: string | null;
  description: string;
  in_stock: boolean;
  rating: number;
  reviews: number;
  created_at: string;
  updated_at: string;
}

/** Convert DB row to the legacy Product shape used by ProductCard / StoreContext */
export const toProduct = (p: DbProduct): Product => ({
  id: p.id as any,
  name: p.name,
  price: p.price,
  oldPrice: p.old_price ?? undefined,
  image: p.image,
  category: p.category,
  subcategory: p.subcategory,
  badge: p.badge ?? undefined,
  description: p.description,
  inStock: p.in_stock,
  rating: p.rating,
  reviews: p.reviews,
});

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data as DbProduct[]).map(toProduct);
    },
  });
}

export function useDbProducts() {
  return useQuery({
    queryKey: ["products-raw"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DbProduct[];
    },
  });
}

export function useAddProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (product: Omit<DbProduct, "id" | "created_at" | "updated_at">) => {
      const { error } = await supabase.from("products").insert(product);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["products-raw"] });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DbProduct> & { id: string }) => {
      const { error } = await supabase.from("products").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["products-raw"] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["products-raw"] });
    },
  });
}
