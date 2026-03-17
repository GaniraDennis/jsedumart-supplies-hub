import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register, resetPassword } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isForgotPassword) {
      const { error } = await resetPassword(form.email);
      setLoading(false);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Password reset email sent! Check your inbox.");
        setIsForgotPassword(false);
      }
      return;
    }

    if (isLogin) {
      const { error } = await login(form.email, form.password);
      setLoading(false);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Welcome back!");
        navigate("/account");
      }
    } else {
      const { error } = await register(form.name, form.email, form.password);
      setLoading(false);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Account created! Please check your email to verify.");
        setIsLogin(true);
      }
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
            <h1 className="font-display text-2xl font-bold">
              {isForgotPassword ? "Reset Password" : isLogin ? t("welcomeBack") : t("createAccount")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isForgotPassword
                ? "Enter your email to receive a reset link"
                : isLogin
                ? "Sign in to your JSEdumart account"
                : "Join JSEdumart today"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgotPassword && (
              <div>
                <label className="text-sm font-medium mb-1 block">{t("fullName")}</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">{t("email")}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            {!isForgotPassword && (
              <div>
                <label className="text-sm font-medium mb-1 block">{t("password")}</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            )}
            {isLogin && !isForgotPassword && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm text-accent hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-display font-bold hover:-translate-y-0.5 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin mr-2" />
              ) : (
                <i className={`fa-solid ${isForgotPassword ? "fa-envelope" : isLogin ? "fa-right-to-bracket" : "fa-user-plus"} mr-2`} />
              )}
              {isForgotPassword ? "Send Reset Link" : isLogin ? t("login") : t("createAccount")}
            </button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {isForgotPassword ? (
              <button onClick={() => setIsForgotPassword(false)} className="text-accent font-semibold hover:underline">
                Back to Sign In
              </button>
            ) : (
              <>
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button onClick={() => setIsLogin(!isLogin)} className="text-accent font-semibold hover:underline">
                  {isLogin ? t("signup") : t("login")}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
