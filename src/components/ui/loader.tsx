import { Loader2 } from "lucide-react";

export const Loader = () => {
    return (
        <div className="flex justify-center items-center h-[50vh] w-full">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
    );
};
