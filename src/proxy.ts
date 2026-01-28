import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { DEFAULT_LOCALE, LOCALE_GROUPS } from "./lib/languages";
import { routes } from "./lib/routes";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Si no es la home o ya tiene cookie, usa el middleware normal
    if (pathname !== routes.home || request.cookies.has("NEXT_LOCALE")) {
        return intlMiddleware(request);
    }

    // Detectar país y locale
    const country =
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_DEBUG_COUNTRY || "US"
            : request.headers.get("x-vercel-ip-country") || "US";

    const detectedLocale =
        Object.keys(LOCALE_GROUPS).find((locale) =>
            LOCALE_GROUPS[locale].includes(country),
        ) || DEFAULT_LOCALE;

    // Redirigir y guardar cookie
    const response = NextResponse.redirect(
        new URL(`/${detectedLocale}`, request.url),
    );
    response.cookies.set("NEXT_LOCALE", detectedLocale, {
        maxAge: 31536000,
        path: routes.home,
    });

    return response;
}

export const config = {
    matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
