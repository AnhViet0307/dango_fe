import httpRequest from "@/services/httpRequest";

export const getAllDish = () => {
  return httpRequest.get("/dishes");
};

export const searchDishByName = (value: string) => {
  return httpRequest.get("/dishes/search", {
    params: {
      keyword: value,
    },
  });
};

export const createNewDish = (data: any) => {
  return httpRequest.post("/dishes", data);
};

export const getDishById = (dishId: string | number) => {
  return httpRequest.get(`/dishes/${dishId}`);
};

export const updateDishById = (dishId: string | number, data: any) => {
  return httpRequest.put(`/dishes/${dishId}`, data);
};

export const deleteDishById = (dishId: string | number) => {
  return httpRequest.delete(`/dishes/${dishId}`);
};
