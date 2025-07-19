'use client'
import {
    containerVariants,
    itemVariants,
    slideInLeft,
    slideInRight,
    featureItemVariants
} from "@/animations/animation" // Import from your animations fileimport { motion } from "framer-motion"
import { motion } from "framer-motion"

export default function AboutUs() {

    return (
        <div id="about" className="bg-gradient-to-br from-background via-muted/30 to-background font-Poppins bg-green-200 border-b overflow-hidden">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Animated background elements */}


                <motion.div
                    className="relative flex justify-center items-center pt-24 pb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <div className="w-[92%] max-w-7xl text-center">
                        <motion.div
                            className="inline-flex items-center gap-2 bg-primary/10 cursor-pointer  px-4 py-2 rounded-full text-sm font-medium mb-6"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            About Milaan EduCare
                        </motion.div>

                        <motion.h1
                            className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                            variants={itemVariants}
                        >
                            Empowering Education,
                            <motion.span
                                className="block bg-gradient-to-r from-primary/70 to-primary bg-clip-text text-transparent"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                Nurturing Futures
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto"
                            variants={itemVariants}
                        >
                            {`Milaan EduCare has been at the forefront of educational innovation,
                            providing exceptional support services that transform learning experiences and unlock every student's potential.`}
                        </motion.p>
                    </div>
                </motion.div>
            </div>

            {/* Mission & Vision Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            {/* Mission Card */}
                            <motion.div
                                className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 cursor-pointer group"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={slideInLeft}
                                whileHover={{
                                    scale: 1.01,
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-2xl font-bold text-foreground">
                                        Our Mission
                                    </h3>
                                </div>
                                <div
                                    className="text-muted-foreground text-justify  text-[0.94rem] leading-6"
                                >
                                    To provide exceptional educational support and care services that inspire learning,
                                    foster growth, and empower students to achieve their dreams. We are committed to
                                    creating inclusive environments where every learner can thrive through personalized
                                    attention and innovative teaching methodologies.
                                </div>
                            </motion.div>

                            {/* Vision Card */}
                            <motion.div
                                className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 cursor-pointer group"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={slideInLeft}
                                whileHover={{
                                    scale: 1.01,
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-3 mb-4">

                                    <motion.h3
                                        className="text-2xl font-bold text-foreground"
                                        whileHover={{ color: "rgb(var(--secondary))" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Our Vision
                                    </motion.h3>
                                </div>
                                <p className="text-muted-foreground text-justify   text-[0.94rem] leading-6">
                                    To be the global leader in educational support services, recognized for our innovation,
                                    compassion, and commitment to student success. We envision a world where quality
                                    education is accessible to all, and every student has the opportunity to reach
                                    their full potential regardless of their background or circumstances.
                                </p>
                            </motion.div>
                        </div>

                        {/* Features Card */}
                        <motion.div
                            className="relative"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={slideInRight}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"
                                whileHover={{ rotate: 6 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="relative bg-card p-8 rounded-3xl shadow-xl border border-border/50 group"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
                                }}
                                transition={{ duration: 0.4 }}
                            >
                                <motion.h3
                                    className="text-3xl font-bold text-foreground mb-6 text-center"
                                    whileHover={{ color: "rgb(var(--primary))" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    What Sets Us Apart
                                </motion.h3>
                                <motion.div
                                    className="space-y-4"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={{
                                        hidden: {},
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.1,
                                                delayChildren: 0.3
                                            }
                                        }
                                    }}
                                >
                                    {[
                                        "Personalized learning plans tailored to each student's unique needs",
                                        "Cutting-edge technology integrated with traditional teaching methods",
                                        "Experienced educators with specialized training in diverse learning styles",
                                        "Comprehensive support system including academic, emotional, and social development"
                                    ].map((text, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex items-start gap-3 cursor-pointer"
                                            custom={index}
                                            variants={featureItemVariants}
                                            whileHover={{
                                                x: 8,
                                                scale: 1.02,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <motion.div
                                                className="w-2 h-2 bg-primary rounded-full mt-3"
                                                whileHover={{
                                                    scale: 1.5,
                                                    backgroundColor: "rgb(var(--secondary))"
                                                }}
                                                transition={{ duration: 0.2 }}
                                            />
                                            <motion.p
                                                className="text-muted-foreground tracking-normal text-[0.9rem]"
                                                whileHover={{ color: "rgb(var(--foreground))" }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {text}
                                            </motion.p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

