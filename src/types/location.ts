export interface LocationT {
  id: string;
  institution: string;
  address: string;
  phone: string;
  openedAt: string;
  url: string;
  cityId: string;
  city?: {
    id: string;
    name: string;
  };
}
