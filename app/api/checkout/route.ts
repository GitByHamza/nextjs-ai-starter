import { configureLemonSqueezy } from "@/lib/lemon-squeezy";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user || !user.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json().catch(() => ({}));
        const { variantId } = body;

        configureLemonSqueezy();

        if (!variantId) {
            return NextResponse.json({ error: "Variant ID is required" }, { status: 400 });
        }

        // 1. Convert back to number (since real Variant IDs are integers)
        const variantIdNum = parseInt(variantId.toString(), 10);
        if (isNaN(variantIdNum)) {
            return NextResponse.json(
                { error: `Invalid Variant ID: ${variantId}. Find the numeric ID in your Lemon Squeezy dashboard.` },
                { status: 400 }
            );
        }

        const checkout = await createCheckout(
            process.env.LEMON_SQUEEZY_STORE_ID!,
            variantIdNum,
            {
                checkoutData: {
                    email: user.email,
                    custom: {
                        user_id: user.id,
                    },
                },
                productOptions: {
                    redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
                }
            }
        );

        // 2. Crucial Error Catch: If Lemon Squeezy rejects the request, stop here!
        if (checkout.error) {
            console.error("Lemon Squeezy API Error:", checkout.error);
            return NextResponse.json({ error: checkout.error.message }, { status: 400 });
        }

        // 3. If successful, return the URL
        return NextResponse.json({ url: checkout.data?.data.attributes.url });

    } catch (error: any) {
        console.error("Checkout System Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
