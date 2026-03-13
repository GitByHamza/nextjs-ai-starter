import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js"; // Using standard supabase-js
import { sendEmail } from "@/lib/emails/resend";
import { UpgradeEmail } from "@/components/emails/upgrade-email";

export async function POST(request: Request) {
    try {
        // 1. Validate the signature
        const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
        if (!secret) return NextResponse.json({ error: "No secret" }, { status: 500 });

        const rawBody = await request.text();
        const hmac = crypto.createHmac("sha256", secret);
        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
        const signature = Buffer.from(request.headers.get("X-Signature") || "", "utf8");

        if (!crypto.timingSafeEqual(digest, signature)) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const data = JSON.parse(rawBody);
        const eventName = data.meta.event_name;
        const userId = data.meta.custom_data.user_id;
        const customerEmail = data.data.attributes.user_email;

        if (!userId) {
            return NextResponse.json({ error: "No user ID" }, { status: 400 });
        }

        // 2. THE FIX: Create an Admin Supabase Client that bypasses RLS
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY! // Uses the secret admin key
        );

        // 3. Handle specific events
        if (eventName === "order_created" || eventName === "subscription_created") {
            const variantId = data.data.attributes.variant_id.toString();
            const subscriptionId = data.data.attributes.subscription_id?.toString() || data.data.id.toString();

            let planType = 'free';
            let credits = 10;

            // Fixed the variable names to match NEXT_PUBLIC_ from your env file
            if (
                variantId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_PRO_MONTHLY ||
                variantId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_PRO_YEARLY
            ) {
                planType = 'pro';
                credits = 500; // Updated to 500 as requested!
            } else if (
                variantId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ENTERPRISE_MONTHLY ||
                variantId === process.env.NEXT_PUBLIC_LEMON_SQUEEZY_VARIANT_ENTERPRISE_YEARLY
            ) {
                planType = 'enterprise';
                credits = 9999;
            }

            // Upgrade the user using the Admin Client
            const { error } = await supabaseAdmin
                .from("profiles")
                .update({
                    is_pro: true,
                    plan_type: planType,
                    credits: credits,
                    lemon_squeezy_subscription_id: subscriptionId
                })
                .eq("id", userId);

            if (error) {
                console.error("Supabase Admin Update Error:", error);
                throw error;
            }

            // Send Email
            if (customerEmail) {
                await sendEmail({
                    to: customerEmail,
                    subject: 'Your account has been upgraded!',
                    react: UpgradeEmail({ planType })
                });
            }
        }

        if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
            const { error } = await supabaseAdmin
                .from("profiles")
                .update({
                    is_pro: false,
                    plan_type: 'free',
                    lemon_squeezy_subscription_id: null
                })
                .eq("id", userId);

            if (error) throw error;
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
