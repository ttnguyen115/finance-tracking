// libs
import { z } from "zod";

// hooks
import { useNewTransaction } from "@/features/transactions/hooks";

// apis
import { useCreateAccount, useGetAccounts } from "@/features/accounts/api";
import { useCreateCategory, useGetCategories } from "@/features/categories/api";
import { useCreateTransaction } from "@/features/transactions/api";

// schemas
import { insertTransactionSchema } from "@/db/schema";

// components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { TransactionForm } from "@/features/transactions/components";
import { Loader2 } from "lucide-react";

const formSchema = insertTransactionSchema.pick({
    id: true,
});

type FormValues = z.input<typeof formSchema>;

const NewTransactionSheet = () => {
    // store hooks
    const { isOpen, onClose } = useNewTransaction();

    // TODO: refactor these duplicated codes below
    // categories apis
    const { data: categories, isLoading: isFetchingCategories } = useGetCategories();
    const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();

    const onCreateCategory = (name: string) => createCategory({ name });

    const categoryOptions = (categories ?? []).map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    // transactions apis
    const { mutate: createTransaction, isPending: isCreatingTransaction } = useCreateTransaction();

    // accounts apis
    const { data: accounts, isLoading: isFetchingAccounts } = useGetAccounts();
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

    const onCreateAccount = (name: string) => createAccount({ name });

    const accountOptions = (accounts ?? []).map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const isPending = isCreatingCategory || isCreatingCategory || isCreatingAccount;
    const isLoading = isFetchingCategories || isFetchingAccounts;

    const defaultAccountFormValues = {
        name: "",
    };

    const onSubmit = (values: FormValues) => {
        createTransaction(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Transaction</SheetTitle>
                    <SheetDescription>Add a new transaction.</SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin" />
                    </div>
                ) : (
                    <TransactionForm
                        onSubmit={onSubmit}
                        disabled={isPending}
                        categoryOptions={categoryOptions}
                        onCreateCategory={onCreateCategory}
                        accountOptions={accountOptions}
                        onCreateAccount={onCreateAccount}
                    />
                )}
            </SheetContent>
        </Sheet>
    );
};

export default NewTransactionSheet;
