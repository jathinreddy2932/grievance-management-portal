import { Grievance, GrievanceStats, GrievanceStatus } from '@/types/grievance';
import { GrievanceFormData } from '@/lib/zodSchemas';

const LOCAL_STORAGE_KEY = 'grievance_data';

// Standard mock items to populate a new session
const DEFAULT_GRIEVANCES: Grievance[] = [
  {
    id: 'GRV-1001',
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@email.com',
    phone: '9876543210',
    subject: 'Street light not working in Sector 4',
    category: 'Complaint',
    priority: 'High',
    description: 'The street light near House 412 has been broken for over two weeks. It gets very dark in the evening, making it unsafe for elders to walk.',
    status: 'Open',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'GRV-1002',
    fullName: 'Saraswathi Amma',
    email: 'saraswathi.a@email.com',
    phone: '9845123456',
    subject: 'Feedback on new senior citizen pension portal',
    category: 'Feedback',
    priority: 'Medium',
    description: 'The new web portal is very simple and easy to use. The large fonts make reading effortless. Thank you for making it accessible.',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'GRV-1003',
    fullName: 'John David',
    email: 'john.david@email.com',
    phone: '9765432109',
    subject: 'Suggestion for public park benches',
    category: 'Suggestion',
    priority: 'Low',
    description: 'Please install more benches with back support in the Central park. Many elderly citizens visit in the morning and need spots to rest.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Helper to interact with LocalStorage
const getStoredGrievances = (): Grievance[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_GRIEVANCES));
    return DEFAULT_GRIEVANCES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_GRIEVANCES;
  }
};

const saveStoredGrievances = (grievances: Grievance[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(grievances));
};

export const grievanceService = {
  /**
   * Retrieves all grievances from localStorage
   */
  async getAllGrievances(): Promise<Grievance[]> {
    return getStoredGrievances();
  },

  /**
   * Retrieves a grievance by ID
   */
  async getGrievanceById(id: string): Promise<Grievance | null> {
    const list = getStoredGrievances();
    return list.find((g) => g.id === id) || null;
  },

  /**
   * Creates a new grievance
   */
  async createGrievance(formData: GrievanceFormData): Promise<Grievance> {
    const list = getStoredGrievances();
    
    // Generate Serial ID, e.g. GRV-1004
    const nextNumber = list.length > 0 
      ? Math.max(...list.map((g) => parseInt(g.id.replace('GRV-', ''), 10))) + 1 
      : 1001;
    const newId = `GRV-${nextNumber}`;

    const newGrievance: Grievance = {
      id: newId,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '',
      subject: formData.subject,
      category: formData.category,
      priority: formData.priority,
      description: formData.description,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    const updated = [newGrievance, ...list];
    saveStoredGrievances(updated);
    return newGrievance;
  },

  /**
   * Updates the status of an existing grievance
   */
  async updateGrievanceStatus(id: string, status: GrievanceStatus): Promise<Grievance | null> {
    const list = getStoredGrievances();
    const index = list.findIndex((g) => g.id === id);
    
    if (index !== -1) {
      list[index] = { ...list[index], status };
      saveStoredGrievances(list);
      return list[index];
    }
    return null;
  },

  /**
   * Computes statistics
   */
  async getStats(): Promise<GrievanceStats> {
    const list = getStoredGrievances();
    return list.reduce(
      (acc, curr) => {
        acc.total += 1;
        if (curr.status === 'Open') acc.open += 1;
        else if (curr.status === 'In Progress') acc.inProgress += 1;
        else if (curr.status === 'Resolved') acc.resolved += 1;
        return acc;
      },
      { total: 0, open: 0, inProgress: 0, resolved: 0 }
    );
  },
};
