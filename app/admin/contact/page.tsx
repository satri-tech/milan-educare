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
import { Trash2, Eye, MessageSquare, Mail, Phone, User, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
// import { format } from "date-fns"

interface ContactMessage {
    id: string
    fullName: string
    phone: string
    email: string
    message: string
    createdAt: string
    updatedAt: string
}

interface PaginationInfo {
    currentPage: number
    totalPages: number
    totalCount: number
    hasNext: boolean
    hasPrev: boolean
}

export default function AdminContactPage() {
    const [contactMessages, setContactMessages] = useState<ContactMessage[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [pagination, setPagination] = useState<PaginationInfo>({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNext: false,
        hasPrev: false
    })
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

    const fetchContactMessages = async (page: number = 1) => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/admin/contact?page=${page}&limit=10`)
            setContactMessages(response.data.data)
            setPagination(response.data.pagination)
            setError("")
        } catch (err) {
            setError("Failed to fetch contact messages")
            console.error("Error fetching contact messages:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchContactMessages()
    }, [])

    const handleViewMessage = (message: ContactMessage) => {
        setSelectedMessage(message)
        setIsViewDialogOpen(true)
    }

    const handleDeleteMessage = async (messageId: string) => {
        try {
            await axios.delete(`/api/admin/contact/${messageId}`)
            toast("Contact message deleted successfully")
            fetchContactMessages(pagination.currentPage) // Refresh current page
        } catch (err) {
            console.error("Error deleting contact message:", err)
            toast("Failed to delete contact message")
        }
    }

    const handlePageChange = (page: number) => {
        fetchContactMessages(page)
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString()
    }

    const truncateMessage = (message: string, maxLength: number = 100) => {
        return message.length > maxLength ? message.substring(0, maxLength) + "..." : message
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading contact messages...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Contact Us Messages
                    </CardTitle>
                    <CardDescription>
                        Manage and view contact messages from users
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                        <Badge variant="outline" className="text-sm">
                            Total Messages: {pagination.totalCount}
                        </Badge>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={!pagination.hasPrev}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={!pagination.hasNext}
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Message</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contactMessages.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8">
                                            No contact messages found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    contactMessages.map((message) => (
                                        <TableRow key={message.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {message.fullName}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                                    <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                                                        {message.email}
                                                    </a>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                                    <a href={`tel:${message.phone}`} className="text-blue-600 hover:underline">
                                                        {message.phone}
                                                    </a>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs">
                                                    {truncateMessage(message.message)}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {formatDate(message.createdAt)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleViewMessage(message)}
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Delete Contact Message</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to delete this contact message from {message.fullName}? This action cannot be undone.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDeleteMessage(message.id)}
                                                                    className="bg-red-600 hover:bg-red-700"
                                                                >
                                                                    Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* View Message Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Contact Message Details</DialogTitle>
                        <DialogDescription>
                            View full contact message details
                        </DialogDescription>
                    </DialogHeader>
                    {selectedMessage && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                    <p className="text-sm">{selectedMessage.fullName}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                                    <p className="text-sm">
                                        <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                                            {selectedMessage.email}
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                    <p className="text-sm">
                                        <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:underline">
                                            {selectedMessage.phone}
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Date Received</label>
                                    <p className="text-sm">{formatDate(selectedMessage.createdAt)}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Message</label>
                                <div className="mt-2 p-3 bg-muted rounded-md">
                                    <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}