export const NavigatorPath = {
    DASHBOARD: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    TRANSACTIONS: "/transactions",
    ACCOUNTS: "/accounts",
    CATEGORIES: "/categories",
};

export const NavigationRoutes = [
    {
        href: NavigatorPath.DASHBOARD,
        label: "Overview",
    },
    {
        href: NavigatorPath.TRANSACTIONS,
        label: "Transactions",
    },
    {
        href: NavigatorPath.ACCOUNTS,
        label: "Accounts",
    },
    {
        href: NavigatorPath.CATEGORIES,
        label: "Categories",
    },
];
