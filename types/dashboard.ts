export interface StorageInfo {
  bytes: number;
  formatted: string;
}

export interface DashboardStats {
  totalPdfs: number;
  totalContacts: number;
  totalTestimonials: number;
  totalMockTests: number;
  totalNebNotes: number;
  storageUsed: {
    pdfs: StorageInfo;
    testimonials: StorageInfo;
    total: StorageInfo;
  };
}

export interface DashboardStatsResponse extends DashboardStats {}

export interface DashboardError {
  error: string;
}
