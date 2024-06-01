import { useRef, useState } from "react";

// components
import Select from "@/components/Select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// api
import { useCreateAccount, useGetAccounts } from "@/features/accounts/api";

const useSelectAccount = (): [() => JSX.Element, () => Promise<unknown>] => {
    const { data: accounts, isLoading } = useGetAccounts();
    const { mutate: createAccount, isPending } = useCreateAccount();

    const accountOptions = (accounts ?? []).map((account) => ({
        label: account.name,
        value: account.id,
    }));

    const onCreateAccount = (name: string) => createAccount({ name });

    const [promise, setPromise] = useState<{ resolve: (value: string | undefined) => void } | null>(null);
    const selectValue = useRef<string>();

    const confirm = () =>
        new Promise((resolve, reject) => {
            setPromise({ resolve });
        });

    const handleClose = () => {
        setPromise(null);
    };

    const handleConfirm = () => {
        promise?.resolve(selectValue.current);
        handleClose();
    };

    const handleCancel = () => {
        promise?.resolve(undefined);
        handleClose();
    };

    const ConfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Account</DialogTitle>
                    <DialogDescription>Please select an account to continue</DialogDescription>
                </DialogHeader>
                <Select
                    placeholder="Select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    onChange={(value) => (selectValue.current = value)}
                    disabled={isLoading || isPending}
                />
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant="outline">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [ConfirmationDialog, confirm];
};

export default useSelectAccount;
