"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import {
  FileText,
  MessageCircle,
  Star,
  BookOpen,
  TestTube,
  HardDrive,
  RefreshCw,
  AlertTriangle,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const StatCard = ({
  title,
  value,
  icon: Icon,
  description
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </CardContent>
  </Card>
);

const LoadingCard = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-8 w-16 mb-2" />
      <Skeleton className="h-3 w-32" />
    </CardContent>
  </Card>
);

export default function DashboardStats() {
  const { stats, loading, error, refetch } = useDashboardStats();

  if (error) {
    return (
      <Card className="col-span-full">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button onClick={refetch} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h2>
        <Button onClick={refetch} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <LoadingCard key={i} />
          ))}
        </div>
      ) : stats ? (
        <>
          {/* Main Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total PDFs"
              value={stats.totalPdfs}
              icon={FileText}
              description="Educational content files"
            />
            <StatCard
              title="Contact Messages"
              value={stats.totalContacts}
              icon={MessageCircle}
              description="User inquiries received"
            />
            <StatCard
              title="Testimonials"
              value={stats.totalTestimonials}
              icon={Star}
              description="Student feedback"
            />
            <StatCard
              title="Mock Tests"
              value={stats.totalMockTests}
              icon={TestTube}
              description="Available practice tests"
            />
          </div>

          {/* Secondary Statistics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="NEB Notes"
              value={stats.totalNebNotes}
              icon={BookOpen}
              description="Study topics available"
            />
            <StatCard
              title="PDF Storage"
              value={stats.storageUsed.pdfs.formatted}
              icon={HardDrive}
              description="Space used by PDF files"
            />
            <StatCard
              title="Image Storage"
              value={stats.storageUsed.testimonials.formatted}
              icon={HardDrive}
              description="Space used by testimonial images"
            />
            <StatCard
              title="Total Storage"
              value={stats.storageUsed.total.formatted}
              icon={HardDrive}
              description="Combined storage usage"
            />
          </div>

          {/* Storage Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2" />
                Storage Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">PDF Files</span>
                  <Badge variant="secondary">{stats.storageUsed.pdfs.formatted}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Testimonial Images</span>
                  <Badge variant="secondary">{stats.storageUsed.testimonials.formatted}</Badge>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Total Storage Used</span>
                    <Badge>{stats.storageUsed.total.formatted}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : null}
    </div>
  );
}
