"use client"

import { FileText, GraduationCap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

// Sample data structure for NEB Notes
const nebData = {
    "Grade XI": {
        subjects: {
            Physics: [
                { title: "Mechanics", url: "/pdfs/grade11/physics/mechanics.pdf" },
                { title: "Heat and Thermodynamics", url: "/pdfs/grade11/physics/heat.pdf" },
                { title: "Waves and Optics", url: "/pdfs/grade11/physics/waves.pdf" },
                { title: "Electricity and Magnetism", url: "/pdfs/grade11/physics/electricity.pdf" },
            ],
            Chemistry: [
                { title: "General and Physical Chemistry", url: "/pdfs/grade11/chemistry/general.pdf" },
                { title: "Inorganic Chemistry", url: "/pdfs/grade11/chemistry/inorganic.pdf" },
                { title: "Organic Chemistry", url: "/pdfs/grade11/chemistry/organic.pdf" },
            ],
            Biology: [
                { title: "Biomolecules and Cell Biology", url: "/pdfs/grade11/biology/biomolecules.pdf" },
                { title: "Botany", url: "/pdfs/grade11/biology/botany.pdf" },
                { title: "Zoology", url: "/pdfs/grade11/biology/zoology.pdf" },
            ],
            Mathematics: [
                { title: "Algebra", url: "/pdfs/grade11/math/algebra.pdf" },
                { title: "Trigonometry", url: "/pdfs/grade11/math/trigonometry.pdf" },
                { title: "Analytical Geometry", url: "/pdfs/grade11/math/geometry.pdf" },
                { title: "Vectors", url: "/pdfs/grade11/math/vectors.pdf" },
            ],
            English: [
                { title: "Grammar and Composition", url: "/pdfs/grade11/english/grammar.pdf" },
                { title: "Literature", url: "/pdfs/grade11/english/literature.pdf" },
            ],
            Nepali: [
                { title: "व्याकरण र रचना", url: "/pdfs/grade11/nepali/grammar.pdf" },
                { title: "साहित्य", url: "/pdfs/grade11/nepali/literature.pdf" },
            ],
            "Computer Science": [
                { title: "Programming Fundamentals", url: "/pdfs/grade11/computer/programming.pdf" },
                { title: "Database Management", url: "/pdfs/grade11/computer/database.pdf" },
                { title: "Web Technology", url: "/pdfs/grade11/computer/web.pdf" },
            ],
        },
    },
    "Grade XII": {
        subjects: {
            Physics: [
                { title: "Mechanics", url: "/pdfs/grade12/physics/mechanics.pdf" },
                { title: "Heat and Thermodynamics", url: "/pdfs/grade12/physics/heat.pdf" },
                { title: "Geometrical Optics", url: "/pdfs/grade12/physics/optics.pdf" },
                { title: "Electricity and Magnetism", url: "/pdfs/grade12/physics/electricity.pdf" },
                { title: "Modern Physics", url: "/pdfs/grade12/physics/modern.pdf" },
                { title: "Astrophysics", url: "/pdfs/grade12/physics/astrophysics.pdf" },
            ],
            Chemistry: [
                { title: "General and Physical Chemistry", url: "/pdfs/grade12/chemistry/general.pdf" },
                { title: "Inorganic Chemistry", url: "/pdfs/grade12/chemistry/inorganic.pdf" },
                { title: "Organic Chemistry", url: "/pdfs/grade12/chemistry/organic.pdf" },
                { title: "Applied Chemistry", url: "/pdfs/grade12/chemistry/applied.pdf" },
            ],
            Biology: [
                { title: "Botany", url: "/pdfs/grade12/biology/botany.pdf" },
                { title: "Zoology", url: "/pdfs/grade12/biology/zoology.pdf" },
                { title: "Applied Biology", url: "/pdfs/grade12/biology/applied.pdf" },
            ],
            Mathematics: [
                { title: "Algebra", url: "/pdfs/grade12/math/algebra.pdf" },
                { title: "Calculus", url: "/pdfs/grade12/math/calculus.pdf" },
                { title: "Statistics and Probability", url: "/pdfs/grade12/math/statistics.pdf" },
                { title: "Vectors and 3D Geometry", url: "/pdfs/grade12/math/vectors.pdf" },
            ],
            English: [
                { title: "Grammar and Composition", url: "/pdfs/grade12/english/grammar.pdf" },
                { title: "Literature", url: "/pdfs/grade12/english/literature.pdf" },
            ],
            Nepali: [
                { title: "व्याकरण र रचना", url: "/pdfs/grade12/nepali/grammar.pdf" },
                { title: "साहित्य", url: "/pdfs/grade12/nepali/literature.pdf" },
            ],
            "Computer Science": [
                { title: "Programming in C", url: "/pdfs/grade12/computer/c-programming.pdf" },
                { title: "Object Oriented Programming", url: "/pdfs/grade12/computer/oop.pdf" },
                { title: "Data Structure and Algorithm", url: "/pdfs/grade12/computer/dsa.pdf" },
                { title: "Web Technology II", url: "/pdfs/grade12/computer/web2.pdf" },
            ],
        },
    },
}

export default function NebNotes() {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center mt-24 h-max border-t-[0.1px] font-sans pt-16 w-screen">
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
                            {/* Static Grade Header - Always Visible */}
                            <div className="relative px-8 py-6 bg-primary">
                                {/* Background pattern */}
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <GraduationCap className="h-7 w-7 text-secondary-foreground" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-primary-foreground mb-1">{grade}</h2>
                                            <p className="text-primary-foreground/70 text-sm font-medium">Science Faculty • NEB Curriculum</p>
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

                            {/* Subjects Accordion - Always Expanded */}
                            <div className="relative p-8 bg-card">
                                <Accordion type="multiple" className="space-y-4">
                                    {Object.entries(gradeData.subjects).map(([subject, topics]) => (
                                        <AccordionItem
                                            key={subject}
                                            value={subject}
                                            className="border-0 rounded-xl bg-card shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group/subject"
                                        >
                                            <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-muted transition-all duration-300 group-hover/subject:bg-muted [&[data-state=open]]:bg-muted">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center shadow-sm group-hover/subject:shadow-md transition-all duration-300 group-hover/subject:scale-105">
                                                        <FileText className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                    <div className="text-left flex-1">
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-lg font-bold text-foreground group-hover/subject:text-primary transition-colors">
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
                                                <div className="border-t border-border pt-4">
                                                    <div className="grid gap-3">
                                                        {topics.map((topic, index) => (
                                                            <div
                                                                key={index}
                                                                className="group/topic relative flex items-center justify-between p-4 rounded-xl hover:bg-card hover:shadow-md transition-all duration-300 border border-transparent hover:border-border cursor-pointer"
                                                            >
                                                                {/* Topic content */}
                                                                <div className="flex items-center gap-4 flex-1">
                                                                    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center group-hover/topic:scale-110 transition-transform duration-300">
                                                                        <FileText className="h-4 w-4 text-secondary-foreground" />
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <span className="text-card-foreground font-semibold text-sm group-hover/topic:text-primary transition-colors">
                                                                            {topic.title}
                                                                        </span>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                                                            <span className="text-xs text-muted-foreground font-medium">PDF Available</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Action button */}
                                                                <Button
                                                                    size="sm"
                                                                    className="opacity-0 group-hover/topic:opacity-100 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl border-0 h-9 px-4"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={topic.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                        <span className="text-xs font-semibold">View PDF</span>
                                                                    </a>
                                                                </Button>
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