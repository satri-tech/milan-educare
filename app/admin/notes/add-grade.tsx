"use client"

import { useState } from "react"
import axios from "axios"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Grade } from "./page"
interface GradesProps {
    onGradeAdded: (data: Grade) => void
}

export default function AddGrade({ onGradeAdded }: GradesProps) {
    const [gradeName, setGradeName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!gradeName.trim()) {
            toast.warning("Grade name cannot be empty")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await axios.post('/api/admin/neb-notes/grades', {
                grade: gradeName.trim()
            })
            const data = response.data

            toast.success(`Grade "${gradeName}" added successfully`)
            onGradeAdded(data.data)
            setGradeName("")
            setOpen(false)
        } catch (error) {
            let errorMessage = "Failed to add grade"

            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.error || error.message
            }

            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="ml-auto gap-1">
                    <Plus className="h-4 w-4" />
                    Add Grade
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Grade</DialogTitle>
                    <DialogDescription>
                        Enter a unique grade name. Duplicates will be rejected.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="E.g. Grade XI"
                        value={gradeName}
                        onChange={(e) => setGradeName(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full gap-1"
                    >
                        {isSubmitting ? (
                            "Adding..."
                        ) : (
                            <>
                                <Plus className="h-4 w-4" />
                                Add Grade
                            </>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}