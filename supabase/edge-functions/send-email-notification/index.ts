// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// import { createClient } from "npm:@supabase/supabase-js@2.39.8";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// serve(async (req: Request) => {
//   try {
//     // Handle CORS preflight requests
//     if (req.method === "OPTIONS") {
//       return new Response(null, {
//         status: 204,
//         headers: corsHeaders,
//       });
//     }

//     // Only allow POST requests
//     if (req.method !== "POST") {
//       return new Response(JSON.stringify({ error: "Method not allowed" }), {
//         status: 405,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     // Get the contact submission data from the request
//     const { id, name, email, message } = await req.json();

//     if (!id || !name || !email || !message) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, "Content-Type": "application/json" },
//         }
//       );
//     }

//     // Initialize Supabase client
//     const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
//     const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    
//     if (!supabaseUrl || !supabaseKey) {
//       throw new Error("Missing Supabase environment variables");
//     }

//     const supabase = createClient(supabaseUrl, supabaseKey);

//     // Here you would typically integrate with an email service like Resend, SendGrid, etc.
//     // For demonstration, we'll just log the email and update the database

//     console.log(`New contact form submission from: ${name} (${email})`);
//     console.log(`Message: ${message}`);

//     // Update the contact submission to mark it as read
//     const { error } = await supabase
//       .from("contact_submissions")
//       .update({ read: true })
//       .eq("id", id);

//     if (error) throw error;

//     return new Response(
//       JSON.stringify({ success: true, message: "Notification sent successfully" }),
//       {
//         status: 200,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ error: error.message || "An error occurred" }),
//       {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }
// });