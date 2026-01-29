export const routes = {
    home: "/",
    adopt: {
        list: "/adopt",
        detail: (id: string) => `/adopt/${id}`
    },
    about: "/about",
    contact: "/contact",
    blog: {
        list: "/blog",
        detail: (id: string) => `/blog/${id}`
    },
    auth: "/auth"
} as const;
