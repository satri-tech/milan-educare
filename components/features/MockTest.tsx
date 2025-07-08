'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from 'react'
import axios from "axios"

interface MockTest {
    id: string
    title: string
    subject: string
    duration: string
    questions: number
    description: string
}


export default function MockTest() {
    const [, setLoading] = useState(true)
    const [mockTests, setMockTests] = useState<MockTest[]>([])
    const [, setError] = useState('')
    const fetchMockTests = async () => {
        try {
            setLoading(true)
            const response = await axios.get('/api/admin/mock-tests')
            setMockTests(response.data.data)
            setError('')
        } catch (err) {
            setError('Failed to fetch mock tests')
            console.error('Error fetching mock tests:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMockTests()
    }, [])

    return (
        <div id="mocks" className="flex justify-center items-center mt-8 font-Poppins pt-8 w-screen">
            <div className="flex w-[92%] gap-4 flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Mock Tests</h1>
                    <p className="text-lg text-muted-foreground">Test your knowledge with syllabus-based mock exams</p>
                </div>

                {mockTests && mockTests.length > 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {mockTests.map((test) => (
                            <Card
                                key={test.id}
                                className=" transition-shadow duration-300 border border-gray-200 h-full flex flex-col"
                            >
                                <CardHeader className="pb-2 pt-4 px-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <Badge variant="outline" className="text-xs">
                                            {test.subject}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">{test.title}</CardTitle>
                                    <CardDescription className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                                        {test.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0 px-4 pb-4 flex-1 flex flex-col justify-between">
                                    <div className="flex gap-2 mb-3 text-xs text-gray-600">
                                        <Badge variant="outline" className="text-xs">
                                            {test.duration}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            {test.questions} questions
                                        </Badge>
                                    </div>
                                    <Button className="w-full text-white font-medium text-sm py-2">Start Mock Test</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <Card className="border border-gray-200 max-w-md w-full">
                            <CardHeader className="pb-2 pt-6 px-6 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">No Mock Tests Available</CardTitle>
                                <CardDescription className="text-gray-600 text-sm leading-relaxed">
                                    Mock tests are being prepared and will be available soon. Please check back later.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0 px-6 pb-6">
                                <div className="flex justify-center">
                                    <Badge variant="outline" className="text-xs">
                                        Coming Soon
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}