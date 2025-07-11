"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface IDeleteGradeProps {
    gradeId: string;
    onDelete?: (deletedGradeId: string) => void; // Pass the deleted grade ID
}

export default function DeleteGrade({ gradeId, onDelete }: IDeleteGradeProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const confirm = window.confirm("Are you sure you want to delete this grade?");
        if (!confirm) return;

        setLoading(true);
        try {
            const res = await axios.delete(`/api/admin/notes/${gradeId}`);
            console.log(res)
            toast.success("Grade deleted successfully");
            if (onDelete) onDelete(gradeId); // Pass the deleted grade ID to parent
        } catch (error: unknown) {
            const errorMessage = error instanceof Error && 'response' in error
                ? (error as { response?: { data?: { error?: string } } }).response?.data?.error || "Failed to delete grade"
                : "Failed to delete grade";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`absolute bottom-3 right-3 transition-all hover:text-red-600 ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
            onClick={handleDelete}
        >
            <Trash size={14} />
        </div>
    );
}