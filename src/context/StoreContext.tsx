import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

export interface CartItem extends Product {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number | string) => void;
  isInWishlist: (productId: number | string) => boolean;
  isInCart: (productId: number | string) => boolean;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discount: number;
  applyCoupon: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const VALID_COUPONS: Record<string, number> = {
  STUDENT10: 10,
  WELCOME20: 20,
  SCHOOL15: 15,
  JSEDU25: 25,
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("jsedumart_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem("jsedumart_wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem("jsedumart_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("jsedumart_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to your school bag!`, {
      icon: <i className="fa-solid fa-cart-plus" />,
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToWishlist = (product: Product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
      toast.success(`${product.name} added to wishlist!`, {
        icon: <i className="fa-solid fa-heart" />,
      });
    }
  };

  const removeFromWishlist = (productId: number | string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: number | string) =>
    wishlist.some((item) => item.id === productId);

  const isInCart = (productId: number | string) =>
    cart.some((item) => item.id === productId);

  const applyCoupon = () => {
    const d = VALID_COUPONS[couponCode.toUpperCase()];
    if (d) {
      setDiscount(d);
      toast.success(`Coupon applied! ${d}% off your order.`);
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  return (
    <StoreContext.Provider
      value={{
        cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart,
        cartTotal, cartCount, addToWishlist, removeFromWishlist,
        isInWishlist, isInCart, couponCode, setCouponCode, discount, applyCoupon,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
