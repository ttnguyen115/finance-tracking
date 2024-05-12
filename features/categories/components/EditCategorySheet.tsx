// hooks
import { useOpenCategory } from "@/features/categories/hooks";
import { useConfirm } from "@/hooks";

// components
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "@/features/categories/components";
import { Loader2 } from "lucide-react";

// types
import { type FormValues } from "./CategoryForm";

// apis
import { useDeleteCategory, useEditCategory, useGetCategoryById } from "@/features/categories/api";

const EditCategorySheet = () => {
    const { isOpen, onClose, id } = useOpenCategory();

    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this category"
    );

    const { data: category, isLoading } = useGetCategoryById(id);
    const { mutate: editMutation, isPending: isEditing } = useEditCategory(id);
    const { mutate: deleteMutation, isPending: isDeleting } = useDeleteCategory(id);

    const isPending = isEditing || isDeleting;
    const defaultCategoryFormValues = category ? { name: category.name } : { name: "" };

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
                        <SheetTitle>Edit category</SheetTitle>
                        <SheetDescription>Edit an existing category</SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="size-4 text-muted-foreground animate-spin" />
                        </div>
                    ) : (
                        <CategoryForm
                            id={id}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            disabled={isPending}
                            defaultValues={defaultCategoryFormValues}
                        />
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};

export default EditCategorySheet;
