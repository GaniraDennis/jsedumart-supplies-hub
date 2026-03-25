import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const salesData = [
  { month: "Jan", sales: 12400, orders: 34 },
  { month: "Feb", sales: 18200, orders: 52 },
  { month: "Mar", sales: 15600, orders: 41 },
  { month: "Apr", sales: 21300, orders: 58 },
  { month: "May", sales: 19800, orders: 49 },
  { month: "Jun", sales: 24100, orders: 67 },
  { month: "Jul", sales: 22500, orders: 61 },
];

const AdminSalesChart = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-card rounded-xl shadow-card p-6">
      <h3 className="font-display font-bold mb-4">
        <i className="fa-solid fa-chart-column mr-2 text-accent" />
        Monthly Revenue (KSh)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              formatter={(value: number) => [`KSh ${value.toLocaleString()}`, "Revenue"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
            />
            <Bar dataKey="sales" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card rounded-xl shadow-card p-6">
      <h3 className="font-display font-bold mb-4">
        <i className="fa-solid fa-chart-line mr-2 text-success" />
        Orders Trend
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              formatter={(value: number) => [value, "Orders"]}
              contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", background: "hsl(var(--card))" }}
            />
            <Line type="monotone" dataKey="orders" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default AdminSalesChart;
