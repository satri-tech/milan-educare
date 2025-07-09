import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Grade } from "./page";
import Link from "next/link";
interface GradesListProps {
    grades: Grade[]
}
export default function GradesList({ grades }: GradesListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {grades.map((grade) => (
                <Link href={`/admin/notes/${grade.name}`} >
                    <Card key={grade.id} className=" transition-shadow duration-200 hover:bg-card bg-background/90 cursor-pointer py-10 flex justify-center" >
                        <CardHeader>
                            <CardTitle className="text-lg">{grade.name}</CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
