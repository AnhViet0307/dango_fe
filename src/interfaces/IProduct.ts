export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
    
  
    brandId: string | number;
    categoryId: number | string;
    importPrice: number | string;
    stock: number;
    //avgRating: number;
    sold: number;
    images: string[];
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date;
  }
  