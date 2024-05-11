// hooks
import { useNewAccount } from "@/features/accounts/hooks";

// components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "@/features/accounts/components";

// types
import { type FormValues } from "./AccountForm";

// apis
import { useCreateAccount } from "@/features/accounts/api";

const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    const { mutate, isPending } = useCreateAccount();

    const defaultAccountFormValues = {
        name: "",
    };

    const onSubmit = (values: FormValues) => {
        mutate(values, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm
                    onSubmit={onSubmit}
                    disabled={isPending}
                    defaultValues={defaultAccountFormValues}
                />
            </SheetContent>
        </Sheet>
    );
};

export default NewAccountSheet;
