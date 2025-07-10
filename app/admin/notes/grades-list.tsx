import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Grade } from "./page";
import Link from "next/link";
import DeleteGrade from "./delete-grade";
interface GradesListProps {
    grades: Grade[]
    onGradeDeleted: (deletedGradeId: string) => void;
}
export default function GradesList({ grades, onGradeDeleted }: GradesListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {grades.map((grade) => (
                <Link href={`/admin/notes/${grade.id}`} key={grade.id}>
                    <Card className=" transition-shadow duration-200 hover:bg-card bg-background/90 cursor-pointer py-10 flex justify-center relative" >
                        <DeleteGrade gradeId={grade.id} onDelete={onGradeDeleted} />
                        <CardHeader>
                            <CardTitle className="text-lg">{grade.name}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
