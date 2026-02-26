export const routes = {
    home: "/",
    adopt: {
        list: "/adopt",
        detail: (id: string) => `/adopt/${id}`,
        form: (id: string) => `/adopt/${id}/form`,
    },
    dashboard: "/dashboard",
    about: "/about",
    contact: "/contact",
    blog: {
        list: "/blog",
        detail: (id: string) => `/blog/${id}`
    },
    auth: "/auth",
    info: "/info",
    stories: "/stories",
    matchmaker: "/matchmaker",
} as const;
