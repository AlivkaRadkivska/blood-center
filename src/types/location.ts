export interface LocationT {
  id: string;
  address: string;
  url: string;
  cityId: string;
  city?: {
    id: string;
    name: string;
  };
}
