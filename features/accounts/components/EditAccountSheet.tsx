// hooks
import { useOpenAccount } from "@/features/accounts/hooks";

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
import { type FormValues } from "./AccountForm";

// apis
import { useEditAccount, useGetAccountById } from "@/features/accounts/api";

const EditAccountSheet = () => {
    const { isOpen, onClose, id } = useOpenAccount();

    const { data: account, isLoading } = useGetAccountById(id);
    const { mutate, isPending } = useEditAccount(id);

    const defaultAccountFormValues = account ? { name: account.name } : { name: "" };

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess: onClose,
        });
    };

    return (
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
                        disabled={isPending}
                        defaultValues={defaultAccountFormValues}
                    />
                )}
            </SheetContent>
        </Sheet>
    );
};

export default EditAccountSheet;
