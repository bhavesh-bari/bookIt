import { NextResponse } from "next/server";

const PROMOS: Record<string, number | string> = {
    SAVE10: 10,
    SAVE25: 25,
    FLAT100: "flat100",
};

export async function POST(req: Request) {
    const { code, total } = await req.json();
    const promoCode = code?.toUpperCase();
    console.log("Validating promo code:", promoCode, "for total:", total);
    if (!PROMOS[promoCode]) {
        return NextResponse.json({ valid: false, message: "Invalid promo code" }, { status: 400 });
    }

    let discount = 0;
    if (typeof PROMOS[promoCode] === "number") {
        discount = (total * (PROMOS[promoCode] as number)) / 100;
    } else if (PROMOS[promoCode] === "flat100") {
        discount = 100;
    }

    const finalTotal = Math.max(0, total - discount);
    return NextResponse.json({ valid: true, discount, finalTotal });
}
