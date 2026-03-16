import Layout from "@/components/layout/Layout";

const Returns = () => (
  <Layout>
    <div className="bg-surface py-16">
      <div className="container mx-auto text-center">
        <h1 className="font-display text-4xl font-bold">Returns & Warranty Policy</h1>
      </div>
    </div>
    <div className="container mx-auto py-12 max-w-3xl prose prose-slate">
      <div className="space-y-8">
        {[
          { title: "Return Policy", icon: "fa-rotate-left", items: [
            "Items may be returned within 7 days of delivery",
            "Products must be unused and in original packaging",
            "Textbooks and sealed items cannot be returned once opened",
            "Contact our support team to initiate a return",
          ]},
          { title: "Refund Process", icon: "fa-money-bill-transfer", items: [
            "Refunds are processed within 3-5 business days",
            "M-Pesa payments are refunded to the same number",
            "Card payments are refunded to the original card",
            "Shipping costs are non-refundable",
          ]},
          { title: "Exchange Policy", icon: "fa-right-left", items: [
            "Defective items can be exchanged within 14 days",
            "Wrong items shipped will be replaced at no extra cost",
            "Size/color exchanges are subject to availability",
          ]},
          { title: "Warranty", icon: "fa-shield-halved", items: [
            "All products carry manufacturer's warranty where applicable",
            "Mathematical instruments: 6 months warranty",
            "Report defects within 48 hours of delivery",
          ]},
        ].map((section) => (
          <div key={section.title} className="bg-card rounded-xl shadow-card p-6">
            <h2 className="font-display text-xl font-bold mb-4">
              <i className={`fa-solid ${section.icon} mr-2 text-accent`} />{section.title}
            </h2>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <i className="fa-solid fa-check text-success mt-0.5 shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </Layout>
);

export default Returns;
