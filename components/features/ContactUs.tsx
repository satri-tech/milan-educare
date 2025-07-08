"use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { contactInfo } from "@/data/contact";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="w-full py-12 md:py-24 lg:py-24 xl:py-14 xl:px-10"
        >
            <div className="px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                            {contactInfo.section.title}
                        </h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl lg:text-base/relaxed xl:text-xl/relaxed">
                            {contactInfo.section.description}
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-[90%] items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    {/* Contact Form */}
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-bold text-xl border-b pb-4">
                                {contactInfo.form.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {contactInfo.form.fields.map((field) =>
                                    field.type === "textarea" ? (
                                        <div key={field.id} className="space-y-2 col-span-2">
                                            <label htmlFor={field.id} className="text-sm font-medium">
                                                {field.label}
                                            </label>
                                            <textarea
                                                id={field.id}
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder={field.placeholder}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            key={field.id}
                                            className={`space-y-2 col-span-${field.colSpan}`}
                                        >
                                            <label htmlFor={field.id} className="text-sm font-semibold">
                                                {field.label}
                                            </label>
                                            <Input
                                                id={field.id}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                className="placeholder:font-medium"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                            <Button className="w-full">{contactInfo.form.submitText}</Button>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        {contactInfo.contactCards.map((card, index) => (
                            <Card key={index} className="gap-2 shadow-none">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 font-bold text-lg border-b pb-4">
                                        {card.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* {card.content && (
                                        <p className="text-muted-foreground whitespace-pre-line">
                                            {card.content}
                                        </p>
                                    )} */}

                                    {card.items && (
                                        <div className="space-y-6 grid grid-cols-2">
                                            {card.items.map((item) => (
                                                <div className="flex gap-2" key={item.label}>
                                                    <div className="text-primary pt-1">{item.icon}</div>
                                                    <div className="space-y-1">
                                                        <p className="text-base font-semibold ">{item.label}</p>
                                                        <p className="text-muted-foreground text-sm font-medium">{item.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {card.socialLinks && (
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-3">
                                                {card.socialLinks.map((link, i) => (
                                                    <Link
                                                        key={i}
                                                        href={link.href}
                                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-200 group"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={link.name || `Social link ${i + 1}`}
                                                    >
                                                        <span className="text-primary group-hover:text-primary-foreground transition-colors">
                                                            {link.icon}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
