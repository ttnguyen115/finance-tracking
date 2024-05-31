// hooks
import { useOpenTransaction } from "@/features/transactions/hooks";
import { useConfirm } from "@/hooks";

// components
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

// types
import TransactionForm, { type ApiFormValues } from "./TransactionForm";

// apis
import { useCreateAccount, useGetAccounts } from "@/features/accounts/api";
import { useCreateCategory, useGetCategories } from "@/features/categories/api";
import { useDeleteTransaction, useEditTransaction, useGetTransactionById } from "@/features/transactions/api";

const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenTransaction();

    const [ConfirmDialog, confirm] = useConfirm("Are you sure?", "You are about to delete this transaction");

    const { data: transaction, isLoading: isFetchingTransaction } = useGetTransactionById(id);
    const { mutate: editTransaction, isPending: isEditingTransaction } = useEditTransaction(id);
    const { mutate: deleteTransaction, isPending: isDeletingTransaction } = useDeleteTransaction(id);

    // TODO: refactor these duplicated codes below
    // categories apis
    const { data: categories, isLoading: isFetchingCategories } = useGetCategories();
    const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory();

    const onCreateCategory = (name: string) => createCategory({ name });

    const categoryOptions = (categories ?? []).map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    // accounts apis
    const { data: accounts, isLoading: isFetchingAccounts } = useGetAccounts();
    const { mutate: createAccount, isPending: isCreatingAccount } = useCreateAccount();

    const onCreateAccount = (name: string) => createAccount({ name });

    const accountOptions = (accounts ?? []).map(({ name, id }) => ({
        label: name,
        value: id,
    }));
    // TODO: Refactor end

    const isPending = isEditingTransaction || isDeletingTransaction || isFetchingTransaction || isCreatingCategory || isCreatingAccount;
    const isLoading = isFetchingTransaction || isFetchingCategories || isFetchingAccounts;

    const defaultTransactionWithValues = transaction && {
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
        amount: transaction.amount.toString(),
        date: transaction.date ? new Date(transaction.date) : new Date(),
        payee: transaction.payee,
        notes: transaction.notes,
    };
    const defaultTransactionWithoutValues = {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
    };
    const defaultTransactionFormValues = defaultTransactionWithValues || defaultTransactionWithoutValues;

    const onSubmit = (values: ApiFormValues) => {
        editTransaction(values, {
            onSuccess: onClose,
        });
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteTransaction(undefined, {
                onSuccess: onClose,
            });
        }
    };

    return (
        <>
            <ConfirmDialog />
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4">
                    <SheetHeader>
                        <SheetTitle>Edit Transaction</SheetTitle>
                        <SheetDescription>Edit an existing transaction</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <TransactionForm
                            accountOptions={accountOptions}
                            categoryOptions={categoryOptions}
                            defaultValues={defaultTransactionFormValues}
                            disabled={isPending}
                            id={id}
                            onCreateAccount={onCreateAccount}
                            onCreateCategory={onCreateCategory}
                            onDelete={onDelete}
                            onSubmit={onSubmit}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};

export default EditTransactionSheet;
