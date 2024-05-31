// icons
import { Upload } from "lucide-react";

// libs
import { useCSVReader } from "react-papaparse";

// components
import { Button } from "@/components/ui/button";

const UploadButton = ({ onUpload }: UploadButtonProps) => {
    const { CSVReader } = useCSVReader();

    // TODO: Add a paywall

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => (
                <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
                    <Upload className="size-4 mr-2" />
                    Import
                </Button>
            )}
        </CSVReader>
    );
};

type UploadButtonProps = {
    onUpload: (results: any) => void;
};

export default UploadButton;
