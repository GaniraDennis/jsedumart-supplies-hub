import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { cartCount } = useStore();
  const { user, profile, isAdmin, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const displayName = profile?.display_name || user?.email?.split("@")[0] || "";

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md shadow-sm">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="container mx-auto flex items-center justify-between py-1.5 text-xs text-primary-foreground">
          <span className="hidden sm:inline">
            <i className="fa-solid fa-truck-fast mr-1" /> {t("freeDelivery")}
          </span>
          <span className="sm:hidden text-center w-full truncate px-2">
            <i className="fa-solid fa-truck-fast mr-1" /> Free delivery over KSh 2,000
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <a href="https://wa.me/254748332788" className="hover:underline">
              <i className="fa-brands fa-whatsapp mr-1" /> 0748 332 788
            </a>
            <a href="mailto:jsbookshop4@gmail.com" className="hover:underline">
              <i className="fa-solid fa-envelope mr-1" /> jsbookshop4@gmail.com
            </a>
            <Link to="/track-order" className="hover:underline">
              <i className="fa-solid fa-location-dot mr-1" /> {t("trackOrder")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto flex items-center justify-between gap-4 py-3">
        {/* Logo - left */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <i className="fa-solid fa-book-open text-primary-foreground text-lg" />
          </div>
          <div>
            <span className="font-display text-xl font-bold text-foreground leading-none">JSEdumart</span>
            <span className="block text-[10px] text-muted-foreground leading-none">Books & Stationery</span>
          </div>
        </Link>

        {/* Search - center */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
            <button type="submit" className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
        </form>

        {/* Right side: nav + actions */}
        <div className="flex items-center gap-1">
          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "sw" : "en")}
            className="hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors text-xs font-semibold"
            title={language === "en" ? "Switch to Swahili" : "Switch to English"}
          >
            <span className="text-base">{language === "en" ? "🇰🇪" : "🇬🇧"}</span>
            <span className="hidden lg:inline">{language === "en" ? "SW" : "EN"}</span>
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link to={isAdmin ? "/admin" : "/account"} className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
                <i className="fa-solid fa-user" />
                <span className="hidden lg:inline">{displayName}</span>
              </Link>
              <button onClick={logout} className="px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-muted-foreground">
                <i className="fa-solid fa-right-from-bracket" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
              <i className="fa-solid fa-user" />
              <span className="hidden lg:inline">{t("login")}</span>
            </Link>
          )}
          <Link to="/wishlist" className="relative px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <i className="fa-solid fa-heart text-lg" />
          </Link>
          <Link to="/cart" className="relative px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <i className="fa-solid fa-bag-shopping text-lg" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-in">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden px-3 py-2 rounded-lg hover:bg-muted transition-colors"
          >
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-lg`} />
          </button>
        </div>
      </div>

      {/* Desktop nav - RIGHT aligned */}
      <nav className="hidden md:block border-t border-border">
        <div className="container mx-auto flex items-center justify-end gap-1 py-1">
          {[
            { to: "/", label: t("home"), icon: "fa-house" },
            { to: "/shop", label: t("shop"), icon: "fa-store" },
            { to: "/offers", label: t("offers"), icon: "fa-tags" },
            { to: "/blog", label: t("blog"), icon: "fa-newspaper" },
            { to: "/about", label: t("about"), icon: "fa-info-circle" },
            { to: "/contact", label: t("contact"), icon: "fa-envelope" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <i className={`fa-solid ${link.icon} mr-1.5`} />
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <form onSubmit={handleSearch} className="p-3">
            <div className="relative">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                <i className="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </form>
          <div className="flex flex-col pb-3">
            {/* Language toggle mobile */}
            <button
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              className="px-6 py-3 text-sm font-medium text-foreground hover:bg-muted text-left"
            >
              <span className="mr-2">{language === "en" ? "🇰🇪" : "🇬🇧"}</span>
              {language === "en" ? "Swahili" : "English"}
            </button>
            {[
              { to: "/", label: t("home"), icon: "fa-house" },
              { to: "/shop", label: t("shop"), icon: "fa-store" },
              { to: "/offers", label: t("offers"), icon: "fa-tags" },
              { to: "/blog", label: t("blog"), icon: "fa-newspaper" },
              { to: "/about", label: t("about"), icon: "fa-info-circle" },
              { to: "/contact", label: t("contact"), icon: "fa-envelope" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-muted text-accent"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <i className={`fa-solid ${link.icon} mr-2 w-5`} />
                {link.label}
              </Link>
            ))}
            {!user && (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-sm font-medium text-foreground hover:bg-muted">
                <i className="fa-solid fa-user mr-2 w-5" /> {t("login")} / {t("signup")}
              </Link>
            )}
            {user && (
              <>
                <Link to="/account" onClick={() => setMobileOpen(false)} className="px-6 py-3 text-sm font-medium text-foreground hover:bg-muted">
                  <i className="fa-solid fa-user mr-2 w-5" /> {t("myAccount")}
                </Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="px-6 py-3 text-sm font-medium text-foreground hover:bg-muted text-left">
                  <i className="fa-solid fa-right-from-bracket mr-2 w-5" /> {t("logout")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
