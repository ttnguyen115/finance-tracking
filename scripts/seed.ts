import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

// utils
import { convertAmountToMiliunits } from "@/utils";

// schema
import { accounts, categories, transactions } from "@/db/schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL as string);
const db = drizzle(sql);

const SEED_USER_ID = process.env.CLERK_USER_ID_FOR_NP as string;
const SEED_CATEGORIES = [
    { id: "category_1", name: "Food", userId: SEED_USER_ID, plaidId: null },
    { id: "category_2", name: "Rent", userId: SEED_USER_ID, plaidId: null },
    { id: "category_3", name: "Utilities", userId: SEED_USER_ID, plaidId: null },
    { id: "category_7", name: "Clothing", userId: SEED_USER_ID, plaidId: null },
];
const SEED_ACCOUNTS = [
    { id: "account_1", name: "Checking", userId: SEED_USER_ID, plaidId: null },
    { id: "account_2", name: "Savings", userId: SEED_USER_ID, plaidId: null },
];
const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 45);

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
    switch (category.name) {
        // Rent will likely be a larger amount
        case "Rent":
            return Math.random() * 400 + 90;
        case "Utilities":
            return Math.random() * 200 + 50;
        case "Food":
            return Math.random() * 30 + 10;
        case "Transportation":
        case "Health":
            return Math.random() * 50 + 15;
        case "Entertainment":
        case "Clothing":
        case "Miscellaneous":
            return Math.random() * 100 + 20;
        default:
            return Math.random() * 50 + 10;
    }
};

const generateTransactionsForDay = (day: Date) => {
    // 1 to 4 transactions per day
    const numTransactions = Math.floor(Math.random() * 4) + 1;

    for (let i = 0; i < numTransactions; i++) {
        const category = SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
        // 60% chance of being an expense
        const isExpense = Math.random() > 0.6;
        const amount = generateRandomAmount(category);
        // Negative for expenses
        const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

        SEED_TRANSACTIONS.push({
            id: `transaction_${format(day, "yyyy-MM-dd")}_${i}`,
            // Assuming always using the first account for simplicity
            accountId: SEED_ACCOUNTS[0].id,
            categoryId: category.id,
            date: day,
            amount: formattedAmount,
            payee: "Merchant",
            notes: "Random transaction",
        });
    }
};

const generateTransactions = () => {
    const days = eachDayOfInterval({
        start: defaultFrom,
        end: defaultTo,
    });
    days.forEach((day) => generateTransactionsForDay(day));
};
generateTransactions();

const main = async () => {
    try {
        // Reset database
        await db.delete(transactions).execute();
        await db.delete(accounts).execute();
        await db.delete(categories).execute();
        // Seeding database
        await db.insert(categories).values(SEED_CATEGORIES).execute();
        await db.insert(accounts).values(SEED_ACCOUNTS).execute();
        await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
    } catch (error) {
        console.error("Error during seed: ", error);
        process.exit(1);
    }
};
main();
