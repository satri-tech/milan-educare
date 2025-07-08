"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2, Edit, Plus, FileText, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MockTest {
    id: string
    title: string
    subject: string
    duration: string
    questions: number
    description: string
}

export default function AdminMockTest() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [mockTests, setMockTests] = useState<MockTest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [currentEditTest, setCurrentEditTest] = useState<MockTest | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        duration: "",
        questions: "",
        description: "",
    })
    const [formError, setFormError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const durations = ["30 minutes", "1 hour", "1.5 hours", "2 hours", "2.5 hours", "3 hours", "3.5 hours", "4 hours"]

    const fetchMockTests = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/admin/mock-tests")
            setMockTests(response.data.data)
            setError("")
        } catch (err) {
            setError("Failed to fetch mock tests")
            console.error("Error fetching mock tests:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMockTests()
    }, [])

    const resetForm = () => {
        setFormData({
            title: "",
            subject: "",
            duration: "",
            questions: "",
            description: "",
        })
        setFormError("")
        setCurrentEditTest(null)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            duration: value,
        }))
    }

    const validateForm = () => {
        if (!formData.title || !formData.subject || !formData.duration || !formData.questions || !formData.description) {
            setFormError("All fields are required")
            return false
        }
        if (isNaN(Number(formData.questions)) || Number(formData.questions) <= 0) {
            setFormError("Questions must be a positive number")
            return false
        }
        return true
    }

    const handleAddTest = async () => {
        if (!validateForm()) return

        try {
            setIsSubmitting(true)
            const response = await axios.post("/api/admin/mock-tests", {
                title: formData.title,
                subject: formData.subject,
                duration: formData.duration,
                questions: Number(formData.questions),
                description: formData.description,
            })

            if (response.data.success) {
                setIsAddDialogOpen(false)
                resetForm()
                fetchMockTests() // Refresh the list
            }
        } catch (err) {
            setFormError("Failed to create mock test")
            console.error("Error creating mock test:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEditClick = (test: MockTest) => {
        setCurrentEditTest(test)
        setFormData({
            title: test.title,
            subject: test.subject,
            duration: test.duration,
            questions: test.questions.toString(),
            description: test.description,
        })
        setFormError("")
        setIsEditDialogOpen(true)
    }

    const handleEditTest = async () => {
        if (!validateForm() || !currentEditTest) return

        try {
            setIsSubmitting(true)
            const response = await axios.put(`/api/admin/mock-tests/${currentEditTest.id}`, {
                title: formData.title,
                subject: formData.subject,
                duration: formData.duration,
                questions: Number(formData.questions),
                description: formData.description,
            })

            if (response.data.success) {
                setIsEditDialogOpen(false)
                resetForm()
                fetchMockTests() // Refresh the list
            }
        } catch (err) {
            setFormError("Failed to update mock test")
            console.error("Error updating mock test:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteTest = async (testId: string) => {
        try {
            const response = await axios.delete(`/api/admin/mock-tests/${testId}`)
            if (response.data.success) {
                fetchMockTests() // Refresh the list
            }
        } catch (err) {
            console.error("Error deleting mock test:", err)
        }
    }

    const handleDialogClose = (dialogType: "add" | "edit") => {
        if (dialogType === "add") {
            setIsAddDialogOpen(false)
        } else {
            setIsEditDialogOpen(false)
        }
        resetForm()
    }

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-full mx-auto">
                {/* Header */}
                <div className="mb-5">
                    <h1 className="text-3xl font-bold mb-3">Mock Test Management</h1>
                    <p>Create and manage mock tests for your platform</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockTests.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockTests.reduce((sum, test) => sum + test.questions, 0)}</div>
                        </CardContent>
                    </Card>

                </div>

                {/* Add New Test Button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Mock Tests</h2>
                    <Dialog
                        open={isAddDialogOpen}
                        onOpenChange={(open) => {
                            if (!open) handleDialogClose("add")
                            else setIsAddDialogOpen(true)
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add New Test
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                            <DialogHeader className="mb-4">
                                <DialogTitle>Add New Mock Test</DialogTitle>
                                <DialogDescription>Create a new mock test with all the required information</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="add-title" className="text-sm">
                                        Title
                                    </label>
                                    <Input
                                        id="add-title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Mock Test Title"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="add-subject" className="text-sm">
                                        Subject
                                    </label>
                                    <Input
                                        id="add-subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="Subject"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="add-duration" className="text-sm">
                                        Duration
                                    </label>
                                    <Select onValueChange={handleSelectChange} value={formData.duration}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {durations.map((duration) => (
                                                <SelectItem key={duration} value={duration}>
                                                    {duration}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="add-questions" className="text-sm">
                                        Number of Questions
                                    </label>
                                    <Input
                                        id="add-questions"
                                        name="questions"
                                        type="number"
                                        value={formData.questions}
                                        onChange={handleInputChange}
                                        placeholder="Number of questions"
                                        min="1"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="add-description" className="text-sm">
                                        Description
                                    </label>
                                    <Textarea
                                        id="add-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Test description"
                                    />
                                </div>
                                {formError && <div className="text-red-500 text-sm">{formError}</div>}
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <Button variant="outline" onClick={() => handleDialogClose("add")} disabled={isSubmitting}>
                                    Cancel
                                </Button>
                                <Button onClick={handleAddTest} disabled={isSubmitting}>
                                    {isSubmitting ? "Adding..." : "Add Test"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Tests Table */}
                <Card>
                    <CardHeader className="pb-6">
                        <CardTitle>All Mock Tests</CardTitle>
                        <CardDescription>Manage your mock tests, edit details, or remove tests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">Loading mock tests...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-500">{error}</p>
                                <Button variant="outline" onClick={fetchMockTests} className="mt-4 bg-transparent">
                                    Retry
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader className="">
                                    <TableRow>
                                        <TableHead className="font-semibold">Title</TableHead>
                                        <TableHead className="font-semibold">Subject</TableHead>
                                        <TableHead className="font-semibold">Duration</TableHead>
                                        <TableHead className="font-semibold">Questions</TableHead>
                                        <TableHead className="font-semibold">Description</TableHead>
                                        <TableHead className="font-semibold">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockTests.map((test) => (
                                        <TableRow key={test.id}>
                                            <TableCell className="font-medium py-4">{test.title}</TableCell>
                                            <TableCell className="py-4">
                                                <Badge variant="outline">{test.subject}</Badge>
                                            </TableCell>
                                            <TableCell className="py-4">{test.duration}</TableCell>
                                            <TableCell className="py-4">{test.questions}</TableCell>
                                            <TableCell className="max-w-xs truncate py-4">{test.description}</TableCell>
                                            <TableCell className="py-4">
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => handleEditClick(test)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="outline" size="sm">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    {`   This action cannot be undone. This will permanently delete the mock test "${test.title}
                                                                    ".`}
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteTest(test.id)}>Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                        {!loading && mockTests.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No mock tests found. Create your first test to get started.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Edit Dialog */}
                <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={(open) => {
                        if (!open) handleDialogClose("edit")
                    }}
                >
                    <DialogContent className="max-w-2xl">
                        <DialogHeader className="mb-4">
                            <DialogTitle>Edit Mock Test</DialogTitle>
                            <DialogDescription>Update the mock test information</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="edit-title" className="text-sm">
                                    Title
                                </label>
                                <Input
                                    id="edit-title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Mock Test Title"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="edit-subject" className="text-sm">
                                    Subject
                                </label>
                                <Input
                                    id="edit-subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Subject"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="edit-duration" className="text-sm">
                                    Duration
                                </label>
                                <Select onValueChange={handleSelectChange} value={formData.duration}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {durations.map((duration) => (
                                            <SelectItem key={duration} value={duration}>
                                                {duration}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="edit-questions" className="text-sm">
                                    Number of Questions
                                </label>
                                <Input
                                    id="edit-questions"
                                    name="questions"
                                    type="number"
                                    value={formData.questions}
                                    onChange={handleInputChange}
                                    placeholder="Number of questions"
                                    min="1"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="edit-description" className="text-sm">
                                    Description
                                </label>
                                <Textarea
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Test description"
                                />
                            </div>
                            {formError && <div className="text-red-500 text-sm">{formError}</div>}
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <Button variant="outline" onClick={() => handleDialogClose("edit")} disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button onClick={handleEditTest} disabled={isSubmitting}>
                                {isSubmitting ? "Updating..." : "Update Test"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
