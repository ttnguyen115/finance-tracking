import { useState } from "react";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImportTable from "./ImportTable";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnsState {
    [key: string]: string | null;
}

const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
    const [headers, ...body] = data;

    const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});

    return (
        <div className="component-container w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Import Transactions</CardTitle>
                    <div className="flex items-center gap-x-2">
                        <Button onClick={onCancel} size="sm">
                            Cancel
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={headers}
                        body={body}
                        selectedColumns={selectedColumns}
                        onTableHeadSelectChange={() => {}}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

type ImportCardProps = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
};

export default ImportCard;
