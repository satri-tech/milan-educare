import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function Testimonials() {
    const testimonials = [
        {
            id: 1,
            name: "Sita Shrestha",
            role: "Engineering Student",
            image: "/placeholder.svg?height=40&width=40",
            content:
                "Milaan EduCare helped me grasp complex engineering concepts with ease. The practical projects and supportive instructors boosted my confidence and skills throughout my studies.",
            rating: 5,
        },
        {
            id: 2,
            name: "Ram Bahadur",
            role: "MBBS Student",
            image: "/placeholder.svg?height=40&width=40",
            content:
                "The medical courses at Milaan EduCare are detailed and easy to follow. The case studies and interactive lessons made studying medicine less daunting and much more interesting.",
            rating: 4,
        },
        {
            id: 3,
            name: "Priya Karki",
            role: "Computer Science Student",
            image: "/placeholder.svg?height=40&width=40",
            content:
                "As a beginner in programming, Milaan EduCare’s curriculum was perfectly structured. The mentorship and hands-on assignments helped me build a solid foundation in computer science.",
            rating: 5,
        },
        {
            id: 4,
            name: "Mohan Thapa",
            role: "Teacher",
            image: "/placeholder.svg?height=40&width=40",
            content:
                "Teaching at Milaan EduCare has been a rewarding experience. The platform’s resources enable me to deliver lessons effectively and engage students with real-world examples.",
            rating: 4,
        },
        {
            id: 5,
            name: "Anita Gurung",
            role: "Design Student",
            image: "/placeholder.svg?height=40&width=40",
            content:
                "The UX and design courses at Milaan EduCare are comprehensive and inspiring. The projects helped me develop a strong portfolio which I’m confident will open doors in my design career.",
            rating: 3,
        },
        {
            id: 6,
            name: "Deepak Magar",
            role: "Science Student",
            image: "/placeholder.svg?height=40&width=40",
            content:
                "Milaan EduCare’s science program provided clear explanations and engaging labs that deepened my understanding. The instructors are knowledgeable and approachable.",
            rating: 5,
        },
    ]


    return (
        <section id="testimonials" className="w-full py-12 mt-16 h-max border-t flex justify-center">
            <div className="w-[85%]">
                <div className="flex flex-col items-start justify-center space-y-4">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">TESTIMONIALS</h2>
                        <p className="text-muted-foreground">
                            Real stories from students who turned their dreams into reality with Milaan EduCare.
                        </p>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="h-full py-2">
                            <CardContent className="p-6">
                                <div className="flex flex-col h-full">
                                    {/* Rating Stars */}
                                    <div className="flex mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < testimonial.rating
                                                    ? "fill-yellow-400 text-yellow-500"
                                                    : "fill-muted text-muted-foreground"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Testimonial Content */}
                                    <blockquote className="text-sm text-muted-foreground mb-6 flex-grow">
                                        {` "${testimonial.content}"`}
                                    </blockquote>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-3 mt-auto">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                                            <AvatarFallback>
                                                {testimonial.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-semibold text-sm">{testimonial.name}</div>
                                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}