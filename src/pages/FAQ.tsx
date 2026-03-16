import Layout from "@/components/layout/Layout";
import { useState } from "react";

const faqs = [
  { q: "How do I place an order?", a: "Browse our products, add items to your cart, and proceed to checkout. You can pay via M-Pesa, Cash on Delivery, or card." },
  { q: "What are the delivery charges?", a: "Free delivery within Nairobi CBD for orders over KSh 2,000. Standard delivery fee is KSh 150 for orders below KSh 2,000." },
  { q: "How long does delivery take?", a: "We deliver within 24-48 hours in Nairobi. Orders placed before 2PM are dispatched the same day." },
  { q: "Can I return a product?", a: "Yes! We offer a 7-day return policy for unused items in original packaging. Contact us to initiate a return." },
  { q: "Do you offer bulk/school orders?", a: "Yes! We offer special discounts for bulk school orders. Contact us at hello@jsedumart.co.ke for a custom quote." },
  { q: "How do I pay via M-Pesa?", a: "At checkout, select M-Pesa and use our Till Number 123456. Enter the exact amount shown at checkout." },
  { q: "Do you have a physical store?", a: "Yes! Visit us at Moi Avenue, Nairobi CBD. Open Mon-Fri 8AM-7PM, Sat 9AM-5PM." },
  { q: "How can I track my order?", a: "Use the Track Order page with your Order ID. You'll also receive SMS updates on your order status." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="bg-surface py-16">
        <div className="container mx-auto text-center">
          <span className="handwritten text-2xl">Need help?</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">Frequently Asked Questions</h1>
        </div>
      </div>
      <div className="container mx-auto py-12 max-w-3xl">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-card rounded-xl shadow-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-display font-semibold pr-4">
                  <i className="fa-solid fa-circle-question mr-2 text-accent" />{faq.q}
                </span>
                <i className={`fa-solid fa-chevron-down text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
