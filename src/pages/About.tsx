import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

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
            JSEdumart was born from a simple belief: every student deserves access to quality educational materials at prices that don't break the bank. Based in Nairobi, we've grown from a small stationery shop on Moi Avenue to one of Kenya's most trusted online bookstores.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We work directly with manufacturers and publishers to bring you the best prices on everything from exercise books and pens to textbooks and art supplies.
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

      <div className="bg-primary text-primary-foreground rounded-xl p-10 text-center">
        <h2 className="font-display text-2xl font-bold mb-3">Join Our Community</h2>
        <p className="opacity-80 mb-6 max-w-lg mx-auto">Follow us on social media for study tips, special offers, and new product announcements.</p>
        <div className="flex gap-3 justify-center">
          {["fa-facebook-f", "fa-twitter", "fa-instagram", "fa-whatsapp"].map((icon) => (
            <a key={icon} href="#" className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors">
              <i className={`fa-brands ${icon} text-lg`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
