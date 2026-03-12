import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

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

        if (!userId) {
            return NextResponse.json({ error: "No user ID" }, { status: 400 });
        }

        const supabase = await createClient();

        // 2. Handle specific events
        if (eventName === "order_created" || eventName === "subscription_created") {
            const variantId = data.data.attributes.variant_id.toString();
            const subscriptionId = data.data.attributes.subscription_id?.toString() || data.data.id.toString();
            
            let planType = 'free';
            let credits = 10;
            
            // Determine plan based on variant ID
            if (
                variantId === process.env.LEMON_SQUEEZY_VARIANT_PRO_MONTHLY ||
                variantId === process.env.LEMON_SQUEEZY_VARIANT_PRO_YEARLY
            ) {
                planType = 'pro';
                credits = 100;
            } else if (
                variantId === process.env.LEMON_SQUEEZY_VARIANT_ENTERPRISE_MONTHLY ||
                variantId === process.env.LEMON_SQUEEZY_VARIANT_ENTERPRISE_YEARLY
            ) {
                planType = 'enterprise';
                credits = 9999;
            }

            // Upgrade the user
            const { error } = await supabase
                .from("profiles")
                .update({ 
                    is_pro: true, 
                    plan_type: planType,
                    credits: credits,
                    lemon_squeezy_subscription_id: subscriptionId
                })
                .eq("id", userId);

            if (error) throw error;
        }

        if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
            // Downgrade the user
            const { error } = await supabase
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
