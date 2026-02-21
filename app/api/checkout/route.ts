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

        configureLemonSqueezy();

        const variantId = process.env.LEMON_SQUEEZY_VARIANT_ID;

        if (!variantId) {
            return NextResponse.json(
                { error: "Variant ID not configured" },
                { status: 500 }
            );
        }

        const variantIdNum = parseInt(variantId, 10);
        if (isNaN(variantIdNum)) {
            return NextResponse.json(
                { error: `Invalid Variant ID configuration: ${variantId}. It should be a number.` },
                { status: 500 }
            );
        }

        const checkout = await createCheckout(
            process.env.LEMON_SQUEEZY_STORE_ID!,
            parseInt(variantId, 10),
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

        return NextResponse.json({ url: checkout.data?.data.attributes.url });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
