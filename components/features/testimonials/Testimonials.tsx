import { ITestimonial } from "@/app/admin/testimonials/types"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import { Star } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Testimonials() {

    const [testimonials, setTestimonials] = useState<ITestimonial[]>([])
    const handleFetchTestimonials = async () => {
        try {
            const response = await axios.get('/api/admin/testimonials')
            const data = response.data;
            setTestimonials(data);
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        handleFetchTestimonials()

    }, [])


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
                                        <Image
                                            height={48}
                                            width={48}
                                            src={`/api/admin/testimonials/image${testimonial.image}`}
                                            alt={testimonial.name}
                                            className="h-12 w-12 object-cover rounded-full border"
                                            onError={(e) => {
                                                // Fallback to a default image if the API fails
                                                e.currentTarget.src = '/images/default-avatar.png';
                                            }}
                                        />
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