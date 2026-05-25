export type GrievanceCategory = 'Complaint' | 'Feedback' | 'Suggestion';
export type GrievancePriority = 'Low' | 'Medium' | 'High';
export type GrievanceStatus = 'Open' | 'In Progress' | 'Resolved';

export interface Grievance {
  id: string; // Serial format: GRV-1001, GRV-1002
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  category: GrievanceCategory;
  priority: GrievancePriority;
  description: string;
  status: GrievanceStatus;
  createdAt: string; // ISO String format
}

export interface GrievanceStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}
