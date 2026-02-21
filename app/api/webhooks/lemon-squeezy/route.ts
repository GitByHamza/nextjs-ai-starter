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
            // Upgrade the user to Pro
            const { error } = await supabase
                .from("profiles")
                .update({ is_pro: true, credits: 100 }) // Give 100 credits for Pro
                .eq("id", userId);

            if (error) throw error;
        }

        if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
            // Downgrade the user
            const { error } = await supabase
                .from("profiles")
                .update({ is_pro: false })
                .eq("id", userId);

            if (error) throw error;
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
