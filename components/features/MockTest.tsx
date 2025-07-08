import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Static mock test data
const mockTests = [
    {
        id: 1,
        title: "JEE Main Physics Mock Test",
        subject: "Physics",
        duration: "3 hours",
        questions: 75,
        difficulty: "Hard",
        attempts: 1250,
        rating: 4.8,
        description: "Comprehensive physics test covering mechanics, thermodynamics, and electromagnetism",
    },
    {
        id: 2,
        title: "NEET Biology Practice Test",
        subject: "Biology",
        duration: "2.5 hours",
        questions: 90,
        difficulty: "Medium",
        attempts: 980,
        rating: 4.6,
        description: "Complete biology mock test with human physiology and plant biology sections",
    },
    {
        id: 3,
        title: "CAT Quantitative Aptitude",
        subject: "Mathematics",
        duration: "2 hours",
        questions: 50,
        difficulty: "Hard",
        attempts: 750,
        rating: 4.7,
        description: "Advanced quantitative aptitude test for CAT preparation",
    },
    {
        id: 4,
        title: "GATE Computer Science",
        subject: "Computer Science",
        duration: "3 hours",
        questions: 65,
        difficulty: "Hard",
        attempts: 650,
        rating: 4.9,
        description: "GATE CS mock test covering algorithms, data structures, and programming",
    },
    {
        id: 5,
        title: "Class 12 Chemistry Board",
        subject: "Chemistry",
        duration: "3 hours",
        questions: 70,
        difficulty: "Medium",
        attempts: 1100,
        rating: 4.5,
        description: "CBSE Class 12 chemistry board exam pattern mock test",
    },
    {
        id: 6,
        title: "UPSC Prelims GS Paper 1",
        subject: "General Studies",
        duration: "2 hours",
        questions: 100,
        difficulty: "Hard",
        attempts: 890,
        rating: 4.4,
        description: "UPSC Civil Services preliminary examination general studies paper",
    },
]

export default function MockTest() {
    return (
        <div id="mocks" className="flex justify-center items-center mt-8 border-t-[0.1px] font-Poppins pt-8 w-screen">
            <div className="flex w-[92%] gap-4 flex-col">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-2">Mock Tests</h1>
                    <p className="text-lg text-muted-foreground">Test your knowledge with syllabus-based mock exams</p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockTests.map((test) => (
                        <Card
                            key={test.id}
                            className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 h-full flex flex-col"
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
            </div>
        </div>
    )
}
