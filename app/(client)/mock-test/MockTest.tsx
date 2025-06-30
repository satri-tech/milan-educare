import Header from "@/components/ui/section-title"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Users, Star } from "lucide-react"

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

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "bg-green-100 text-green-800 hover:bg-green-100"
        case "medium":
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        case "hard":
            return "bg-red-100 text-red-800 hover:bg-red-100"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
}

export default function MockTest() {
    return (
        <div className="flex lg:flex-row flex-col justify-center items-center mt-24 h-max border-t-[0.1px] font-Poppins pt-16 w-screen">
            <div className="flex l:w-[92%] w-[90%] sm:gap-4 gap-6 flex-col">
                <Header header="Mock Test" className="w-32 py-2" />

                <div className="w-full sm:text-[2.4rem] text-3xl font-medium sm:leading-[4.4rem] tracking-tight">
                    Prepare better with timed, exam-like mock tests.
                </div>

                <div className="flex gap-32">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mockTests.map((test) => (
                            <Card
                                key={test.id}
                                className="hover:shadow-lg transition-shadow duration-300 border border-gray-200 h-full flex flex-col"
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className="text-xs">
                                            {test.subject}
                                        </Badge>
                                        <Badge className={getDifficultyColor(test.difficulty)}>{test.difficulty}</Badge>
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-gray-900 leading-tight">{test.title}</CardTitle>
                                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                                        {test.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="pt-0 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{test.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FileText className="w-4 h-4" />
                                                <span>{test.questions} questions</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>{test.attempts.toLocaleString()} attempts</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span>{test.rating}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full  text-white font-medium mt-4">
                                        Start Mock Test
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
