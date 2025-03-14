export interface Gadget {
    id: string
    name: string | null;
    codename: string;
    missionSuccessProbability: number; 
    status: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
    deCommissionedAt: Date | null;
  }
  

declare global {
  namespace Express {
    export interface Request {
      role?: "Admin" | "User";
      userId?: string;
    }
  }
}

