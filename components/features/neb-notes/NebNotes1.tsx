"use client"

import { FileText, GraduationCap, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/section-title"

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

const subjectColors = {
    Physics: "bg-red-50 border-red-200 text-red-900",
    Chemistry: "bg-green-50 border-green-200 text-green-900",
    Biology: "bg-emerald-50 border-emerald-200 text-emerald-900",
    Mathematics: "bg-purple-50 border-purple-200 text-purple-900",
    English: "bg-orange-50 border-orange-200 text-orange-900",
    Nepali: "bg-red-50 border-red-200 text-red-900",
    "Computer Science": "bg-indigo-50 border-indigo-200 text-indigo-900",
}

const subjectIcons = {
    Physics: "⚛️",
    Chemistry: "🧪",
    Biology: "🧬",
    Mathematics: "📐",
    English: "📚",
    Nepali: "🇳🇵",
    "Computer Science": "💻",
}

export default function NebNotes() {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center mt-24 h-max border-t-[0.1px] font-Poppins pt-16 w-screen ">
            <div className="flex l:w-[92%] w-[90%] sm:gap-4 gap-6 flex-col">
                <Header header="NEB Notes" />

                <div className="flex flex-col gap-12 ">
                    {Object.entries(nebData).map(([grade, gradeData]) => (
                        <div key={grade} className="space-y-8">
                            {/* Grade Header */}
                            <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary/80 to-primary/90 rounded-2xl flex items-center justify-center shadow-lg">
                                    <GraduationCap className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">{grade}</h2>
                                    <p className="text-gray-600 text-lg">Science Faculty - NEB Curriculum</p>
                                </div>
                            </div>

                            {/* Subjects Grid */}
                            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {Object.entries(gradeData.subjects).map(([subject, topics]) => (
                                    <Card
                                        key={subject}
                                        className={`${subjectColors[subject as keyof typeof subjectColors]} border-2 shadow-sm hover:shadow-md transition-all duration-200`}
                                    >
                                        <CardHeader className="pb-4">
                                            <CardTitle className="flex items-center gap-3 text-xl">
                                                <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                                    {subjectIcons[subject as keyof typeof subjectIcons]}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{subject}</div>
                                                    <div className="text-sm font-normal opacity-70">{topics.length} Topics</div>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>

                                        <CardContent className="space-y-3">
                                            {topics.map((topic, index) => (
                                                <div
                                                    key={index}
                                                    className="group bg-white/60 rounded-lg p-4 hover:bg-white/80 transition-all duration-200 border border-white/40"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3 flex-1">
                                                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                                <FileText className="h-4 w-4 text-gray-600" />
                                                            </div>
                                                            <span className="font-medium text-sm leading-relaxed">{topic.title}</span>
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8 p-0"
                                                            asChild
                                                        >
                                                            <a
                                                                href={topic.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center justify-center"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
