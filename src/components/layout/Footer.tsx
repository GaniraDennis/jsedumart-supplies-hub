import { Link } from "react-router-dom";

const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61586640189614";
const WHATSAPP_URL = "https://wa.me/254748332788";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
              <i className="fa-solid fa-book-open text-accent-foreground" />
            </div>
            <span className="font-display text-lg font-bold">JSEdumart</span>
          </div>
          <p className="text-sm opacity-80 mb-4">Your trusted source for quality books, stationery & office supplies in Nairobi.</p>
          <div className="flex gap-3">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" aria-label="Facebook">
              <i className="fa-brands fa-facebook-f text-sm" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp text-sm" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" aria-label="Instagram">
              <i className="fa-brands fa-instagram text-sm" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider opacity-70">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[["Shop", "/shop"], ["Special Offers", "/offers"], ["Blog", "/blog"], ["About Us", "/about"], ["Contact", "/contact"]].map(([label, to]) => (
              <Link key={to} to={to} className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                <i className="fa-solid fa-chevron-right mr-1.5 text-xs" />{label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider opacity-70">Customer Care</h4>
          <div className="flex flex-col gap-2">
            {[["Track Order", "/track-order"], ["Returns Policy", "/returns"], ["FAQ", "/faq"], ["My Account", "/account"], ["Wishlist", "/wishlist"]].map(([label, to]) => (
              <Link key={to} to={to} className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-all">
                <i className="fa-solid fa-chevron-right mr-1.5 text-xs" />{label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-4 uppercase tracking-wider opacity-70">Contact Info</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <p><i className="fa-solid fa-location-dot mr-2 text-accent" />JS Edumart, Nairobi CBD</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">
              <i className="fa-brands fa-whatsapp mr-2 text-accent" />0748 332 788
            </a>
            <a href="mailto:jsbookshop4@gmail.com" className="hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-envelope mr-2 text-accent" />jsbookshop4@gmail.com
            </a>
            <p><i className="fa-solid fa-clock mr-2 text-accent" />Mon-Sat: 8AM - 7PM</p>
          </div>
          <div className="mt-4">
            <p className="text-xs opacity-60 mb-2">We accept</p>
            <div className="flex gap-2">
              <span className="px-2 py-1 rounded bg-success/20 text-xs font-medium">M-Pesa</span>
              <span className="px-2 py-1 rounded bg-primary-foreground/10 text-xs font-medium">Cash</span>
              <span className="px-2 py-1 rounded bg-primary-foreground/10 text-xs font-medium">Visa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container mx-auto py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-60">
        <p>© {new Date().getFullYear()} JSEdumart Bookstore. All rights reserved.</p>
        <p>Proudly serving Kenyan students 🇰🇪</p>
      </div>
    </div>
  </footer>
);

export default Footer;
