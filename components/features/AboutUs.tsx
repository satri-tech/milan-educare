import { Target, Globe } from "lucide-react"

export default function AboutUs() {
    return (
        <div id="about" className="bg-gradient-to-br from-background via-muted/30 to-background font-Poppins bg-green-200 border-b">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="relative flex justify-center items-center pt-24 pb-16">
                    <div className="w-[92%] max-w-7xl text-center">
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                            About Milan EduCare
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Empowering Education,
                            <span className="block bg-gradient-to-r from-primary/70  to-primary bg-clip-text text-transparent">
                                Nurturing Futures
                            </span>
                        </h1>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                            {` For nearly a decade, Milan EduCare has been at the forefront of educational innovation,
                            providing exceptional support services that transform learning experiences and unlock every student's potential.`}
                        </p>
                    </div>
                </div>
            </div>
            {/* Mission & Vision Section */}
            <div className="py-16 ">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <Target className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    To provide exceptional educational support and care services that inspire learning,
                                    foster growth, and empower students to achieve their dreams. We are committed to
                                    creating inclusive environments where every learner can thrive through personalized
                                    attention and innovative teaching methodologies.
                                </p>
                            </div>

                            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-secondary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    To be the global leader in educational support services, recognized for our innovation,
                                    compassion, and commitment to student success. We envision a world where quality
                                    education is accessible to all, and every student has the opportunity to reach
                                    their full potential regardless of their background or circumstances.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                            <div className="relative bg-card p-8 rounded-3xl shadow-xl border border-border/50">
                                <h3 className="text-3xl font-bold text-foreground mb-6 text-center">What Sets Us Apart</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                                        <p className="text-muted-foreground">{`Personalized learning plans tailored to each student's unique needs`}</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                                        <p className="text-muted-foreground">Cutting-edge technology integrated with traditional teaching methods</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                                        <p className="text-muted-foreground">Experienced educators with specialized training in diverse learning styles</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full mt-3"></div>
                                        <p className="text-muted-foreground">Comprehensive support system including academic, emotional, and social development</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}