"use client"
import { useState, useEffect } from "react"
import AddGrade from "./add-grade"
import GradesList from "./grades-list" // Changed from notes-list to grades-list for consistency
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import axios from "axios"
export interface Grade {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

export default function NotesPage() {
    const [grades, setGrades] = useState<Grade[]>([])
    const [loading, setLoading] = useState(true)

    const fetchGrades = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/admin/notes/grades')
            const data = await response.data

            if (!response) throw new Error(data.error || "Failed to fetch grades")

            setGrades(data.data)
        } catch {
            toast.error("Internal Server Error")
        } finally {
            setLoading(false)
        }
    }

    const handleGradeAdded = (newGrade: Grade) => {
        setGrades(prevGrades => [newGrade, ...prevGrades]) // Adds new grade at beginning
    }
    const handleDeleteGrade = (gradeId: string) => {
        setGrades((prevGrades) => prevGrades.filter((grade) => grade.id !== gradeId))
    }
    useEffect(() => {
        fetchGrades()
    }, [])

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Notes Management</h1>
                    <p className="text-muted-foreground">
                        Create and manage your study notes organized by grade, subject, and topic.
                    </p>
                </div>
                <AddGrade onGradeAdded={handleGradeAdded} />
            </div>

            {loading ? (
                <div className=" grid grid-cols-4  gap-4">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            ) : (
                <GradesList grades={grades} onGradeDeleted={handleDeleteGrade} />
            )}
        </div>
    )
}