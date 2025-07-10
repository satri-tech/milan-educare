"use client"

import { useState, useEffect } from "react"
import { FileText, GraduationCap, Eye, Loader2, ChevronDown, ChevronRight, BookOpen, Sparkles, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import SectionHeader from "@/components/common/SectionHeader";

// TypeScript interfaces for the data structure
interface Pdf {
    name: string;
    url: string;
}

interface Topic {
    title: string;
    pdfs: Pdf[];
}

interface Subject {
    [key: string]: Topic[];
}

interface GradeData {
    subjects: Subject;
}

interface NebData {
    [gradeName: string]: GradeData;
}

export default function NebNotes() {
    const [nebData, setNebData] = useState<NebData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
    const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());


    useEffect(() => {
        const fetchNebData = async (): Promise<void> => {
            try {
                const response = await axios.get<NebData>('/api/admin/notes');
                setNebData(response.data);
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load NEB data');
                console.error('Error fetching NEB data:', error);
                setLoading(false);
            }
        };
        fetchNebData();
    }, []);

    const toggleExpansion = (key: string, type: 'subject' | 'topic') => {
        const setterMap = {
            subject: setExpandedSubjects,
            topic: setExpandedTopics
        };

        setterMap[type](prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-24">
                <Loader2 className="animate-spin h-6 w-6 text-slate-600" />
                <span className="ml-2 text-slate-600 font-medium">Loading NEB Notes...</span>
            </div>
        );
    }

    if (!nebData || Object.keys(nebData).length === 0) {
        return (
            <div className="flex justify-center items-center mt-24">
                <p className="text-lg text-slate-500">No data available</p>
            </div>
        );
    }

    return (
        <div id="notes" className="flex lg:flex-row flex-col justify-center items-center mt-16 h-max border-t border-slate-200 font-sans pt-12 w-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
            <div className="flex lg:w-[85%] w-[85%] gap-8 flex-col">
                {/* Enhanced Header */}
                <SectionHeader />
                {/* Tree Structure */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                    {Object.entries(nebData).map(([grade, gradeData]: [string, GradeData]) => (
                        <div key={grade} className="border-b border-slate-100 last:border-b-0">
                            {/* Grade Level - No expanding, always visible */}
                            <div className="flex items-center justify-between p-6 bg-slate-50/80">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                                            <GraduationCap className="h-5 w-5 text-teal-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">{grade}</h2>
                                        <p className="text-sm text-slate-500 font-medium">Science Faculty • NEB Curriculum</p>
                                    </div>
                                </div>
                                <span
                                    className="bg-slate-50 text-slate-600 border border-slate-200 font-medium px-2 py-1 rounded-md text-sm"
                                >
                                    {Object.keys(gradeData.subjects).length} subjects
                                </span>
                            </div>

                            {/* Subjects - Always visible under each grade */}
                            <div className="bg-slate-50/50 border-t border-slate-100">
                                {Object.entries(gradeData.subjects).map(([subject, topics]: [string, Topic[]]) => (
                                    <div key={subject} className="border-b border-slate-100 last:border-b-0">
                                        <div
                                            className="flex items-center justify-between p-5 pl-16 cursor-pointer hover:bg-white/70 transition-colors"
                                            onClick={() => toggleExpansion(`${grade}-${subject}`, 'subject')}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    {expandedSubjects.has(`${grade}-${subject}`) ? (
                                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                                    )}
                                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <BookOpen className="h-4 w-4 text-blue-600" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-800">{subject}</h3>
                                                    <p className="text-xs text-slate-500 font-medium">Study materials and notes</p>
                                                </div>
                                            </div>
                                            <span
                                                className="bg-white text-slate-600 border border-slate-200 text-xs font-medium px-2 py-1 rounded-md"
                                            >
                                                {topics.length} topics
                                            </span>
                                        </div>

                                        {/* Topics */}
                                        {expandedSubjects.has(`${grade}-${subject}`) && (
                                            <div className="bg-white/50">
                                                {topics.map((topic: Topic, topicIndex: number) => (
                                                    <div key={topicIndex} className="border-b border-slate-100 last:border-b-0">
                                                        <div
                                                            className="flex items-center justify-between p-4 pl-24 cursor-pointer hover:bg-slate-50/80 transition-colors"
                                                            onClick={() => toggleExpansion(`${grade}-${subject}-${topicIndex}`, 'topic')}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex items-center gap-2">
                                                                    {expandedTopics.has(`${grade}-${subject}-${topicIndex}`) ? (
                                                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                                                    ) : (
                                                                        <ChevronRight className="h-4 w-4 text-slate-500" />
                                                                    )}
                                                                    <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                                                                        <FileText className="h-3.5 w-3.5 text-slate-600" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-slate-800 text-sm">{topic.title}</h4>
                                                                    <p className="text-xs text-slate-500 font-medium">
                                                                        {topic.pdfs.length} PDF files
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <span
                                                                className="bg-slate-50 text-slate-600 border border-slate-200 text-xs font-medium px-2 py-1 rounded-md"
                                                            >
                                                                {topic.pdfs.length} PDFs
                                                            </span>
                                                        </div>

                                                        {/* PDFs */}
                                                        {expandedTopics.has(`${grade}-${subject}-${topicIndex}`) && (
                                                            <div className="bg-slate-50/30">
                                                                {topic.pdfs.map((pdf, pdfIndex) => (
                                                                    <div
                                                                        key={pdfIndex}
                                                                        className="flex items-center justify-between p-3 pl-32 hover:bg-white/70 transition-colors group"
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-6 h-6 bg-teal-50 rounded-md flex items-center justify-center">
                                                                                <FileText className="h-3 w-3 text-teal-600" />
                                                                            </div>
                                                                            <span className="text-sm font-medium text-slate-700 group-hover:text-teal-700 transition-colors">
                                                                                {pdf.name}
                                                                            </span>
                                                                        </div>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="ghost"
                                                                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 h-8 px-3 text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                                                                            asChild
                                                                        >
                                                                            <a
                                                                                href={pdf.url}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="flex items-center gap-1"
                                                                            >
                                                                                <Eye className="h-3 w-3" />
                                                                                <span className="text-xs font-medium">View</span>
                                                                            </a>
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}