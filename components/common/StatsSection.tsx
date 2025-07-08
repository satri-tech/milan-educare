import { Card } from '@/components/ui/card'

export default function StatsSection() {
    return (
        <section className=" py-12 md:py-20">
            <div className="mx-auto max-w-5xl px-6">
                <Card className="grid gap-0.5 divide-y *:py-8 *:text-center md:grid-cols-3 md:divide-x md:divide-y-0">
                    <div>
                        <div className="text-foreground space-y-1 text-4xl font-bold">500+</div>
                        <p className="text-muted-foreground">Students Supported</p>
                    </div>
                    <div>
                        <div className="text-foreground space-y-1 text-4xl font-bold">10+</div>
                        <p className="text-muted-foreground">Years Experience</p>
                    </div>
                    <div>
                        <div className="text-foreground space-y-1 text-4xl font-bold">95%</div>
                        <p className="text-muted-foreground">Success Rate</p>
                    </div>
                </Card>
            </div>
        </section>
    )
}