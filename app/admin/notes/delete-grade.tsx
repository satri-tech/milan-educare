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
            await axios.delete(`/api/admin/neb-notes/grades/${gradeId}`);
            toast.success("Grade deleted successfully");
            if (onDelete) onDelete(gradeId); // Pass the deleted grade ID to parent
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to delete grade");
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