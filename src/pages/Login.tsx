import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(form.email === "admin@jsedumart.co.ke" ? "/admin" : "/account");
    } else {
      register(form.name, form.email, form.password);
      toast.success("Account created successfully!");
      navigate("/account");
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12">
        <div className="w-full max-w-md bg-card rounded-xl shadow-card p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3">
              <i className="fa-solid fa-book-open text-primary-foreground text-2xl" />
            </div>
            <h1 className="font-display text-2xl font-bold">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-sm text-muted-foreground mt-1">{isLogin ? "Sign in to your JSEdumart account" : "Join JSEdumart today"}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50" />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md">
              <i className={`fa-solid ${isLogin ? "fa-right-to-bracket" : "fa-user-plus"} mr-2`} />
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-accent font-semibold hover:underline">
              {isLogin ? "Register" : "Sign In"}
            </button>
          </p>
          {isLogin && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Demo admin: admin@jsedumart.co.ke
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
