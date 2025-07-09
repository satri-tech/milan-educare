// app/grades/[gradeId]/page.tsx
export default function GradePage({
    params,
}: {
    params: { gradeId: string }
}) {
    return (
        <div>
            <h1>Grade Page</h1>
            <p>Grade ID: {params.gradeId}</p>
        </div>
    )
}