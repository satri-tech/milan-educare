import { GraduationCap, Sparkles, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title?: string;
    MainIcon?: LucideIcon;
    AccentIcon?: LucideIcon;
    position?: "start" | "center" | "end";
    lineColor?: string;
    className?: string;
    lineClassName?: string;
}

export default function SectionHeader({
    title = "NEB Study Notes",
    MainIcon = GraduationCap,
    AccentIcon = Sparkles,
    position = "start",
    lineColor = "from-yellow-400 to-orange-400",
    className = "",
    lineClassName = " w-72 sm:w-96"
}: SectionHeaderProps) {
    const positionClasses = {
        start: "items-start",
        center: "items-center",
        end: "items-end"
    };

    const linePositionClasses = {
        start: "ml-20",
        center: "mx-auto",
        end: "mr-20"
    };

    return (
        <header className={cn("flex flex-col", positionClasses[position], className)}>
            <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-3">
                    <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-100 via-green-200 to-slate-50 backdrop-blur-sm rounded-2xl flex items-center justify-center border">
                            <MainIcon className="h-8 w-8 text-slate-700" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full flex items-center justify-center shadow-md shadow-amber-200/50 ring-2 ring-white">
                            <AccentIcon className="h-3 w-3 text-amber-700" />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4 tracking-tight">
                    {title}
                </h1>
            </div>

            <div className={cn(" h-1 bg-gradient-to-r rounded-full mb-4", lineColor, linePositionClasses[position], lineClassName)}></div>
        </header>
    );
}