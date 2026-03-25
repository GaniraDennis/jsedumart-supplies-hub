import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const FACEBOOK_URL = "https://web.facebook.com/profile.php?id=61586640189614";
const WHATSAPP_URL = "https://wa.me/254748332788";

const About = () => (
  <Layout>
    <div className="bg-surface py-16">
      <div className="container mx-auto text-center">
        <span className="handwritten text-2xl">Our Story</span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4">About JSEdumart</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empowering Kenyan students with affordable, quality educational supplies since 2020.
        </p>
      </div>
    </div>
    <div className="container mx-auto py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            JSEdumart was born from a simple belief: every student, teacher, and office deserves access to quality supplies at prices that don't break the bank. Based at Kabiria Stage in Nairobi, we've grown from a small stationery shop to one of Kenya's most trusted suppliers of books, office equipment, novels, and stationery.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We work directly with manufacturers and publishers to bring you the best prices on everything from office equipment and novels to textbooks, stationery, and art supplies.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 gap-4">
          {[
            { num: "5,000+", label: "Happy Students", icon: "fa-graduation-cap" },
            { num: "500+", label: "Products", icon: "fa-box" },
            { num: "4.8/5", label: "Rating", icon: "fa-star" },
            { num: "24hrs", label: "Delivery", icon: "fa-truck-fast" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl shadow-card p-6 text-center">
              <i className={`fa-solid ${s.icon} text-accent text-2xl mb-2`} />
              <p className="font-display text-2xl font-bold">{s.num}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Google Maps */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden mb-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.85!2d36.7468!3d-1.2780!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f2ef7c7%3A0x4c3ef5d8e8f8a8a8!2sKabiria+Stage!5e0!3m2!1sen!2ske!4v1"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="JS Edumart Books and Stationery Shop Location"
        />
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg">Visit Our Shop</h3>
            <p className="text-sm text-muted-foreground">JSEdumart Books & Stationery, Kabiria Stage, Nairobi</p>
            <p className="text-sm text-muted-foreground mt-1"><i className="fa-solid fa-clock mr-1 text-accent" />Mon-Fri: 8AM - 7PM | Sat: 9AM - 5PM</p>
          </div>
          <a
            href="https://share.google/qv62A7CY3yaXoUTeo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md"
          >
            <i className="fa-solid fa-directions" /> Get Directions
          </a>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground rounded-xl p-10 text-center">
        <h2 className="font-display text-2xl font-bold mb-3">Join Our Community</h2>
        <p className="opacity-80 mb-6 max-w-lg mx-auto">Follow us on social media for study tips, special offers, and new product announcements.</p>
        <div className="flex gap-3 justify-center">
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f text-lg" />
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp text-lg" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors" aria-label="Instagram">
            <i className="fa-brands fa-instagram text-lg" />
          </a>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
