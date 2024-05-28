export interface BloodNeedsT {
  id: string;
  lastUpdate: Date;
  bloodTypes: string[];
  cityId: string;
  city?: {
    id: string;
    name: string;
  };
}
