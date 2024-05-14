// hooks
import { useOpenAccount } from "@/features/accounts/hooks";
import { useConfirm } from "@/hooks";

// components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "@/features/accounts/components";
import { Loader2 } from "lucide-react";

// types
import { type FormValues } from "./TransactionForm";

// apis
import { useDeleteAccount, useEditAccount, useGetAccountById } from "@/features/accounts/api";

const EditTransactionSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    );

    const { data: account, isLoading } = useGetAccountById(id);
    const { mutate: editMutation, isPending: isEditing } = useEditAccount(id);
    const { mutate: deleteMutation, isPending: isDeleting } = useDeleteAccount(id);

    const isPending = isEditing || isDeleting;
    const defaultAccountFormValues = account ? { name: account.name } : { name: "" };

    const onSubmit = (values: FormValues) => {
        editMutation(values, {
            onSuccess: onClose,
        });
    };

    const onDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation(undefined, {
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
                        <SheetTitle>Edit Account</SheetTitle>
                        <SheetDescription>Edit an existing account</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <AccountForm
                            id={id}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            disabled={isPending}
                            defaultValues={defaultAccountFormValues}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};

export default EditTransactionSheet;
