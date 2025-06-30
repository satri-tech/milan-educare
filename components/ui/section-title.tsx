import { cn } from "@/lib/utils";

interface HeaderProps {
    header: string;
    className?: string;
}

export default function Header({ header, className }: HeaderProps) {
    return (
        <div className="w-full flex flex-col">
            <div
                className={cn(
                    "w-24 h-10 px-2 py-2 border-2 rounded-full flex justify-center items-center border-[#3b3b3b]  text-sm bg-black text-white cursor-pointer transition-all duration-500",
                    className
                )}
            >
                {header}
            </div>
        </div>
    );
}
