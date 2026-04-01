import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Find the admin user
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) return new Response(JSON.stringify({ error: listError.message }), { status: 500 });

  const adminUser = users.find(u => u.email === "jsbookshop4@gmail.com");
  if (!adminUser) return new Response(JSON.stringify({ error: "Admin user not found" }), { status: 404 });

  // Reset password
  const { error } = await supabaseAdmin.auth.admin.updateUserById(adminUser.id, {
    password: "JSEdumart2026",
    email_confirm: true,
  });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(JSON.stringify({ success: true, message: "Admin password reset successfully" }));
});
