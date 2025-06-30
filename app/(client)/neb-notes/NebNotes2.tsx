"use client"

import { FileText, Download, BookOpen, GraduationCap, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/section-title"
import { BsOpencollective } from "react-icons/bs"

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
        <div className="flex lg:flex-row flex-col justify-center items-center mt-24 h-max border-t-[0.1px] font-Poppins pt-16 w-screen">
            <div className="flex l:w-[92%] w-[90%] sm:gap-4 gap-6 flex-col">
                <Header header="NEB Notes" className="w-32 py-2" />

                <div className="w-full sm:text-[2.4rem] text-3xl font-medium sm:leading-[4.4rem] tracking-tight">
                    Well-structured notes for NEB exams, covering key topics and concepts.
                </div>

                <div className="mt-12 space-y-8">
                    {Object.entries(nebData).map(([grade, gradeData]) => (
                        <Card
                            key={grade}
                            className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-100"
                        >
                            <CardContent className="p-0">
                                {/* Grade Header */}
                                <div className="bg-gradient-to-r from-primary to-primary/70 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                            <GraduationCap className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{grade}</h2>
                                            <p className="text-slate-300">Science Faculty - NEB Curriculum</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Subjects Tree */}
                                <div className="p-6 space-y-6">
                                    {Object.entries(gradeData.subjects).map(([subject, topics]) => (
                                        <div key={subject} className="ml-4">
                                            {/* Subject Card */}
                                            <Card className="mb-4 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                            <BookOpen className="h-5 w-5 text-slate-600" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-semibold text-slate-900">{subject}</h3>
                                                            <p className="text-sm text-slate-500">{topics.length} topics available</p>
                                                        </div>
                                                    </div>

                                                    {/* Topics List */}
                                                    <div className="ml-6 space-y-2">
                                                        {topics.map((topic, index) => (
                                                            <div
                                                                key={index}
                                                                className="group cursor-pointer flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-150"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                                                    <div className="flex items-center gap-2">
                                                                        <FileText className="h-4 w-4 text-slate-500" />
                                                                        <span className="text-slate-700 font-medium">{topic.title}</span>
                                                                    </div>
                                                                </div>
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 px-3"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={topic.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                                                                    >
                                                                        <Eye className="h-4 w-4" />
                                                                        <span className="text-xs font-medium">Open</span>
                                                                    </a>
                                                                </Button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
