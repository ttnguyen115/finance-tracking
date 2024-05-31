"use client";

// hooks
import { useOpenTransaction } from "@/features/transactions/hooks";

// components
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

// apis
import { useDeleteTransaction } from "@/features/transactions/api";
import { useConfirm } from "@/hooks";

export const Actions = ({ id }: ActionsProps) => {
    const { onOpen } = useOpenTransaction();

    const { mutate: deleteMutation, isPending } = useDeleteTransaction(id);

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this transaction"
    );

    const handleDelete = async () => {
        const ok = await confirm();
        if (ok) {
            deleteMutation();
        }
    };

    return (
        <>
            <ConfirmDialog />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreHorizontal className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={isPending} onClick={() => onOpen(id)}>
                        <Edit className="size-4 mr-2" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={isPending} onClick={handleDelete}>
                        <Trash className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

type ActionsProps = {
    id: string;
};
