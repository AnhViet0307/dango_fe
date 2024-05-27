export interface IOrder {
  id: number | string;
  status: string;
  userId: number | string;
  orderAddress: string;
  orderName: string;
  orderPhone: string;
  address: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;
  OrderItemModels: OrderItemModel[];
}

export interface OrderItemModel {
  id: number | string;
  quantity: number;
  productId: number | string;
  orderId: number;
  totalPrice: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
