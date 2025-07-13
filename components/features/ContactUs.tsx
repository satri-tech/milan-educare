"use client";

import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { contactInfo } from "@/data/contact";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";
import axios from "axios";

interface FormData {
    fullName: string;
    phone: string;
    email: string;
    message: string;
}

interface FormErrors {
    fullName?: string;
    phone?: string;
    email?: string;
    message?: string;
}

export default function ContactSection() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        phone: "",
        email: "",
        message: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validate full name
        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required";
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = "Full name must be at least 2 characters";
        }

        // Validate phone
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone.trim())) {
            newErrors.phone = "Please enter a valid phone number";
        }

        // Validate email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = "Please enter a valid email address";
        }

        // Validate message
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please enter all of the fields correctly");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post("/api/contact", formData);

            if (response.data.success) {
                setIsSubmitted(true);
                toast.success("Thank you! Your message has been sent successfully.");
                // Reset form
                setFormData({
                    fullName: "",
                    phone: "",
                    email: "",
                    message: "",
                });
                setErrors({});

                // Reset success state after 3 seconds
                setTimeout(() => {
                    setIsSubmitted(false);
                }, 3000);
            }
        } catch {
            console.error("Error submitting form:");
            const errorMessage = "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getFieldValue = (fieldId: string): string => {
        switch (fieldId) {
            case "full-name":
                return formData.fullName;
            case "phone":
                return formData.phone;
            case "email":
                return formData.email;
            case "message":
                return formData.message;
            default:
                return "";
        }
    };

    const getFieldError = (fieldId: string): string | undefined => {
        switch (fieldId) {
            case "full-name":
                return errors.fullName;
            case "phone":
                return errors.phone;
            case "email":
                return errors.email;
            case "message":
                return errors.message;
            default:
                return undefined;
        }
    };

    const handleFieldChange = (fieldId: string, value: string) => {
        switch (fieldId) {
            case "full-name":
                handleInputChange("fullName", value);
                break;
            case "phone":
                handleInputChange("phone", value);
                break;
            case "email":
                handleInputChange("email", value);
                break;
            case "message":
                handleInputChange("message", value);
                break;
        }
    };

    return (
        <section
            id="contact"
            className="w-full py-12 mt-16 h-max border-t flex justify-center"
        >
            <div className=" w-[85%] ">
                <div className="flex flex-col items-start justify-center space-y-4  ">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                            {contactInfo.section.title}
                        </h2>
                        <p className=" text-muted-foreground ">
                            {contactInfo.section.description}
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid  items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                    {/* Contact Form */}
                    <Card className="shadow-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-bold text-xl border-b pb-4">
                                {contactInfo.form.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {contactInfo.form.fields.map((field) =>
                                        field.type === "textarea" ? (
                                            <div key={field.id} className="space-y-2 col-span-2">
                                                <Label htmlFor={field.id} className="text-sm font-medium">
                                                    {field.label}
                                                </Label>
                                                <Textarea
                                                    id={field.id}
                                                    placeholder={field.placeholder}
                                                    value={getFieldValue(field.id)}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className={`min-h-[80px] ${getFieldError(field.id) ? 'border-red-500' : ''}`}
                                                    disabled={isSubmitting}
                                                />
                                                {getFieldError(field.id) && (
                                                    <p className="text-sm text-red-500">{getFieldError(field.id)}</p>
                                                )}
                                            </div>
                                        ) : (
                                            <div
                                                key={field.id}
                                                className={`space-y-2 col-span-${field.colSpan}`}
                                            >
                                                <Label htmlFor={field.id} className="text-sm font-semibold">
                                                    {field.label}
                                                </Label>
                                                <Input
                                                    id={field.id}
                                                    type={field.type}
                                                    placeholder={field.placeholder}
                                                    value={getFieldValue(field.id)}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className={`placeholder:font-medium ${getFieldError(field.id) ? 'border-red-500' : ''}`}
                                                    disabled={isSubmitting}
                                                />
                                                {getFieldError(field.id) && (
                                                    <p className="text-sm text-red-500">{getFieldError(field.id)}</p>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2"
                                    disabled={isSubmitting || isSubmitted}
                                >
                                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                    {isSubmitted && <CheckCircle className="h-4 w-4 text-green-500" />}
                                    {isSubmitting && "Submitting..."}
                                    {isSubmitted && "Submitted Successfully"}
                                    {!isSubmitting && !isSubmitted && contactInfo.form.submitText}
                                </Button>
                            </form>
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