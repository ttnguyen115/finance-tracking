// components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// utils
import { cn } from "@/lib/utils";

const options = ["amount", "payee", "notes", "date"];

const TableHeadSelect = ({ columnIndex, selectedColumns, onChange }: TableHeadSelectProps) => {
    const currentSelection = selectedColumns[`column_${columnIndex}`];

    const selectClassnames = cn(
        "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
        currentSelection && "text-blue-500"
    );

    return (
        <Select value={currentSelection || ""} onValueChange={(value) => onChange(columnIndex, value)}>
            <SelectTrigger className={selectClassnames}>
                <SelectValue placeholder="Skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="skip">Skip</SelectItem>
                {options.map((option, index) => {
                    // disabled selected option
                    const disabled = Object.values(selectedColumns).includes(option) && currentSelection !== option;
                    return (
                        <SelectItem key={index} value={option} disabled={disabled} className="capitalize">
                            {option}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

type TableHeadSelectProps = {
    columnIndex: number;
    selectedColumns: Record<string, string | null>;
    onChange: (columnIndex: number, value: string | null) => void;
};

export default TableHeadSelect;
