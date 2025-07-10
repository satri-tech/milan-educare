"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2, FileText, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface Pdf {
  id: string
  name: string
  url: string
  createdAt: string
}

interface Topic {
  id: string
  title: string
  pdfs: Pdf[]
  createdAt: string
}

interface Subject {
  id: string
  name: string
  topics: Topic[]
  createdAt: string
}

interface Grade {
  id: string
  name: string
  subjects: Subject[]
  createdAt: string
}

export default function GradePage({
    params,
}: {
    params: { gradeId: string }
}) {
    const [grade, setGrade] = useState<Grade | null>(null)
    const [loading, setLoading] = useState(true)
    const [subjectName, setSubjectName] = useState("")
    const [topicTitle, setTopicTitle] = useState("")
    const [pdfName, setPdfName] = useState("")
    const [pdfUrl, setPdfUrl] = useState("")
    const [isAddingSubject, setIsAddingSubject] = useState(false)
    const [isAddingTopic, setIsAddingTopic] = useState(false)
    const [isAddingPdf, setIsAddingPdf] = useState(false)
    const [selectedSubjectId, setSelectedSubjectId] = useState("")
    const [selectedTopicId, setSelectedTopicId] = useState("")

    const fetchGradeData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`/api/admin/notes/${params.gradeId}`)
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch grade data")
            }

            setGrade(data.data)
        } catch (error) {
            toast.error("Failed to load grade data")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddSubject = async () => {
        if (!subjectName.trim()) {
            toast.error("Subject name is required")
            return
        }

        try {
            setIsAddingSubject(true)
            const response = await fetch(`/api/admin/notes/${params.gradeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: subjectName.trim() }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to add subject")
            }

            toast.success("Subject added successfully")
            setSubjectName("")
            fetchGradeData() // Refresh the data
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsAddingSubject(false)
        }
    }

    const handleAddTopic = async () => {
        if (!topicTitle.trim()) {
            toast.error("Topic title is required")
            return
        }
        if (!selectedSubjectId) {
            toast.error("Please select a subject")
            return
        }

        try {
            setIsAddingTopic(true)
            const response = await fetch(`/api/admin/notes/subjects/${selectedSubjectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: topicTitle.trim() }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to add topic")
            }

            toast.success("Topic added successfully")
            setTopicTitle("")
            setSelectedSubjectId("")
            fetchGradeData() // Refresh the data
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsAddingTopic(false)
        }
    }

    const handleAddPdf = async () => {
        if (!pdfName.trim()) {
            toast.error("PDF name is required")
            return
        }
        if (!pdfUrl.trim()) {
            toast.error("PDF URL is required")
            return
        }
        if (!selectedTopicId) {
            toast.error("Please select a topic")
            return
        }

        try {
            setIsAddingPdf(true)
            const response = await fetch(`/api/admin/notes/topics/${selectedTopicId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: pdfName.trim(),
                    url: pdfUrl.trim()
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to add PDF")
            }

            toast.success("PDF added successfully")
            setPdfName("")
            setPdfUrl("")
            setSelectedTopicId("")
            fetchGradeData() // Refresh the data
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsAddingPdf(false)
        }
    }

    const handleDeleteSubject = async (subjectId: string) => {
        if (!confirm("Are you sure you want to delete this subject? This will also delete all topics and PDFs under it.")) {
            return
        }

        try {
            const response = await fetch(`/api/admin/notes/subjects/${subjectId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete subject")
            }

            toast.success("Subject deleted successfully")
            fetchGradeData() // Refresh the data
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleDeleteTopic = async (topicId: string) => {
        if (!confirm("Are you sure you want to delete this topic? This will also delete all PDFs under it.")) {
            return
        }

        try {
            const response = await fetch(`/api/admin/notes/topics/${topicId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete topic")
            }

            toast.success("Topic deleted successfully")
            fetchGradeData() // Refresh the data
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const handleDeletePdf = async (pdfId: string) => {
        if (!confirm("Are you sure you want to delete this PDF?")) {
            return
        }

        try {
            const response = await fetch(`/api/admin/notes/pdfs/${pdfId}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to delete PDF")
            }

            toast.success("PDF deleted successfully")
            fetchGradeData() // Refresh the data
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchGradeData()
    }, [params.gradeId])

    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Skeleton className="h-8 w-64 mb-6" />
                <div className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                </div>
            </div>
        )
    }

    if (!grade) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Grade not found</h1>
                    <Link href="/admin/notes">
                        <Button>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Notes
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/notes">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{grade.name} - Notes Management</h1>
                        <p className="text-muted-foreground">
                            Manage subjects, topics, and PDFs for {grade.name}
                        </p>
                    </div>
                </div>

                {/* Add Subject Dialog */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Subject
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Subject</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Subject name"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
                            />
                            <Button 
                                onClick={handleAddSubject} 
                                disabled={isAddingSubject}
                                className="w-full"
                            >
                                {isAddingSubject ? "Adding..." : "Add Subject"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Subjects List */}
            {grade.subjects.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <div className="text-center text-muted-foreground">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-medium mb-2">No subjects yet</h3>
                            <p>Add your first subject to get started with organizing notes.</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Accordion type="multiple" className="space-y-4">
                    {grade.subjects.map((subject) => (
                        <AccordionItem key={subject.id} value={subject.id}>
                            <Card>
                                <AccordionTrigger className="hover:no-underline">
                                    <CardHeader className="flex-row items-center justify-between w-full">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-xl">{subject.name}</CardTitle>
                                            <span className="text-sm text-muted-foreground">
                                                ({subject.topics.length} topics)
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* Add Topic Dialog */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setSelectedSubjectId(subject.id)
                                                        }}
                                                    >
                                                        <Plus className="h-4 w-4 mr-1" />
                                                        Add Topic
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Add New Topic to {subject.name}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <Input
                                                            placeholder="Topic title"
                                                            value={topicTitle}
                                                            onChange={(e) => setTopicTitle(e.target.value)}
                                                            onKeyPress={(e) => e.key === 'Enter' && handleAddTopic()}
                                                        />
                                                        <Button 
                                                            onClick={handleAddTopic} 
                                                            disabled={isAddingTopic}
                                                            className="w-full"
                                                        >
                                                            {isAddingTopic ? "Adding..." : "Add Topic"}
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            
                                            <Button 
                                                variant="destructive" 
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDeleteSubject(subject.id)
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <CardContent>
                                        {subject.topics.length === 0 ? (
                                            <div className="text-center text-muted-foreground py-8">
                                                <p>No topics yet. Add your first topic to get started.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {subject.topics.map((topic) => (
                                                    <Card key={topic.id} className="border-l-4 border-l-primary">
                                                        <CardHeader>
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                                                                    <span className="text-sm text-muted-foreground">
                                                                        ({topic.pdfs.length} PDFs)
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    {/* Add PDF Dialog */}
                                                                    <Dialog>
                                                                        <DialogTrigger asChild>
                                                                            <Button 
                                                                                variant="outline" 
                                                                                size="sm"
                                                                                onClick={() => setSelectedTopicId(topic.id)}
                                                                            >
                                                                                <Plus className="h-4 w-4 mr-1" />
                                                                                Add PDF
                                                                            </Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent>
                                                                            <DialogHeader>
                                                                                <DialogTitle>Add New PDF to {topic.title}</DialogTitle>
                                                                            </DialogHeader>
                                                                            <div className="space-y-4">
                                                                                <Input
                                                                                    placeholder="PDF name"
                                                                                    value={pdfName}
                                                                                    onChange={(e) => setPdfName(e.target.value)}
                                                                                />
                                                                                <Input
                                                                                    placeholder="PDF URL (e.g., https://example.com/file.pdf)"
                                                                                    value={pdfUrl}
                                                                                    onChange={(e) => setPdfUrl(e.target.value)}
                                                                                />
                                                                                <Button 
                                                                                    onClick={handleAddPdf} 
                                                                                    disabled={isAddingPdf}
                                                                                    className="w-full"
                                                                                >
                                                                                    {isAddingPdf ? "Adding..." : "Add PDF"}
                                                                                </Button>
                                                                            </div>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                    
                                                                    <Button 
                                                                        variant="destructive" 
                                                                        size="sm"
                                                                        onClick={() => handleDeleteTopic(topic.id)}
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </CardHeader>
                                                        <CardContent>
                                                            {topic.pdfs.length === 0 ? (
                                                                <div className="text-center text-muted-foreground py-4">
                                                                    <p>No PDFs yet. Add your first PDF to this topic.</p>
                                                                </div>
                                                            ) : (
                                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                    {topic.pdfs.map((pdf) => (
                                                                        <Card key={pdf.id} className="bg-muted/30">
                                                                            <CardContent className="p-4">
                                                                                <div className="flex items-center justify-between">
                                                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                                                        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
                                                                                        <div className="min-w-0 flex-1">
                                                                                            <p className="font-medium truncate">{pdf.name}</p>
                                                                                            <a 
                                                                                                href={pdf.url} 
                                                                                                target="_blank" 
                                                                                                rel="noopener noreferrer"
                                                                                                className="text-xs text-primary hover:underline truncate block"
                                                                                            >
                                                                                                View PDF
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Button 
                                                                                        variant="destructive" 
                                                                                        size="sm"
                                                                                        onClick={() => handleDeletePdf(pdf.id)}
                                                                                        className="ml-2 flex-shrink-0"
                                                                                    >
                                                                                        <Trash2 className="h-3 w-3" />
                                                                                    </Button>
                                                                                </div>
                                                                            </CardContent>
                                                                        </Card>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        )}
                                    </CardContent>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </div>
    )
}
