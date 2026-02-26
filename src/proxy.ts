import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { auth } from "../auth";
import { routing } from "./i18n/routing";
import { DEFAULT_LOCALE, LOCALE_GROUPS } from "./lib/constants/languages";
import { routes } from "./lib/routes";

const intlMiddleware = createMiddleware(routing);

export default auth((request) => {
    const { pathname } = request.nextUrl;
    const isLoggedIn = !!request.auth;

    const isAuthRoute = pathname.includes(routes.auth);
    const protectedPaths = ["/form", "/dashboard"];

    const isProtectedRoute = protectedPaths.some((path) =>
        pathname.includes(path),
    );

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL(routes.home, request.url));
    }

    if (isProtectedRoute && !isLoggedIn) {
        const callbackUrl = encodeURIComponent(pathname);
        return NextResponse.redirect(
            new URL(`/auth?callbackUrl=${callbackUrl}`, request.url),
        );
    }

    if (pathname !== routes.home || request.cookies.has("NEXT_LOCALE")) {
        return intlMiddleware(request);
    }

    const country =
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_DEBUG_COUNTRY || "US"
            : request.headers.get("x-vercel-ip-country") || "US";

    const detectedLocale =
        Object.keys(LOCALE_GROUPS).find((locale) =>
            LOCALE_GROUPS[locale].includes(country),
        ) || DEFAULT_LOCALE;

    const response = NextResponse.redirect(
        new URL(`/${detectedLocale}`, request.url),
    );
    response.cookies.set("NEXT_LOCALE", detectedLocale, {
        maxAge: 31536000,
        path: routes.home,
    });

    return response;
});

export const config = {
    matcher: ["/", "/(es|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
