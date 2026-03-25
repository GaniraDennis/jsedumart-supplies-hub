import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    }
    // Auth state change will trigger re-render; if not admin, they'll see "Access Denied"
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl shadow-card-hover p-8 space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-shield-halved text-primary-foreground text-2xl" />
            </div>
            <h1 className="font-display text-xl font-bold">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mt-1">JSEdumart Management</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@jsedumart.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-display font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading && <i className="fa-solid fa-spinner fa-spin mr-2" />}
              <i className="fa-solid fa-right-to-bracket mr-2" />
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            This area is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
