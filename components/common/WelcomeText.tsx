import { ArrowRight } from "lucide-react";

export default function WelcomeText() {
    return (
        <div id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            <div className="relative pt-5  ">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <div
                            className="hover:bg-background  cursor-pointer dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                        >
                            <span className="text-foreground text-sm">
                                Educational Excellence Since 2020🚀⚡
                            </span>
                            <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                    <span className="flex size-6">
                                        <ArrowRight className="m-auto size-3 dark:text-white text-black" />
                                    </span>
                                    <span className="flex size-6">
                                        <ArrowRight className="m-auto size-3 dark:text-white text-black" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mt-6 leading-tight">
                            Welcome very very to{' '}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-primary to-primary/90 bg-clip-text text-transparent">
                                    Milan EduCare
                                </span>
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            </span>
                        </div>
                        <p className="text-xl md:text-lg text-gray-600 font-medium mb-8 max-w-3xl mx-auto leading-relaxed">
                            Empowering Students, Enriching Futures
                        </p>


                    </div>
                </div>
            </div>
        </div>
    )
}