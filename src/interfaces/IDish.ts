export interface IDish {
  id: number;
    name: string;
    description: string;
    productid: string[];
    images: string[];
    category: string;
    score: number;
  
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date;
}
  