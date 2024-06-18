export interface IDish {
  id: number;
    name: string;
    description: string;
    productId: number[];
    images: string[];

    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date;
}
  