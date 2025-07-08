"use client"

import { FileText, GraduationCap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// Sample data structure for NEB Notes with multiple PDFs per topic
const nebData = {
    "Grade XI": {
        subjects: {
            Physics: [
                {
                    title: "Mechanics",
                    pdfs: [
                        { name: "Chapter 1: Motion", url: "/pdfs/grade11/physics/mechanics/ch1-motion.pdf" },
                        { name: "Chapter 2: Force", url: "/pdfs/grade11/physics/mechanics/ch2-force.pdf" },
                        { name: "Practice Problems", url: "/pdfs/grade11/physics/mechanics/problems.pdf" }
                    ]
                },
                {
                    title: "Heat and Thermodynamics",
                    pdfs: [
                        { name: "Chapter 1: Temperature", url: "/pdfs/grade11/physics/heat/ch1-temperature.pdf" },
                        { name: "Chapter 2: Thermal Properties", url: "/pdfs/grade11/physics/heat/ch2-thermal.pdf" },
                        { name: "Solved Examples", url: "/pdfs/grade11/physics/heat/examples.pdf" }
                    ]
                },
            ],
            Chemistry: [
                {
                    title: "General Chemistry",
                    pdfs: [
                        { name: "Chapter 1: Atomic Structure", url: "/pdfs/grade11/chemistry/general/ch1-atomic.pdf" },
                        { name: "Chapter 2: Chemical Bonding", url: "/pdfs/grade11/chemistry/general/ch2-bonding.pdf" },
                        { name: "Reference Tables", url: "/pdfs/grade11/chemistry/general/tables.pdf" }
                    ]
                },
            ],
            Mathematics: [
                {
                    title: "Algebra",
                    pdfs: [
                        { name: "Chapter 1: Set Theory", url: "/pdfs/grade11/math/algebra/ch1-sets.pdf" },
                        { name: "Chapter 2: Functions", url: "/pdfs/grade11/math/algebra/ch2-functions.pdf" },
                        { name: "Exercise Solutions", url: "/pdfs/grade11/math/algebra/solutions.pdf" }
                    ]
                },
            ],
        },
    },
    "Grade XII": {
        subjects: {
            Physics: [
                {
                    title: "Modern Physics",
                    pdfs: [
                        { name: "Chapter 1: Quantum Physics", url: "/pdfs/grade12/physics/modern/ch1-quantum.pdf" },
                        { name: "Chapter 2: Atomic Structure", url: "/pdfs/grade12/physics/modern/ch2-atomic.pdf" },
                        { name: "Applications", url: "/pdfs/grade12/physics/modern/applications.pdf" }
                    ]
                },
            ],
            Chemistry: [
                {
                    title: "Applied Chemistry",
                    pdfs: [
                        { name: "Chapter 1: Polymers", url: "/pdfs/grade12/chemistry/applied/ch1-polymers.pdf" },
                        { name: "Chapter 2: Biomolecules", url: "/pdfs/grade12/chemistry/applied/ch2-biomolecules.pdf" },
                        { name: "Industrial Applications", url: "/pdfs/grade12/chemistry/applied/industrial.pdf" }
                    ]
                },
            ],
            Mathematics: [
                {
                    title: "Calculus",
                    pdfs: [
                        { name: "Chapter 1: Limits", url: "/pdfs/grade12/math/calculus/ch1-limits.pdf" },
                        { name: "Chapter 2: Differentiation", url: "/pdfs/grade12/math/calculus/ch2-differentiation.pdf" },
                        { name: "Applications", url: "/pdfs/grade12/math/calculus/applications.pdf" }
                    ]
                },
            ],
        },
    },
}

export default function NebNotes() {
    return (
        <div id="notes" className="flex lg:flex-row flex-col justify-center items-center mt-24 h-max border-t-[0.1px] font-sans pt-16 w-screen">
            <div className="flex lg:w-[92%] w-[90%] sm:gap-4 gap-6 flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">NEB Notes</h1>
                    <p className="text-lg text-muted-foreground">Complete study materials for Grade XI and XII</p>
                </div>
                <div className="space-y-8">
                    {Object.entries(nebData).map(([grade, gradeData]) => (
                        <div
                            key={grade}
                            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            {/* Grade Header */}
                            <div className="relative px-8 py-6 bg-primary">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <GraduationCap className="h-7 w-7 text-secondary-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-primary-foreground mb-1">{grade}</h2>
                                            <p className="text-primary-foreground/70 text-xs font-medium">Science Faculty • NEB Curriculum</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            variant="secondary"
                                            className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
                                        >
                                            {Object.keys(gradeData.subjects).length} Subjects
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Subjects Accordion */}
                            <div className="relative p-8 bg-card">
                                <Accordion type="multiple" className="space-y-4 mb-10">
                                    {Object.entries(gradeData.subjects).map(([subject, topics]) => (
                                        <AccordionItem
                                            key={subject}
                                            value={subject}
                                            className=" rounded-xl border   transition-all duration-300 overflow-hidden group/subject"
                                        >
                                            <AccordionTrigger className="px-6 cursor-pointer py-5 hover:no-underline hover:bg-muted transition-all duration-300 group-hover/subject:bg-muted [&[data-state=open]]:bg-muted">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center shadow-sm group-hover/subject:shadow-md transition-all duration-300 group-hover/subject:scale-105">
                                                        <FileText className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                    <div className="text-left flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-base font-semibold text-foreground group-hover/subject:text-primary transition-colors">
                                                                {subject}
                                                            </h3>
                                                            <Badge
                                                                variant="outline"
                                                                className="bg-secondary text-secondary-foreground border-border text-xs font-semibold px-2 py-1"
                                                            >
                                                                {topics.length} topics
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground font-medium">Complete study materials and notes</p>
                                                    </div>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-6 pb-6 bg-muted/50">
                                                <div className="border-t  border-border pt-4">
                                                    <div className="grid gap-4 ">
                                                        {topics.map((topic, topicIndex) => (
                                                            <div
                                                                key={topicIndex}
                                                                className="group/topic relative rounded-xl border border-border bg-card p-4 hover:shadow-md transition-all duration-300 "
                                                            >
                                                                {/* Topic Header */}
                                                                <div className="flex items-center gap-3 mb-3">
                                                                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center group-hover/topic:scale-110 transition-transform duration-300">
                                                                        <FileText className="h-5 w-5 text-secondary-foreground" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h4 className="font-semibold text-sm text-foreground group-hover/topic:text-primary transition-colors">
                                                                            {topic.title}
                                                                        </h4>
                                                                        <p className="text-xs text-muted-foreground font-medium">
                                                                            {topic.pdfs.length} PDF files available
                                                                        </p>
                                                                    </div>
                                                                    <Badge variant="outline" className="text-xs">
                                                                        {topic.pdfs.length} PDFs
                                                                    </Badge>
                                                                </div>

                                                                {/* PDF List */}
                                                                <div className="space-y-2 pl-2">
                                                                    {topic.pdfs.map((pdf, pdfIndex) => (
                                                                        <div
                                                                            key={pdfIndex}
                                                                            className="group/pdf flex items-center justify-between p-3 rounded-lg hover:bg-muted/90 transition-all duration-200"
                                                                        >
                                                                            <div className="flex items-center gap-3 flex-1">
                                                                                <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center">
                                                                                    <FileText className="h-3 w-3 text-primary" />
                                                                                </div>
                                                                                <span className="text-sm font-medium text-foreground group-hover/pdf:text-primary transition-colors">
                                                                                    {pdf.name}
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2">
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="ghost"
                                                                                    className="opacity-0 group-hover/pdf:opacity-100 transition-all duration-200 h-8 px-3"
                                                                                    asChild
                                                                                >
                                                                                    <a
                                                                                        href={pdf.url}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className="flex items-center gap-1"
                                                                                    >
                                                                                        <Eye className="h-3 w-3" />
                                                                                        <span className="text-xs">View</span>
                                                                                    </a>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}